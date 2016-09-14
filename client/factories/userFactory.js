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
  let bioData = '';

  userData.fetch = function() {
    return $http.get('http://localhost:3000/user/' + user + '/' + password);
  };

  userData.updateUser = function(person, pass) {
    user = person;
    password = pass;
  };

  userData.updateBio = function(bio,user) {
    bioData = {'bio': bio, 'username':user}
    console.log(bioData)
    return $http.put('http://localhost:3000/useractivity/addbio', bioData);
  };

  userData.error = function(data) {
    $scope.error = data;
  };

  userData.createNew = function (username, password) {
    console.log('createNew data -> ' + username,password);
    let reqBody = {};
    reqBody.username = username;
    reqBody.password = password;
    return $http.post('http://localhost:3000/user/add', reqBody);
  }

  return userData;
}
