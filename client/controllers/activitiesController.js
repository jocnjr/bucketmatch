angular
  .module('ActivitiesController', ['ngRoute', 'EventFactory', 'UserFactory'])
  .controller('ActivitiesController', activitiescontroller);

function activitiescontroller($scope, $location, EventFactory, UserFactory) {
  $scope.events = [];

  function loadActivities() {
    EventFactory.fetchActivities().then((data) => {
      $scope.events = data.data;
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
    EventFactory.addUserToEvent({ "activityId": this.activity._id });
  };
  loadActivities();
}
