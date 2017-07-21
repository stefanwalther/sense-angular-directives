/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.0
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define(["qvangular","text!./eui-state-msg.ng.html"],function(qvangular,ngTemplate){"use strict";var component={restrict:"A",replace:!1,template:ngTemplate,scope:{messageTitle:"@",message:"@",state:"@"},controller:["$scope",function(){}],link:function(){}};return qvangular.directive("euiStateMsg",function(){return component}),component});