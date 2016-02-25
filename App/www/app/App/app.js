angular.module('App', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'app/Login/outside.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: 'app/Login/login.html',
    controller: 'LoginCtrl'
  })
  .state('inside', {
    url: '/inside',
    templateUrl: 'app/Confirmation/confirmation.html',
  })

  $urlRouterProvider.otherwise('/outside/login');
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });
});
