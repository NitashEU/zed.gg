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
var Deque = require("double-ended-queue/js/deque");
var async_mutex_1 = require("async-mutex");
var RateLimit = (function () {
    function RateLimit(seconds, maximumCalls) {
        this.mutex = new async_mutex_1.Mutex();
        this.deque = new Deque();
        this.buffer = seconds * 50;
        this.seconds = seconds;
        this.maximumCalls = maximumCalls;
    }
    RateLimit.prototype.getCurrentQueueLength = function () {
        return this.deque.length;
    };
    RateLimit.prototype.addRequest = function (date) {
        if (!date) {
            date = new Date();
        }
        this.deque.push(date.getTime() + this.seconds * 1000);
    };
    RateLimit.prototype.wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this._wait(resolve);
                    })];
            });
        });
    };
    RateLimit.prototype._wait = function (resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var time;
            return __generator(this, function (_a) {
                time = new Date().getTime();
                while (this.deque.length > 0 && time - this.deque.peekFront() >= this.buffer) {
                    this.deque.shift();
                }
                if (this.deque.length < this.maximumCalls) {
                    resolve();
                }
                else {
                    setTimeout(function () {
                        _this._wait(resolve);
                    }, this.buffer / 2);
                }
                return [2 /*return*/];
            });
        });
    };
    return RateLimit;
}());
exports.RateLimit = RateLimit;
//# sourceMappingURL=rate-limit.js.map