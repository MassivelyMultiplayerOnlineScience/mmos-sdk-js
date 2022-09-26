'use strict';

/**
 * @desc Tasks related API calls
**/
class Tasks {

	/** @ignore */
	constructor(options) {
		/** @ignore */
		this.api = options.api;
	}

	/**
	* Calls get Tasks API public endpoint (GET /projects/{project}/tasks/{taskId}) which provides information on one Task
	* @param {Object} options
	* @param {string} options.id Task id
  * @param {string} options.project - Project code
	* @returns {Promise} of a task
	* @example
		await api.Taskss.get({
			id: 202132323,
			project: 'unige-exoplanet'
		});
	*/
	get(options) {
		return this.api.call({
			path: `projects/${options.project}/tasks/${options.id}`
		}, {}, [200, 404]);
	}

module.exports = Tasks;

