/**
 * UserFactory
 *
 * Keeps track of information about the currently logged in user
 * Provides methods for getting user info from server and posting
 * to server to create new user
 *
 */

angular
  .module('UserFactory', [])
  .factory('UserFactory', UserFactory)

function UserFactory($http) {
  let userData = [];
  let user = '';
  let password = '';
  let error = '';

  userData.fetch = function () {
    return $http.get('http://localhost:3000/user/' + user + '/' + password);
  };

  userData.updateUser = function (person, pass) {
    user = person;
    password = pass;
  };

  userData.error = function (data) {
    $scope.error = data;
  };

  userData.createNew = function (data) {
    return $http.post(ADDURL + data); //TODO: Correct the URL for this post request
  }
  return userData;
}
