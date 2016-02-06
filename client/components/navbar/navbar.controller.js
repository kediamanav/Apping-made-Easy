'use strict';

angular.module('appingApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    },
    {
      'title': 'My Applications',
      'state': 'universities'
    },
    {
      'title': 'My Scores',
      'state': 'scores'
    },
    {
      'title': 'My Documents',
      'state': 'documents'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    console.log(Auth.getCurrentUser());
  });
