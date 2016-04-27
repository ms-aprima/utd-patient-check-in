angular.module('App')
 
.controller('ReviewCtrl', function($scope, FormService, ReviewService, $http, $state, $mdToast) {
	$scope.sections = [];
	$scope.questions = [];
	$scope.answers = [];
	$scope.questionnaire = FormService.questionnaire();
	var selectedSection = '';
	$scope.saving = false;
	var oldQuestionnaire = '';

	//when header is clicked, call this function to store the section that is stored, and then toggle expand bool value
	$scope.expand = function(section)
	{
		selectedSection = section;
		section.expand = !section.expand;
	}

	$scope.hide = function(section)
	{
		selectedSection = section;
		section.expand = false;
	}

	//this is used for determining whether or not to show more than just the header
	$scope.isClicked = function(s)
	{
		//make sure that expand function has been called at least once (aka one of the sections has been clicked)
		if(selectedSection != '')
		{
			//if section selected and the section in the list are not the same, don't expand, else use the toggled expand value
			if (s.SurveySectionId != selectedSection.SurveySectionId)
			{
				s.expand = false;
			}
		}
		return s.expand;
	}

	$scope.edit = function(section)
	{
		//save initial value of questionnaire in case edits are canceled
		oldQuestionnaire = JSON.parse(JSON.stringify($scope.questionnaire));
		section.viewHidden = true;
		section.edit = true;
		//need to hide section.show and show section.edit
	}

	$scope.saveEdits = function(section)
	{
		oldQuestionnaire = '';
		section.edit = false;
		section.viewHidden = false;
	}

	$scope.cancelEdit = function(section)
	{
		$scope.questionnaire = oldQuestionnaire;
		section.edit = false;
		section.viewHidden = false;
	}

	$scope.backToList = function()
	{
		$state.go('inside.form');
	}

	$scope.submit = function() {
		submitForm();
	}

	var submitForm = function() {
		$scope.saving = true;
		 ReviewService.submitQuestionnaire($scope.questionnaire).then(function(result) {
		    // TODO: reroute to form list
		    $mdToast.show($mdToast.simple().textContent('Thank you! Your Questionnaire was submitted.').theme('success-toast'));
		    $state.go('inside.form');
		 });
	};

});