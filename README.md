[Site](http://mmos.ch/) |
[Docs](https://github.com/MassivelyMultiplayerOnlineScience/mmos-sdk-js/tree/master/doc/) |
[Developer Portal](https://devportal.mmos.ch/) |
[Twitter](https://twitter.com/the_mmos) |

# MMOS SDK - Javascript edition

The MMOS SDK gives easy access to the MMOS API by providing an abstraction layer and encapsulating the authentication modules.

## Installation

Using npm:
```shell
$ npm i mmos-sdk-js
```
Note: add --save if you are using npm < 5.0.0

## Usage

In Node.js:
```js
const config = {
		game: 'game code',
		apiKey: {
			key: 'your key',
			secret: 'your secret'
		},
		host: 'api.depo.mmos.blue'
};
const Api = require('mmos-sdk-js');
const api = new Api(config);

const response = await api.info();
```

## Documentation

API blueprint is available in compiled [html](doc/blueprint/mmos-api-public.html) and [apib](doc/blueprint/mmos-api-public.apib) format.

ESDoc can also be generated by running the appropriate npm script:

```shell
$ npm install
$ npm run doc:source
```


## Running automated tests

Presently the MMOS SDK automated tests use the MMOS Developer Portal. The MMOS Developer Portal helps developers understand how the MMOS API works through a set of publicly available test projects. Registration is publicly available at (https://devportal.mmos.ch/).

In order to run the tests, first you'll need to creare an account on the MMOS Developer Portal. Please note that the test rely on specific projects to be avaliable for the game, which is presently the Exoplanet research project by the University of Geneva. So first you'll need to add the Unige Exoplanet project to your available projects on the Developer Portal.

Please note that this may change in the future and thus you may need to update to the latest version of the SDK and follow the up-to-date instructions to be able to run the automated tests.

Once the account is created, there are three environment variables that need to be set in order to be able to run the tests:
* MMOS_SDK_TEST_API_KEY - The MMOS API Key
* MMOS_SDK_TEST_API_SECRET - The MMOS API Secret
* MMOS_SDK_TEST_GAME - The game id that is generated from your email address
* MMOS_SDK_API_HOST - Api host URL
Windows example:
```bat
$ SET MMOS_SDK_TEST_API_KEY=apiKey
$ SET MMOS_SDK_TEST_API_SECRET=secret
$ SET MMOS_SDK_TEST_GAME=my-game
$ SET MMOS_SDK_API_HOST=api.depo.mmos.blue
$ npm run test:v2
```

Linux example:
```shell
$ export MMOS_SDK_TEST_API_KEY=apiKey
$ export MMOS_SDK_TEST_API_SECRET=secret
$ export MMOS_SDK_TEST_GAME=my-game
$ export MMOS_SDK_API_HOST=api.depo.mmos.blue
$ npm run test:v2
```

After setting the following environment variables you can run the `npm run test` command to run the automated tests

## Authentication

Please see the [authentication docs](doc/authentication/api-hmac-authentication.md) for details.

## Acknowledgments

The GAPARS project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement Nr 732703

![EU flag](https://github.com/MassivelyMultiplayerOnlineScience/mmos-sdk-js/raw/master/doc/logo/eu.jpg)
