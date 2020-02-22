module.exports = (() => {
  const BaseController = require("./base.controller");
  let base = new BaseController();
  let Product = require("../models/products.model");
  const saveObject = (req, res) => {
    let product = new Product({
      ...req.body
    });
    return base.saveObject(product, res);
  };

  const getObject = (req, res) => {
    let id = req.params.id;
    return base.getObject(Product, id, res);
  };

  const updateObject = (req, res) => {
    let product = {
      ...req.body,
      id: req.params.id
    };
    return base.updateObject(Product, product, id, res);
  };

  const getObjects = (req, res) => {
    let page = Number(req.query.page);
    let sizePage = Number(req.query.sizePage);
    return base.getObjects(Product, page, sizePage, res);
  };

  const deleteObject = (req, res) => {
    let id = req.params.id;
    return base.deleteObject(Product, id, res);
  };

  const simulate  = () => {

  }

  return {
    post: saveObject,
    get: getObject,
    update: updateObject,
    gets: getObjects,
    delete: deleteObject,
    simulate
  };
})();
