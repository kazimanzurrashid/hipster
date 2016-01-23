describe('UserInfoCtrl', function() {

  var user = { name: 'Kazi'};

  var $rootScope, $q, $controller, userInfoSvc, flashSvc;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _$q_, _$controller_, _UserInfoSvc_, _FlashSvc_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    userInfoSvc = _UserInfoSvc_;
    flashSvc = _FlashSvc_;
  }));

  describe('on successful load', function() {

    var getInfoStub;
    var successStub;
    var scope;

    beforeEach(function() {
      getInfoStub = sinon.stub(userInfoSvc, 'getInfo', function() {
        return $q.resolve({ data: user });
      });

      successStub = sinon.stub(flashSvc, 'success');

      scope = $rootScope.$new();

      $controller('UserInfoCtrl', {
        $scope: scope,
        userInfoSvc: userInfoSvc,
        flashSvc: flashSvc
      });

      scope.$apply();
    });

    it('sets user info', function() {
      expect(scope.user).to.deep.equal(user);
    });

    it('flashes success', function() {
        expect(successStub).to.have.been.calledWith('Info loaded successfully');
    });

    afterEach(function() {
      getInfoStub.reset();
      successStub.reset();
    });

  });

  describe('on failed load', function() {

    var getInfoStub;
    var errorStub;

    var scope;

    beforeEach(function() {
      getInfoStub = sinon.stub(userInfoSvc, 'getInfo', function() {
        return $q.reject();
      });

      errorStub = sinon.stub(flashSvc, 'error');

      scope = $rootScope.$new();

      $controller('UserInfoCtrl', {
        $scope: scope,
        userInfoSvc: userInfoSvc,
        flashSvc: flashSvc
      });

      scope.$apply();
    });

    it('does not set user info', function() {
      expect(scope.user).to.be.an('undefined');
    });

    it('flashes error', function() {
        expect(errorStub).to.have.been.calledWith('Failed to load info');
    });

    afterEach(function() {
      getInfoStub.reset();
      errorStub.reset();
    });

  });
});
