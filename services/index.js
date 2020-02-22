
module.exports = (express) => {
    const router = require('../helpers/createRoutes')(express);

    
    return {
        router
    }
}