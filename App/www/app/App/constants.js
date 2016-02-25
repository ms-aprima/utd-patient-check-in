angular.module('App')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
	//{{BaseUri}}/Login
 	url: 'https://echo.getpostman.com/post'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});
