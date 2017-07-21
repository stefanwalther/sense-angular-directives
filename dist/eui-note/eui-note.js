/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.0
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define(["qvangular","angular","text!./eui-note.ng.html"],function(qvangular,angular,ngTemplate){"use strict";var component={restrict:"E",replace:!1,template:ngTemplate,transclude:!0,scope:{close:"&",closable:"=",visible:"="},controller:["$scope","$attrs",function(scope,attrs){this.close=scope.close,attrs.closable||(attrs.closable=!0),scope.isVisible=!angular.isDefined(attrs.visible)||scope.$eval(attrs.visible)}]};return qvangular.directive("euiNote",function(){return component}),component});