'use strict';

module.exports.prepareHeaders = prepareHeaders;

/** @ignore */
const crypto = require('crypto');

/**
* Prepare the request header object with metadata and signatures
* @access private
* @param {Object} apiKey - The apiKey to be used to sign the call
* @param {string} method - One of the Api.METHOD verbs
* @param {string} path - the url of the API endpoint
* @param {Object} request - the request object
* @return {Object}
*/
function prepareHeaders(apiKey, method, path, request) {

	const CONTENT_SEPARATOR = '|';

	const SIGNING_ALGORITHM = 'MMOS1-HMAC-SHA256';

	const nonce = Math.floor((Math.random() * new Date().getTime()) + 1);
	let signingKey;
	let signature;
	const timestamp = new Date().getTime();
	const contentParts = [];
	const body = request.data || {};
	let content;

	contentParts.push(SIGNING_ALGORITHM);
	contentParts.push(apiKey.key);
	contentParts.push(timestamp);
	contentParts.push(nonce);
	contentParts.push(method);
	contentParts.push(path);

	contentParts.push(JSON.stringify(body));

	content = contentParts.join(CONTENT_SEPARATOR);

	signingKey = crypto.createHmac('sha256', String(timestamp)).update(apiKey.secret).digest('hex');
	signature = crypto.createHmac('sha256', signingKey).update(content).digest('hex');


	return {
		'Content-Type': 'application/json',
		'X-MMOS-Algorithm': SIGNING_ALGORITHM,
		'X-MMOS-Credential': apiKey.key,
		'X-MMOS-Timestamp': timestamp,
		'X-MMOS-Nonce': nonce,
		'X-MMOS-Signature': signature
	};

};

