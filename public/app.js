var app = angular.module('ds', []);

app.controller('photos', ['$scope', '$http', function($scope, $http){
  var socket = io();
  socket.on('image', function(image){
    console.log(image);
    $http.jsonp(image, {'callback': 'JSON_CALLBACK'}).success(function(response){
      console.log(response);
      $scope.image_url = image;
    })
  });
}]);
