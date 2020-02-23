const resource = 'rules';

module.exports = ( router, { ruleController }  ) => {
    router.createRoutes(resource)(ruleController);    

    return router;
}