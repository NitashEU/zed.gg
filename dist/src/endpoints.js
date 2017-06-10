import { Summoner } from './models/summoner.model';
import { UrlAndConstructor } from './helpers/url-and-constructor';
export var Endpoints;
(function (Endpoints) {
    Endpoints.baseUrl = 'https://{platformId}.api.riotgames.com/';
    var Summoners;
    (function (Summoners) {
        const baseUrl = 'lol/summoner/v3/summoners/';
        const baseConstructor = Summoner;
        Summoners.byAccountId = new UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
        Summoners.bySummonerName = new UrlAndConstructor(baseUrl + 'by-name/{summonerName}', baseConstructor);
        Summoners.bySummonerId = new UrlAndConstructor(baseUrl + '{summonerId}', baseConstructor);
    })(Summoners = Endpoints.Summoners || (Endpoints.Summoners = {}));
})(Endpoints || (Endpoints = {}));
//# sourceMappingURL=endpoints.js.map