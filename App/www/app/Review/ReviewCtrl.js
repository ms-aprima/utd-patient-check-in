angular.module('App')
 
.controller('ReviewCtrl', function($scope, FormService, ReviewService, $http, $state) {
	$scope.sections = [];
	$scope.questions = [];
	$scope.answers = [];
	$scope.questionnaire = FormService.questionnaire();
	console.log($scope.questionnaire);


   $scope.lenn = $scope.questionnaire.Questionnaire.Sections.length;

    for (var i = 0;  i < $scope.lenn; i++) {
    		$scope.sections.push($scope.questionnaire.Questionnaire.Sections[i].SurveySectionName);
    		$scope.lenn2 = $scope.questionnaire.Questionnaire.Sections[i].Questions.length;


			for (var j = 0; j < $scope.lenn2; j++) {	 
		    	$scope.questions.push($scope.questionnaire.Questionnaire.Sections[i].Questions[j].SurveyQuestionLabel);
		    	$scope.answers.push($scope.questionnaire.Questionnaire.Sections[i].Questions[j].SelectedAnswerText);


			}

	 	}
	 	console.log($scope.answers);
	 	console.log($scope.questions);

/*
	 	for(var i = 0; i< 5; i++)
	 	{
	 		console.log(i);
	 		for(var j=0; j<4 ; j++){
	 			console.log(j);
	 		}
	 	}

	*/

	//$scope.submit = function() {
		console.log("submit in reviewctrl");
		//submitForm();
	//}

	var submitForm = function() {
		ReviewService.submitQuestionnaire($scope.questionnaire).then(function(result) {
		    // TODO: reroute to form list
		    console.log("submitted");
		   // $state.go('inside.form');
		});
	};

});