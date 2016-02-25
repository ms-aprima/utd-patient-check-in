angular.module('App')

.service('AuthService', function($q, $http, API_ENDPOINT) {

  var getQuestionnaireList = function(patientId) {
      return $q(function(resolve, reject) {
      	var endpoint = "patient/v1/patients/" + patientId + "/questionnaires-assigned/";
        $http.get(API_ENDPOINT.url + endpoint).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };
  
  var getQuestionnaire = function(patientId, relSurveyPatientId) {
    return $q(function(resolve, reject) {
    	var endpoint = "patient/v1/patients/" + patientId + "/questionnaire/" + relSurveyPatientId +"/";
      $http.get(API_ENDPOINT.url + endpoint).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
  
  var submitQuestionnaire = function(questionnaire) {
    return $q(function(resolve, reject) {
    	var endpoint = "patient/v1/patients/" + patientId + "/questionnaire/" + relSurveyPatientId +"/";
      $http.put(API_ENDPOINT.url + endpoint, questionnaire).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
}
