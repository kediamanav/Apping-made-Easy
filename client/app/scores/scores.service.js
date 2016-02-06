'use strict';

angular.module('appingApp')
  .factory('Scores',['$resource', function ($resource) {

    return $resource('/api/scores/',null,{
      'update': {method: 'PUT'}
    });
  }]);
