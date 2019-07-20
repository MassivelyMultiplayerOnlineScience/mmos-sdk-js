'use strict';

/**
 * @desc ApiKeys related API admin calls
**/
class ApiKeys {

	/** @ignore */
	constructor(options) {
		/** @ignore */
		this.api = options.api;
	}

	/**
		* Calls list apiKeys API admin endpoint (GET /admin/apikeys) to get all ApiKeys of the current game
		* @return {Promise}
		* @example
			await api.admin.apiKeys.list();
		*/
	list() {
		return this.api.call({
			path: 'admin/apikeys'
		}, {}, 200);
	}

	/**
		* Calls create apiKey API admin endpoint (POST /admin/apikeys) to create new PUBLIC policy ApiKey
		* @param {Object} body
		* @param {Object} body.game - The game code
		* @param {Object} body.key - The ApiKey key
		* @param {Object} body.secret - The ApiKey secret
		* @return {Promise}
		* @example
			await api.admin.apiKeys.create({
				game: 'game-code',
				key: 'keyname',
				secret: 'secret1234'
			});
		*/
	create(body) {
		return this.api.call({
			method: this.api.METHOD.POST,
			path: 'admin/apikeys'
		}, body, 201);
	}

	/**
		* Calls delete apiKey API admin endpoint (DELETE /admin/apikeys/{key}) to delete one of the game's ApiKeys
		*
		* @param {Object} options
		* @param {Object} options.key - The ApiKey key to be deleted
		* @return {Promise}
		* @example
			await api.admin.apiKeys.delete({
				key: 'game-key-001'
			});
		*/
	delete(options) {
		return this.api.call({
			method: this.api.METHOD.DELETE,
			path: `admin/apikeys/${options.key}`
		}, {}, 200);
	}

	/**
		* Calls change secret API admin endpoint (POST /admin/apikeys/{key}/changeSecret) to change the secret of one of the game's ApiKeys
		*
		* @param {Object} options
		* @param {Object} options.key - The ApiKey key to be deleted
		* @param {Object} body
		* @param {Object} body.oldSecret - The original secret of the ApiKey
		* @param {Object} body.newSecret - The new secret of the ApiKey
		* @return {Promise}
		* @example
			await api.admin.apiKeys.changeSecret({
				key: 'game-key-001'
			}, {
				oldSecret: 'SECRET-OLD-001',
				newSecret: 'SECRET-NEW-001'
			});
		*/
	changeSecret(options, body) {
		return this.api.call({
			method: this.api.METHOD.POST,
			path: `/admin/apikeys/${options.key}/changeSecret`
		}, body, 200);
	}

};

module.exports = ApiKeys;
