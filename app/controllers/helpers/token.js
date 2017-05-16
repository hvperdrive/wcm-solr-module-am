require("rootpath")();
var Q = require("q");
var _ = require("lodash");
var request = require("request");

module.exports = function(data) {
    var prom = Q.defer();

    var options = {
        method: "POST",
        url: data.variables.searchApiDomain + "astad/search/v1/oauth2/token",
        form: {
            client_id: data.variables.consumerKey,
            client_secret: data.variables.consumerSecret,
            grant_type: "client_credentials"
        },
        json: true
    };

    request(options, function(err, resp, body) {
        if (resp.statusCode === 200 && _.isObject(body) && body.hasOwnProperty("access_token") && body.access_token !== "") {
            data.accessToken = body.access_token;
            prom.resolve(data);
        } else {
            prom.reject("Unable to obtain an access token");
        }
    });

    return prom.promise;
};
