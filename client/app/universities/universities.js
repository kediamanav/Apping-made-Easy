'use strict';

angular.module('appingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('universities', {
        url: '/universities',
        templateUrl: 'app/universities/templates/universities-list.html',
        controller: 'UniversitiesCtrl',
        authenticate: true
      })

      .state('newUniversity', {
        url: '/universities/new',
        templateUrl: 'app/universities/templates/universities-new.html',
        controller: 'UniversitiesNewCtrl',
        authenticate: true
      })

      .state('viewUniversity', {
        url: '/universities/:id',
        templateUrl: 'app/universities/templates/universities-view.html',
        controller: 'UniversitiesViewCtrl',
        authenticate: true
      })

      .state('editUniversity', {
        url: '/universities/:id/edit',
        templateUrl: 'app/universities/templates/universities-edit.html',
        controller: 'UniversitiesEditCtrl',
        authenticate: true
      });      
  });
