import RouteHelper from '../../helpers/route.helper';
import DepartmentMethods from './department.methods';
import DepartmentRoutes from './department.routes';
import DepartmentService from './department.service';
import Department from './department';

import AgentService from '../agent/agent.service';
import Agent from '../agent/agent';

const routes = (Router, Match, check, Random) => {
    const agentService = new AgentService(Agent, Match, check, Random);
    const departmentService = new DepartmentService(Department, Match, check, Random);
    const departmentMethods = new DepartmentMethods(departmentService, agentService);
    const routeHelper = new RouteHelper(Router);

    new DepartmentRoutes(routeHelper, departmentMethods).initialize();
};

export default routes;
