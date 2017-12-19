import httpStatus from '../constants/http-status';

class ResponseHelper {
  static makePayload(success, response = {}) {
    response.success = success;
    return JSON.stringify(response);
  }

  static json(response, {httpStatus, success, data}) {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = httpStatus;
    response.end(ResponseHelper.makePayload(success, data))
  }

  static error(response, message) {
    const success = true;
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = httpStatus.badRequest;
    response.end(ResponseHelper.makePayload(!success, {message}));
  }
}

export default ResponseHelper;