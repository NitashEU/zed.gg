import * as chai from 'chai';
import * as dotenv from 'dotenv';

import { slow, suite, test, timeout } from "mocha-typescript";

import { Region } from './../src/enums';
import { ZedGG } from './../src/zed-gg';

@suite class ZedGGTest {
  public static before() {
    dotenv.config();
    chai.should();
  }

  @test('leagues -> should calls for leagues')
  public async leagues() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.leagues, 'zedGG.leagues');
    chai.should().exist(zedGG.leagues.by, 'zedGG.leagues.by');
    chai.should().exist(zedGG.leagues.by.summonerId, 'zedGG.leagues.by.summonerId');
  }

  @test('masterLeagues -> should calls for masterLeagues')
  public async masterLeagues() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.masterLeagues, 'zedGG.masterLeagues');
    chai.should().exist(zedGG.masterLeagues.by, 'edGG.masterLeagues.by');
    chai.should().exist(zedGG.masterLeagues.by.queue, 'zedGG.masterLeagues.by.queue');
  }

  @test('challengerLeagues -> should calls for challengerLeagues')
  public async challengerLeagues() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.challengerLeagues, 'zedGG.challengerLeagues');
    chai.should().exist(zedGG.challengerLeagues.by, 'zedGG.challengerLeagues.by');
    chai.should().exist(zedGG.challengerLeagues.by.queue, 'zedGG.challengerLeagues.by.queue');
  }

  @test('staticData -> should calls for staticData')
  public async staticData() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.staticData, 'zedGG.staticData');
    chai.should().exist(zedGG.staticData.versions, 'zedGG.staticData.versions');
  }

  @test('matches -> should calls for matches')
  public async matches() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.matches, 'zedGG.matches');
    chai.should().exist(zedGG.matches.by, 'zedGG.matches.by');
    chai.should().exist(zedGG.matches.by.matchId, 'zedGG.matches.by.matchId');
  }

  @test('summoners -> should calls for summoners')
  public async summoners() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.summoners, 'zedGG.summoners');
    chai.should().exist(zedGG.summoners.by, 'zedGG.summoners.by');
    chai.should().exist(zedGG.summoners.by.accountId, 'zedGG.summoners.by.accountId');
    chai.should().exist(zedGG.summoners.by.name, 'zedGG.summoners.by.name');
    chai.should().exist(zedGG.summoners.by.summonerId, 'zedGG.summoners.by.summonerId');
  }

  @test('matchlists -> should calls for matchlists')
  public async matchlists() {
    let zedGG = new ZedGG(Region.EUROPE_WEST, process.env.API_KEY);
    chai.should().exist(zedGG.matchlists, 'zedGG.matchlists');
    chai.should().exist(zedGG.matchlists.by, 'zedGG.matchlists.by');
    chai.should().exist(zedGG.matchlists.by.accountId, 'zedGG.matchlists.by.accountId');
    chai.should().exist(zedGG.matchlists.by.accountIdRecent, 'zedGG.matchlists.by.accountIdRecent');
  }
}