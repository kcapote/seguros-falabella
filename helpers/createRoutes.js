
module.exports = (express) => {
    
    class Router extends express.Router {
        constructor() {
          super();      
        }
    
       createRoutes = (resource) => ( controller ) => {
            
            this.get(`/${resource}/:id`, controller.get)
        
            this.get(`/${resource}`, controller.gets)
        
            this.post(`/${resource}`, controller.post)
            
            this.put(`/${resource}/:id`, controller.update)
            
            this.delete(`/${resource}/:id`, controller.delete)
        }
    }
    
      const instance = new Router();

      return instance
}