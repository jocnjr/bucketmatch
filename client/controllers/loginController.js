/**
 * LoginController
 * Controller for '/' route, 'login.html' template
 */

angular
  .module('LoginController', ['ngRoute', 'UserFactory'])
  .controller('LoginController', LoginController)

function LoginController($location, $scope, $http, UserFactory) {
  $scope.error = UserFactory.error;

  $scope.login = function() {
    UserFactory.updateUser($scope.username, $scope.password);
    UserFactory.fetch().then(response => {
      // If login info soes not match a user in the database,
      // show the error message and stay on this page.
      if (response.data === '') {
        $scope.error = 'Sorry incorrect username or password.  Please try again'
        $scope.username = '';
        $scope.password = '';
        return;
      }

      $location.path('profile');
    });
  };

  $scope.newUser = function() {
    UserFactory.createNew(this.NewUsername, this.NewPassword).then((res) => {
      console.log("received response");
      UserFactory.updateUser(this.NewUsername, this.NewPassword);
      $location.path('profile');
    });
  };
}
