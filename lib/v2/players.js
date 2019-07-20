'use strict';

/**
 * @desc Player related API calls
**/
class Players {

	/** @ignore */
	constructor(options) {
		/** @ignore */
		this.api = options.api;
	}

	/**
	* Calls get player API public endpoint (GET /games/{game}/players/{player}?project={project}) which provides information on one player
	* @param {Object} options
	* @param {string} options.code Player code.
  * @param {string} options.project - Project code.
	* @returns {Promise}
	* @example
		await api.players.get({
			code: 'player-code-01',
			project: 'unige-exoplanet'
		});
	*/
	get(options) {
		if (options.project) {
			return this.api.call({
				path: `games/${this.api.game}/players/${options.code}?project=${options.project}`
			}, {}, [200, 404]);
		} else {
			return this.api.call({
				path: `games/${this.api.game}/players/${options.code}`
			}, {}, [200, 404]);
		}
	}

	/**
	* Calls create new task for player API public endpoint (POST /games/{game}/players/{player}/tasks)
	* @param {Object} options
	* @param {string} options.code Player code.
	* @param {Object} body
  * @param {string} body.project - Project code.
	* @return {Promise}
	* @example
		await api.players.createTask({
			code: 'player-code-01' }, {
			project: 'unige-exoplanet'
		});
	*/
	createTask(options, body) {
		return this.api.call({
			method: this.api.METHOD.POST,
			path: `games/${this.api.game}/players/${options.code}/tasks`
		}, body, 201);
	}

};

module.exports = Players;

