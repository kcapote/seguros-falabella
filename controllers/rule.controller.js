module.exports = (() => {
  const BaseController = require("./base.controller");
  let base = new BaseController();
  let Rule = require("../models/rule.model");

  const saveObject = (req, res) => {
    let rule = new Rule({
      ...req.body
    });
    return base.saveObject(rule, res);
  };

  const getObject = (req, res) => {
    let id = req.params.id;
    return base.getObject(Rule, id, res);
  };

  const updateObject = (req, res) => {
    let rule = {
      ...req.body,
      id: req.params.id
    };
    return base.updateObject(Rule, rule, id, res);
  };

  const getObjects = (req, res) => {
    let page = Number(req.query.page);
    let sizePage = Number(req.query.sizePage);
    return base.getObjects(Rule, page, sizePage, res);
  };

  const deleteObject = (req, res) => {
    let id = req.params.id;
    return base.deleteObject(Rule, id, res);
  };



  return {
    post: saveObject,
    get: getObject,
    update: updateObject,
    gets: getObjects,
    delete: deleteObject
  };
})();
