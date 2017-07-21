/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.0
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define(["qvangular","!text./eui-version-check.ng.html"],function(qvangular,ngTemplate){"use strict";var component={restrict:"A",replace:!1,template:ngTemplate,scope:!0,controller:["$scope",function($scope){$scope.showWarning=!1}],link:function(){}};return qvangular.directive("euiVersionCheck",function(){return component}),component});