/**
 * Keeps track of the information for the activity that we are currently viewing
 */

angular
  .module('EventFactory', [])
  .factory('EventFactory', EventFactory)

function EventFactory($http, $location) {
  let obj = {};
  let event = '';
  let user = ''; // Question: Why is there a user here? Where is this being used?
  let matchAct;

  obj.updateEvent = function (data) {
    event = data;
    $location.path('activities');
  };

  obj.updateUser = function (data) {
    user = data;
  };

  obj.fetchMatches = function () {
    return $http.get('http://localhost:3000/useractivity/findbyact/' + event);
  };

  obj.fetchActivities = function () {
    return $http.get('http://localhost:3000/activities');
  };

  obj.addUserToEvent = function (data) {
    data.userId = user;
    const dataArr = [data];
    return $http.post('http://localhost:3000/useractivity/add', JSON.stringify({ data: dataArr }));
  };
  return obj;
}
