"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomResponseException = (function () {
    function CustomResponseException(requestUrl, date, statusCode, headers) {
        this.requestUrl = requestUrl;
        this.date = date;
        this.statusCode = statusCode;
        this.headers = headers;
    }
    return CustomResponseException;
}());
exports.CustomResponseException = CustomResponseException;
//# sourceMappingURL=custom-response-exception.model.js.map