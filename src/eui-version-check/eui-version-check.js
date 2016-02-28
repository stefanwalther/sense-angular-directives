/*global define*/
define( [
	'qvangular',
	'!text./eui-version-check.ng.html'
], function ( qvangular,
			  ngTemplate ) {
	'use strict';

	var component = {
		restrict: 'A',
		replace: false,
		template: ngTemplate,
		scope: true,
		controller: ['$scope', function ( $scope ) {
			$scope.showWarning = false;
		}],
		link: function ( scope, elem, attrs ) {

		}
	};

	qvangular.directive( "euiVersionCheck", function () {
		return component;
	} );

	return component;

} );
