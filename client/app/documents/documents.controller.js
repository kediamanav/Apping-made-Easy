'use strict';

var errorHandler;
var uploadHander;

angular.module('appingApp')
  .controller('DocumentsCtrl',['$scope','$timeout','$state','Upload','Auth','UserDocs', function ($scope,$timeout,$state,Upload,Auth, UserDocs) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.documents = UserDocs.query();

    $scope.uploadDocument = function(file){
    	//console.log($scope.form.file.$valid);
    	//if($scope.form.file.$valid && $scope.file){
    	if(file){
    	  console.log("Inside uploadDocument()");

		  var id = $scope.getCurrentUser()._id;
		  var filename = $scope.filename;
		  console.log(id+","+filename);

	      file.upload = Upload.upload({
	        url: '/api/documents/upload',
	        data: {file: file, user_id: id, file_name: filename}
	        //file: file
	      });

	      file.upload.then(function (response) {
	        $timeout(function () {
	          file.result = response.data;
        	  $state.go($state.current, {}, {reload: true});
	        });
	      }, function (response) {
	        if (response.status > 0){
	          console.log(response.status + ': ' + response.data);
	          errorHandler($scope)(response.status + ': ' + response.data);
	        }
	      });

	      file.upload.progress(function (evt) {
	        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	        console.log("HERE");
	      });
	    }
	};
   	
   	//$scope.upload = uploadHander($scope, Upload, $timeout, $scope.getCurrentUser()._id);

   	$scope.removeDocument = function(id){
   	  UserDocs.delete({id: id}, function success() {
        $state.go($state.current, {}, {reload: true});
      }, errorHandler($scope));
   	};

  }]);

errorHandler = function ($scope){
  return function error(httpResponse){
    $scope.errors = httpResponse;
  };
};

/*
uploadHander = function ($scope, Upload, $timeout, id) {
  return function(file) {
    if (file && !file.$error) {
      
      $scope.file = file;

      file.upload = Upload.upload({
        url: '/api/documents/'+id+'/upload',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ': ' + response.data);
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
}*/