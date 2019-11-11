const should = require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
chai.use(chaiHttp);
describe(`----------- protected routes----------------`, function () {

  it(`user protected no token`, async() => {
    chai.request(server)
      .get(`/protected`)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(403);
      })
  });
  it(`user protected no token`, async() => {
    chai.request(server)
      .get(`/protected/admin`)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(403);
      })
  });


})
