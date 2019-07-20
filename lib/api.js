'use strict';

/** @ignore */
const _ = require('lodash');

/**
 * @desc [v2] The current version of the MMOS API server.
 */
const CURRENT_VERSION = 'v2';
/**
 * @desc [https] The defult protocol of the MMOS API server.
 */
const DEFAULT_PROTOCOL = 'https';
/**
 * @desc [443] The defult port of the MMOS API server.
 */
const DEFAULT_PORT = 443;
/**
 * @desc The HTTP verbs used by the MMOS API.
 */
const METHOD = {
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE'
};

/**
 * @desc Root object to reach the MMOS API.
**/
class Api {

	/**
	* Initializes MMOS API sdk class with config parameters
	* - Required config properties: apiKey, host, game
	* - Optional config properties: protocol [https], port [443], verion [v2 - (Always the current)]
	* - apiKey can be ommited when the client needs to change runtime, to use different apiKeys without recreating the Api object
	* @constructor
	* @param {Object} config
	* @param {Object} config.apiKey - The apiKey
	* @param {Object} config.apiKey.key - The apiKey key
	* @param {Object} config.apiKey.secret - The apiKey secret
	* @param {Object} config.protocol - The protocol of the API service (default: 'https')
	* @param {Object} config.host - The hostname of the API service
	* @param {Object} config.port - The port of the API service (default: 443)
	* @param {Object} config.version - The API service version (default is current: v2)
	* @param {Object} config.game - The game code used by most API calls
	* @example
		const Api = require('mmos-sdk-js');
		const api = new Api({
			apiKey: { key: 'KEY', secret: '12345' },
			protocol: 'https',
			host: 'api.mmos.blue',
			port: '443',

			version: 'v2',
			game: 'game'
		});
	*/

	constructor(config) {
		/**
		 * @desc The confiuration object of the API.
		 */
		this.config = {
			apiKey: config.apiKey,
			protocol: config.protocol || DEFAULT_PROTOCOL,
			host: config.host,
			port: config.port || DEFAULT_PORT,

			version: config.version || CURRENT_VERSION,
			game: config.game
		};

		/** @ignore */
		this.authentication = require('./' + this.config.version + '/authentication');

		/**
		 * @type {string}
		 * @desc The game code used in the API calls.
		 */
		this.game = this.config.game;

		require('./' + this.config.version)(this);
	}

	/**
	 * @type {Object}
	 * @desc The HTTP verbs used by the MMOS API.
	 */
	static get METHOD() {
		return METHOD;
	}

	/**
	 * @type {Object}
	 * @desc The HTTP verbs used by the MMOS API.
	 */
	get METHOD() {
		return METHOD;
	}

	/**
	* Calls info API public endpoint (GET /) which provides information on the MMOS API server
	* @returns {Promise}
	* @example
		await api.info();
	*/
	info() {
		return this.call({ path: '' }, {});
	};

	/**
	* Calls an API public endpoint (can be used directly, but specific functions for endpoints should be preferred)
	* @param {Object} endpoint - An object containing fields: method (use api.METHOD) and path (the api endpoint path without the leading /)
	* @param {Object} body - The reuqest body
	* @param {Array|number} expectedStatusCodes - The status codes that are accepted as valid responses to the call. This value decides wether the Promise is resolved or rejected.
	* @returns {Promise}
	* @example
		await api.call({
			method: api.METHOD.POST,
			path: `games/${api.game}/players/${code}/tasks`
		}, body, 201);
	*/
	call(endpoint, body, expectedStatusCodes) {
		const protocol = require(this.config.protocol);

		const method = endpoint.method || METHOD.GET;
		const path = '/' + endpoint.path;

		const options = {
			host: this.config.host,
			port: this.config.port,
			path: path,
			method: method,
			data: body
		};
		options.headers = this.authentication.prepareHeaders(this.config.apiKey, method, path, options);
		options.headers['Content-Type'] = 'application/json';

		if (expectedStatusCodes && !_.isArray(expectedStatusCodes)) expectedStatusCodes = [expectedStatusCodes];

		return new Promise((resolve, reject) => {
			const req = protocol.request(options, (res) => {
				res.setEncoding('utf-8');

				let responseString = '';

				res.on('data', (data) => { responseString += data; });

				res.on('end', () => {
					if (!expectedStatusCodes || (_.indexOf(expectedStatusCodes, res.statusCode) !== -1)) {
						resolve({ statusCode: res.statusCode, body: JSON.parse(responseString) });
					} else {
						reject({ statusCode: res.statusCode, body: JSON.parse(responseString) });
					}
				});

				res.on('error', (err) => { reject(err); });

			}).on('error', (err) => { reject(err); });

			if (options.method === METHOD.POST) req.write(JSON.stringify(body));

			req.end();
		});

	}

};


module.exports = Api;

