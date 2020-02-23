module.exports = (() => {
    const BaseController = require("./base.controller");
    let base = new BaseController();
    let Sale = require("../models/sales.model");
  
    const saveObject = (req, res) => {
      let sale = new Sale({
        ...req.body
      });
      return base.saveObject(sale, res);
    };
  
    const getObject = (req, res) => {
      let id = req.params.id;
      return base.getObject(Sale, id, res);
    };
  
    const updateObject = (req, res) => {
      let sale = {
        ...req.body,
        id: req.params.id
      };
      return base.updateObject(Sale, sale, id, res);
    };
  
    const getObjects = (req, res) => {
      let page = Number(req.query.page);
      let sizePage = Number(req.query.sizePage);
      return base.getObjects(Sale, page, sizePage, res);
    };
  
    const deleteObject = (req, res) => {
      let id = req.params.id;
      return base.deleteObject(Sale, id, res);
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
  