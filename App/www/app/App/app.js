angular.module('App', ['ionic','ngMaterial'])

.config(function($stateProvider, $urlRouterProvider,$mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .dark();


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
    abstract: true,
    templateUrl: 'app/Form/forms.html'
  })
  .state('inside.form', {
    url: '/form',
    templateUrl: 'app/Form/forms.html',
  })
  .state('inside.confirmation', {
    url: '/confirm',
    templateUrl: 'app/Confirmation/confirmation.html',
  })
  .state('inside.review', {
    url: '/form/review',
    templateUrl: 'app/Review/review.html',
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
