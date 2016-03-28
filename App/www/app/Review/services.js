angular.module('App')

.service('ReviewService', function($q, $http, FormService, API_BASEURI) {
var patientID = '';
var rsPatientID = '';


//makes PUT call to Aprima API to submit a completed Questionnaire
var submitQuestionnaire = function(questionnaire) {
  //call to FormService to get stored patient ID and relSurveyPatientID
  patientId = FormService.patientID();
  rsPatientID = FormService.rsPatientID();

  //endpoint defined here for Put Patient Questionnaire
	var endpoint = "patients/" + patientId + "/questionnaire/" + rsPatientID;
  return $http.put(API_BASEURI.url + endpoint, questionnaire, {headers: {'ApiKey' : 'C83BBF42-DA17-4F58-9AA0-68F417419313', 'Accept' : 'application/json' }});
};

return {
    submitQuestionnaire: submitQuestionnaire
  };
})