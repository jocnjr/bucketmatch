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
    let reqBody = {};
    reqBody.actname = this.actname;
    reqBody.actdesc = this.actdesc;
    EventFactory.newActivity(reqBody);
    // $location.path('profile')
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
