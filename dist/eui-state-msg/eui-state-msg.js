/*global define*/
define( [
	'qvangular'
], function ( qvangular ) {
	'use strict';

	var component = {
		restrict: 'A',
		replace: false,
		template: ngTemplate,
		scope: {
			message: '@'
		},
		controller: ['$scope', function ( $scope ) {
		}],
		link: function ( scope, elem, attrs ) {
			console.log(scope);
		}
	};

	qvangular.directive( "euiEditMsg", function () {
		return component;
	} );

	return component;

} );
