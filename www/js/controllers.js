angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

   
     $http.get("http://jsonplaceholder.typicode.com/photos/5")
      .then(function(response){
       $scope.albumId = response.data.albumId;
       $scope.id = response.data.id;
       $scope.title = response.data.title;
       $scope.url = response.data.url;
       $scope.thumbnailUrl = response.data.thumbnailUrl;
   });
     $http.get("http://jsonplaceholder.typicode.com/posts/1")
      .then(function(response){
       $scope.userId1 = response.data.userId;
       $scope.id1 = response.data.id;
       $scope.title1 = response.data.title;
       $scope.body1 = response.data.body;
   });

      $http.get("http://jsonplaceholder.typicode.com/users/1")
      .then(function(response){
       $scope.usrID = response.data.id;
       $scope.usrName = response.data.name;
       $scope.usrUserName = response.data.username;
       $scope.usrEmail = response.data.email;
       $scope.usrStreet = response.data.address.street;
       $scope.usrSuite = response.data.address.suite;
       $scope.usrCity = response.data.address.city;
       $scope.usrZipcode = response.data.address.zipcode;
       $scope.usrLat = response.data.address.geo.lat;
       $scope.usrLng = response.data.address.geo.lng;
       $scope.usrPhone = response.data.phone;
       $scope.usrSite = response.data.website;
       $scope.usrCompanyName = response.data.company.name;
       $scope.usrCompanyPhrase = response.data.company.catchPhrase;
       $scope.usrCompanyBS = response.data.company.bs;

   });

/*

  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"*/

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
