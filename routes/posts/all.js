const express = require('express');
const all = express.Router();
import { promiseResponse } from 'routes/common';
import { makeInvoker } from 'awilix-express';

function postsApi({ postsService }) {
  return {
    find: (req, res) => promiseResponse(postsService.find())(res, 'fetching'),
    // TODO: search api

    save: (req, res) => promiseResponse(postsService.save(req.body))(res, 'adding')
  }
}

const api = makeInvoker(postsApi);

all.route('/')
  .get(api('find'))
  .post(api('save'));

module.exports = all;
