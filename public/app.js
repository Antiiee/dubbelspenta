var app = angular.module('ds', []);

app.controller('photos', ['$scope', '$http', function($scope, $http){
  var socket = io();
  $.ajax({
            url: url,
            type: 'POST',
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function (data) {
            self.renderTemplate(data);
        });
  socket.on('image', function(image){
    console.log(image);
    $http({
            url: url,
            type: 'POST',
            crossDomain: true,
            dataType: 'jsonp'
        }).success(function(response){
          console.log(response);
          $scope.image_url = image;
        })
  });
}]);
