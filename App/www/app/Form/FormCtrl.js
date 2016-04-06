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
        $scope.sectionIndex += 1;
    };

    //will go to previous section of questions
    $scope.goToPrevious = function() 
    {
        $scope.sectionIndex -= 1;
    };

    //will go to review page
    $scope.goToReview = function() 
    {
        reviewForm();
    };

    $scope.clear = function() {
        $scope.showForm = false;
        $scope.questionnaire = null; 
    };

    var reviewForm = function() {
        //pass $scope.questionnaire to the FormService, then go to review page
        FormService.saveQuestionnaire($scope.questionnaire);
        $state.go('inside.review');
        
    }
});
