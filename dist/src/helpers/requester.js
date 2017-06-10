import * as request from 'request';
import { CustomResponse } from './../models/custom-response.model';
import { CustomResponseException } from './../models/custom-response-exception.model';
export class Requester {
    constructor(baseOptions) {
        baseOptions = !baseOptions
            ? {}
            : baseOptions;
        this.baseOptions = baseOptions;
        this.baseRequest = request.defaults(baseOptions);
    }
    get(url, options) {
        return new Promise((resolve, reject) => {
            this.baseRequest.get(url, options, (err, data) => {
                if (err || (!!data.statusCode && data.statusCode >= 400)) {
                    reject(new CustomResponseException(this.baseOptions.baseUrl + url, data.statusCode, data.headers));
                }
                else {
                    resolve(new CustomResponse(data.body, data.statusCode, data.headers));
                }
            });
        });
    }
}
//# sourceMappingURL=requester.js.map