'use strict';

module.exports = {
	host: process.env.MMOS_SDK_API_HOST,
	apiKey: process.env.MMOS_SDK_TEST_API_KEY,
	apiSecret: process.env.MMOS_SDK_TEST_API_SECRET,
	game: process.env.MMOS_SDK_TEST_GAME,
	test: {
		project: 'unige-exoplanet',
		circumstances: { t: 1000 },
		player: 'testPlayer',
		playerGroup: 'playergroup',
		result: {
			'transits': [{
				'epoch': 2454132.32909,
				'period': 4.29507,
				'transitMarkers': [54137.336412, 54141.631482, 54145.926552]
			}, {
				'epoch': 2454132.32909,
				'period': 4.29507,
				'transitMarkers': [54152.221622]
			}],
			'stellarActivity': [100]
		}
	}
};