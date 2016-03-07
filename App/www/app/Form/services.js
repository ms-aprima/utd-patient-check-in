angular.module('App')

.service('FormService', function($q, $http, API_BASEURI, QUESTIONNAIRE_LIST, QUESTIONNAIRE_SECTION) {

  //test functions are used for getting json objects that are hard coded here and are not dependent on API calls

  //call this for getting a json object with list of questionnaires
  var getTestQuestionnaireList = function(patientId) {
      return QUESTIONNAIRE_LIST;
  };


//call this object to get ONE section of a questionnaire back
  var getTestQuestionnaire = function(patientId, relSurveyPatientId) {
    return QUESTIONNAIRE_SECTION;
  };

  var getQuestionnaireList = function(patientId) {
      return $q(function(resolve, reject) {
        //endpoint defined here for Get Assigned Questionnaires By Patient Id
      	var endpoint = "patient/v1/patients/" + patientId + "/questionnaires-assigned/";
        $http.get(API_BASEURI.url + endpoint).then(function(result) {
          if (result.data.success) {
            //need to return full json, so is it just resolve(result.data) ??
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
