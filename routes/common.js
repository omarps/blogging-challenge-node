const responseStatusSuccessJson = (res, data) => {
  const response = { 'error': false, 'message': data };
  return res.status(200).json(response);
};

const responseStatusErrorJson = (res, err, operation) => {
  console.log(operation, err);
  const response = {
    'error': true,
    'message': 'Error ' + operation + ' data',
    'detail': `${err}`
  };
  res.status(500).json(response);
};

const responseSuccess = (data) => {
  const [_data, res, operation] = data;
  if (_data instanceof Error) {
    responseStatusErrorJson(res, _data, operation);
  } else {
    responseStatusSuccessJson(res, _data);
  }
};

const responseError = (error) => {
  const [_error, res, operation] = error;
  responseStatusErrorJson(res, _error, operation);
};

const promiseResponse = (promise) => {
  return (res, operation) =>
    Promise.all([promise, res, operation])
      .then(responseSuccess)
      .catch(responseError);
};

module.exports = {
  promiseResponse,
  responseSuccess,
  responseError,
  responseStatusSuccessJson,
  responseStatusErrorJson
};
