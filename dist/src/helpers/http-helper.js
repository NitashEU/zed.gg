"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpHelper;
(function (HttpHelper) {
    function buildUrlWithOptions(url, options) {
        Object.keys(options).forEach(function (key) {
            url = url.replace("{" + key + "}", options[key]);
        });
        return url;
    }
    HttpHelper.buildUrlWithOptions = buildUrlWithOptions;
})(HttpHelper = exports.HttpHelper || (exports.HttpHelper = {}));
//# sourceMappingURL=http-helper.js.map