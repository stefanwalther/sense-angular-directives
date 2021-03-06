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
  'angular',
  'text!./eui-note.ng.html'
],
  function (qvangular,
            angular,
            ngTemplate) {
    'use strict';

    var component = {
      restrict: 'E',
      replace: false,
      template: ngTemplate,
      transclude: true,
      scope: {
        close: '&',
        closable: '=',
        visible: '='
      },
      controller: ['$scope', '$attrs', function (scope, attrs) {
        this.close = scope.close;
        if (!attrs.closable) {
          attrs.closable = true;
        }
        scope.isVisible = angular.isDefined(attrs.visible) ? scope.$eval(attrs.visible) : true;
      }]
    };

    /**
     * EuiNote directive
     * @restrict: E
     *
     *    @param {boolean=} closable Whether the close-icon should be shown or not. Defaults to false.
     *    @param {string=} close Expression to evaluate then the close-icon is activated.
     *
     * @example
     *
     * <eui-note class="myCustomClass" closable="true" close="close();">
     *     This is the alert message
     * </eui-note>
     */
    qvangular.directive('euiNote', function () {
      return component;
    });

    return component;

  });
