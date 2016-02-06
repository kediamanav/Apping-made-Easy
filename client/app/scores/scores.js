'use strict';

angular.module('appingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scores', {
        url: '/scores',
        templateUrl: 'app/scores/scores.html',
        controller: 'ScoresCtrl',
        authenticate: true
      });
  });
