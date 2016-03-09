angular.module('Forms', ['ngMaterial'])

.controller('FormCtrl', function($scope, $state, FormService, patientId) {
    $scope.showForm = false;
    $scope.showReview = false;

    // Using the test service initially, will change to real service once
    // it's up.
    var questionnaireList = FormService.getTestQuestionnaireList(patientId);

    $scope.questionnaireNames = [];

    var questionnaireMap = new Map();

    // This creates a mapping from a questionnaire name to its associated
    // RelSurveyPatientId
    for (var i = 0; i < questionnaireList.length; i++) {
        var questionnaire = questionnaireList[i];
        questionnaireMap.set(questionnaire.QuestionnaireName, 
                            questionnaire.RelSurveyPatientId);
        $scope.questionnaireNames.push(questionnaire.QuestionnaireName);
    }

    $scope.getQuestionnaire = function(questionnaireName) {
        // Same as above, we're using the test service here for now.
        $scope.questionnaire = FormService.getTestQuestionnaire(patientId, 
            questionnaireMap[questionnaireName]);
    };

    var getQuestionnaireSections = function() {
        return $scope.questionnaire.Questionnaire.Sections;
    };

    $scope.questionnaireSections = getQuestionnaireSections();

    // I'm making the assumption that every questionnaire has at least one
    // section.
    $scope.hasNextSection = true;
    $scope.currentSectionNumber = 0;

    // I'm not sure what to return here if we're currently on the last section,
    // point of discussion.
    $scope.getNextSection = function() {
        if ($scope.hasNextSection) {
            var nextSection = 
                $scope.questionnaireSections[$scope.currentSectionNumber];

            $scope.currentSectionNumber = $scope.currentSectionNumber + 1;
            if ($scope.currentSectionNumber == $scope.questionnaireSections.length) {
                $scope.hasNextSection = false;
            }

            return nextSection;
        }
    };

    $scope.submitQuestionnaire = function(questionnaire) {
        FormService.submitQuestionnaire(questionnaire).then(function(msg){
            // Another point of discussion, I need some advice on where to go
            // after the confirmation.
            $state.go('inside.confirmation')
        }, function(errorMsg) {
            // I'm also unsure what to do when the questionnaire does not submit
            // because of an error. 
        });
    };

});