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
var getQuestionnaire = function(relSurveyPatientId) {
  //set relSurveyPatientId
  rsPatientId = relSurveyPatientId;
  //endpoint defined for Get Patient Questionnaire
  var endpoint = "patients/" + patientId + "/questionnaire/" + rsPatientId;
  return $http.get(API_BASEURI.url + endpoint, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
};
  
//TODO: get functioning
var submitQuestionnaire = function(questionnaire) {
  //endpoint defined here for Put Patient Questionnaire
	var endpoint = "patients/" + patientId + "/questionnaire/" + rsPatientId;
  return $http.put(API_BASEURI.url + endpoint, questionnaire, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
};

return {
    getQuestionnaireList: getQuestionnaireList,
    getQuestionnaire: getQuestionnaire,
    submitQuestionnaire: submitQuestionnaire
  };
})