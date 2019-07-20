/*global describe, it */

'use strict';

const Api = require('lib/api');
const config = require('test/config');

describe('PLAYERS', () => {

	const api = new Api({
		apiKey: { key: config.apiKey, secret: config.apiSecret },
		host: config.host,
		game: config.game
	});

	it('GET - returns player information', async () => {
		const response = await api.players.get({ code: config.test.player });
		response.body.game.should.equal(config.game);
		response.body.player.should.equal(config.test.player);
	});


	it('CREATE - returns new task', async () => {
		const response = await api.players.createTask({
			code: config.test.player
		}, {
			projects: [config.test.project],
			player: { accountCode: config.test.player }
		});

		response.body.game.should.equal(config.game);
		response.body.task.project.should.equal(config.test.project);
		response.body.player.code.should.equal(config.test.player);
	});


});
