const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");let o=0;e.addEventListener("click",(function(e){e.target.toggleAttribute("disabled"),r.removeAttribute("disabled"),o=setInterval((()=>t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`),1e3)})),r.addEventListener("click",(function(t){t.target.toggleAttribute("disabled"),e.removeAttribute("disabled"),clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.a079130c.js.map
