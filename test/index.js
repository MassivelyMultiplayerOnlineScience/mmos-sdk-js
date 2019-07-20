/*global before, after*/
'use strict';

require('should');
require('app-module-path').addPath(process.cwd());

before(() => { console.log('**** TESTS START ****'); });

after(() => { console.log('**** TESTS FINISHED ****'); });
