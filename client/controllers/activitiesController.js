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

  $scope.goToNewDream = function () {
    console.log('goToNewDream');
    $location.path('createnew')
  };

  $scope.createNewActivity = function (actname, actdesc) {
    console.log('createNewActivity', this.actname, this.actdesc);
    EventFactory.newActivity(UserFactory.getUserId(), this.actname, this.actdesc).then((res) => {
      $location.path('profile');
    });

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
