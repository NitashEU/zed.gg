"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var custom_response_model_1 = require("./../models/custom-response.model");
var custom_response_exception_model_1 = require("./../models/custom-response-exception.model");
var Requester = (function () {
    function Requester(baseOptions) {
        baseOptions = !baseOptions
            ? {}
            : baseOptions;
        this.baseOptions = baseOptions;
        this.baseRequest = request.defaults(baseOptions);
    }
    Requester.prototype.get = function (url, options) {
        var _this = this;
        var date = new Date();
        return new Promise(function (resolve, reject) {
            _this.baseRequest.get(url, options, function (err, data) {
                if (err || (!!data.statusCode && data.statusCode >= 400)) {
                    reject(new custom_response_exception_model_1.CustomResponseException(_this.baseOptions.baseUrl + url, date, data.statusCode, data.headers));
                }
                else {
                    resolve(new custom_response_model_1.CustomResponse(data.body, date, data.statusCode, data.headers));
                }
            });
        });
    };
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map