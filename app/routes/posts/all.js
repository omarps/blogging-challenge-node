const express = require('express');
const all = express.Router();
import { promiseResponse } from '../common';
import { makeInvoker } from 'awilix-express';

function postsApi({ postsService }) {
  return {
    find: (req, res) => promiseResponse(postsService.find())(res, 'fetching'),
    // TODO: search api

    save: (req, res) => promiseResponse(postsService.save(req.body))(res, 'adding'),

    delete: (req, res) => promiseResponse(postsService.removeAll())(res, 'removing')
  };
}

const api = makeInvoker(postsApi);

all.route('/')
  .get(api('find'))
  .post(api('save'))
  .delete(api('delete'));

module.exports = all;
