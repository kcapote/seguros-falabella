
const productRoutes = require('./product.routes');
  

module.exports = ({router}, controllers) => {

    productRoutes(router , controllers);
  
    return router;
    
} 