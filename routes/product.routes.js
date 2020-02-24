const resource = 'products';
module.exports = ( {router, axios },  {productController}   ) => {
    router.createRoutes(resource)(productController);    
    router.get(`/${resource}/evaluateProducts/:days`, productController.simulate(axios));

    return router;
}