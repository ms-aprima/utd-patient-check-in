angular.module('App')
 
.controller('ReviewCtrl', function($scope, FormService, ReviewService, $http, $state) {
	$scope.sectionsArr = [];
	$scope.questionnaire = FormService.questionnaire();
	console.log($scope.questionnaire);


   $scope.lenn = $scope.questionnaire.Questionnaire.Sections.length;

    for (var i = 0, len = $scope.lenn; i < len; i++) {
    	$scope.sectionsArr.push($scope.questionnaire.Questionnaire.Sections[i].SurveySectionName);
	}


	

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