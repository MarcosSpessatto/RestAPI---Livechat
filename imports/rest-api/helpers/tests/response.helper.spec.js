import {expect} from 'chai';
import ResponseHelper from '../response.helper';
import ironRouterMock from '../../../../tests/unit/common/iron-router-request-response-mock';
import httpStatus from '../../constants/http-status';

describe('RestAPI - ResponseHelper', () => {

  describe('#makePayload()', () => {

    context('when have object data defined', () => {
      it('should return an stringfied object with label success inside response passed', () => {
        expect(ResponseHelper.makePayload(true, {id: '1'})).to.be.equal(JSON.stringify({
          id: '1',
          success: true
        }));
      });
    });

    context('when dont have object data defined', () => {
      it('should return an stringfied object with only the label success', () => {
        expect(ResponseHelper.makePayload(true)).to.be.equal(JSON.stringify({
          success: true
        }));
      });
    });

  });

  describe('#json()', () => {
    it('should call end() function with the object response, set statusCode of request, and yours headers', () => {
      ResponseHelper.json(ironRouterMock.response, {
        httpStatus: httpStatus.success,
        success: true,
        data: {id: '1'}
      });
      expect(ironRouterMock.response.statusCode).to.be.equal(httpStatus.success);
      expect(ironRouterMock.response.setHeader.calledWith('Content-Type', 'application/json')).to.be.true;
      expect(ironRouterMock.response.end.calledWith(JSON.stringify({
        id: '1',
        success: true
      }))).to.be.true;
    });
  });

  describe('#error()', () => {
    it('should call end() function with the error message, statusCode 400, and yours headers', () => {
      ResponseHelper.error(ironRouterMock.response, 'error');
      expect(ironRouterMock.response.statusCode).to.be.equal(httpStatus.badRequest);
      expect(ironRouterMock.response.setHeader.calledWith('Content-Type', 'application/json')).to.be.true;
      expect(ironRouterMock.response.end.calledWith(JSON.stringify({
        message: 'error',
        success: false
      }))).to.be.true;
    });
  });
});