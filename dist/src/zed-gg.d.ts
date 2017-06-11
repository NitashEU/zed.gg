import { RateLimit } from './rate-limit/rate-limit';
import { Region } from './enums/region.enum';
export declare class ZedGG {
    private requester;
    private rateLimiter;
    private region;
    private apiKey;
    constructor(region: Region, apiKey: string);
    constructor(region: Region, apiKey: string, rateLimits: RateLimit[]);
    private defineDefaultRequestOptions();
    private request<T>(urlAndConstructor);
    private request<T>(urlAndConstructor, ...params);
    private request<T>(urlAndConstructor, options);
    private handleResponse(date, statusCode, headers);
    private getSummonerByAccountId(accountId);
    private getSummonerBySummonerName(summonerName);
    private getSummonerBySummonerId(summonerId);
    summoners: {
        by: {
            accountId: any;
            name: any;
            summonerId: any;
        };
    };
}
