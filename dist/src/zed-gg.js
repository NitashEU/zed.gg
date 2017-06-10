var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Endpoints } from './endpoints';
import { HttpHelper } from './helpers/http-helper';
import { RateLimit } from './rate-limit/rate-limit';
import { Region } from './enums/region.enum';
import { Requester } from './helpers/requester';
import { Serializer } from './helpers/serializer';
import { platformIds } from './constants/platform-ids.constant';
export class ZedGG {
    constructor(region, apiKey, rateLimits) {
        this.summoners = {
            by: {
                name: this.getSummonerBySummonerName.bind(this)
            }
        };
        this.region = region;
        this.apiKey = apiKey;
        this.rateLimits = !rateLimits
            ? [new RateLimit(10, 10), new RateLimit(600, 500)]
            : rateLimits;
        this.defineDefaultRequestOptions();
    }
    defineDefaultRequestOptions() {
        let platformId = platformIds[Region[this.region]];
        let options = {
            baseUrl: HttpHelper.buildUrlWithOptions(Endpoints.baseUrl, {
                platformId: platformId
            }),
            headers: { 'X-Riot-Token': this.apiKey }
        };
        this.requester = new Requester(options);
    }
    getSummonerBySummonerName(summonerName) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.request(Endpoints.Summoners.bySummonerName, {
                summonerName
            });
            return result;
        });
    }
    request(urlAndConstructor, options, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!options) {
                urlAndConstructor.url = HttpHelper.buildUrlWithOptions(urlAndConstructor.url, options);
            }
            try {
                let result = yield this.requester.get(urlAndConstructor.url);
                return Serializer.deserialize(urlAndConstructor.classConstructor, result.body);
            }
            catch (ex) {
                let rex = ex;
                this.handleResponse(rex.statusCode, rex.headers);
                throw rex;
            }
        });
    }
    handleResponse(statusCode, headers) {
    }
}
//# sourceMappingURL=zed-gg.js.map