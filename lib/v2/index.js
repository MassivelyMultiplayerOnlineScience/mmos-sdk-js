'use strict';

/** @ignore */
const Players = require('./players');
/** @ignore */
const Classifications = require('./classifications');
/** @ignore */
const ApiKeys = require('./apikeys');

/** @ignore */
module.exports = function (api) {
	api.classifications = new Classifications({ api: api });
	api.players = new Players({ api: api });
	api.admin = { apiKeys: new ApiKeys({ api: api }) };
};

