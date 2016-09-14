angular
  .module('ActivitiesController', ['ngRoute', 'EventFactory', 'UserFactory'])
  .controller('ActivitiesController', activitiescontroller);

function activitiescontroller($scope, $location, EventFactory, UserFactory) {
  $scope.events = [];
  $scope.error = '';

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
    EventFactory.addUserToEvent(UserFactory.getUserId(), this.activity._id)
      .then(response => {
        console.log(response);
        if (response.data.error) $scope.error = response.data.error;
      });
  };

  loadActivities();
}
