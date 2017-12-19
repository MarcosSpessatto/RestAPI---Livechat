export const insertUpdateAssertion = response => {
  if(!('department' in response.body)) throw new Error('Missing "department" property');
  if(!('enabled' in response.body.department)) throw new Error('Missing "department.enabled" property ');
  if(!('name' in response.body.department)) throw new Error('Missing "department.name" property ');
  if(!('description' in response.body.department)) throw new Error('Missing "department.description" property ');
  if(!('numAgents' in response.body.department)) throw new Error('Missing "department.numAgents" property ');
  if(!('showOnRegistration' in response.body.department)) throw new Error('Missing "department.showOnRegistration" property');
  if(!('_updatedAt' in response.body.department)) throw new Error('Missing "department._updatedAt" property ');
  if(!('_id' in response.body.department)) throw new Error('Missing "department._id" property');
  if(!('agents' in response.body)) throw new Error('Missing "department.agents" property ');
  if(!('_id' in response.body.agents[0])) throw new Error('Missing "agents[0]._id" property');
  if(!('agentId' in response.body.agents[0])) throw new Error('Missing "agents[0].agentId" property ');
  if(!('departmentId' in response.body.agents[0])) throw new Error('Missing "agents[0].departmentId" property');
  if(!('username' in response.body.agents[0])) throw new Error('Missing "agents[0].username" property ');
  if(!('count' in response.body.agents[0])) throw new Error('Missing "agents[0].count" property');
  if(!('order' in response.body.agents[0])) throw new Error('Missing "agents[0].order" property');
  if(!('_updatedAt' in response.body.agents[0])) throw new Error('Missing "agents[0]._updatedAt" property');
  if(!('success' in response.body)) throw new Error('Missing "success" property ');

  return response;
};

export const listAssertion = response => {
  if(!('departments' in response.body)) throw new Error('Missing "departments" property');
  if(!('_id' in response.body.departments[0])) throw new Error('Missing "departments[0]._id" property');
  if(!('enabled' in response.body.departments[0])) throw new Error('Missing "departments[0].enabled" property ');
  if(!('name' in response.body.departments[0])) throw new Error('Missing "departments[0].name" property ');
  if(!('numAgents' in response.body.departments[0])) throw new Error('Missing "departments[0].numAgents" property ');
  if(!('showOnRegistration' in response.body.departments[0])) throw new Error('Missing "departments[0].showOnRegistration" property');
  if(!('_updatedAt' in response.body.departments[0])) throw new Error('Missing "departments[0]._updatedAt" property ');
  if(!('success' in response.body)) throw new Error('Missing "success" property ');

  return response;
};