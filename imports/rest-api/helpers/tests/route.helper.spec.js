import {expect} from 'chai';
import RouteHelper from '../route.helper';
import RouterMock from '../../../../tests/unit/common/router-mock';
import RouteHandler from '../route-handler.helper';

describe('RestAPI - RouteHelper', () => {
    let routeHelper;

    beforeEach(() => {
        routeHelper = new RouteHelper(RouterMock);
    });

    describe('#createRoute()', () => {
        it('should return an instance of RouterHandler', () => {
            expect(routeHelper.createRoute('test')).to.be.instanceOf(RouteHandler);
        });

        it('should call Router.route with url and an object {where: "server"}', () => {
            routeHelper.createRoute('test');
            expect(RouterMock.route.calledWith('test', {where: 'server'})).to.be.true;
        });
    });
});