'use strict';
var gulp = require('gulp');
var senseGo = require('sense-go');
var path = require('path');

var userConfig = senseGo.loadYml( path.join(__dirname, 'sense-go.yml'));
senseGo.init( gulp, userConfig,  function (  ) {

	gulp.task( 'build', gulp.series(
		'clean:tmp',
		'copy:toTmp',
		'import',
		'less:each',
		'replace:tmp',
		'jsonlint:tmp',
		'htmlmin:tmp',
		'clean:buildRelease',
		'copy:tmpToRelease',
		'clean:tmp'
	) );

});
