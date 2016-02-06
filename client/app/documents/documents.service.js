'use strict';

angular.module('appingApp')
  .factory('UserDocs',['$resource', function ($resource) {
    return $resource('/api/documents/:id',null,{
      'update': {method: 'PUT'}
    });
  }]);
