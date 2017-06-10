"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var summoner_model_1 = require("./models/summoner.model");
var url_and_constructor_1 = require("./helpers/url-and-constructor");
var Endpoints;
(function (Endpoints) {
    Endpoints.baseUrl = 'https://{platformId}.api.riotgames.com/';
    var Summoners;
    (function (Summoners) {
        var baseUrl = 'lol/summoner/v3/summoners/';
        var baseConstructor = summoner_model_1.Summoner;
        Summoners.byAccountId = new url_and_constructor_1.UrlAndConstructor(baseUrl + 'by-account/{accountId}', baseConstructor);
        Summoners.bySummonerName = new url_and_constructor_1.UrlAndConstructor(baseUrl + 'by-name/{summonerName}', baseConstructor);
        Summoners.bySummonerId = new url_and_constructor_1.UrlAndConstructor(baseUrl + '{summonerId}', baseConstructor);
    })(Summoners = Endpoints.Summoners || (Endpoints.Summoners = {}));
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));
//# sourceMappingURL=endpoints.js.map