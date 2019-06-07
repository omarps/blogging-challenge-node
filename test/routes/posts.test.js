require('dotenv').config();
require('should');
const request = require('supertest');
const app = require('../../server.js');
const agent = request.agent(app);

const newPost = {
  title: 'Title hook',
  text: 'Post text from hooks',
  status: 'draft'
};

describe('Post CRUD integration testing', function () {
  before(function (done) {
    agent
      .delete('/api/posts')
      .end(function() {
        done();
      });
  });

  after(function (done) {
    agent
      .delete('/api/posts')
      .end(function() {
        done();
      });
  });

  describe('Get all post', function () {
    before(function (done) {
			agent
        .post('/api/posts')
        .send(newPost)
        .end(function() {
          done();
        });
    });

    it('Should get status equal success and array of post', function (done) {
      agent
        .get('/api/posts')
        .expect(200)
        .end(function(_, results){
          results.body.error.should.equal(false);
          results.body.message.length.should.equal(1);
          results.body.message[0].title.should.equal(newPost.title);
          results.body.message[0].text.should.equal(newPost.text);
          results.body.message[0].status.should.equal(newPost.status);
          done();
        });
    });
  });

  describe('Post a post', function () {
    it('Should allow post to post a post and return _id', function (done) {
      agent
        .post('/api/posts')
        .send(newPost)
        .end(function(_, result) {
          result.body.error.should.equal(false);
          result.body.message.should.have.property('_id');
          result.body.message.title.should.equal(newPost.title);
          result.body.message.text.should.equal(newPost.text);
          result.body.message.status.should.equal(newPost.status);
          done();
        });
    });
  });

  describe('Delete a post', function () {
    let id;
    before(function (done) {
			agent
        .post('/api/posts')
        .send(newPost)
        .end(function(_, result) {
          id = result.body.message._id;
          done();
        });
    });

    it('Should delete the post by _id', function (done) {
      agent
        .delete(`/api/posts/${id}`)
        .end(function(_, result) {
          result.body.error.should.equal(false);
          result.body.message.n.should.equal(1);
          result.body.message.ok.should.equal(1);
          result.body.message.deletedCount.should.equal(1);
          done();
        });
    });
  });

  describe('Update a post', function () {
    let id;
    before(function (done) {
			agent
        .post('/api/posts')
        .send(newPost)
        .end(function(_, result) {
          id = result.body.message._id;
          done();
        });
    });

    it('Should update the status of post by _id to public', function (done) {
      const params = { status: 'public' };
      agent
        .put(`/api/posts/${id}`)
        .send(params)
        .end(function(err, result){
          result.body.error.should.equal(false);
          result.body.message.status.should.equal('public');
          done();
        });
    });
  });
});
