!function(){var t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]"),body:document.querySelector("body")},e=null;function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.btnStart.addEventListener("click",(function(r){t.body.style.background=n(),e=setInterval((function(){t.body.style.background=n()}),1e3),t.btnStart.setAttribute("disabled","")})),t.btnStop.addEventListener("click",(function(n){t.btnStart.removeAttribute("disabled"),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.beea0eab.js.map