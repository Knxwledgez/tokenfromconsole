function getToken() {
    let popup;
    popup = window.open('', '', `top=0,left=${screen.width-800},width=850,height=${screen.height}`);
    if(!popup || !popup.document || !popup.document.write) return alert('pop up bloqué');
    
    window.dispatchEvent(new Event('beforeunload'));
    token = popup.localStorage.token
    token = token.slice(1, -1); // Gets rid of the quotes

    popup.document.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>discord token</title>
            <style>
                body {
                    font-family: sans-serif;
                }
                
                code {
                    background: lightgray;
                    font-family: Consolas, serif;
                    padding: 7.5px;
                    border-radius: 7.5px;
                    margin-right: 5px;
                }
    
                .warning {
                    background: yellow;
                    border: 5px solid red;
                    padding: 7.5px;
                    margin-top: 40px;
                }
                button {
                    padding: 6px;
                }
                .noselect {
                	-webkit-user-select: none;
					-khtml-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					-o-user-select: none;
					user-select: none;
                }
            </style>
        </head>
        <body>
            <h1>tn discord token</h1>
            <code id="token_p"></code>
            <button class="noselect" id="button_1">reveal</button>
            <button class="noselect" id="Copy">copier</button>
            <h2 class="warning">partage avec personne</h2>
        </body>
    </html>
    `)

    function censor(string) {
        var censored = ""
        for(var i = 0; i < string.length; i++) {
            censored = censored + "*";
        }
        return censored
    }

    // montre/cache boutton
    popup.document.getElementById('token_p').innerHTML = censor(token);
    var btn = popup.document.getElementById("button_1");
    btn.addEventListener('click', onBtnClick);

    function onBtnClick(){
        var token_p = popup.document.getElementById("token_p");
        if(btn.innerHTML.toLowerCase() == "cacher") {
            btn.innerHTML = "montre";
            token_p.innerHTML = censor(token_p.innerHTML);
        }

        else if(btn.innerHTML.toLowerCase() == "montre") {
            btn.innerHTML = "cacher";
            token_p.innerHTML = token;
        }
    }

    // copy boutton
    var copyButton = popup.document.getElementById("Copy");
    copyButton.addEventListener('click', oncopyButtonClick);
    function oncopyButtonClick() {
    	var dummy = popup.document.createElement("textarea");
	    popup.document.body.appendChild(dummy);
	    dummy.value = token;
	    dummy.select();
	    popup.document.execCommand("Copy");
	    popup.document.body.removeChild(dummy);

  	    popup.alert("t'as bien copié l'token")
    }

}		


// maintenant lance
getToken()
