import sinon from 'sinon';

export default {
  request: {
    body: {},
    query: {}
  },
  params: {},
  response: {
    statusCode: '',
    end: sinon.stub(),
    setHeader: sinon.stub()
  }
};