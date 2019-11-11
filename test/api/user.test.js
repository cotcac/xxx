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
      myItem = data[0];
      // console.log(myItem);
      
    })
  })
  after((done) => {
    done();
  });

  // Insert valid value
  it(`Insert ${model} valid`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.valid2)
      .end(function (err, data) {
        // console.log(data);
        
        should.not.exist(err);
        should.exist(data);
        data.status.should.equal(200);
      })
  });
  // insert unvalid value 1
  it(`Insert ${model} name less than 3 char long`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid1)
      .end(function (err, data) {
        should.not.exist(err);
        data.status.should.equal(422);
      })

  });
  it(`Insert ${model} incorrect email format`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid3)
      .end(function (err, data) {
        should.not.exist(err);
        data.status.should.equal(422);
      })

  });
  it(`Insert ${model} password too short`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid4)
      .end(function (err, data) {
        // console.log(data.body);
        
        should.not.exist(err);
        data.status.should.equal(422);
      })

  });
  it(`Insert ${model} email already exist!`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid5)
      .end(function (err, data) {
        console.log(data.body);
        
        should.not.exist(err);
        data.status.should.equal(422);
      })

  });
  it(`List ${router}::`, async() => {
    chai.request(server)
      .get('/users')
      .end(function (err,result) {
        // console.log(err);
        
        // console.log('[list===============]',result);
        
        should.not.exist(err);
        should.exist(result);
        result.status.should.equal(200);
        result.body.should.have.property('success');
        result.body.should.have.property('message');
        result.body.should.have.property('data');
      })
  });
  // insert unvalid value 2
  it(`Insert ${model} Missing age`, async() => {
    chai.request(server)
      .post(`/${router}`)
      .send(data.unvalid2)
      .end(function (err, data) {
        should.not.exist(err);
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
  it(`Single Role:: /${router}/1`, async() => {
    chai.request(server)
      .get(`/users/1`)
      .end(function (err, data) {
        should.not.exist(err);
        should.exist(data);
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
