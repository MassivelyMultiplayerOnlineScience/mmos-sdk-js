'use strict';

/**
 * @desc Classifications related API calls
**/
class Classifications {

	/**
	 * @ignore
	 */
	constructor(options) {
		/**
		 * @ignore
		 */
		this.api = options.api;
	}

	/**
	  * Calls create classification API public endpoint (POST /classifications}?project={project}) when player submits a classification
		*
		* @param {Object} body - Project specific JSON object
		* @return {Promise}
		* @example
			await api.classifications.create({
				taskId: 10053293,
				playerCode: 'player2244',
				playergroupCode: 'group1122',
				result: [121, 222],
				remark: true,
				circumstances: {
					t: 1300
				}
			});
		*/
	create(body) {
		body.game = this.api.game;
		return this.api.call({
			method: this.api.METHOD.POST,
			path: `games/${this.api.game}/players/${body.player}/classifications`
		}, body, 201);
	}

};

module.exports = Classifications;
