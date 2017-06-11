"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_response_exception_model_1 = require("./models/custom-response-exception.model");
var endpoints_1 = require("./endpoints");
var http_helper_1 = require("./helpers/http-helper");
var rate_limiter_1 = require("./rate-limit/rate-limiter");
var region_enum_1 = require("./enums/region.enum");
var requester_1 = require("./helpers/requester");
var serializer_1 = require("./helpers/serializer");
var platform_ids_constant_1 = require("./constants/platform-ids.constant");
var ZedGG = (function () {
    function ZedGG(region, apiKey, rateLimits) {
        /* END REQUESTS */
        /* BEGIN DEFINITIONS */
        this.summoners = {
            by: {
                accountId: this.getSummonerByAccountId.bind(this),
                name: this.getSummonerBySummonerName.bind(this),
                summonerId: this.getSummonerBySummonerId.bind(this)
            }
        };
        this.region = region;
        this.apiKey = apiKey;
        this.rateLimiter = new rate_limiter_1.RateLimiter(rateLimits);
        this.defineDefaultRequestOptions();
    }
    ZedGG.prototype.defineDefaultRequestOptions = function () {
        var platformId = platform_ids_constant_1.platformIds[region_enum_1.Region[this.region]];
        var options = {
            baseUrl: http_helper_1.HttpHelper.buildUrlWithOptions(endpoints_1.Endpoints.baseUrl, {
                platformId: platformId
            }),
            headers: { 'X-Riot-Token': this.apiKey }
        };
        this.requester = new requester_1.Requester(options);
    };
    ZedGG.prototype.request = function (urlAndConstructor, options) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, ex_1, rex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!options) {
                            urlAndConstructor.url = http_helper_1.HttpHelper.buildUrlWithOptions(urlAndConstructor.url, options);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.rateLimiter.waitAll()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.requester.get(urlAndConstructor.url)];
                    case 3:
                        result = _a.sent();
                        this.handleResponse(result.date, result.statusCode, result.headers);
                        return [2 /*return*/, serializer_1.Serializer.deserialize(urlAndConstructor.classConstructor, result.body)];
                    case 4:
                        ex_1 = _a.sent();
                        if (ex_1 instanceof custom_response_exception_model_1.CustomResponseException) {
                            rex = ex_1;
                            this.handleResponse(rex.date, rex.statusCode, rex.headers);
                            throw rex;
                        }
                        throw ex_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ZedGG.prototype.handleResponse = function (date, statusCode, headers) {
        this.rateLimiter.adjustToHeader(date, headers);
    };
    /* BEGIN REQUESTS */
    ZedGG.prototype.getSummonerByAccountId = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoints_1.Endpoints.Summoners.byAccountId, {
                            accountId: accountId
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ZedGG.prototype.getSummonerBySummonerName = function (summonerName) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoints_1.Endpoints.Summoners.bySummonerName, {
                            summonerName: summonerName
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ZedGG.prototype.getSummonerBySummonerId = function (summonerId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(endpoints_1.Endpoints.Summoners.bySummonerId, {
                            summonerId: summonerId
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ZedGG;
}());
exports.ZedGG = ZedGG;
//# sourceMappingURL=zed-gg.js.map