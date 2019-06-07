const express = require('express');
const single = express.Router();
import { promiseResponse } from '../common';
import { makeInvoker } from 'awilix-express';

function postsApi({ postsService }) {
  return {
    findById: (req, res) => promiseResponse(postsService.findById(req.params.id))(res, 'fetching'),

    update: (req, res) => promiseResponse(postsService.update(req.params.id, req.body))(res, 'updating'),

    remove: (req, res) => promiseResponse(postsService.remove(req.params.id))(res, 'deleting')
  }
}

const api = makeInvoker(postsApi);

single.route('/:id')
  .get(api('findById'))
  .put(api('update'))
  .delete(api('remove'));

module.exports = single;
