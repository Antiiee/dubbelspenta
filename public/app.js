var app = angular.module('ds', []);

app.controller('photos', ['$scope', function($scope){
  var socket = io();
  socket.on('image', function(image){
    console.log(image);
    $scope.image_url = image;
  });
}]);
