const resource = 'products';
module.exports = ( router, { productController }  ) => {
    router.createRoutes(resource)(productController);    
    router.get('/evaluateProducts/:days', productController.simulate);

    return router;
}