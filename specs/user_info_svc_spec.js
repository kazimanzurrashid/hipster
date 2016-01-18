describe('UserInfoSvc', function() {
  var $httpBackend;
  var service;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(inject(function(_$httpBackend_, _UserInfoSvc_) {
    $httpBackend = _$httpBackend_;
    service = _UserInfoSvc_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getInfo', function() {
    var expected;
    var actual;

    beforeEach(function(done) {
      expected = {
        name: 'I am nobody'
      };

      $httpBackend.expectJSONP('https://api.github.com/users/i-am-nobody?callback=JSON_CALLBACK').respond(expected);

      service.getInfo('i-am-nobody').then(function(response) {
        actual = response.data;
        done();
      });

      $httpBackend.flush();
    });

    it('returns github profile', function() {
      expect(actual).to.deep.equal(expected);
    });
  });

});
