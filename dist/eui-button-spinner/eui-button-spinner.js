/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.3.1
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/* global define */
define([
  'qvangular'
], function (qvangular) {
  'use strict';

  qvangular.directive('euiButtonSpinner', function () {
    return {
      restrict: 'A',
      scope: {
        spinning: '=buttonSpinner',
        spinningIcon: '@?',
        buttonPrepend: '@?',
        buttonAppend: '@?'
      },
      transclude: true,
      template:
      '<span ng-if="!!buttonPrepend" ng-hide="spinning"><i class="{{ buttonPrepend }}"></i>&nbsp;</span>' +
      '<span ng-if="!!buttonPrepend" ng-show="spinning"><i class="{{ !!spinningIcon ? spinningIcon : \'fa fa-spinner fa-spin\' }}"></i>&nbsp;</span>' +
      '<ng-transclude></ng-transclude>' +
      '<span ng-if="!!buttonAppend" ng-hide="spinning">&nbsp;<i class="{{ buttonAppend }}"></i></span>' +
      '<span ng-if="!buttonPrepend" ng-show="spinning">&nbsp;<i class="{{ !!spinningIcon ? spinningIcon : \'fa fa-spinner fa-spin\' }}"></i></span>'
    };
  });
});
