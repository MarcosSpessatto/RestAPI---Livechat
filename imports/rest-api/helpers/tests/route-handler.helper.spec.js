import {expect} from 'chai';
import sinon from 'sinon';
import RouteHandler from '../route-handler.helper';

describe('RestAPI - RouteHandlerHelper', () => {
    let routeHandler;

    beforeEach(() => {
        routeHandler = new RouteHandler({
            get: sinon.stub(),
            post: sinon.stub(),
            put: sinon.stub(),
            delete: sinon.stub()
        });
    });

    const testCases = [
        {
            method: 'post',
        },
        {
            method: 'get',
        },
        {
            method: 'delete',
        },
        {
            method: 'put',
        },
    ];

    testCases.map(testCase => {

        context(`#${testCase.method}()`, () => {
            it(`should call the callback with the THIS of the iron router instance,
     and call handlerCallback with the iron router THIS`, () => {
                let methodCallback;
                const handler = sinon.stub();

                routeHandler.route[testCase.method].callsFake((callback) => {
                    methodCallback = callback;
                });

                routeHandler[testCase.method](handler);
                methodCallback();
                expect(handler.calledWith(methodCallback));
            });

            it('should return itself', () => {
                expect(routeHandler[testCase.method](() => {
                })).to.be.equal(routeHandler);
            });
        });
    });
});