class RouteHandler {

  constructor(route) {
    this.route = route;
  }

  post(handler) {
    this.route.post(function() {
      handler(this);
    });
    return this;
  }

  get(handler) {
    this.route.get(function() {
      handler(this);
    });
    return this;
  }

  put(handler) {
    this.route.put(function() {
      handler(this);
    });
    return this;
  }

  delete(handler) {
    this.route.delete(function() {
      handler(this);
    });
    return this;
  }
}

export default RouteHandler;