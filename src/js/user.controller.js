(function() {

  function UserController(github, flash) {
    var self = this;
    var userName = 'kazimanzurrashid';

    github.getUserProfile(userName).then(function(response) {
      self.profile = response.data;
      flash.success('User profile loaded successfully');
    }, function() {
      flash.error('Failed to load user profile');
    });
  }

  angular.module('hipster').controller('UserController', UserController);
})();
