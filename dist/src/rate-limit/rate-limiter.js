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
var async_mutex_1 = require("async-mutex");
var rate_limit_1 = require("./rate-limit");
var rate_limit_headers_constant_1 = require("./../constants/rate-limit-headers.constant");
var RateLimiter = (function () {
    function RateLimiter(rateLimits) {
        var _this = this;
        this.mutex = new async_mutex_1.Mutex();
        this.rateLimitHeaders = new Map();
        this.rateLimits = !rateLimits
            ? [new rate_limit_1.RateLimit(10, 10), new rate_limit_1.RateLimit(600, 500)]
            : rateLimits;
        var tenSecRateLimit = this.rateLimits.filter(function (rl) { return rl.seconds === 10; })[0];
        this.rateLimits.push(new rate_limit_1.RateLimit(0.5, tenSecRateLimit.maximumCalls / 10));
        rate_limit_headers_constant_1.rateLimitHeaders.forEach(function (rlh) {
            _this.rateLimitHeaders.set(rlh.toLowerCase(), rlh.toLowerCase());
        });
    }
    RateLimiter.prototype.waitAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mutex.acquire()];
                    case 1:
                        release = _a.sent();
                        return [4 /*yield*/, Promise.all(this.rateLimits.map(function (rl) { return rl.wait(); }))];
                    case 2:
                        _a.sent();
                        this.rateLimits.forEach(function (rl) { return rl.addRequest(); });
                        if (this.alreadyAdjustedOnce) {
                            release();
                        }
                        else {
                            this.releaserForFirstAdjustment = release;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RateLimiter.prototype.adjustToHeader = function (date, headers) {
        var _this = this;
        var map = new Map();
        var limits = Object.keys(headers).filter(function (key) { return _this.rateLimitHeaders.has(key.toLowerCase()); }).map(function (key) { return headers[key]; });
        limits.forEach(function (gLimits) {
            gLimits.split(',').forEach(function (limit) {
                var splitted = limit.split(':');
                var key = parseInt(splitted[1]);
                var value = splitted[0];
                var list = map.get(key);
                if (!list) {
                    map.set(key, [value]);
                }
                else {
                    list.push(value);
                }
            });
        });
        map.forEach(function (value, key) {
            var highestValue = value.sort(function (a, b) { return b - a; })[0];
            _this.rateLimits.forEach(function (rl) {
                if (rl.seconds === key) {
                    var currentQueueLength = rl.getCurrentQueueLength();
                    if (highestValue > currentQueueLength) {
                        console.log('adding ' + (highestValue - currentQueueLength) + ' more to ' + key);
                        for (var i = 0; i < highestValue - currentQueueLength; i++) {
                            rl.addRequest(date);
                        }
                    }
                }
            });
        });
        if (!this.alreadyAdjustedOnce) {
            this.alreadyAdjustedOnce = true;
            this.releaserForFirstAdjustment();
        }
    };
    return RateLimiter;
}());
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=rate-limiter.js.map