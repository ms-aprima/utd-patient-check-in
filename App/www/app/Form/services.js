angular.module('App')

.service('FormService', function($q, $http, API_BASEURI) {

  var getQuestionnaireList = function(patientId) {
      return $q(function(resolve, reject) {
        //endpoint defined here for Get Assigned Questionnaires By Patient Id
      	var endpoint = "patient/v1/patients/" + patientId + "/questionnaires-assigned/";
        $http.get(API_BASEURI.url + endpoint).then(function(result) {
          if (result.data.success) {
            //need to return full json, so just resolve(result.data) ??
            resolve(result.data);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };
  
  var getQuestionnaire = function(patientId, relSurveyPatientId) {
    return $q(function(resolve, reject) {
      //endpoint defined for Get Patient Questionnaire
    	var endpoint = "patient/v1/patients/" + patientId + "/questionnaire/" + relSurveyPatientId +"/";
      $http.get(API_BASEURI.url + endpoint).then(function(result) {
        if (result.data.success) {
          //need to return full json, so just resolve(result.data) ??
          resolve(result.data);
        } else {
          reject(result.data);
        }
      });
    });
  };
  
  var submitQuestionnaire = function(questionnaire) {
    return $q(function(resolve, reject) {
      //endpoint defined here for Put Patient Questionnaire
    	var endpoint = "patient/v1/patients/" + patientId + "/questionnaire/" + relSurveyPatientId +"/";
      $http.put(API_BASEURI.url + endpoint, questionnaire).then(function(result) {
        if (result.data.success) {
          //need to return full json, so just resolve(result.data) ??
          resolve(result.data);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
}
