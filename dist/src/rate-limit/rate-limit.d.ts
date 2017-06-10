export declare class RateLimit {
    seconds: number;
    maximumCalls: number;
    private mutex;
    private deque;
    private buffer;
    constructor(seconds: number, maximumCalls: number);
    getCurrentQueueLength(): number;
    addRequest(date?: Date): void;
    wait(): Promise<void>;
    private _wait(resolve);
}
