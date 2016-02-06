'use strict';

angular.module('appingApp')
  .controller('SignupCtrl', ['$scope','Auth','$state','$window','Scores',function($scope, Auth, $state, $window, Scores) {
    $scope.user = {};
    $scope.errors = {};

    $scope.countries = [
        'Australia',
        'Austria',
        'China',
        'France',
        'Germany',
        'Hong Kong',
        'India',
        'Italy',
        'Mexico',
        'Nepal',
        'Singapore',
        'Spain',
        'Switzerland',
        'United States of America',
        'United Kingdom'
    ];

    $scope.register = function(form) {
      $scope.submitted = true;

      $scope.scores = {};
      $scope.scores.gre = {};
      $scope.scores.toefl = {};
      $scope.scores.ielts = {};
      $scope.scores.tse = {};
      $scope.scores.gre = {};
      $scope.scores.gre_subject = {};
      $scope.scores.gmat = {};
      $scope.scores.lsat = {};
      $scope.scores.usmle = {};
      $scope.scores.ggfns = {};
      $scope.scores.sat1 = {};
      $scope.scores.sat2 = {};
      $scope.scores.gre.present = false;
      $scope.scores.toefl.present = false;
      $scope.scores.ielts.present = false;
      $scope.scores.tse.present = false;
      $scope.scores.gre.present = false;
      $scope.scores.gre_subject.present = false;
      $scope.scores.gmat.present = false;
      $scope.scores.lsat.present = false;
      $scope.scores.usmle.present = false;
      $scope.scores.ggfns.present = false;
      $scope.scores.sat1.present = false;
      $scope.scores.sat2.present = false;


      if (form.$valid) {
        Auth.createUser({
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          country: $scope.user.country,
          university: $scope.user.university,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function(user) {
          // Account created, redirect to home
          console.log(user);
          Auth.getCurrentUser(function(user){
            $scope.scores.user_id = user._id;
            console.log($scope.scores);
          })
          .then(function(){
            Scores.save($scope.scores, function success(value){
              $state.go('main');
            });
          });
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);
