require('dotenv').config();
require('should');
const request = require('supertest');
const app = require('../../app/server.js');
const agent = request.agent(app);

const newPost = {
  title: 'Title hook',
  text: 'Post text from hooks',
  status: 'draft'
};

const otherPost = {
  title: 'Title other',
  text: 'Dadadadada',
  status: 'public'
};

describe('Post CRUD integration testing', function () {
  describe('Get all post', function () {
    before(function (done) {
      agent
        .delete('/api/posts')
        .end(function() {
          done();
        });
    });

    before(function (done) {
			agent
        .post('/api/posts')
        .send(newPost)
        .end(function() {});
      agent
        .post('/api/posts')
        .send(otherPost)
        .end(function() {
          done();
        });
    });

    it('Should get status equal success and array of blog posts', function (done) {
      agent
        .get('/api/posts')
        .expect(200)
        .end(function(_, results){
          results.body.error.should.equal(false);
          results.body.message.length.should.equal(2);
          results.body.message[0].title.should.equal(newPost.title);
          results.body.message[0].text.should.equal(newPost.text);
          results.body.message[0].status.should.equal(newPost.status);
          done();
        });
    });

    it('Should get query a blog post by title or text', function (done) {
      agent
        .get('/api/posts?q=hook')
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

    it('Should get query a blog post by status', function (done) {
      agent
        .get('/api/posts?q=public')
        .expect(200)
        .end(function(_, results){
          results.body.error.should.equal(false);
          results.body.message.length.should.equal(1);
          results.body.message[0].title.should.equal(otherPost.title);
          results.body.message[0].text.should.equal(otherPost.text);
          results.body.message[0].status.should.equal(otherPost.status);
          done();
        });
    });
  });

  describe('Post a blog post', function () {
    it('Should allow post to post a blog post and return _id', function (done) {
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

    it('Should not allow post to post a blog post with an invalid status', function (done) {
      const invalidPost = Object.assign({}, newPost);
      invalidPost.status = 'active';
      agent
        .post('/api/posts')
        .send(invalidPost)
        .end(function(_, result) {
          result.body.error.should.equal(true);
          result.body.message.should.equal('Error adding data');
          result.body.should.have.property('detail');
          done();
        });
    });
  });

  describe('Delete a blog post', function () {
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

    it('Should delete the blog post by _id', function (done) {
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

  describe('Update a blog post', function () {
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

    it('Should update the status of blog post by _id to public', function (done) {
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

    it('Should not update the status of blog post with an invalid status', function (done) {
      const params = { status: 'active' };
      agent
        .put(`/api/posts/${id}`)
        .send(params)
        .end(function(err, result){
          result.body.error.should.equal(true);
          result.body.message.should.equal('Error updating data');
          result.body.should.have.property('detail');
          done();
        });
    });
  });
});
