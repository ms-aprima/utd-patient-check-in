angular.module('App')

.service('FormService', function($q, $http, AuthService, API_BASEURI) {

//makes GET call to Aprima API and returns list of Patient's Questionnaires
var getQuestionnaireList = function()
{
  //call to AuthService to get stored patient ID
  patientId = AuthService.patientID();
  //endpoint defined here for Get Assigned Questionnaires By Patient Id
  var endpoint = "patients/" + patientId + "/questionnaires-assigned";
  return $http.get(API_BASEURI.url + endpoint, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
}

  //TODO: get functioning
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
  //TODO: get functioning
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

return {
    getQuestionnaireList: getQuestionnaireList,
    getQuestionnaire: getQuestionnaire,
    submitQuestionnaire: submitQuestionnaire
  };
})