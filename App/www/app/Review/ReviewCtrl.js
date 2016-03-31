angular.module('App')
 
.controller('ReviewCtrl', function($scope, FormService, ReviewService, $http, $state) {
	$scope.sections = [];
	$scope.questions = [];
	$scope.answers = [];
	$scope.questionnaire = FormService.questionnaire();




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