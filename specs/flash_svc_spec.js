describe('FlashSvc', function() {

  var methods = ['success', 'error', 'information', 'warning'];
  var message = 'i am a test message';

  var $rootScope;
  var flashSvc;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _FlashSvc_) {
    $rootScope = _$rootScope_;
    flashSvc = _FlashSvc_;
  }));

  methods.forEach(function(method) {

    describe('#' + method, function() {

      var spy;

      beforeEach(function() {
        spy = sinon.spy($rootScope, '$broadcast');
        flashSvc[method](message);
      });

      it('broadcasts $rootScope event', function() {
        expect(spy).to.have.been.calledWith('show-flash', {
          type: method,
          message: message
        });
      });

      afterEach(function() {
        spy.reset();
      });

    });
  });
});
