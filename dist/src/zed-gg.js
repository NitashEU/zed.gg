import { RateLimit } from './rate-limit/rate-limit';
export class ZedGg {
    constructor(apiKey, rateLimits) {
        this.apiKey = apiKey;
        this.rateLimits = !rateLimits
            ? [new RateLimit(10, 10), new RateLimit(600, 500)]
            : rateLimits;
    }
    baseRequest() {
    }
}
//# sourceMappingURL=zed-gg.js.map