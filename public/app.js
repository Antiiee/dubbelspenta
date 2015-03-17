var socket = io();
var app = angular.module('ds', []);

app.controller('photos', ['$scope', '$http', function($scope, $http){
  // on first image
  socket.on('firstImage', function(data){
    $scope.$apply(function(){
      $scope.images = data.images;
    });
  });

  socket.on('image', function(url){
    var clientId = '28d27297003b4b4b928baadc7d204dd3';
    var config = {
      'params': {
        'client_id': clientId,
        'count': 1,
        'callback': 'JSON_CALLBACK'
      }
    };
    $http.jsonp(url, config).success(function(response){
      $scope.images.unshift(response.data[0].images.standard_resolution.url);
    })
  });
}]);
