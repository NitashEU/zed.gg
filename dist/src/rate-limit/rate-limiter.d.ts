/// <reference types="request" />
import * as request from 'request';
import { RateLimit } from './rate-limit';
export declare class RateLimiter {
    private alreadyAdjustedOnce;
    private releaserForFirstAdjustment;
    private rateLimits;
    private mutex;
    private rateLimitHeaders;
    constructor(rateLimits: RateLimit[]);
    waitAll(): Promise<void>;
    adjustToHeader(date: Date, headers: request.Headers): void;
}
