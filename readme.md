# Base64 Encoding & Decoding #
fix browsers which don't support Base64 | btoa | atob

## Example ##
if you want to see how it works in browsers which don't support native base64 encoding;
you can try [this link](http://hongru.github.com/proj/base64/test.html) in old browsers such as old IE. 

## Code eg. ##
just try this as native methods supported!

    window.btoa('test');
    
    window.atob('**');
    
you can also try this:

    Base64.btoa()
    Base64.atob()
    Base64.encode()
    Base64.decode()