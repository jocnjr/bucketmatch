angular
  .module('NavBar', [])
  .directive('navBar', function() {
  return {
      restrict: 'AE',
      templateUrl: './partials/navbar.html'
  };
});
