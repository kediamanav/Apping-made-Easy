'use strict';

angular.module('appingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('documents', {
        url: '/documents',
        templateUrl: 'app/documents/documents.html',
        controller: 'DocumentsCtrl',
        authenticate: true
      });
  });
