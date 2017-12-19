import messages from '../../constants/messages';

class AgentService {

  constructor(Agent, Match, check, Random) {
    this.Agent = Agent;
    this.Match = Match;
    this.check = check;
    this.Random = Random;
  }

  validateAgentData(agent) {
    const pattern = this.Match.ObjectIncluding({
      agentId: String,
      username: String,
      count: Number,
      order: Number
    });

    try {
      this.check(agent, pattern);
    } catch(error) {
      throw new Error(messages.verifyParameters);
    }
  }

  validateAgentsData(agents) {
    try {
      agents.map(agent => this.validateAgentData(agent));
    } catch(error) {
      throw new Error(messages.verifyParameters);
    }
  }

  prepareAgent(departmentId, agent) {
    return {
      _id: agent._id || this.Random.id(),
      agentId: agent.agentId,
      departmentId,
      username: agent.username,
      count: agent.count,
      order: agent.order,
      _updatedAt: new Date()
    }
  }

  insert(departmentId, agent) {
    try {
      return this.Agent.insert(this.prepareAgent(departmentId, agent));
    } catch(error) {
      throw new Error(messages.errorOnInsert);
    }
  }

  insertMany(departmentId, agents){
    try {
      agents.map(agent => this.insert(departmentId, agent));
    } catch(error) {
      throw new Error(messages.errorOnInsert);
    }
  }

  removeByDepartmentId(departmentId) {
    try {
      this.Agent.remove({departmentId: departmentId});
    } catch(error) {
      throw new Error(messages.errorOnDelete);
    }
  }

  findAllByDepartmentId(departmentId) {
    try {
      return this.Agent.find({departmentId: departmentId}).fetch();
    } catch(error) {
      throw new Error(messages.errorOnFind);
    }
  }

}

export default AgentService;