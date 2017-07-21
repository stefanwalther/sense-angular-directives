/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.0
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define(["jquery","qvangular","text!./eui-simple-table.ng.html","text!./eui-simple-table.css"],function($,qvangular,ngTemplate,cssContent){"use strict";function addStyleToHeader(cssContent,id){id&&"string"==typeof id?$("#"+id).length||$("<style>").attr("id",id).html(cssContent).appendTo("head"):$("<style>").html(cssContent).appendTo("head")}addStyleToHeader(cssContent,"eui-simple-table"),qvangular.directive("euiSimpleTable",[function(){return{restrict:"EA",scope:{hyperCube:"="},template:ngTemplate,link:function($scope){}}}])});