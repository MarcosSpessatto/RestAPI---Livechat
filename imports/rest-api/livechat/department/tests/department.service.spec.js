import {expect} from 'chai';
import sinon from 'sinon';
import DepartmentService from '../department.service';
import messages from '../../../constants/messages';
import {
    DEPARTMENT_FOR_MOCK_RETURN,
    DEPARTMENT_ID,
    DEPARTMENTS_LIST_FOR_MOCK_RETURN
} from '../../../../../tests/unit/common/rest-api/livechat/department/departments-utils-mock';
import {randomMock} from "../../../../../tests/unit/common/random-mock";
import {matchMock} from "../../../../../tests/unit/common/match-mock";

describe('RestAPI - LiveChat - DepartmentService', () => {
    let departmentService;
    let checkStub;
    let clock;
    let departmentMock;
    const date = new Date('10-10-2010');
    const ID_FOR_MOCK_RETURNS = '1';
    let department;
    let expectedDepartment;

    beforeEach(() => {
        departmentMock = {
            insert: sinon.stub(),
            update: sinon.stub(),
            findOne: sinon.stub(),
            find: sinon.stub().returns({fetch: sinon.stub()}),
            remove: sinon.stub()
        };
        checkStub = sinon.stub();
        departmentService = new DepartmentService(departmentMock, matchMock, checkStub, randomMock);
        randomMock.id.returns(ID_FOR_MOCK_RETURNS);
        clock = sinon.useFakeTimers(date.getTime());
        department = {
            _id: ID_FOR_MOCK_RETURNS,
            enabled: false,
            name: 'new from api',
            showOnRegistration: true,
            description: 'created from api'
        };
        expectedDepartment = {
            _id: ID_FOR_MOCK_RETURNS,
            enabled: department.enabled,
            name: department.name,
            showOnRegistration: department.showOnRegistration,
            description: department.description,
            numAgents: 2,
            _updatedAt: new Date()
        };
    });

    afterEach(() => {
        clock.restore();
    });

    describe('#validateDepartmentData()', () => {

        it(`should throw "${messages.verifyParameters}" when the departamentData is invalid`, () => {
            checkStub.throws(new Error(messages.verifyParameters));
            expect(departmentService.validateDepartmentData.bind(departmentService, '21')).to.throw(Error, messages.verifyParameters);
        });

        it(`should not throw an error when the parameters is correct`, () => {
            checkStub.returns();
            expect(departmentService.validateDepartmentData.bind(departmentService, {})).to.not.throw(Error);
        });

    });

    describe('#validateDepartmentId()', () => {

        it(`should throw  "${messages.verifyParameters}" when the departmentId is invalid`, () => {
            checkStub.throws(new Error(messages.verifyParameters));
            expect(departmentService.validateDepartmentId.bind(departmentService, {})).to.throw(Error, messages.verifyParameters);
        });

        it(`should not throw an error when the parameter is correct`, () => {
            checkStub.returns();
            expect(departmentService.validateDepartmentId.bind(departmentService, {})).to.not.throw(Error);
        });
    });

    describe('#insert()', () => {
        beforeEach(() => {
            departmentMock.insert.returns(ID_FOR_MOCK_RETURNS);
        });

        context('when execute successfully', () => {
            it('should call this.Agent.insert() with department for insert', () => {
                departmentService.insert(department, 2);
                expect(departmentMock.insert.calledWith(expectedDepartment)).to.be.true;
            });

            it('should return the id of department inserted', () => {
                const insertedId = departmentService.insert(department);
                expect(insertedId).to.be.equal(ID_FOR_MOCK_RETURNS);
            });
        });

        context('when occurs some error', () => {
            it(`should throw "${messages.errorOnInsert}"`, () => {
                departmentMock.insert.throws();
                expect(departmentService.insert.bind(departmentService, {})).to.throw(Error, messages.errorOnInsert);
            });
        });
    });

    describe('#findOne()', () => {
        beforeEach(() => {
            departmentMock.findOne.returns(DEPARTMENT_FOR_MOCK_RETURN);
        });

        context('when execute successfully', () => {
            it('should call this.Deparment.findOne() with departmentId', () => {
                departmentService.findOne(DEPARTMENT_ID);
                expect(departmentMock.findOne.calledWith({_id: DEPARTMENT_ID})).to.be.true;
            });

            it('should return the department with agents inside', () => {
                const departmentReturned = departmentService.findOne(DEPARTMENT_ID);
                expect(departmentReturned).to.be.eql(DEPARTMENT_FOR_MOCK_RETURN);
            });

        });

        context('when occurs some error', () => {
            it(`should throw "${messages.errorOnFind}"`, () => {
                departmentMock.findOne.throws();
                expect(departmentService.findOne.bind(departmentService, DEPARTMENT_ID)).to.throw(Error, messages.errorOnFind);
            });
        });
    });

    describe('#removeOne()', () => {

        beforeEach(() => {
            departmentMock.remove.returns();
        });

        context('when execute successfully', () => {

            it('should call this.Deparment.removeOne() with departmentId', () => {
                departmentService.removeOne(DEPARTMENT_ID);
                expect(departmentMock.remove.calledWith({_id: DEPARTMENT_ID})).to.be.true;
            });

        });

        context('when occurs some error', () => {
            it(`should throw "${messages.errorOnDelete}"`, () => {
                departmentMock.remove.throws();
                expect(departmentService.removeOne.bind(departmentService, DEPARTMENT_ID)).to.throw(Error, messages.errorOnDelete);
            });
        });
    });

    describe('#updateOne()', () => {
        beforeEach(() => {
            departmentMock.update.returns(ID_FOR_MOCK_RETURNS);
        });

        context('when execute successfully', () => {
            it('should call this.Department.update() with department for update and the id of department', () => {
                departmentService.updateOne(ID_FOR_MOCK_RETURNS, department, 2);
                expect(departmentMock.update.calledWith({_id: ID_FOR_MOCK_RETURNS}, {$set: expectedDepartment})).to.be.true;
            });

        });

        context('when occurs some error', () => {
            it(`should throw "${messages.errorOnUpdate}"`, () => {
                departmentMock.update.throws();
                expect(departmentService.updateOne.bind(departmentService, 1, {}, 2)).to.throw(Error, messages.errorOnUpdate);
            });
        });
    });

    describe('#findAll()', () => {

        beforeEach(() => {
            departmentMock.find().fetch.returns(DEPARTMENTS_LIST_FOR_MOCK_RETURN);
        });

        context('when execute successfully', () => {

            it('should call this.Deparment.find()', () => {
                departmentService.findAll();
                expect(departmentMock.find.calledWith({})).to.be.true;
                expect(departmentMock.find().fetch.called).to.be.true;
            });

            it('should return the departments list', () => {
                const departmentReturned = departmentService.findAll();
                expect(departmentReturned).to.be.eql(DEPARTMENTS_LIST_FOR_MOCK_RETURN);
            });

        });

        context('when occurs some error', () => {
            it(`should throw "${messages.errorOnFind}"`, () => {
                departmentMock.find.throws();
                expect(departmentService.findAll.bind(departmentService, DEPARTMENT_ID)).to.throw(Error, messages.errorOnFind);
            });
        });
    });
});