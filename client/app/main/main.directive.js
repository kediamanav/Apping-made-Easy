'use strict';

/*
angular.module('appingApp')
  .directive('slider',['$timeout', function($timeout) {
  	return {
    restrict: 'A',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {
      scope.currentIndex = 0; // Initially the index is at the first image
      scope.images[0].visible=true;
      scope.next = function() {
        scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
      };

      scope.prev = function() {
        scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
      };

      scope.$watch('currentIndex', function() {
        scope.images.forEach(function(image) {
          image.visible = false; // make every image invisible
        });

        scope.images[scope.currentIndex].visible = true; // make the current image visible
      });


      var timer;
      var sliderFunc = function() {
        timer = $timeout(function() {
          scope.next();
          timer = $timeout(sliderFunc, 5000);
        }, 5000);
      };

      sliderFunc();

      scope.$on('$destroy', function() {
        $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
      });

    },
    templateUrl: 'slider_template.html'
  };
  }]);
*/