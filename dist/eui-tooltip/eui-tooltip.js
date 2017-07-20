/*!

* sense-angular-directives - AngularJS directives ready to be used in Qlik Sense visualization extensions.
* --
* @version v0.3.1
* @link https://github.com/stefanwalther/sense-angular-directives
* @author Stefan Walther
* @license MIT
*/

/*
 1:1 port of angular-tooltips to be used in Qlik Sense extensions.

 Copyright (c) 2014 Filippo Oretti, Dario Andrei
 https://github.com/720kb/angular-tooltips
 The MIT License (MIT)
 */
/* global define */
define([
  'qvangular',
  'angular'
], function (qvangular,
             angular) {
  'use strict';

  qvangular.directive('euiTooltip', ['$window', '$compile', '$interpolate', '$interval',
    function ($window, $compile, $interpolate, $interval) {

      var TOOLTIP_SMALL_MARGIN = 8; // Px
      var TOOLTIP_MEDIUM_MARGIN = 9; // Px
      var TOOLTIP_LARGE_MARGIN = 10; // Px
      var POSITION_CHECK_INTERVAL = 20; // Ms
      var CSS_PREFIX = 'eui-tooltip-';
      var INTERPOLATE_START_SYM = $interpolate.startSymbol();
      var INTERPOLATE_END_SYM = $interpolate.endSymbol();

      return {
        restrict: 'A',
        scope: {},
        link: function ($scope, element, attr) {

          console.log('bla');

          var initialized = false;
          var thisElement = angular.element(element[0]);
          var body = angular.element($window.document.getElementsByTagName('body')[0]);
          var theTooltip;
          var theTooltipHeight;
          var theTooltipWidth;
          var theTooltipMargin; // Used both for margin top left right bottom
          var height;
          var width;
          var offsetTop;
          var offsetLeft;
          var positionInterval;
          var oldBoundingRect;
          var title = attr.tooltipTitle || attr.title || '';
          var tooltipScroll = attr.tooltipScroll || false;
          var content = attr.tooltipContent || '';
          var html = attr.tooltipHtml || '';
          var showTriggers = attr.tooltipShowTrigger || 'mouseover';
          var hideTriggers = attr.tooltipHideTrigger || 'mouseleave';
          var hideTarget = typeof attr.tooltipHideTarget !== 'undefined' && attr.tooltipHideTarget !== null ? attr.tooltipHideTarget : 'element';
          var originSide = attr.tooltipSide || 'top';
          var side = originSide;
          var size = attr.tooltipSize || 'medium';
          var tryPosition = typeof attr.tooltipTry !== 'undefined' && attr.tooltipTry !== null ? $scope.$eval(attr.tooltipTry) : true;
          var className = attr.tooltipClass || '';
          var speed = (attr.tooltipSpeed || 'medium').toLowerCase();
          var delay = attr.tooltipDelay || 0;
          var lazyMode = typeof attr.tooltipLazy !== 'undefined' && attr.tooltipLazy !== null ? $scope.$eval(attr.tooltipLazy) : true;
          var hasCloseButton = typeof attr.tooltipCloseButton !== 'undefined' && attr.tooltipCloseButton !== null;
          var closeButtonContent = attr.tooltipCloseButton || '';
          var htmlTemplate = '<div class="eui-tooltip ' + CSS_PREFIX + size + '">';

          if (hideTarget !== 'element' && hideTarget !== 'tooltip') {

            hideTarget = 'element';
          }
          if (hasCloseButton) {

            htmlTemplate = htmlTemplate + '<span class="' + CSS_PREFIX + 'close-button" ng-click="hideTooltip()"> ' + closeButtonContent + ' </span>';
          }
          if (attr.tooltipView) {
            if (attr.tooltipViewCtrl) {

              htmlTemplate = htmlTemplate + '<div ng-controller="' + attr.tooltipViewCtrl + '" ng-include="\'' + attr.tooltipView + '\'"></div>';
            } else {

              htmlTemplate = htmlTemplate + '<div ng-include="\'' + attr.tooltipView + '\'"></div>';
            }
          }

          htmlTemplate = htmlTemplate + '<div class="' + CSS_PREFIX + 'title"> ' + INTERPOLATE_START_SYM + 'title' + INTERPOLATE_END_SYM + '</div>' +
            INTERPOLATE_START_SYM + 'content' + INTERPOLATE_END_SYM + html + ' <span class="' + CSS_PREFIX + 'caret"></span>' +
            '</div>';

          $scope.title = title;
          $scope.content = content;
          $scope.html = html;
          // Parse the animation speed of tooltips
          $scope.parseSpeed = function () {

            switch (speed) {
              case 'fast':
                speed = 100;
                break;

              case 'medium':
                speed = 450;
                break;

              case 'slow':
                speed = 800;
                break;

              default:
                speed = Number(speed);
            }
          };
          // Create the tooltip
          theTooltip = $compile(htmlTemplate)($scope);

          theTooltip.addClass(className);

          body.append(theTooltip);

          $scope.isTooltipEmpty = function () {

            if (!$scope.title && !$scope.content && !$scope.html) {

              return true;
            }
          };

          $scope.initTooltip = function (tooltipSide) {
            if (!$scope.isTooltipEmpty()) { // eslint-disable-line no-negated-condition

              theTooltip.css('visibility', 'visible');

              height = thisElement[0].offsetHeight;
              width = thisElement[0].offsetWidth;

              // Get tooltip dimension
              theTooltipHeight = theTooltip[0].offsetHeight;
              theTooltipWidth = theTooltip[0].offsetWidth;

              $scope.parseSpeed();
              $scope.tooltipPositioning(tooltipSide);
            } else {
              theTooltip.css('visibility', 'hidden');
            }
          };

          $scope.getOffsets = function () {
            offsetTop = $scope.getOffsetTop(thisElement[0]);
            offsetLeft = $scope.getOffsetLeft(thisElement[0]);
          };

          $scope.getOffsetTop = function (elem) {

            var offtop = elem.getBoundingClientRect().top + $window.scrollY;
            // IE8 - 11 fix - window.scrollY is undefied, and offtop is NaN.
            if (isNaN(offtop)) {
              // Get the offset on old properties
              offtop = elem.getBoundingClientRect().top + $window.pageYOffset;
            }
            return offtop;
          };

          $scope.getOffsetLeft = function (elem) {

            var offleft = elem.getBoundingClientRect().left + $window.scrollX;
            // IE8 - 11 fix - window.scrollX is undefied, and offtop is NaN.
            if (isNaN(offleft)) {
              // Get the offset on old properties
              offleft = elem.getBoundingClientRect().left + $window.pageXOffset;
            }
            return offleft;
          };

          function onMouseEnterAndMouseOver() {
            console.log('onMouseEnterAndMouseOver');
            if (!lazyMode || !initialized) {

              initialized = true;
              $scope.initTooltip(side);
            }
            if (tryPosition) {

              $scope.tooltipTryPosition();
            }
            $scope.showTooltip();
          }

          function onMouseLeaveAndMouseOut() {
            $scope.hideTooltip();
          }

          $scope.bindShowTriggers = function () {
            thisElement.bind(showTriggers, onMouseEnterAndMouseOver);
          };

          $scope.bindHideTriggers = function () {
            if (hideTarget === 'tooltip') {

              theTooltip.bind(hideTriggers, onMouseLeaveAndMouseOut);
            } else {

              thisElement.bind(hideTriggers, onMouseLeaveAndMouseOut);
            }
          };

          $scope.clearTriggers = function () {
            thisElement.unbind(showTriggers, onMouseEnterAndMouseOver);
            thisElement.unbind(hideTriggers, onMouseLeaveAndMouseOut);
          };

          $scope.bindShowTriggers();

          $scope.showTooltip = function () {

            if (tooltipScroll) {
              oldBoundingRect = thisElement[0].getBoundingClientRect();
              positionInterval = $interval(function () {
                var newBoundingRect = thisElement[0].getBoundingClientRect();

                if (!angular.equals(oldBoundingRect, newBoundingRect)) {
                  $scope.tooltipPositioning(side);
                }

                oldBoundingRect = newBoundingRect;
              }, POSITION_CHECK_INTERVAL);
            }

            theTooltip.addClass(CSS_PREFIX + 'open');
            theTooltip.css('transition', 'opacity ' + speed + 'ms linear');

            if (delay) {

              theTooltip.css('transition-delay', delay + 'ms');
            }

            $scope.clearTriggers();
            $scope.bindHideTriggers();
          };

          $scope.hideTooltip = function () {

            theTooltip.css('transition', 'opacity ' + speed + 'ms linear, visibility 0s linear ' + speed + 'ms');
            theTooltip.removeClass(CSS_PREFIX + 'open');
            $scope.clearTriggers();
            $scope.bindShowTriggers();

            if (angular.isDefined($scope.positionInterval)) {
              $interval.cancel(positionInterval);
              positionInterval = undefined;
            }
          };

          $scope.removePosition = function () {

            theTooltip
              .removeClass(CSS_PREFIX + 'left')
              .removeClass(CSS_PREFIX + 'right')
              .removeClass(CSS_PREFIX + 'top')
              .removeClass(CSS_PREFIX + 'bottom ');
          };

          $scope.tooltipPositioning = function (tooltipSide) {

            $scope.removePosition();
            $scope.getOffsets();

            var topValue;
            var leftValue;

            if (size === 'small') {

              theTooltipMargin = TOOLTIP_SMALL_MARGIN;

            } else if (size === 'medium') {

              theTooltipMargin = TOOLTIP_MEDIUM_MARGIN;

            } else if (size === 'large') {

              theTooltipMargin = TOOLTIP_LARGE_MARGIN;
            }

            if (tooltipSide === 'left') {

              topValue = offsetTop + (height / 2) - (theTooltipHeight / 2);
              leftValue = offsetLeft - (theTooltipWidth + theTooltipMargin);

              theTooltip.css('top', topValue + 'px');
              theTooltip.css('left', leftValue + 'px');
              theTooltip.addClass(CSS_PREFIX + 'left');
            }

            if (tooltipSide === 'right') {

              topValue = offsetTop + (height / 2) - (theTooltipHeight / 2);
              leftValue = offsetLeft + width + theTooltipMargin;

              theTooltip.css('top', topValue + 'px');
              theTooltip.css('left', leftValue + 'px');
              theTooltip.addClass(CSS_PREFIX + 'right');
            }

            if (tooltipSide === 'top') {

              topValue = offsetTop - theTooltipMargin - theTooltipHeight;
              leftValue = offsetLeft + (width / 2) - (theTooltipWidth / 2);

              theTooltip.css('top', topValue + 'px');
              theTooltip.css('left', leftValue + 'px');
              theTooltip.addClass(CSS_PREFIX + 'top');
            }

            if (tooltipSide === 'bottom') {

              topValue = offsetTop + height + theTooltipMargin;
              leftValue = offsetLeft + (width / 2) - (theTooltipWidth / 2);
              theTooltip.css('top', topValue + 'px');
              theTooltip.css('left', leftValue + 'px');
              theTooltip.addClass(CSS_PREFIX + 'bottom');
            }
          };

          $scope.tooltipTryPosition = function () {

            var theTooltipH = theTooltip[0].offsetHeight;
            var theTooltipW = theTooltip[0].offsetWidth;
            var topOffset = theTooltip[0].offsetTop;
            var leftOffset = theTooltip[0].offsetLeft;
            var winWidth = $window.innerWidth;
            var winHeight = $window.innerHeight;
            var rightOffset = winWidth - (theTooltipW + leftOffset);
            var bottomOffset = winHeight - (theTooltipH + topOffset);
            // Element OFFSETS (not tooltip offsets)
            var elmHeight = thisElement[0].offsetHeight;
            var elmWidth = thisElement[0].offsetWidth;
            var elmOffsetLeft = thisElement[0].offsetLeft;
            var elmOffsetTop = thisElement[0].offsetTop;
            var elmOffsetRight = winWidth - (elmOffsetLeft + elmWidth);
            var elmOffsetBottom = winHeight - (elmHeight + elmOffsetTop); // eslint-disable-line no-unused-vars
            var offsets = {
              left: leftOffset,
              top: topOffset,
              bottom: bottomOffset,
              right: rightOffset
            };
            var posix = {
              left: elmOffsetLeft,
              right: elmOffsetRight,
              top: elmOffsetTop,
              // Todo: Check. we are missing something here
              bottom: elmOffsetBottomvar // eslint-disable-line no-undef
            };
            var bestPosition = Object.keys(posix).reduce(function (best, key) {

              return posix[best] > posix[key] ? best : key;
            });
            var worstOffset = Object.keys(offsets).reduce(function (worst, key) {

              return offsets[worst] < offsets[key] ? worst : key;
            });

            if (originSide !== bestPosition && offsets[worstOffset] < 20) {

              side = bestPosition;

              $scope.tooltipPositioning(side);
              $scope.initTooltip(bestPosition);
            }
          };

          function onResize() {
            $scope.hideTooltip();
            $scope.initTooltip(originSide);
          }

          angular.element($window).bind('resize', onResize);
          // Destroy the tooltip when the directive is destroyed
          // unbind all dom event handlers
          $scope.$on('$destroy', function () {

            angular.element($window).unbind('resize', onResize);
            $scope.clearTriggers();
            theTooltip.remove();
          });

          if (attr.tooltipTitle) {

            attr.$observe('tooltipTitle', function (val) {
              $scope.title = val;
              $scope.initTooltip(side);
            });
          }

          if (attr.title) {

            attr.$observe('title', function (val) {
              $scope.title = val;
              $scope.initTooltip(side);
            });
          }

          if (attr.tooltipContent) {

            attr.$observe('tooltipContent', function (val) {
              $scope.content = val;
              $scope.initTooltip(side);
            });
          }

          if (attr.tooltipHtml) {

            attr.$observe('tooltipHtml', function (val) {
              $scope.html = val;
              $scope.initTooltip(side);
            });
          }
        }
      };
    }]);
});
