angular
  .module('CustomDirectives', [])
  .directive('navBar', function() {
    return {
        restrict: 'AE',
        templateUrl: './partials/navbar.html'
    };
  });
