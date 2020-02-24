
const productRoutes = require('./product.routes');
const ruleRoutes = require('./rule.routes');  
const salesRoutes = require('./sales.routes');

module.exports = ({router, axios}, controllers) => {

    productRoutes({router, axios} , controllers);
    ruleRoutes(router, controllers); 
    salesRoutes(router, controllers);
    return router;
    
} 