!function(){var t={bodyEl:document.querySelector("body"),buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]")};t.buttonStart.addEventListener("click",(function(){if(n)return;o=setInterval(e,1e3)})),t.buttonStop.addEventListener("click",(function(){clearInterval(o),n=!1}));var o=null,n=!1;function e(){n=!0;var o="#".concat(Math.floor(16777215*Math.random()).toString(16));t.bodyEl.style.backgroundColor=o,console.log(t.bodyEl.style.backgroundColor=o)}}();
//# sourceMappingURL=01-color-switcher.a4e6785d.js.map