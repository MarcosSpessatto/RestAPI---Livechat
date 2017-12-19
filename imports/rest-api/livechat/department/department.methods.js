import ResponseHelper from '../../helpers/response.helper';
import httpStatus from '../../constants/http-status';
import messages from '../../constants/messages';

const success = true;

class DepartmentMethods {

  constructor(DepartmentService, AgentService) {
    this.DepartmentService = DepartmentService;
    this.AgentService = AgentService;
  }

  static departmentNotFound() {
    return {
      httpStatus: httpStatus.notFound,
      success: !success,
      data: {message: messages.departmentNotFound}
    }
  }

  insert(routeHandler) {
    const department = routeHandler.request.body;
    try {
      this.DepartmentService.validateDepartmentData(department.department);
      this.AgentService.validateAgentsData(department.agents);
      const departmentId = this.DepartmentService.insert(department.department, department.agents.length);
      this.AgentService.insertMany(departmentId, department.agents);
      ResponseHelper.json(routeHandler.response, {
        httpStatus: httpStatus.success,
        success,
        data: {
          department: this.DepartmentService.findOne(departmentId),
          agents: this.AgentService.findAllByDepartmentId(departmentId)
        }
      });
    }
    catch(error) {
      ResponseHelper.error(routeHandler.response, error.message);
    }
  }

  findById(routeHandler) {
    const departmentId = routeHandler.params._id;
    try {
      this.DepartmentService.validateDepartmentId(departmentId);
      const department = this.DepartmentService.findOne(departmentId);
      let response = {};

      if(department) {
        const agents = this.AgentService.findAllByDepartmentId(departmentId);
        response.httpStatus = httpStatus.success;
        response.success = success;
        response.data = {department, agents};
      }
      else
        response = DepartmentMethods.departmentNotFound();

      ResponseHelper.json(routeHandler.response, response);
    } catch(error) {
      ResponseHelper.error(routeHandler.response, error.message);
    }
  }

  removeById(routeHandler) {
    const departmentId = routeHandler.params._id;
    try {
      this.DepartmentService.validateDepartmentId(departmentId);
      let response = {};

      if(this.DepartmentService.findOne(departmentId)) {
        this.DepartmentService.removeOne(departmentId);
        this.AgentService.removeByDepartmentId(departmentId);
        response.httpStatus = httpStatus.success;
        response.success = success;
      }
      else
        response = DepartmentMethods.departmentNotFound();

      ResponseHelper.json(routeHandler.response, response);
    } catch(error) {
      ResponseHelper.error(routeHandler.response, error.message);
    }
  }

  updateById(routeHandler) {
    const departmentId = routeHandler.params._id;
    const departmentForUpdate = routeHandler.request.body;
    let response = {};
    try {
      this.DepartmentService.validateDepartmentId(departmentId);
      this.DepartmentService.validateDepartmentData(departmentForUpdate.department);
      this.AgentService.validateAgentsData(departmentForUpdate.agents);

      if(this.DepartmentService.findOne(departmentId)) {
        this.AgentService.removeByDepartmentId(departmentId);
        this.AgentService.insertMany(departmentId, departmentForUpdate.agents);
        this.DepartmentService.updateOne(departmentId, departmentForUpdate.department, departmentForUpdate.agents.length);

        response.httpStatus = httpStatus.success;
        response.success = success;
        response.data = {
          department: this.DepartmentService.findOne(departmentId),
          agents: this.AgentService.findAllByDepartmentId(departmentId)
        };
      }
      else
        response = DepartmentMethods.departmentNotFound();

      ResponseHelper.json(routeHandler.response, response);
    } catch(error) {
      ResponseHelper.error(routeHandler.response, error.message);
    }
  }

  findAll(routeHandler) {
    try {
      ResponseHelper.json(routeHandler.response, {
        httpStatus: httpStatus.success,
        success,
        data: {departments: this.DepartmentService.findAll()}
      });
    } catch(error) {
      ResponseHelper.error(routeHandler.response, error.message);
    }
  }
}

export default DepartmentMethods;