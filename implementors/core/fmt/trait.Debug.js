(function() {var implementors = {};
implementors["actix_files"] = [{"text":"impl Debug for Directory","synthetic":false,"types":[]},{"text":"impl Debug for Files","synthetic":false,"types":[]},{"text":"impl Debug for NamedFile","synthetic":false,"types":[]},{"text":"impl Debug for HttpRange","synthetic":false,"types":[]},{"text":"impl Debug for FilesService","synthetic":false,"types":[]}];
implementors["actix_http"] = [{"text":"impl Debug for BodySize","synthetic":false,"types":[]},{"text":"impl Debug for Body","synthetic":false,"types":[]},{"text":"impl Debug for ConnectError","synthetic":false,"types":[]},{"text":"impl Debug for InvalidUrl","synthetic":false,"types":[]},{"text":"impl Debug for SendRequestError","synthetic":false,"types":[]},{"text":"impl Debug for FreezeRequestError","synthetic":false,"types":[]},{"text":"impl Debug for KeepAlive","synthetic":false,"types":[]},{"text":"impl Debug for Extensions","synthetic":false,"types":[]},{"text":"impl Debug for AcceptCharset","synthetic":false,"types":[]},{"text":"impl Debug for Accept","synthetic":false,"types":[]},{"text":"impl Debug for AcceptLanguage","synthetic":false,"types":[]},{"text":"impl Debug for Allow","synthetic":false,"types":[]},{"text":"impl Debug for CacheControl","synthetic":false,"types":[]},{"text":"impl Debug for CacheDirective","synthetic":false,"types":[]},{"text":"impl Debug for DispositionType","synthetic":false,"types":[]},{"text":"impl Debug for DispositionParam","synthetic":false,"types":[]},{"text":"impl Debug for ContentDisposition","synthetic":false,"types":[]},{"text":"impl Debug for ContentLanguage","synthetic":false,"types":[]},{"text":"impl Debug for ContentRange","synthetic":false,"types":[]},{"text":"impl Debug for ContentRangeSpec","synthetic":false,"types":[]},{"text":"impl Debug for ContentType","synthetic":false,"types":[]},{"text":"impl Debug for Date","synthetic":false,"types":[]},{"text":"impl Debug for ETag","synthetic":false,"types":[]},{"text":"impl Debug for Expires","synthetic":false,"types":[]},{"text":"impl Debug for IfMatch","synthetic":false,"types":[]},{"text":"impl Debug for IfModifiedSince","synthetic":false,"types":[]},{"text":"impl Debug for IfNoneMatch","synthetic":false,"types":[]},{"text":"impl Debug for IfRange","synthetic":false,"types":[]},{"text":"impl Debug for IfUnmodifiedSince","synthetic":false,"types":[]},{"text":"impl Debug for LastModified","synthetic":false,"types":[]},{"text":"impl Debug for HeaderMap","synthetic":false,"types":[]},{"text":"impl Debug for ContentEncoding","synthetic":false,"types":[]},{"text":"impl Debug for ExtendedValue","synthetic":false,"types":[]},{"text":"impl Debug for ConnectionType","synthetic":false,"types":[]},{"text":"impl Debug for RequestHead","synthetic":false,"types":[]},{"text":"impl Debug for RequestHeadType","synthetic":false,"types":[]},{"text":"impl Debug for ResponseHead","synthetic":false,"types":[]},{"text":"impl&lt;P&gt; Debug for Request&lt;P&gt;","synthetic":false,"types":[]},{"text":"impl&lt;B:&nbsp;MessageBody&gt; Debug for Response&lt;B&gt;","synthetic":false,"types":[]},{"text":"impl Debug for ResponseBuilder","synthetic":false,"types":[]},{"text":"impl Debug for Error","synthetic":false,"types":[]},{"text":"impl Debug for ParseError","synthetic":false,"types":[]},{"text":"impl&lt;E:&nbsp;Debug&gt; Debug for BlockingError&lt;E&gt;","synthetic":false,"types":[]},{"text":"impl Debug for PayloadError","synthetic":false,"types":[]},{"text":"impl Debug for DispatchError","synthetic":false,"types":[]},{"text":"impl Debug for ContentTypeError","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Debug for InternalError&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Debug + 'static,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl Debug for Codec","synthetic":false,"types":[]},{"text":"impl Debug for Payload","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Debug&gt; Debug for Message&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl Debug for MessageType","synthetic":false,"types":[]},{"text":"impl Debug for Message","synthetic":false,"types":[]},{"text":"impl Debug for Frame","synthetic":false,"types":[]},{"text":"impl Debug for Item","synthetic":false,"types":[]},{"text":"impl Debug for Codec","synthetic":false,"types":[]},{"text":"impl Debug for Parser","synthetic":false,"types":[]},{"text":"impl Debug for OpCode","synthetic":false,"types":[]},{"text":"impl Debug for CloseCode","synthetic":false,"types":[]},{"text":"impl Debug for CloseReason","synthetic":false,"types":[]},{"text":"impl Debug for ProtocolError","synthetic":false,"types":[]},{"text":"impl Debug for HandshakeError","synthetic":false,"types":[]},{"text":"impl Debug for Protocol","synthetic":false,"types":[]}];
implementors["actix_multipart"] = [{"text":"impl Debug for MultipartError","synthetic":false,"types":[]},{"text":"impl Debug for Field","synthetic":false,"types":[]}];
implementors["actix_web"] = [{"text":"impl&lt;T:&nbsp;Debug + ?Sized&gt; Debug for Data&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl Debug for UrlGenerationError","synthetic":false,"types":[]},{"text":"impl Debug for UrlencodedError","synthetic":false,"types":[]},{"text":"impl Debug for JsonPayloadError","synthetic":false,"types":[]},{"text":"impl Debug for PathError","synthetic":false,"types":[]},{"text":"impl Debug for QueryPayloadError","synthetic":false,"types":[]},{"text":"impl Debug for ReadlinesError","synthetic":false,"types":[]},{"text":"impl Debug for ConnectionInfo","synthetic":false,"types":[]},{"text":"impl Debug for Logger","synthetic":false,"types":[]},{"text":"impl Debug for TrailingSlash","synthetic":false,"types":[]},{"text":"impl Debug for NormalizePath","synthetic":false,"types":[]},{"text":"impl Debug for Compress","synthetic":false,"types":[]},{"text":"impl Debug for HttpRequest","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Debug + Clone + 'static&gt; Debug for ReqData&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl Debug for ResourceMap","synthetic":false,"types":[]},{"text":"impl Debug for ServiceRequest","synthetic":false,"types":[]},{"text":"impl&lt;B:&nbsp;MessageBody&gt; Debug for ServiceResponse&lt;B&gt;","synthetic":false,"types":[]},{"text":"impl&lt;L:&nbsp;Debug, R:&nbsp;Debug&gt; Debug for Either&lt;L, R&gt;","synthetic":false,"types":[]},{"text":"impl&lt;L:&nbsp;Debug, R:&nbsp;Debug&gt; Debug for EitherExtractError&lt;L, R&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Debug&gt; Debug for Form&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Debug for Json&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Debug,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Debug&gt; Debug for Path&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Debug&gt; Debug for Query&lt;T&gt;","synthetic":false,"types":[]}];
implementors["awc"] = [{"text":"impl Debug for BoxedSocket","synthetic":false,"types":[]},{"text":"impl Debug for WsClientError","synthetic":false,"types":[]},{"text":"impl Debug for JsonPayloadError","synthetic":false,"types":[]},{"text":"impl Debug for ClientRequest","synthetic":false,"types":[]},{"text":"impl&lt;S&gt; Debug for ClientResponse&lt;S&gt;","synthetic":false,"types":[]},{"text":"impl Debug for WebsocketsRequest","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()