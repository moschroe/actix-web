use actix_http::body::BodyStream;
use actix_web::{web, App, HttpResponse, HttpServer};
use bytes::Bytes;
use futures_core::Stream;
use futures_util::StreamExt;
use sha1::digest::core_api::CoreWrapper;
use sha1::Sha1;
use sha1::{Digest, Sha1Core};
use std::mem::swap;
use std::net::Ipv4Addr;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::{Duration, Instant};
use tokio::runtime::Builder;
#[allow(unused_imports)]
use tracing::{debug, error, info};

const LEN_TEST_DATA: usize = 1024 * 1024 * 50;
// const LEN_TEST_DATA: usize = 131_072 * 100;
const CHUNK_SIZE: usize = 2048;
const BYTES_PER_SECOND: f64 = 1024.0 * 1024.0 * 10.0;
const DELAY_SECS: f64 = 1.0 / (BYTES_PER_SECOND as f64 / CHUNK_SIZE as f64);
// const DELAY_SECS: f64 = 2.0;

static mut OPT_HASH_CLIENT: Option<[u8; 20]> = None;
static mut OPT_HASH_SERVER: Option<[u8; 20]> = None;

#[actix_web::post("/upload")]
async fn post_large(mut payload: web::Payload) -> Result<HttpResponse, actix_web::Error> {
    dbg!(LEN_TEST_DATA, CHUNK_SIZE, DELAY_SECS);

    let mut len_total = 0;
    let inst_loop = Instant::now();
    let mut sha1 = Sha1::new();
    // tokio::time::sleep(Duration::from_secs_f64(DELAY_SECS)).await;
    loop {
        let chunk = match payload.next().await {
            Some(c) => c,
            None => {
                break;
            }
        };
        let chunk = chunk?;
        tokio::time::sleep(Duration::from_secs_f64(DELAY_SECS)).await;
        // if chunk.len() != CHUNK_SIZE {
        //     panic!("read too short chunk of len {}", chunk.len());
        // }
        len_total += chunk.len();
        sha1.update(&chunk);
        // let elapsed = inst_loop.elapsed();
        // let rate = chunk.len() as f64 / elapsed.as_secs_f64();
        // if rate > BYTES_PER_SECOND {}
        // inst_loop = Instant::now();
    }
    let elapsed = inst_loop.elapsed();
    unsafe {
        OPT_HASH_SERVER.replace(sha1.finalize().into());
    }
    info!(
        "total payload size was {} bytes in {:?} ({:.3} MiB/s, {:.1} B/s); DELAY_SECS: {:?}",
        len_total,
        elapsed,
        (len_total as f64 / elapsed.as_secs_f64()) / (1024.0 * 1024.0),
        (len_total as f64 / elapsed.as_secs_f64()) / 1.0,
        DELAY_SECS
    );
    if len_total != LEN_TEST_DATA {
        panic!(
            "read {} bytes less than expected\n{:06} <- expected\n{:06} <- read",
            LEN_TEST_DATA - len_total,
            LEN_TEST_DATA,
            len_total
        );
    } else {
        info!(
            "=====================================\n\
        === PAYLOAD READ ENTIRELY! {} B\n\
        =====================================",
            LEN_TEST_DATA
        );
    }

    // SERVER_FINISHED

    Ok(HttpResponse::Ok().body("Payload received!"))
}

const DUMMY_CONTENT: &[u8] = b"DUMMY TEXT ";

struct DummyBody {
    to_deliver: usize,
    buffer: Bytes,
    sha1: CoreWrapper<Sha1Core>,
}

impl DummyBody {
    fn new(to_deliver: usize) -> Self {
        let mut buffer = Vec::with_capacity(CHUNK_SIZE);
        while buffer.len() < CHUNK_SIZE {
            let len = std::cmp::min(CHUNK_SIZE - buffer.len(), DUMMY_CONTENT.len());
            buffer.extend_from_slice(&DUMMY_CONTENT.as_ref()[..len]);
        }
        assert_eq!(
            buffer.len(),
            CHUNK_SIZE,
            "unable to build one chunk in buffer"
        );
        // buffer.fill_with(|| {
        //     let res = DUMMY_CONTENT[*ref_idx];
        //     *ref_idx += 1;
        //     if *ref_idx >= DUMMY_CONTENT.len() {
        //         *ref_idx = 0;
        //     }
        //     limit+=1;
        //     if limit>=CHUNK_SIZE{
        //
        //     }
        //     res
        // });
        let buffer = Bytes::from(buffer);
        let sha1 = Sha1::new();

        DummyBody {
            to_deliver,
            buffer,
            sha1,
        }
    }
}

impl Stream for DummyBody {
    type Item = std::io::Result<Bytes>;

    fn poll_next(mut self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        if self.to_deliver > 0 {
            let len_msg = std::cmp::min(self.to_deliver, self.buffer.len());
            self.to_deliver -= len_msg;
            // dbg!(len_msg);
            let mut deliver = self.buffer.clone();
            deliver.truncate(len_msg as usize);
            self.sha1.update(&deliver);
            Poll::Ready(Some(Ok(deliver)))
        } else {
            let mut swapped = Sha1::new();
            swap(&mut self.sha1, &mut swapped);
            // swapped.update(b"0");
            unsafe {
                OPT_HASH_CLIENT.replace(swapped.finalize().into());
            }
            Poll::Ready(None)
        }
    }
}

#[actix_rt::test]
async fn test_backpressure() {
    env_logger::init();

    let server = HttpServer::new(move || App::new().service(post_large))
        .bind((Ipv4Addr::new(127, 0, 0, 1), 8888))
        .unwrap()
        .workers(1)
        .run();

    let handle = server.handle();

    // let join_server = rt0.spawn(async {
    // });

    let client = std::thread::spawn(move || {
        let rt1 = Builder::new_current_thread().enable_all().build().unwrap();
        let local = tokio::task::LocalSet::new();
        local.block_on(&rt1, async {
            let client = awc::ClientBuilder::new().finish();
            info!("sending ({} byte) request", LEN_TEST_DATA);
            let mut req = client
                .post("http://127.0.0.1:8888/upload")
                .timeout(Duration::from_secs_f64(60.0 * 5.0))
                .send_body(BodyStream::new(DummyBody::new(LEN_TEST_DATA)))
                .await
                .unwrap();
            info!("response headers: {:?}", req.status());
            let body = req.body().await.unwrap();
            info!("reponse body: {}", String::from_utf8_lossy(&body));
            // tokio::time::sleep(Duration::from_secs_f64(10.0)).await;
            info!("REQUEST FINISHED, STOPPING SERVER");
            handle.stop(true).await;
        });
    });

    server.await.unwrap();
    client.join().unwrap();

    // compare digest and ensure the server received everything intact
    unsafe {
        assert!(OPT_HASH_CLIENT.is_some());
        assert!(OPT_HASH_SERVER.is_some());
        assert_eq!(OPT_HASH_CLIENT, OPT_HASH_SERVER);
    }
}
