angular.module('App')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('LOGIN_ENDPOINT', {
  url: 'https://echo.getpostman.com/post'
})

//amy we will have multiple api endpoints for the different services so our naming needs to be more clear
// not going to put constants for all of the endpoints here because ids will need to be added within the strings - amy
.constant('API_BASEURI', {
	//{{BaseUri}}/Login
 	url: 'https://echo.getpostman.com/post'
 	//url: 'https://APRIMAURL.com'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});

