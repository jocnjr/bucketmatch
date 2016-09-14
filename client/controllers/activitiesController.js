angular
  .module('ActivitiesController', ['ngRoute', 'EventFactory', 'UserFactory'])
  .controller('ActivitiesController', activitiescontroller);

function activitiescontroller($scope, $location, EventFactory, UserFactory) {
  $scope.events = [];

  function loadActivities() {
    EventFactory.fetchActivities().then(response => {
      $scope.events = response.data;
    });
  }

  $scope.addNewDream = function () {
    console.log('addnewdream');
    $location.path('createnew')
  };

  $scope.addMeToEvent = function () {
    EventFactory.addUserToEvent(UserFactory.getUserId(), this.activity._id);
  };

  loadActivities();
}
