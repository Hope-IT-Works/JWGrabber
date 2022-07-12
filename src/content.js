console.log("[JWGrabber] Getting source url...");
if (typeof jwgrabber_source === 'undefined') {
    var jwgrabber_source;
}
if (typeof jwgrabber_elements === 'undefined') {
    var jwgrabber_elements;
}
jwgrabber_elements = document.getElementsByClassName("jw-video");
if (jwgrabber_elements.length > 0) {
    jwgrabber_source = document.getElementsByClassName("jw-video")[0].src;
}
console.log("[JWGrabber] Source url: " + jwgrabber_source);
function jwgrabber_fallbackCopyTextToClipboard(text) {
    let jwgrabber_textArea = document.createElement("textarea");
    jwgrabber_textArea.value = text;
    jwgrabber_textArea.style.top = "0";
    jwgrabber_textArea.style.left = "0";
    jwgrabber_textArea.style.position = "fixed";
    document.body.appendChild(jwgrabber_textArea);
    jwgrabber_textArea.focus();
    jwgrabber_textArea.select();
    try {
        let jwgrabber_successful = document.execCommand('copy');
        let jwgrabber_msg = jwgrabber_successful ? 'successful' : 'unsuccessful';
        console.log('[JWGrabber] Fallback: Copying text command was ' + jwgrabber_msg);
    } catch (err) {
        console.log('[JWGrabber] Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(jwgrabber_textArea);
}
function jwgrabber_copyTextToClipboard(text) {
    if(!navigator.clipboard){
        jwgrabber_fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function(){
        console.log('[JWGrabber] Async: Copying to clipboard was successful!');
    }, function(err) {
        console.log('[JWGrabber] Async: Could not copy text: ', err);
    });
}
if(jwgrabber_source.length > 0){
    if(jwgrabber_source.substring(0,4) === "blob"){
        console.log("[JWGrabber] Source is a blob, unable to retrieve.");
    } else {
        copyTextToClipboard(jwgrabber_source);
    }
}