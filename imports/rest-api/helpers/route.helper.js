import RouterHandler from './route-handler.helper';

class RouteHelper {

  constructor(Router) {
    this.Router = Router;
  }

  createRoute(url) {
    return new RouterHandler(this.Router.route(url, {where: 'server'}));
  }

}

export default RouteHelper;