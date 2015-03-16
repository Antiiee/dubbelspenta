var app = angular.module('ds', []);

app.controller('photos', ['$scope', '$http', function($scope, $http){
  var socket = io();
  socket.on('image', function(image){
    console.log(image);
    $http({
            url: image,
            method: 'POST',
            crossDomain: true,
            dataType: 'jsonp'
        }).success(function(response){
          console.log(response);
          $scope.image_url = image;
        })
  });
}]);
