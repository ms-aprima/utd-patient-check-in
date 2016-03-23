angular.module('App')

.service('FormService', function($q, $http, AuthService, API_BASEURI) {
var patientID = '';
var rsPatientID = '';

//makes GET call to Aprima API and returns list of Patient's Questionnaires
var getQuestionnaireList = function()
{
  //call to AuthService to get stored patient ID
  patientID = AuthService.patientID();
  //endpoint defined here for Get Assigned Questionnaires By Patient Id
  var endpoint = "patients/" + patientID + "/questionnaires-assigned";
  return $http.get(API_BASEURI.url + endpoint, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
}

  //TODO: get functioning
var getQuestionnaire = function(relSurveyPatientId) {
  //set relSurveyPatientId
  rsPatientID = relSurveyPatientId;
  //endpoint defined for Get Patient Questionnaire
  var endpoint = "patients/" + patientID + "/questionnaire/" + rsPatientID;
  return $http.get(API_BASEURI.url + endpoint, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
};
  
//TODO: get functioning
var submitQuestionnaire = function(questionnaire) {
  //endpoint defined here for Put Patient Questionnaire
	var endpoint = "patients/" + patientID + "/questionnaire/" + rsPatientID;
  return $http.put(API_BASEURI.url + endpoint, questionnaire, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
};

return {
    getQuestionnaireList: getQuestionnaireList,
    getQuestionnaire: getQuestionnaire,
    submitQuestionnaire: submitQuestionnaire,
    patientID: function() { return patientID; },
    rsPatientID: function() { return rsPatientID; }
  };
})