'use strict';

var errorHandler;

angular.module('appingApp')
  .controller('ScoresCtrl',['$scope','$window','Scores', function ($scope,$window,Scores) {
    
    var sc = Scores.query(function(){
    	$scope.scores = sc[0];
    	//console.log("Loaded");
    	//console.log($scope.scores);
    });

    //For clearing out the fields
    $scope.toggleSync = function(exam, checked){
      console.log(exam);
      console.log(checked);
      if(checked!=true){
        if(exam=="toefl"){
          $scope.scores.toefl={};
          $scope.scores.toefl.present=false;
        }
        else if(exam=="ielts"){
          $scope.scores.ielts={};
          $scope.scores.ielts.present=false;
        }
        else if(exam=="gre"){
          $scope.scores.gre={};
          $scope.scores.gre.present=false;
        }
        else if(exam=="gre_subject"){
          $scope.scores.gre_subject={};
          $scope.scores.gre_subject.present=false;
        }
        else if(exam=="gmat"){
          $scope.scores.gmat={};
          $scope.scores.gmat.present=false;
        }
        else if(exam=="lsat"){
          $scope.scores.lsat={};
          $scope.scores.lsat.present=false;
        }
      }
    }


    $scope.updateScores = function(){
      //console.log($scope.scores);
      Scores.update($scope.scores, function success(value /*, responseHeaders*/){
        console.log("Values updated");
        $window.alert("Saved");
      }, errorHandler($scope));
    };
  }]);

errorHandler = function ($scope){
    return function error(httpResponse){
      $scope.errors = httpResponse;
    };
  };