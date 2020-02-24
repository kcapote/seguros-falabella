const resource = 'sales';

module.exports = ( router, { salesController }  ) => {
    router.createRoutes(resource)(salesController);    

    return router;
}