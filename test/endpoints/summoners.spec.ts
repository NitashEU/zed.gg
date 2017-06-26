import * as chai from 'chai';
import * as dotenv from 'dotenv';

import { slow, suite, test, timeout } from "mocha-typescript";

import { Region } from './../../src/enums';
import { Summoner } from './../../src/models/summoners/summoner.model';
import { ZedGG } from './../../src/zed-gg';

@suite class SummonersTest {
  public static before() {
    dotenv.config();
    chai.should();
  }

  @test('byAccountId -> should return valid summoner')
  public async byAccountId() {
    let accountId = 29987287;
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    let summoner = await zedGG.summoners.by.accountId(accountId);
    this.checkSummoner(summoner);
  }

  @test('byName -> should return valid summoner')
  public async byName() {
    let name = 'nitash';
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    let summoner = await zedGG.summoners.by.name(name);
    this.checkSummoner(summoner);
  }

  @test('bySummonerId -> should return valid summoner')
  public async bySummonerId() {
    let summonerId = 25837773;
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    let summoner = await zedGG.summoners.by.summonerId(summonerId);
    this.checkSummoner(summoner);
  }

  private checkSummoner(summoner: Summoner) {
    summoner.id.should.be.a('number');
    summoner.accountId.should.be.a('number');
    summoner.name.should.be.a('string');
    summoner.name.should.have.length.greaterThan(0);
    summoner.summonerLevel.should.be.a('number');
    summoner.summonerLevel.should.equal(30);
    summoner.profileIconId.should.be.a('number');
    summoner.revisionDate.should.be.a('date');
  }
}