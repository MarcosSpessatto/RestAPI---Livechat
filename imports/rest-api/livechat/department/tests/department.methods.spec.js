import {expect} from 'chai';
import sinon from 'sinon';
import DepartmentMethods from '../department.methods';
import DepartmentService from '../department.service';
import AgentService from '../../agent/agent.service';
import httpStatus from '../../../constants/http-status';
import messages from '../../../constants/messages';
import ironRouterMock from '../../../../../tests/unit/common/iron-router-request-response-mock';
import ResponseHelper from '../../../helpers/response.helper';
import {
  DEPARTMENT_FOR_MOCK_RETURN,
  DEPARTMENTS_LIST_FOR_MOCK_RETURN
} from '../../../../../tests/unit/common/rest-api/livechat/department/departments-utils-mock';

import {AGENTS_LIST_FOR_MOCK_RETURN} from '../../../../../tests/unit/common/rest-api/livechat/agent/agent-utils-mock';

describe('RestAPI - LiveChat - DepartmentMethods', () => {
  let departmentMethods;
  let departmentServiceStub = new DepartmentService();
  let agentServiceStub = new AgentService();
  let sandbox = sinon.sandbox.create();
  const ID_FOR_RETURN_INSERT_MOCK = '1';
  const getResponseObject = (httpStatus, success, data) => {
    return {
      httpStatus,
      success,
      data
    };
  };

  beforeEach(() => {
    sandbox.stub(departmentServiceStub, 'validateDepartmentData');
    sandbox.stub(departmentServiceStub, 'validateDepartmentId');
    sandbox.stub(departmentServiceStub, 'insert');
    sandbox.stub(departmentServiceStub, 'findOne');
    sandbox.stub(departmentServiceStub, 'removeOne');
    sandbox.stub(departmentServiceStub, 'updateOne');
    sandbox.stub(departmentServiceStub, 'findAll');
    sandbox.stub(agentServiceStub, 'validateAgentsData');
    sandbox.stub(agentServiceStub, 'insertMany');
    sandbox.stub(agentServiceStub, 'findAllByDepartmentId');
    sandbox.stub(agentServiceStub, 'removeByDepartmentId');
    sandbox.stub(ResponseHelper, 'json');
    sandbox.stub(ResponseHelper, 'error');
    departmentMethods = new DepartmentMethods(departmentServiceStub, agentServiceStub);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#insert()', () => {
    const bodyParams = {department: 'test', agents: [{}]};

    beforeEach(() => {
      ironRouterMock.request.body = bodyParams;

      departmentServiceStub.insert.returns(ID_FOR_RETURN_INSERT_MOCK);
      departmentServiceStub.validateDepartmentData.returns();
      departmentServiceStub.findOne.returns(DEPARTMENT_FOR_MOCK_RETURN);

      agentServiceStub.insertMany.returns(ID_FOR_RETURN_INSERT_MOCK);
      agentServiceStub.validateAgentsData.returns();
      agentServiceStub.findAllByDepartmentId.returns(AGENTS_LIST_FOR_MOCK_RETURN);

      departmentMethods.insert(ironRouterMock);
    });

    afterEach(() => {
      ironRouterMock.request.body = {};
    });

    context('when execute successfully', () => {

      it(`should call DepartmentService.validateDepartmentData() with the department received from body of the request`, () => {
        expect(departmentServiceStub.validateDepartmentData.calledWith(bodyParams.department)).to.be.true;
      });

      it(`should call AgentService.validateAgentsData() with the agents received from body of the request`, () => {
        expect(agentServiceStub.validateAgentsData.calledWith(bodyParams.agents)).to.be.true;
      });

      it(`should call this.DepartmentService.insert() with department received from body`, () => {
        expect(departmentServiceStub.insert.calledWith(bodyParams.department)).to.be.true;
      });

      it(`should call this.AgentService.insertMany() with the departmentID and the agents received from body request`, () => {
        expect(agentServiceStub.insertMany.calledWith(ID_FOR_RETURN_INSERT_MOCK, bodyParams.agents)).to.be.true;
      });

      it(`should call this.DepartmentService.findOne() with departmentId inserted, returned by register`, () => {
        expect(departmentServiceStub.findOne.calledWith(ID_FOR_RETURN_INSERT_MOCK)).to.be.true;
      });

      it(`should call this.DepartmentService.findAllByDepartmentId() with departmentId inserted, returned by register`, () => {
        expect(agentServiceStub.findAllByDepartmentId.calledWith(ID_FOR_RETURN_INSERT_MOCK)).to.be.true;
      });

      it(`should call ResponseHelper.json() with routeHandler.response and object{httpStatus, success, data}`, () => {
        departmentMethods.insert(ironRouterMock);
        expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.success, true, {
          department: DEPARTMENT_FOR_MOCK_RETURN,
          agents: AGENTS_LIST_FOR_MOCK_RETURN
        }))).to.be.true;
      });

    });
  });

  describe('#findById()', () => {
    const requestParams = {_id: ID_FOR_RETURN_INSERT_MOCK};

    beforeEach(() => {
      ironRouterMock.params = requestParams;
      agentServiceStub.findAllByDepartmentId.returns(AGENTS_LIST_FOR_MOCK_RETURN);
      departmentServiceStub.validateDepartmentId.returns();
    });

    afterEach(() => {
      ironRouterMock.params = {};
    });

    context('when execute successfully', () => {

      context('calls', () => {

        context('when have department', () => {

          beforeEach(() => {
            departmentServiceStub.findOne.returns({});
            departmentMethods.findById(ironRouterMock);
          });

          it(`should call DepartmentService.validateDepartmentId() with the data received from params of the request`, () => {
            expect(departmentServiceStub.validateDepartmentId.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call DepartmentService.findOne() with the data received from params of the request`, () => {
            expect(departmentServiceStub.findOne.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call this.DepartmentService.findAllByDepartmentId() with departmentId inserted, returned by register`, () => {
            expect(agentServiceStub.findAllByDepartmentId.calledWith(ID_FOR_RETURN_INSERT_MOCK)).to.be.true;
          });
        });

        context('when department does NOT exist', () => {

          beforeEach(() => {
            departmentServiceStub.findOne.returns(undefined);
            departmentMethods.findById(ironRouterMock);
          });

          it(`should NOT call this.AgentService.findAllByDepartmentId() `, () => {
            expect(agentServiceStub.findAllByDepartmentId.called).to.be.false;
          });

        });
      });

      context('response', () => {
        it(`should call ResponseHelper.json() with routeHandler.response and 
      success:true, status httpStatus.success, and the department info when department was found`, () => {
          departmentServiceStub.findOne.returns(DEPARTMENT_FOR_MOCK_RETURN);
          departmentMethods.findById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.success, true, {
            department: DEPARTMENT_FOR_MOCK_RETURN,
            agents: AGENTS_LIST_FOR_MOCK_RETURN
          }))).to.be.true;
        });

        it(`should call ResponseHelper.json()  with routeHandler.response and 
      success:false, status httpStatus.notFound, and the message not found when department was not found`, () => {
          departmentServiceStub.findOne.returns(undefined);
          departmentMethods.findById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.notFound, false, {
            message: messages.departmentNotFound
          }))).to.be.true;
        });
      });
    });
  });

  describe('#removeById()', () => {
    const requestParams = {_id: ID_FOR_RETURN_INSERT_MOCK};

    beforeEach(() => {
      ironRouterMock.params = requestParams;

      departmentServiceStub.validateDepartmentId.returns();
      departmentServiceStub.removeOne.returns();

      agentServiceStub.removeByDepartmentId.returns();
    });

    afterEach(() => {
      ironRouterMock.params = {};
    });

    context('when execute successfully', () => {

      context('calls', () => {

        context('when have department', () => {

          beforeEach(() => {
            departmentServiceStub.findOne.returns({});
            departmentMethods.removeById(ironRouterMock);
          });

          it(`should call DepartmentService.validateDepartmentId() with the id received from params of the request`, () => {
            expect(departmentServiceStub.validateDepartmentId.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call DepartmentService.findOne() with the id received from params of the request`, () => {
            expect(departmentServiceStub.findOne.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call DepartmentService.removeOne() with the id received from params of the request`, () => {
            expect(departmentServiceStub.removeOne.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call AgentService.removeByDepartmentId() with the id received from params of the request`, () => {
            departmentServiceStub.findOne.returns({});
            departmentMethods.removeById(ironRouterMock);
            expect(agentServiceStub.removeByDepartmentId.calledWith(requestParams._id)).to.be.true;
          });
        });

        context('when department does NOT exist', () => {
          it(`should NOT call DepartmentService.removeOne() with the id received from params of the request`, () => {
            departmentServiceStub.findOne.returns(undefined);
            departmentMethods.removeById(ironRouterMock);
            expect(departmentServiceStub.removeOne.calledWith(requestParams._id)).to.be.false;
          });

          it(`should NOT call AgentService.removeByDepartmentId() with the id received from params of the request`, () => {
            departmentServiceStub.findOne.returns(undefined);
            departmentMethods.removeById(ironRouterMock);
            expect(agentServiceStub.removeByDepartmentId.calledWith(requestParams._id)).to.be.false;
          });
        });

      });

      context('response', () => {

        it(`should call ResponseHelper.json() with routeHandler.response and 
      success:true, status httpStatus.success when department was found`, () => {
          departmentServiceStub.findOne.returns({});
          departmentMethods.removeById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, {
            httpStatus: httpStatus.success,
            success: true
          })).to.be.true;
        });

        it(`should call ResponseHelper.json()  with routeHandler.response and 
      success:false, status httpStatus.notFound, and the message not found when department was not found`, () => {
          departmentServiceStub.findOne.returns(undefined);
          departmentMethods.removeById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.notFound, false, {
            message: messages.departmentNotFound
          }))).to.be.true;
        });
      });

    });
  });

  describe('#updateById()', () => {
    const requestParams = {_id: ID_FOR_RETURN_INSERT_MOCK};
    const bodyParams = {department: 'test', agents: [{}]};

    beforeEach(() => {
      ironRouterMock.request.body = bodyParams;
      ironRouterMock.params = requestParams;

      departmentServiceStub.updateOne.returns();
      departmentServiceStub.validateDepartmentData.returns();

      agentServiceStub.insertMany.returns(ID_FOR_RETURN_INSERT_MOCK);
      agentServiceStub.validateAgentsData.returns();
      agentServiceStub.removeByDepartmentId.returns();
      agentServiceStub.findAllByDepartmentId.returns(AGENTS_LIST_FOR_MOCK_RETURN);

    });

    afterEach(() => {
      ironRouterMock.params = {};
      ironRouterMock.request.body = {};
    });

    context('when execute successfully', () => {

      context('calls', () => {

        context('when have department', () => {
          beforeEach(() => {
            departmentServiceStub.findOne.returns(DEPARTMENT_FOR_MOCK_RETURN);
            departmentMethods.updateById(ironRouterMock);
          });

          it(`should call DepartmentService.validateDepartmentId() with the departmentId received from params of the request`, () => {
            expect(departmentServiceStub.validateDepartmentId.calledWith(requestParams._id)).to.be.true;
          });

          it(`should call DepartmentService.validateDepartmentData() with the department received from body of the request`, () => {
            expect(departmentServiceStub.validateDepartmentData.calledWith(bodyParams.department)).to.be.true;
          });

          it(`should call AgentService.validateAgentsData() with the agents received from body of the request`, () => {
            expect(agentServiceStub.validateAgentsData.calledWith(bodyParams.agents)).to.be.true;
          });

          it(`should call AgentService.removeByDepartmentId() with the agents received from body of the request`, () => {
            expect(agentServiceStub.removeByDepartmentId.called).to.be.true;
          });

          it(`should call AgentService.insertMany() with the departmentID and the agents received from body of the request`, () => {
            expect(agentServiceStub.insertMany.calledWith(ID_FOR_RETURN_INSERT_MOCK, bodyParams.agents)).to.be.true;
          });

          it(`should call DepartmentService.updateOne() with the data received from params of the request`, () => {
            expect(departmentServiceStub.updateOne.calledWith(requestParams._id, bodyParams.department, bodyParams.agents.length)).to.be.true;
          });

          it(`should call this.DepartmentService.findOne() with departmentId inserted, returned by insert`, () => {
            expect(departmentServiceStub.findOne.calledWith(ID_FOR_RETURN_INSERT_MOCK)).to.be.true;
          });
        });

        context('when NOT have depatment', () => {

          beforeEach(() => {
            departmentServiceStub.findOne.returns(undefined);
            departmentMethods.updateById(ironRouterMock);
          });

          it(`should NOT call AgentService.removeByDepartmentId() with the agents received from body of the request`, () => {
            expect(agentServiceStub.removeByDepartmentId.called).to.be.false;
          });

          it(`should NOT call AgentService.insertMany() with the departmentID and the agents received from body of the request`, () => {
            expect(agentServiceStub.insertMany.calledWith(ID_FOR_RETURN_INSERT_MOCK, bodyParams.agents)).to.be.false;
          });

          it(`should NOT call DepartmentService.updateOne() with the data received from params of the request`, () => {
            expect(departmentServiceStub.updateOne.calledWith(requestParams._id, bodyParams.department, bodyParams.agents.length)).to.be.false;
          });
        });

      });

      context('response', () => {

        it(`should call ResponseHelper.json() with routeHandler.response and object{httpStatus, success, data}`, () => {
          departmentServiceStub.findOne.returns(DEPARTMENT_FOR_MOCK_RETURN);
          departmentMethods.updateById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.success, true, {
            department: DEPARTMENT_FOR_MOCK_RETURN,
            agents: AGENTS_LIST_FOR_MOCK_RETURN
          }))).to.be.true;
        });

        it(`should call ResponseHelper.json()  with routeHandler.response and 
      success:false, status httpStatus.notFound, and the message not found when department was not found`, () => {
          departmentServiceStub.findOne.returns(undefined);
          departmentMethods.updateById(ironRouterMock);
          expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.notFound, false, {
            message: messages.departmentNotFound
          }))).to.be.true;
        });
      });

    });
  });

  describe('#findAll()', () => {

    beforeEach(() => {
      departmentServiceStub.findAll.returns(DEPARTMENTS_LIST_FOR_MOCK_RETURN);

      departmentMethods.findAll(ironRouterMock);
    });

    context('when execute successfully', () => {

      it(`should call DepartmentService.findAll()`, () => {
        expect(departmentServiceStub.findAll.called).to.be.true;
      });

      it(`should call ResponseHelper.json() with routeHandler.response and object{httpStatus, success, data}`, () => {
        departmentMethods.findAll(ironRouterMock);
        expect(ResponseHelper.json.calledWith(ironRouterMock.response, getResponseObject(httpStatus.success, true, {departments: DEPARTMENTS_LIST_FOR_MOCK_RETURN}))).to.be.true;
      });

    });
  });

  describe('When error occurs in any method of this class', () => {
    const testCases = [
        {
          method: 'insert',
          throws: () => {
            departmentServiceStub.validateDepartmentData.throws(Error('test'))
          }
        },
        {
          method: 'findById',
          throws: () => {
            departmentServiceStub.validateDepartmentId.throws(Error('test'))
          }
        },
        {
          method: 'removeById',
          throws: () => {
            departmentServiceStub.validateDepartmentId.throws(Error('test'))
          }
        },
        {
          method: 'updateById',
          throws: () => {
            departmentServiceStub.validateDepartmentId.throws(Error('test'))
          }
        },
        {
          method: 'findAll',
          throws: () => {
            departmentServiceStub.findAll.throws(Error('test'))
          }
        },
      ]
    ;

    testCases.map(testCase => {
      it(`should call ResponseHelper.error() with routeHandler.response and the error message
         when error occurs in method #${testCase.method}`, () => {
        testCase.throws();
        departmentMethods[testCase.method](ironRouterMock);
        expect(ResponseHelper.error.calledWith(ironRouterMock.response, 'test')).to.be.true;
      });
    });
  });

});
