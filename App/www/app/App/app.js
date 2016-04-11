angular.module('App', ['ionic','ngMaterial'])

.config(function($stateProvider, $urlRouterProvider,$mdThemingProvider) {

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
    templateUrl: ''
  })
  .state('inside.form', {
    url: '/form',
    templateUrl: 'app/Form/forms.html',
    //declare controller
    controller: 'FormCtrl'
  })
  .state('inside.review', {
    url: '/review',
    templateUrl: 'app/Review/review.html',
    controller: 'ReviewCtrl'
  })

  $urlRouterProvider.otherwise('/outside/login');

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '900', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
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
