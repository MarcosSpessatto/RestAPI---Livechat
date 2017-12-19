import {expect} from 'chai';
import sinon from 'sinon';
import AgentService from '../agent.service';
import messages from '../../../constants/messages';
import {DEPARTMENT_ID} from '../../../../../tests/unit/common/rest-api/livechat/department/departments-utils-mock';
import {matchMock} from '../../../../../tests/unit/common/match-mock';
import {randomMock} from '../../../../../tests/unit/common/random-mock';

describe('RestAPI - LiveChat - AgentService', () => {
  let checkStub;
  let agentService;
  let agentMock;
  let clock;
  const date = new Date('10-10-2010');
  const ID_FOR_MOCK_RETURNS = '1';
  let agent;
  let expectedAgent;

  beforeEach(() => {
    randomMock.id.returns(ID_FOR_MOCK_RETURNS);
    clock = sinon.useFakeTimers(date.getTime());
    checkStub = sinon.stub();
    agentMock = {
      insert: sinon.stub(),
      update: sinon.stub(),
      findOne: sinon.stub(),
      find: sinon.stub().returns({fetch: sinon.stub()}),
      remove: sinon.stub()
    };
    agentService = new AgentService(agentMock, matchMock, checkStub, randomMock);
    agent = {
      agentId: 'SQafHvoFPuB57NmBD',
      username: 'john.doe',
      count: 0,
      order: 0
    };
    expectedAgent = {
      _id: ID_FOR_MOCK_RETURNS,
      agentId: agent.agentId,
      departmentId: 1,
      username: agent.username,
      count: agent.count,
      order: agent.order,
      _updatedAt: new Date()
    };
  });

  afterEach(() => {
    clock.restore();
  });

  describe('#validateAgentData()', () => {

    it(`should throw "${messages.verifyParameters}" when the agentData is invalid`, () => {
      checkStub.throws(new Error(messages.verifyParameters));
      expect(agentService.validateAgentData.bind(agentService, '21')).to.throw(Error, messages.verifyParameters);
    });

    it(`should not throw an error when the parameters is correct`, () => {
      checkStub.returns();
      expect(agentService.validateAgentData.bind(agentService, {})).to.not.throw(Error);
    });

  });

  describe('#validateAgentsData()', () => {

    it(`should throw "${messages.verifyParameters}" when some agent of array of agents is invalid`, () => {
      checkStub.throws(new Error(messages.verifyParameters));
      expect(agentService.validateAgentsData.bind(agentService, '21')).to.throw(Error, messages.verifyParameters);
    });

    it(`should not throw an error when the parameters is correct`, () => {
      checkStub.returns();
      expect(agentService.validateAgentsData.bind(agentService, [{id: '1'}])).to.not.throw(Error);
    });

  });

  describe('#insert()', () => {

    beforeEach(() => {
      agentMock.insert.returns(ID_FOR_MOCK_RETURNS);
    });

    context('when execute successfully', () => {
      it('should call this.Agent.insert with agent for insert and with departmentId', () => {
        agentService.insert(1, agent);
        expect(agentMock.insert.calledWith(expectedAgent)).to.be.true;
      });

      it('should return the id of agent inserted', () => {
        const insertedId = agentService.insert(ID_FOR_MOCK_RETURNS, agent);
        expect(insertedId).to.be.equal(ID_FOR_MOCK_RETURNS);
      });
    });
  });

  describe('#insertMany()', () => {

    beforeEach(() => {
      agentMock.insert.returns(ID_FOR_MOCK_RETURNS);
    });

    context('when execute successfully', () => {
      it('should call this.Agent.insertMany with agents for insert and with departmentId', () => {
        agentService.insertMany(1, [agent]);
        expect(agentMock.insert.calledWith(expectedAgent)).to.be.true;
      });
    });
  });

  describe('#removeByDepartmentId()', () => {

    beforeEach(() => {
      agentMock.remove.returns();
    });

    context('when execute successful', () => {

      it('should call this.Deparment.removeOne with departmentId', () => {
        agentService.removeByDepartmentId(DEPARTMENT_ID);
        expect(agentMock.remove.calledWith({departmentId: DEPARTMENT_ID})).to.be.true;
      });
    });
  });

  describe('#findAllByDepartmentId()', () => {

    beforeEach(() => {
      agentMock.find().fetch.returns();
    });

    context('when execute successfully', () => {
      it('should call this.Deparment.find with departmentId', () => {
        agentService.findAllByDepartmentId(DEPARTMENT_ID);
        expect(agentMock.find.calledWith({departmentId: DEPARTMENT_ID})).to.be.true;
      });

    });
  });

  describe('When error occurs in any method of this class that iterate with DB', () => {

    const testCases = [
      {
        method: 'insert',
        throws: () => agentMock.insert.throws(),
        error: messages.errorOnInsert
      },
      {
        method: 'insertMany',
        throws: () => agentMock.insert.throws(),
        error: messages.errorOnInsert
      },
      {
        method: 'removeByDepartmentId',
        throws: () => agentMock.remove.throws(),
        error: messages.errorOnDelete
      },
      {
        method: 'findAllByDepartmentId',
        throws: () => agentMock.find.throws(),
        error: messages.errorOnFind
      },
    ];

    testCases.map(testCase => {
      it(`should throw "${testCase.error}" when an error occurs in #${testCase.method}()`, () => {
        testCase.throws();
        expect(agentService[testCase.method].bind(agentService)).to.throw(Error, testCase.error);
      });
    })
  })

});