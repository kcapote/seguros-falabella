module.exports = (() => {
  const BaseController = require("./base.controller");
  let base = new BaseController();
  let Product = require("../models/products.model");
  const constants = require('../helpers/constans');

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
    let id = req.params.id;
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

  const simulate  = (axios) => async (req, res) => {
    const days = req.params.days;
    const products = (await axios.get('/products')).data.objs;
    const simulation = [];

    for(let i = 0; i < days; i++ ){
      for(let j = 0; j < products.length; j++ ){

        simulation.push(engineRules(i,products[j]));
  
      }
    }


    res.status(200).json({
      days,
      simulation
    
    });
  }

  const engineRules = (currentDay, product) => {
    if(currentDay === 0){
      return {
        day: currentDay,
        name: product.name,
        sellIn: product.sellIn,
        price: product.price
        
      } 
    }

    const sellInRule = getSellInRule(currentDay, product.rules);
    const priceRule = getPriceRule(currentDay, product.rules);

     
    if(sellInRule && priceRule){
      return {
        day: currentDay,
        name: product.name,
        sellIn: product.sellIn + sellInRule.factor,
        price: product.sellIn < 0 ?  operatePrice(product.price, (priceRule.factor*2) ) : operatePrice(product.price, priceRule.factor)
      } 
    }else{
      return {
        day: currentDay,
        name: product.name,
        sellIn: product.sellIn,
        price: product.price
      } 
    }  
  }

  const operatePrice = (a, b) =>{
    const result = a + b;
    
    if(result <0 ){
      return 0;
    }else if(result> 100){
      return 100;
    }else{
      return result;
    }

  }


  const getSellInRule = (currentDay, rules) => {
    return rules.filter(rule=>{
      if(rule.dayFrom >= currentDay && currentDay <= rule.dayTo  && rule.target === constants.SELLIN){
        return rule;
      }
      
      if(rule.dayFrom === -1 && rule.dayTo === -1 && rule.target === constants.SELLIN){
        return rule;
      }

    })[0];
  }

  const getPriceRule = (currentDay, rules) => {
    return rules.filter( rule => {
      if(rule.dayFrom >= currentDay && currentDay <= rule.dayTo  && rule.target === constants.PRICE){
        return rule;
      }
    
      if(rule.dayFrom === -1 && rule.dayTo === -1 && rule.target === constants.PRICE){
        return rule;
      }
    })[0];
    
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
