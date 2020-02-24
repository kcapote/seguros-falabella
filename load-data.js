module.exports = ({ axios }) => {
  const fs = require("fs");

  const loadRules = async () => {
    try{
        const rulesExist = await axios.get('/rules');
        if(rulesExist.data.length > 0){
            return true;
        }
        const rules = JSON.parse(fs.readFileSync("rules.json"));
        for (let i = 0; i < rules.length; i++) {
          await axios.post("/rules", rules[i]);
        }
        return true;
    }catch(err){
        console.error(err);
        return false;
    }

  };

  const loadProducts = async () => {
    try {
      let rules = await axios.get("/rules");
      let products = JSON.parse(fs.readFileSync("products.json"));

      rules = rules.data.objs;

      for (let i = 0; i < products.length; i++) {
        if (
          products[i].name === "Cobertura" ||
          products[i].name === "Baja cobertura"
        ) {
          products[i].rules = rules.filter(
            rule => rule.name === "SALEIN -1" || rule.name === "PRICE -1"
          );
        }
        if (
          products[i].name === "Full cobertura" ||
          products[i].name === "Full cobertura super duper"
        ) {
          products[i].rules = rules.filter(
            rule =>
              rule.name === "PRICE +1" ||
              rule.name === "PRICE +2" ||
              rule.name === "PRICE +3" ||
              rule.name === "SALEIN -1"
          );
        }
        if (products[i].name === "Super avance") {
          products[i].rules = rules.filter(
            rule => rule.name === "SALEIN -1" || rule.name === "SUPER AVANCE -2"
          );
        }
        if (products[i].name === "Mega cobertura") {
          products[i].rules = rules.filter(
            rule =>
              rule.name === "SALEIN STATIC" || rule.name === "PRICE STATIC"
          );
        }
        await axios.post("/products", products[i]);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const loadData = () =>{
    const result = loadRules();
    if(result){
        loadProducts();
        console.log('Datos iniciales cargados....');
    }

  }

  return {
    loadRules,
    loadProducts
  }

};
