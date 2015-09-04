/*global define*/
define( [
	'qvangular',
	'./eui-button.ng.html'
], function ( qvangular,
			  ngTemplate ) {
	'use strict';

	var component = {
		restrict: 'E',
		replace: true,
		template: ngTemplate,
		scope: {
			close: '&',
			closable: '=',
			visible: '='
		},
		controller: ['$scope', '$attrs', function ( scope, attrs ) {
		}]
	};

	qvangular.directive( "euiButton", function () {
		return component;
	} );

	return component;

} );
