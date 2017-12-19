import {expect} from 'chai';
import sinon from 'sinon';
import DepartmentRoutes from '../department.routes';
import DepartmentMethods from '../department.methods';

describe('RestAPI - Livechat - DepartmentRoutes', () => {
    let departmentRoutes;
    let sandbox = sinon.sandbox.create();
    let departmentMethodsMock = new DepartmentMethods();
    let routeHelperStub = {
        createRoute: sinon.stub().returns({
            post: sinon.stub().returnsThis(),
            get: sinon.stub().returnsThis(),
            put: sinon.stub().returnsThis(),
            delete: sinon.stub().returnsThis(),
        })
    };

    beforeEach(() => {
        sandbox.stub(departmentMethodsMock.insert, 'bind').returns(departmentMethodsMock.insert);
        sandbox.stub(departmentMethodsMock.findById, 'bind').returns(departmentMethodsMock.findById);
        sandbox.stub(departmentMethodsMock.removeById, 'bind').returns(departmentMethodsMock.removeById);
        sandbox.stub(departmentMethodsMock.updateById, 'bind').returns(departmentMethodsMock.updateById);
        sandbox.stub(departmentMethodsMock.findAll, 'bind').returns(departmentMethodsMock.findAll);
        departmentRoutes = new DepartmentRoutes(routeHelperStub, departmentMethodsMock);
        departmentRoutes.initialize();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#initialize()', () => {

        const testCases = [
              {
                  'httpMethod': 'post',
                  'route': '/api/v1/livechat/department',
                  'method': 'insert'
              },
              {
                  'httpMethod': 'get',
                  'route': '/api/v1/livechat/department/:_id',
                  'method': 'findById'
              },
              {
                  'httpMethod': 'delete',
                  'route': '/api/v1/livechat/department/:_id',
                  'method': 'removeById'
              },
              {
                  'httpMethod': 'put',
                  'route': '/api/v1/livechat/department/:_id',
                  'method': 'updateById'
              },
              {
                  'httpMethod': 'get',
                  'route': '/api/v1/livechat/department',
                  'method': 'findAll'
              },
          ];

          testCases.map(testCase => {
              it(`should listen the route ${testCase.route} with http method ${testCase.httpMethod}, and with
        method for the request processing this.DepartmentMethods.${testCase.method}`, () => {
                  expect(departmentRoutes.RouteHelper.createRoute.calledWith(testCase.route)).to.be.true;
                  expect(departmentRoutes.RouteHelper.createRoute(testCase.route)[testCase.httpMethod].calledWith(departmentMethodsMock[testCase.method])).to.be.true;
              });
          });

    });

});