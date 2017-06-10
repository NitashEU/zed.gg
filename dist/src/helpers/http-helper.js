export var HttpHelper;
(function (HttpHelper) {
    function buildUrlWithOptions(url, options) {
        Object.keys(options).forEach(key => {
            url = url.replace(`{${key}}`, options[key]);
        });
        return url;
    }
    HttpHelper.buildUrlWithOptions = buildUrlWithOptions;
})(HttpHelper || (HttpHelper = {}));
//# sourceMappingURL=http-helper.js.map