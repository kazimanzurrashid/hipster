angular.module('hipster')
  .controller('UserInfoCtrl',
    function($scope, userInfoSvc, flashSvc) {

      var userName = 'kazimanzurrashid';

      userInfoSvc.getInfo(userName).then(function(response) {
        $scope.user = response.data;
        flashSvc.success('Info loaded successfully');
      }, function() {
        flashSvc.error('Failed to load info');
      });
    });
