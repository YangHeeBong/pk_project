/**
 * 엔진 로드 후 실행할 초기화 함수(Module.postRun)
 */
var Module = {
    locateFile: function (path, prefix) {
        return "./" + prefix + path;
    },
    postRun: [start],
};

(function () {
    var file = "./XDWorldEM.js";
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/wasm");
    xhr.open("GET", file, true);
    xhr.onload = function () {
        var script = document.createElement("script");
        script.innerHTML = xhr.responseText;
        document.body.appendChild(script);
    };
    xhr.send(null);
})();
