var socket = io();
var app = angular.module('ds', []);

app.controller('photos', ['$scope', function($scope){
  // on first image
  socket.on('firstImage', function(data){
    $scope.$apply(function(){
      $scope.images = data.images;
    });
  });
}]);
