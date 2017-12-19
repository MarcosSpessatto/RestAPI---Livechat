class DepartmentRoutes {

    constructor(RouteHelper, DepartmentMethods) {
        this.DepartmentMethods = DepartmentMethods;
        this.RouteHelper = RouteHelper;
    }

    initialize() {
        this.RouteHelper.createRoute('/api/v1/livechat/department/:_id')
            .get(this.DepartmentMethods.findById.bind(this.DepartmentMethods))
            .put(this.DepartmentMethods.updateById.bind(this.DepartmentMethods))
            .delete(this.DepartmentMethods.removeById.bind(this.DepartmentMethods));

        this.RouteHelper.createRoute('/api/v1/livechat/department')
            .post(this.DepartmentMethods.insert.bind(this.DepartmentMethods))
            .get(this.DepartmentMethods.findAll.bind(this.DepartmentMethods));
    }

}

export default DepartmentRoutes;