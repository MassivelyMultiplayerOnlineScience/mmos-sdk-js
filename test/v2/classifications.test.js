/*global describe, it */

'use strict';

const Api = require('lib/api');
const config = require('test/config');

describe('CLASSIFICATIONS', () => {

	const api = new Api({
		apiKey: { key: config.apiKey, secret: config.apiSecret },
		host: config.host,
		game: config.game
	});

	it('CREATE - is able to submit a classification', async () => {
		const task = await api.players.createTask({
			code: config.test.player
		}, {
			projects: [config.test.project],
			player: { accountCode: config.test.player }
		});
		const response = await api.classifications.create({
			game: config.game,
			task: {
				id: task.body.task.id,
				result: config.test.result
			},
			circumstances: config.test.circumstances,
			player: config.test.player,
			playergroup: config.test.playerGroup
		});

		response.body.game.should.equal(config.game);
		response.body.task.project.should.equal(config.test.project);
		response.body.player.code.should.equal(config.test.player);
	});


});
