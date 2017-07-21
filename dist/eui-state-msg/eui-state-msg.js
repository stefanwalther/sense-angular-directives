/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.4.2
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define([
  'qvangular',
  'text!./eui-state-msg.ng.html'
], function (qvangular, ngTemplate) {
  'use strict';

	/**
	 * Directive to show a temporary message.
	 *
	 * @prop {String] messageTitle The message title to display.
	 * @prop {String} message The message to display.
	 * @prop [
	 *
	 */
  var component = {
    restrict: 'A',
    replace: false,
    template: ngTemplate,
    scope: {
      messageTitle: '@',
      message: '@',
      state: '@'
    },
    controller: ['$scope', function (/* $scope */) {
    }],
    link: function (/* scope, elem, attrs */) {
      // Console.log(scope);
    }
  };

  qvangular.directive('euiStateMsg', function () {
    return component;
  });

  return component;

});
