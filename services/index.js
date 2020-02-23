
module.exports = (express) => {
    const router = require('../helpers/createRoutes')(express);
    const axios = require('./axios');
    
    return {
        router,
        axios
    }
}