/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.0
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define(["qvangular"],function(qvangular){"use strict";qvangular.directive("euiCollapse",function(){return{restrict:"EA",link:function(scope){scope.isCollapsed=!0,scope.toggleCollapse=function(){scope.isCollapsed=!scope.isCollapsed}}}})});