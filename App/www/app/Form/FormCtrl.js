 angular.module('App')
 
.controller('FormCtrl', function($scope, FormService, $http, $state) {
    $scope.QuestionnaireList = [];
    FormService.getQuestionnaireList().then(function(result) {
        angular.forEach(result.data, function(value, key) {
            $scope.QuestionnaireList.push(value);
        });
    });

    $scope.questionnaireId;
    $scope.currentSectionId; 
    $scope.sectionIndex = 0;
    $scope.questionnaire;
    $scope.answersMap = {};

    //Kayla's code starts here
    //This method saves the questionnaireId of the questionnaire the user click on
    //and  
    $scope.goToForm = function(qid)
    {
        $scope.showForm = !$scope.showForm;
        $scope.questionnaireId = qid;
        getQuestionnaire(qid);
    };

    var getQuestionnaire = function(qid) {
        FormService.getQuestionnaire(qid).then(function(result) {
                $scope.questionnaire = result.data;
        });
    };

    $scope.getLen = function() {
        return $scope.questionnaire.Questionnaire.Sections.length;
    };

    //will go to next section of questions
    $scope.goToNext = function() 
    {
        submitSection();
        $scope.sectionIndex += 1;
    };

    //will go to previous section of questions
    $scope.goToPrevious = function() 
    {
        submitSection();
        $scope.sectionIndex -= 1;
    };

    //will go to review page
    $scope.goToReview = function() 
    {
        submitSection();
        reviewForm();
    };

    var reviewForm = function() {
        //pass $scope.questionnaire to the FormService, then go to review page
        FormService.saveQuestionnaire($scope.questionnaire);
        $state.go('inside.review');
        
    }

    var submitSection = function() {
        angular.forEach($scope.questionnaire.Questionnaire.Sections, function(section, _){
            if (section.SurveycurrentSectionId == $scope.currentSectionId) {
                angular.forEach(section.Questions, function(question, _) {
                    var answerID = $scope.answersMap[question.SurveyQuestionId];
                    question.SelectedAnswerId = answerID;
                    angular.forEach(question.Answers, function(answer, _) {
                        if (answer.SurveyAnswerId == answerID) {
                            question.SelectedAnswerText = answer.SurveyAnswerLabel;
                            answer.SelectedAnswer = true;
                        } else {
                            answer.SelectedAnswer = false;
                        }
                    });
                });
            }
        });
    };

    // //This function will just give the FormService the questionnaire to save
    // var submitForm = function() {
    //     FormService.submitQuestionnaire($scope.questionnaire).then(function(result) {
    //         // TODO(@char): Direct to review page
    //     });
    // };
});
