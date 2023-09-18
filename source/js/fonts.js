window.addEventListener("load", function () {
    var webFontLoaderScript = document.createElement("script");
    webFontLoaderScript.src = "/js/webfont.js";
    webFontLoaderScript.async = true;
    webFontLoaderScript.onload = function () {
      var fontList = [
        "https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap",
        "https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap",
        "https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap",
        "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
        "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
      ];
      WebFont.load({
        google: {
          families: fontList.map(function (fontUrl) {
            var fontFamily = fontUrl.match(/family=([^&]+)/);
            if (fontFamily && fontFamily.length > 1) {
              return fontFamily[1].replace(/\+/g, " ");
            }
            return null;
          }),
        },
        active: function () {
          console.log("Font load success");
        },
        inactive: function () {
          console.log("Font load failed");
        },
      });
    };
    document.head.appendChild(webFontLoaderScript);
});
  