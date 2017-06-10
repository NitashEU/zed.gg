import { Summoner } from './models/summoner.model';
import { UrlAndConstructor } from './helpers/url-and-constructor';
export declare namespace Endpoints {
    const baseUrl = "https://{platformId}.api.riotgames.com/";
    namespace Summoners {
        const byAccountId: UrlAndConstructor<Summoner>;
        const bySummonerName: UrlAndConstructor<Summoner>;
        const bySummonerId: UrlAndConstructor<Summoner>;
    }
}
