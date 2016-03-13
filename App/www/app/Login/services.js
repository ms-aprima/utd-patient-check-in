angular.module('App')

.service('AuthService', function($q, $http, API_BASEURI) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;
  var patientID = '';

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function setPatientID(id)
  {
    patientID = id;
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    //change this when you test with postman
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
//need to inject rootScope/or constant to get access to it 
  var login = function(user, LOGIN_ENDPOINT) {
    return $q(function(resolve, reject) {
      $http.post(API_BASEURI.url,user,{
    headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313' }}).then(function(result) {
        if (result.data) {
            storeUserCredentials(result.data.JsonWebToken);
            setPatientID(result.data.Id);
          resolve(result.data.IsPatient);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    patientID: function() { return patientID; }
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        400: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
