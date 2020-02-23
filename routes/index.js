
const productRoutes = require('./product.routes');
const ruleRoutes = require('./rule.routes');  

module.exports = ({router}, controllers) => {

    productRoutes(router , controllers);
    ruleRoutes(router, controllers); 
    return router;
    
} 