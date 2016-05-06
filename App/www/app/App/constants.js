angular.module('App')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('LOGIN_ENDPOINT', {
  url: 'https://echo.getpostman.com/post'
})

.constant('API_BASEURI', {
	//{{BaseUri}}/Login
 	url: 'https://aprod-sbt2.servicebus.windows.net/7083c80b-29e2-4ee8-a485-3a3fdf373f58/api/patient/v1/'
 	//url: 'https://APRIMAURL.com'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})

