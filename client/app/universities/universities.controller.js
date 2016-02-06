'use strict';

var errorHandler;

angular.module('appingApp')
  .controller('UniversitiesCtrl',['$scope','$state','Universities','Auth', function ($scope,$state,Universities, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.universities = Universities.query();

    $scope.sorter = "[deadline,program]";
    $scope.hideFinished = false;
    $scope.finishText = "Hide finished applications";

    $scope.finishToggler = function(value){
      if($scope.hideFinished){
        $scope.finishText = "Hide finished applications";
        $scope.hideFinished = false;
      }
      else{
        $scope.finishText = "Show finished applications";
        $scope.hideFinished = true;
      }
    }

    $scope.closeApplication = function(index){
      var i;
      for(i=0;i<$scope.universities.length;i++){
        if($scope.universities[i]._id==index){
          break;
        }
      }
      $scope.universities[i].finished=true;

      //Now send the request to change this
      Universities.update({id: $scope.universities[i]._id}, $scope.universities[i], function success(value /*, responseHeaders*/){
        $state.go($state.current, {}, {reload: true});
        //console.log($scope.university);
      }, errorHandler($scope));
    };

    $scope.openApplication = function(index){
      var i;
      for(i=0;i<$scope.universities.length;i++){
        if($scope.universities[i]._id==index){
          break;
        }
      }
      $scope.universities[i].finished=false;

      //Now send the request to change this
      Universities.update({id: $scope.universities[i]._id}, $scope.universities[i], function success(value /*, responseHeaders*/){
        $state.go($state.current, {}, {reload: true});
        //console.log($scope.university);
      }, errorHandler($scope));
    };

  }])


  .controller('UniversitiesViewCtrl',['$scope','$state','$stateParams','$window','Universities','Scores', function ($scope, $state, $stateParams, $window, Universities,Scores) {
    $scope.university = Universities.get({id: $stateParams.id});

    var sc = Scores.query(function(){
      $scope.scores = sc[0];
    });

    $scope.deleteUniversity = function(){
      if($window.confirm("Are you sure you want to delete this university")){
        console.log("Delete");
        Universities.delete({id: $scope.university._id}, function success(/* value, responseHeaders */) {
          $state.go('universities');
        }, errorHandler($scope));
      }
    };

    $scope.closeApplication = function(index){
      $scope.university.finished=true;

      //Now send the request to change this
      Universities.update({id: $scope.university._id}, $scope.university, function success(value /*, responseHeaders*/){
        $state.go('universities');
        //console.log($scope.university);
      }, errorHandler($scope));
    };

    $scope.openApplication = function(index){
      $scope.university.finished=false;

      //Now send the request to change this
      Universities.update({id: $scope.university._id}, $scope.university, function success(value /*, responseHeaders*/){
        $state.go($state.current, {}, {reload: true});
        //console.log($scope.university);
      }, errorHandler($scope));
    };


  }])


  .controller('UniversitiesNewCtrl',['$scope','$stateParams','$state','$window','Universities','Currency', 'Documents','Auth', function ($scope,$stateParams,$state,$window,Universities,Currency,Documents,Auth) {
    
    //Initialize
    $scope.university = {};
    $scope.university.exam = {};
    $scope.university.exam.gre = {};
    $scope.university.exam.toefl = {};
    $scope.university.exam.ielts = {};
    $scope.university.exam.tse = {};
    $scope.university.exam.gre = {};
    $scope.university.exam.gre_subject = {};
    $scope.university.exam.gmat = {};
    $scope.university.exam.lsat = {};
    $scope.university.exam.usmle = {};
    $scope.university.exam.ggfns = {};
    $scope.university.exam.sat1 = {};
    $scope.university.exam.sat2 = {};
    $scope.university.exam.gre.present = false;
    $scope.university.exam.toefl.present = false;
    $scope.university.exam.ielts.present = false;
    $scope.university.exam.tse.present = false;
    $scope.university.exam.gre.present = false;
    $scope.university.exam.gre_subject.present = false;
    $scope.university.exam.gmat.present = false;
    $scope.university.exam.lsat.present = false;
    $scope.university.exam.usmle.present = false;
    $scope.university.exam.ggfns.present = false;
    $scope.university.exam.sat1.present = false;
    $scope.university.exam.sat2.present = false;
    $scope.university.finished=false;


    $scope.popup1 = {
      opened: false
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.currency = Currency;

    $scope.documents = Documents;

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.curDocument = "";

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    //Adds a new university
    $scope.addUniversity = function(){
      $scope.university.user_id = $scope.getCurrentUser()._id;
      console.log($scope.university.user_id);

    	Universities.save($scope.university, function success(value /*, responseHeaders*/){
        $state.go('viewUniversity', {id: value._id});
      }, errorHandler($scope));
    };

    //For clearing out the fields
    $scope.toggleSync = function(exam, checked){
      console.log(exam);
      console.log(checked);
      if(checked!=true){
        if(exam=="toefl"){
          $scope.university.exam.toefl={};
          $scope.university.exam.toefl.present=false;
        }
        else if(exam=="ielts"){
          $scope.university.exam.ielts={};
          $scope.university.exam.ielts.present=false;
        }
        else if(exam=="gre"){
          $scope.university.exam.gre={};
          $scope.university.exam.gre.present=false;
        }
        else if(exam=="gre_subject"){
          $scope.university.exam.gre_subject={};
          $scope.university.exam.gre_subject.present=false;
        }
        else if(exam=="gmat"){
          $scope.university.exam.gmat={};
          $scope.university.exam.gmat.present=false;
        }
        else if(exam=="lsat"){
          $scope.university.exam.lsat={};
          $scope.university.exam.lsat.present=false;
        }
      }
    }

    //Adds a new recommender
    $scope.addRecommender = function(value){
      $scope.university.recommender = "";
      
      if($scope.university.recommenders){
        $scope.university.recommenders.name.push(value);
      }
      else{
        $scope.university.recommenders = {};
        $scope.university.recommenders.name = [];
        $scope.university.recommenders.done = [];
        $scope.university.recommenders.name.push(value); 
      }
    }

    //Remove a previous recommender
    $scope.removeRecommender = function(value){
      var len = $scope.university.recommenders.name.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.recommenders.name[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.recommenders.name.splice(index,1);

      //Remove this document from the done documents list
      len = $scope.university.recommenders.done.length;
      console.log(len);
      
      for(var i=0;i<len;i++){
        var temp = $scope.university.recommenders.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.recommenders.done.splice(index,1);
    }


    //Adds a new document requirement
    $scope.addDocument = function(value){
      console.log(value);

      if($scope.university.documents){
        console.log($scope.university.documents.docs);

        var len = $scope.university.documents.docs.length;
        console.log(len);


        for(var i=0;i<len;i++){
          var temp = $scope.university.documents.docs[i];
          if(temp===value){
            console.log("Match found");
            $window.alert("This document already exists");
            return;
          }
        }
        $scope.university.documents.docs.push(value);
      }
      else{
        $scope.university.documents = {};
        $scope.university.documents.docs = [];
        $scope.university.documents.done = [];
        $scope.university.documents.docs.push(value); 
      }
    };

    //Remove document
    $scope.removeDocument = function(value){
      console.log(value);

      console.log($scope.university.documents.docs);

      //Remove this document from the document list
      var len = $scope.university.documents.docs.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.documents.docs[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.documents.docs.splice(index,1);

      //Remove this document from the done documents list
      len = $scope.university.documents.done.length;
      console.log(len);
      
      for(var i=0;i<len;i++){
        var temp = $scope.university.documents.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.documents.done.splice(index,1);
    };

    $scope.addTask = function(value){
      console.log(value);

      $scope.cus_task="";

      if($scope.university.tasks){
        console.log($scope.university.tasks.task);

        var len = $scope.university.tasks.task.length;
        console.log(len);


        for(var i=0;i<len;i++){
          var temp = $scope.university.tasks.task[i];
          if(temp===value){
            console.log("Match found");
            $window.alert("This task already exists");
            return;
          }
        }
        $scope.university.tasks.task.push(value); 
      }
      else{
        $scope.university.tasks = {};
        $scope.university.tasks.task = [];
        $scope.university.tasks.done = [];
        $scope.university.tasks.task.push(value); 
      }
    };

    //Remove a task
    $scope.removeTask = function(value){
      console.log(value);

      console.log($scope.university.tasks.task);

      var len = $scope.university.tasks.task.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.tasks.task[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.tasks.task.splice(index,1);

      //Remove from done list
      len = $scope.university.tasks.done.length;
      console.log(len);

      for(var i=0;i<len;i++){
        var temp = $scope.university.tasks.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.tasks.done.splice(index,1);
    };

  }])


  .controller('UniversitiesEditCtrl',['$scope','$stateParams','$state','$window','Universities','Currency', 'Documents', function ($scope,$stateParams,$state,$window,Universities,Currency,Documents) {

    $scope.university = Universities.get({id: $stateParams.id});

    $scope.popup1 = {
      opened: false
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.currency = Currency;

    $scope.documents = Documents;

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.curDocument = "";

    $scope.editUniversity = function(){
    	Universities.update({id: $scope.university._id}, $scope.university, function success(value /*, responseHeaders*/){
        $state.go('viewUniversity', {id: value._id});
        //console.log($scope.university);
      }, errorHandler($scope));
    };

    //For clearing out the fields
    $scope.toggleSync = function(exam, checked){
      console.log(exam);
      console.log(checked);
      if(checked!=true){
        if(exam=="toefl"){
          $scope.university.exam.toefl={};
          $scope.university.exam.toefl.present=false;
        }
        else if(exam=="ielts"){
          $scope.university.exam.ielts={};
          $scope.university.exam.ielts.present=false;
        }
        else if(exam=="gre"){
          $scope.university.exam.gre={};
          $scope.university.exam.gre.present=false;
        }
        else if(exam=="gre_subject"){
          $scope.university.exam.gre_subject={};
          $scope.university.exam.gre_subject.present=false;
        }
        else if(exam=="gmat"){
          $scope.university.exam.gmat={};
          $scope.university.exam.gmat.present=false;
        }
        else if(exam=="lsat"){
          $scope.university.exam.lsat={};
          $scope.university.exam.lsat.present=false;
        }
      }
    };



    //Adds a new recommender
    $scope.addRecommender = function(value){
      console.log(value);
      $scope.university.recommender= "";

      if($scope.university.recommenders.name){
        $scope.university.recommenders.name.push(value);
      }
      else{
        $scope.university.recommenders = {};
        $scope.university.recommenders.name = [];
        $scope.university.recommenders.done = [];
        $scope.university.recommenders.name.push(value); 
      }
    };

    //Remove a previous recommender
    $scope.removeRecommender = function(value){
      var len = $scope.university.recommenders.name.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.recommenders.name[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.recommenders.name.splice(index,1);

      //Remove this document from the done recommenders list
      len = $scope.university.recommenders.done.length;
      console.log(len);
      
      for(var i=0;i<len;i++){
        var temp = $scope.university.recommenders.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.recommenders.done.splice(index,1);
    };

    //Add a document    
    $scope.addDocument = function(value){
      console.log(value);

      if($scope.university.documents){
        console.log($scope.university.documents.docs);

        var len = $scope.university.documents.docs.length;
        console.log(len);


        for(var i=0;i<len;i++){
          var temp = $scope.university.documents.docs[i];
          if(temp===value){
            console.log("Match found");
            $window.alert("This document already exists");
            return;
          }
        }
        $scope.university.documents.docs.push(value);
      }
      else{
        $scope.university.documents = {};
        $scope.university.documents.docs = [];
        $scope.university.documents.done = [];
        $scope.university.documents.docs.push(value); 
      }
    };

    //Remove document
    $scope.removeDocument = function(value){
      console.log(value);

      console.log($scope.university.documents.docs);

      //Remove this document from the document list
      var len = $scope.university.documents.docs.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.documents.docs[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.documents.docs.splice(index,1);

      //Remove this document from the done documents list
      len = $scope.university.documents.done.length;
      console.log(len);
      
      for(var i=0;i<len;i++){
        var temp = $scope.university.documents.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.documents.done.splice(index,1);
    };

    //Add a new task
    $scope.addTask = function(value){
      console.log(value);
      $scope.cus_task="";

      if($scope.university.tasks){
        console.log($scope.university.tasks.task);

        var len = $scope.university.tasks.task.length;
        console.log(len);


        for(var i=0;i<len;i++){
          var temp = $scope.university.tasks.task[i];
          if(temp===value){
            console.log("Match found");
            $window.alert("This task already exists");
            return;
          }
        }
        $scope.university.tasks.task.push(value); 
      }
      else{
        $scope.university.tasks = {};
        $scope.university.tasks.task = [];
        $scope.university.tasks.done = [];
        $scope.university.tasks.task.push(value); 
      }
    };

    //Remove a task
    $scope.removeTask = function(value){
      console.log(value);

      console.log($scope.university.tasks.task);

      var len = $scope.university.tasks.task.length;
      console.log(len);
      var index;

      for(var i=0;i<len;i++){
        var temp = $scope.university.tasks.task[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.tasks.task.splice(index,1);

      //Remove from done list
      len = $scope.university.tasks.done.length;
      console.log(len);

      for(var i=0;i<len;i++){
        var temp = $scope.university.tasks.done[i];
        if(temp===value){
          console.log("Match found");
          index=i;
          break;
        }
      }
      $scope.university.tasks.done.splice(index,1);
    };

  }]);

  errorHandler = function ($scope){
    return function error(httpResponse){
      $scope.errors = httpResponse;
    };
  };