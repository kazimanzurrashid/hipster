describe('gitHub.service', function() {

  var $httpBackend;
  var gitHub;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, _gitHub_) {
    $httpBackend = _$httpBackend_;
    gitHub = _gitHub_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getUserProfile', function() {
    var expected;
    var actual;

    beforeEach(function(done) {
      expected = {
        name: 'I am nobody'
      };

      var endpoint = 'https://api.github.com/users/i-am-nobody?' +
      'callback=JSON_CALLBACK';

      $httpBackend.expectJSONP(endpoint).respond(expected);

      gitHub.getUserProfile('i-am-nobody').then(function(response) {
        actual = response.data;
        done();
      });

      $httpBackend.flush();
    });

    it('returns user profile', function() {
      expect(actual).to.deep.equal(expected);
    });
  });
});
