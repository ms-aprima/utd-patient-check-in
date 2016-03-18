 angular.module('App')
 
.controller('FormCtrl', function($scope, FormService, FormService, $http) {
    console.log('formctrl');

  $http({method: 'GET', url: 'testList.json'}).success(function(data) { //Amy changed this to testList.json for correct formatting
        $scope.QuestionnaireList = [];
        angular.forEach(data, function(value, key) {
            $scope.QuestionnaireList.push(value);
            //$scope.test = $scope.QuestionnaireList[0].Questionnaire[0].Sections[0].Questions[0].Answers[0].SelectedAnswer;
            //console.log($scope.test);
        });
      });

  //Amy code for getting Questionnaire with one section
  $http({method: 'GET', url: 'testQuestOne.json'}).success(function(data) { 
    $scope.testQuestionnaire = data.Questionnaire;

  });

    $scope.questionnaireid;
    $scope.sectionid; 
    $scope.section_index = 0;

    /*$scope.answerID = [{id : '',
                    text: ''}]; */
    $scope.answerID = [];
    
    //$scope.sectionID = {id : ''};
    
    //Amy's test code for services (this will need to be moved to run at startup)
    //TODO: this is running twice...why?
    //TODO: move to run at startup
    $scope.getQuestionnaires = function()
    {
        // console.log('FormCtrl: questionnaires');
        FormService.getQuestionnaireList().then(function(result) {
            // console.log(result.data);
            angular.forEach(result.data, function(value, key) {
                $scope.QuestionnaireList.push(value); //for now this pushes onto the already populated list
            });
        });
    }

    //Kayla's code starts here
    //This method saves the questionnaireid of the questionnaire the user click on
    //and  
    $scope.goToForm = function(qid)
    {
        $scope.showForm = !$scope.showForm;
        $scope.questionnaireid = qid;
        console.log("Questionnaire id ", $scope.questionnaireid);
        //console.log("Form",$scope.showForm);
    };

    //gets the number of sections (needed for knowing which buttons to show)
    $scope.getLen = function () 
    {
        //Amy edit for new data format
        return $scope.testQuestionnaire.Sections.length;

        //Kayla's code that I've commented out for now.
        //return $scope.QuestionnaireList[0].Questionnaire[0].Sections.length;
    };

    //will go to next section of questions
    $scope.goToNext = function() 
    {
        $scope.section_index += 1;
    };

    //will go to previous section of questions
    $scope.goToPrevious = function() 
    {
        $scope.section_index -= 1;
    };

    //will go to review page
    $scope.goToReview = function() 
    {
        console.log("go to review for:" , $scope.questionnaireid);
    };

    console.log($scope.questionnaireid); 

    //gets the answer id of the chosen radio button. answer id is stored in array 
    //and method (with the answer id array at a certain index in the params) is called
    //to manipulate the json to say that that answer has been selected 
    $scope.getAnswerID = function(data,val, index)
    {
            $scope.answer_index = index;
            $scope.questionid = data;
            $scope.sectionid =  val; 
            console.log($scope.questionid);
            console.log($scope.answer_index); 
            $scope.answerID.push();
            console.log("answerID", $scope.answerID);
            $scope.selectedAnswer($scope.answerID[$scope.answer_index]);
       
    };

   //$scope.selectedAnswerChange = function(data,val) {
    
    /*$scope.questionid = data;
    $scope.sectionid =  val;    
    //console.log($scope);
    console.log($scope.questionid); */
    
    //goes through the questionnaire and finds  the section and question id that matches 
    //the section and question id of the answer that was chosen. Then we find the asnwerid 
    //that matches the answerid that sent in the params and set the "SelectedAnswer" as true
   $scope.selectedAnswer = function(ans) {

    $scope.tempAnswer = ans;

     $scope.section_length = $scope.QuestionnaireList[0].Questionnaire[0].Sections.length;
     $scope.question_length = 0;
     $scope.answers_length = 0;
     
     console.log("section id", $scope.sectionid);
     console.log("question id", $scope.questionid);
     
     console.log("How many sections",$scope.section_length);

      for(var i = 0; i < $scope.section_length; i++)
      {
        $scope.question_length = $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions.length;
        console.log("section length",$scope.section_length);
        if($scope.QuestionnaireList[0].Questionnaire[0].Sections[i].SurveySectionId == $scope.sectionid)
        {
            console.log("Which section Im on", $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].SectionNumber);
            for(var x = 0; x < $scope.question_length; x++)
            {
                //console.log("In Question for");
                $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].SurveyQuestionId;
                //console.log($scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].SurveyQuestionId);
                $scope.answers_length = $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers.length;
                //console.log($scope.answers_length);
                if($scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].SurveyQuestionId == $scope.questionid)
                {
                    console.log("Which question Im on",$scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].QuestionNumber);
                    for(var y = 0; y < $scope.answers_length; y++)
                    {
                       // console.log("In Answer for");
                        console.log($scope.answers_length);
                        $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SurveyAnswerId;

                        if($scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SurveyAnswerId == $scope.tempAnswer)
                        {
                            console.log("Which answer Im on:",$scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SurveyAnswerLabel);
                            console.log("Answers select:", $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SelectedAnswer);
                            $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SelectedAnswer = true;
                            console.log("Answers select:", $scope.QuestionnaireList[0].Questionnaire[0].Sections[i].Questions[x].Answers[y].SelectedAnswer);
                        } 
                        //console.log("Out Answer in");
                    
                    }

                }
                
                    //console.log("Out Question if");
                }
        }
        //console.log("Out Section if");

      }

     
    };
    //Kayla's code ends here

});
 




 /* var myForm = angular.module('App', []);

myForm.controller('FormCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.QuestionnaireList = [];
    $http.get('test.json').success(function(data) {
      $scope.QuestionnaireList = data;
      console.log($scope.QuestionnaireList);
    });
  }]); */
/*angular.module('App')

.controller('FormCtrl', function($scope, $state, FormService) {
    $scope.showForm = false;
    $scope.showReview = false;
    var patientId = 0;

    // Using the test service initially, will change to real service once
    // it's up.
   // $scope.questionnaireList = FormService.getTestQuestionnaireList(patientId);
   //$scope.question = {"questionnaireList" : [{"completed":false,"questionnaire": {"surveyName" : "Social History"}}]}

   $scope.test = [
    {"firstName1":"John", "lastName":"Doe"},
    {"firstName2":"Anna", "lastName":"Smith"},
    {"firstName3":"Peter", "lastName":"Jones"}
]
   

    console.log("hello");
    //$scope.questionnaireNames = [];

    var questionnaireMap = new Map();

    // This creates a mapping from a questionnaire name to its associated
    // RelSurveyPatientId
  /*  for (var i = 0; i < questionnaireList.length; i++) {
        var questionnaire = questionnaireList[i];
        questionnaireMap.set(questionnaire.QuestionnaireName, 
                            questionnaire.RelSurveyPatientId);
        $scope.questionnaireNames.push(questionnaire.QuestionnaireName);
    }
*/
    /*$scope.test = function() {

        console.log("hey wtf");
    } *//*
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
    };*/

//});