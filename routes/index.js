
const productRoutes = require('./product.routes');
const ruleRoutes = require('./rule.routes');  

module.exports = ({router, axios}, controllers) => {

    productRoutes({router, axios} , controllers);
    ruleRoutes(router, controllers); 
    return router;
    
} 