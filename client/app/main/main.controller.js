'use strict';

angular.module('appingApp')
  .controller('MainCtrl',['$scope','$http','$timeout','Auth', function($scope, $http, $timeout, Auth) {
  	$scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    //Image function
    $scope.images = [{
    	src: 'assets/images/img1.jpg',
	    title: 'Pic 1'
	  },{
	    src: 'assets/images/img2.jpg',
	    title: 'Pic 2'
	  },{
	    src: 'assets/images/img3.jpg',
	    title: 'Pic 3'
	  },{
	    src: 'assets/images/img4.jpg',
	    title: 'Pic 4'
	  }];

	  $scope.currentIndex = 0; // Initially the index is at the first image
      //$scope.images[0].visible=true;

	  $scope.next = function() {
		  $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
		};

	  $scope.prev = function() {
		  $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;
		};

		$scope.$watch('currentIndex', function() {
		  $scope.images.forEach(function(image) {
		    image.visible = false; // make every image invisible
		  });

		  $scope.images[$scope.currentIndex].visible = true; // make the current image visible
		});
		
	  var timer;
      var sliderFunc = function() {
        timer = $timeout(function() {
          $scope.next();
          timer = $timeout(sliderFunc, 2000);
        }, 2000);
      };

      sliderFunc();

      $scope.$on('$destroy', function() {
        $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
      });
  }]);
