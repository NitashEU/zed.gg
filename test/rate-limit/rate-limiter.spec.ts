import * as chai from 'chai';

import { RateLimit, RateLimiter } from './../../src/rate-limit';
import { slow, suite, test, timeout } from "mocha-typescript";

import { asyncForEach } from './../helper';
import { rateLimitHeaders } from './../../src/constants/rate-limit-headers.constant';

@suite class RateLimiterTest {
  public static before() {
    chai.should();
  }

  @test('givenUndefined -> should create rateLimiter with default rateLimits')
  public async givenUndefined() {
    let rateLimiter = new RateLimiter();
    chai.should().exist(rateLimiter, 'rateLimiter');
    chai.should().exist((rateLimiter as any).rateLimits, 'rateLimiter.rateLimits');
    (rateLimiter as any).rateLimits.length.should.equal(3, 'rateLimiter.rateLimits.length');
    ((rateLimiter as any).rateLimits[0] as RateLimit).seconds.should.equal(10, 'rateLimiter.ratelimits[0].seconds');
    ((rateLimiter as any).rateLimits[0] as RateLimit).maximumCalls.should.equal(10, 'rateLimiter.ratelimits[0].maximumCalls');
    ((rateLimiter as any).rateLimits[1] as RateLimit).seconds.should.equal(600, 'rateLimiter.ratelimits[1].seconds');
    ((rateLimiter as any).rateLimits[1] as RateLimit).maximumCalls.should.equal(500, 'rateLimiter.ratelimits[1].maximumCalls');
    ((rateLimiter as any).rateLimits[2] as RateLimit).seconds.should.equal(0.5, 'rateLimiter.ratelimits[2].seconds');
    ((rateLimiter as any).rateLimits[2] as RateLimit).maximumCalls.should.equal(10 / 10, 'rateLimiter.ratelimits[2].maximumCalls');
  }

  @test('givenEmpty -> should create rateLimiter with default rateLimits')
  public async givenEmpty() {
    let rateLimiter = new RateLimiter([]);
    chai.should().exist(rateLimiter, 'rateLimiter');
    chai.should().exist((rateLimiter as any).rateLimits, 'rateLimiter.rateLimits');
    (rateLimiter as any).rateLimits.length.should.equal(3, 'rateLimiter.rateLimits.length');
    ((rateLimiter as any).rateLimits[0] as RateLimit).seconds.should.equal(10, 'rateLimiter.ratelimits[0].seconds');
    ((rateLimiter as any).rateLimits[0] as RateLimit).maximumCalls.should.equal(10, 'rateLimiter.ratelimits[0].maximumCalls');
    ((rateLimiter as any).rateLimits[1] as RateLimit).seconds.should.equal(600, 'rateLimiter.ratelimits[1].seconds');
    ((rateLimiter as any).rateLimits[1] as RateLimit).maximumCalls.should.equal(500, 'rateLimiter.ratelimits[1].maximumCalls');
    ((rateLimiter as any).rateLimits[2] as RateLimit).seconds.should.equal(0.5, 'rateLimiter.ratelimits[2].seconds');
    ((rateLimiter as any).rateLimits[2] as RateLimit).maximumCalls.should.equal(10 / 10, 'rateLimiter.ratelimits[2].maximumCalls');
  }

  @test('givenRandom -> should create rateLimiter with random rateLimit')
  public async givenRandom() {
    let randomSeconds = Math.floor(Math.random() * (600 - 10 + 1)) + 600;
    let randomMaximumCalls = Math.floor(Math.random() * (3000 - 10 + 1)) + 3000;
    let rateLimiter = new RateLimiter([new RateLimit(randomSeconds, randomMaximumCalls)]);
    chai.should().exist(rateLimiter, 'rateLimiter');
    chai.should().exist((rateLimiter as any).rateLimits, 'rateLimiter.rateLimits');
    (rateLimiter as any).rateLimits.length.should.equal(2, 'rateLimiter.rateLimits.length');
    ((rateLimiter as any).rateLimits[0] as RateLimit).seconds.should.equal(randomSeconds, 'rateLimiter.ratelimits[0].seconds');
    ((rateLimiter as any).rateLimits[0] as RateLimit).maximumCalls.should.equal(randomMaximumCalls, 'rateLimiter.ratelimits[0].maximumCalls');
    ((rateLimiter as any).rateLimits[1] as RateLimit).seconds.should.equal(0.5, 'rateLimiter.ratelimits[1].seconds');
    ((rateLimiter as any).rateLimits[1] as RateLimit).maximumCalls.should.equal(randomMaximumCalls / 10, 'rateLimiter.ratelimits[1].maximumCalls');
  }

  @test('noValidHeadersGiven -> should now throw error if headers is undefined, null or empty')
  public async noValidHeadersGiven() {
    let rateLimiter = new RateLimiter();
    chai.expect(() => rateLimiter.adjustToHeader(new Date(), void 0)).to.not.throw();
    chai.expect(() => rateLimiter.adjustToHeader(new Date(), undefined)).to.not.throw();
    chai.expect(() => rateLimiter.adjustToHeader(new Date(), null)).to.not.throw();
    chai.expect(() => rateLimiter.adjustToHeader(new Date(), {})).to.not.throw();
  }

  @test('testLimitingDefault -> should run 15 seconds+ for 20 requests (buffer)', slow(15000), timeout(20000))
  public async testLimitingDefault() {
    let rateLimiter = new RateLimiter();
    let begin = new Date();
    for (let i = 0; i < 20; i++) {
      let requestDate = new Date();
      await rateLimiter.waitAll();
      rateLimiter.adjustToHeader(requestDate, rateLimitHeaders.map(rlh => {
        return {
          [rlh]: i + ':10,' + i + ':600'
        };
      }));
    }
    let result = (new Date().getTime() - begin.getTime());
    result.should.above(15000, 'result: ' + result);
  }

  @test('testLimitingDefaultAsync -> should run 15 seconds+ for 20 requests (buffer) async', slow(15000), timeout(20000))
  public async testLimitingDefaultAsync() {
    let rateLimiter = new RateLimiter();
    let begin = new Date();
    await asyncForEach(new Array(20), async () => {
      let requestDate = new Date();
      await rateLimiter.waitAll();
      rateLimiter.adjustToHeader(requestDate, rateLimitHeaders.map(rlh => {
        return {
          [rlh]: '1:10,1:600'
        };
      }));
    });
    let result = (new Date().getTime() - begin.getTime());
    result.should.above(15000, 'result: ' + result);
  }

  @test('testLimitingHighAsync -> should run 11,6 seconds+ for 2000 requests (buffer) async', slow(11600), timeout(20000))
  public async testLimitingHighAsync() {
    let rateLimiter = new RateLimiter([new RateLimit(10, 1500)]);
    let begin = new Date();
    await asyncForEach(new Array(2000), async () => {
      let requestDate = new Date();
      await rateLimiter.waitAll();
      rateLimiter.adjustToHeader(requestDate, rateLimitHeaders.map(rlh => {
        return {
          [rlh]: '1:10,1:600'
        };
      }));
    });
    let result = (new Date().getTime() - begin.getTime());
    result.should.above(11600, 'result: ' + result);
  }
}