'use strict';

/*global describe, it*/

// import Api from 'lib/api';
const Api = require('lib/api');
const config = require('test/config');

describe('API', () => {

	const api = new Api({
		apiKey: { key: config.apiKey, secret: config.apiSecret },
		host: config.host,
		game: config.game
	});

	it('INFO - returns system info', async () => {
		const response = await api.info();
		response.body.name.should.equal('mmos-api-2');
		response.body.stats.uptime.should.be.above(1);
		response.body.stats.nodeEnv.should.equal('depo');
	});

});

