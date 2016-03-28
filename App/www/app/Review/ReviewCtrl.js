angular.module('App')
 
.controller('ReviewCtrl', function($scope, FormService, ReviewService, $http, $state) {
	$scope.questionnaire = FormService.questionnaire();
	console.log($scope.questionnaire);

	$scope.submit = function() {
		console.log("submit in reviewctrl");
		submitForm();
	}

	var submitForm = function() {
		ReviewService.submitQuestionnaire($scope.questionnaire).then(function(result) {
		    // TODO: reroute to form list
		    $state.go('inside.form');
		});
	};

});