angular.module('App')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    Username: '',
    Password: ''
  };
  $scope.useLocal = false;

  $scope.login = function() {
    if ($scope.useLocal)
    {
      AuthService.useLocal();
     $state.go('inside.form');
    }
    else{
    AuthService.login($scope.user).then(function(msg) {
     // $state.go('inside');
     //this is where the state is re routed to non existent form
     console.log($state.get());
     $state.go('inside.form');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  }
  };
})

//won't need these  but will leave them for now
.controller('InsideCtrl', function($scope, AuthService, API_BASEURI, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

/*
  $scope.getInfo = function() {
    $http.get(API_BASEURI.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };
*/
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
});

