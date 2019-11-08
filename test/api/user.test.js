const should = require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const mdl = require('../../models');
chai.use(chaiHttp);
let myItem = {};
const model = 'User';
const router ='users';
const data = require('../fixtures/user');
describe(`----------- ${model} routes----------------`, function () {
  before(async () => {
    //delete all test data.
    await mdl[model].destroy({ where: {} });
    await mdl[model].create(data.valid)
    await mdl[model].findAll({
      limit: 1,
      raw: true
    }).then(data => {
        console.log(data);
        
      myItem = data[0];
    })
  })
  after((done) => {
    done();
  })
  it(`List ${model}::`, async() => {
    chai.request(server)
      .get(`/${router}`)
      .end(function (err,result) {
        should.not.exist(err);
        should.exist(result);
        result.status.should.equal(200);
        result.body.should.have.property('success');
        result.body.should.have.property('message');
        result.body.should.have.property('data');
      })
  })
  // Insert valid value
  it(`Insert ${model}`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.valid)
      .end(function (err, data) {
          console.log(err);
          
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(200);
      })
  })
  // insert unvalid value 1
  it(`Insert ${model} name less than 3 char long`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid1)
      .end(function (err, data) {
        should.not.exist(err);
        console.log(data.body);
        data.status.should.equal(422);
      })
  })
  // insert unvalid value 2
  it(`Insert ${model} Missing age`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid2)
      .end(function (err, data) {
        should.not.exist(err);
        console.log(data.body);
        data.status.should.equal(422);
      })
  })
  //update
  it(`Update ${model}::`, async() => {
    chai.request(server)
      .put(`/${router}/${myItem.id}`)
      .send(data.valid)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(200);
      })
  })
  // Single
  it('Single Role::', async() => {
    chai.request(server)
      .get(`/${router}/${myItem.id}`)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        console.log(data.text);
        
        data.status.should.equal(200);
      })
  })
  // Delete role
  it('Delete Role::', async() => {
    chai.request(server)
      .delete(`/${router}/${myItem.id}`)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(200);
      })
  })
})
