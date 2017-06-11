# zed.gg

[![NPM](https://nodei.co/npm/zed.gg.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/zed.gg/)

Riot Api wrapper for Node.js written in typescript. RateLimit is handled with our built in logic and with the response headers (even async!). The first request is always sync, so we can adjust our RateLimit handler to the headers. `retry-after` case is not implemented yet.

# Getting started

All methods do return a `Promise<T>` so you can await it with `ES6`;

## Basic
```typescript
import { Queue, Region, Season } from 'zed.gg/enums';
import { RateLimit, ZedGG } from 'zed.gg';

import { CustomResponseException } from 'zed.gg/models';
import { MatchlistByAccountIdOptions } from 'zed.gg/request-options';

let zedGG = new ZedGG(Region.EUROPE_WEST, 'YOUR_API_KEY'); // Uses default development rate limits
let zedGG = new ZedGG(Region.EUROPE_WEST, 'YOUR_API_KEY', new RateLimit(10, 100), new RateLimit(600, 6000)); // ZedGG with two rate limits. 100 calls in 10 secnds and 6000 calls in 600 seconds.
```

## Exceptions
Exceptions are returned as `CustomResponseException`. You can check it with `instanceof`.
```typescript
try {
  let summoner = await zedGG.summoners.by.name('nitash');
}
catch (ex) {
  if (ex instanceof CustomResponseException) { // We have a CustomResponseException
    let rex = ex as CustomResponseException;
    console.log(rex.requestUrl);
    console.log(rex.date);
    console.log(rex.statusCode);
    console.log(rex.headers);
    throw rex;
  }
  throw ex; // We have another exception
}
```

## Summoners
```typescript
zedGG.summoners.by.name('nitash').then(r => console.log(r));
zedGG.summoners.by.accountId(29987287).then(r => console.log(r));
zedGG.summoners.by.summonerId(25837773).then(r => console.log(r));
```

## Matchlists
```typescript
let matchlistByAccountIdOptions = new MatchlistByAccountIdOptions();
matchlistByAccountIdOptions.season = Season.PRESEASON2017;
matchlistByAccountIdOptions.queue = Queue.RANKED_SOLO_5x5;
matchlistByAccountIdOptions.beginIndex = 1;
matchlistByAccountIdOptions.endIndex = 20;
matchlistByAccountIdOptions.champion = 62;
matchlistByAccountIdOptions.beginTime = new Date(2017, 4, 10);
matchlistByAccountIdOptions.endTime = new Date(2017, 6, 10);

zedGG.matchlists.by.accountId(29987287).then(r => console.log(r));
zedGG.matchlists.by.accountId(29987287, matchlistByAccountIdOptions).then(r => console.log(r));
zedGG.matchlists.by.accountIdRecent(29987287).then(r => console.log(r));
```

## Matches
Please note: The below examples are not complete yet. Only basic match infos are returned in the model.

```typescript
zedGG.matches.by.matchId(3199845416).then(r => console.log(r));
```

# Notes
This wrapper is far by perfect. We have a lot of work to do. In the coming week I will try to add as many endpoint requests as possible and better documentation.