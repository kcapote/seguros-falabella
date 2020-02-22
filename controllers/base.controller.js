class BaseController{

    saveObject(obj,res){
        
        obj.save((err, objectSaved) => {
            console.log({err, objectSaved});            
            if(err){
                return res.status(400).json({
                    ok: false,
                    message: 'No se pudo guardar el registro',
                    errors: err,
                    user: obj
                });
            }else {
                return res.status(201).json({
                    ok: true,
                    message: 'Operación realizada de forma exitosa.',
                    objectSaved
                });
            }    
          }); 
    }

    getObject(Schema, id, res){
    
            Schema.findOne({_id: id, deletedAt: null})
                .exec((err, objFinded) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Error al consultar el registro',
                            errors: err,
                            objFinded 
                        });
                    } else {
                        
                        if(objFinded){
                            return res.status(200).json({
                                ok: true,
                                message: 'Operación realizada de forma exitosa.',
                                objFinded
                                                        
                            });
                        }else {
                            return res.status(404).json({
                                ok: false,
                                message: 'No se encontraron resultados',
                                 
                            });
                        }

                    }
                });  

    }


    getObjects(Schema,page,sizePage,res, queryObject = {} ){
        let pageTemp = page -1;

        if(queryObject == {}){
            queryObject = { deletedAt: null }
        }else{
            queryObject['deletedAt'] = null;
        }
       
        return Schema.find(queryObject)
            .skip(pageTemp*sizePage)
            .limit(sizePage)
            .exec((err, objs) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al consultar los registros',
                        errors: err
                      
                    });
                }else{
                   Schema.find(queryObject).countDocuments((err, total)=>{
                       return res.status(200).json({
                            ok: true,
                            objs,
                            page,
                            sizePage,
                            total
                       });
                   });
                   

                }
            })

    }

    updateObject(Schema,obj, id ,res){
        Schema.findById(obj.id, (err, objFinded)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    message: 'No se puede actualizar el registro',
                    errors: err
                })
            }

            if(!objFinded){
                return res.status(400).json({
                    success: false,
                    message: 'No existe un registro con el id: ' + id,
                    errors: { message: 'No se pudo encontrar el registro para actualizar' },
                   
                });
            }else{
                delete obj._id;                
                for (let p in obj) {
                    if( obj.hasOwnProperty(p) ) {
                      objFinded[p] = obj[p];
                    } 
                }      

                objFinded.updatedAt = Date.now();
                objFinded.save((err, objSaved) =>{
                    if(err){
                        return res.status(400).json({
                            ok: false,
                            message: 'No se puede actualizar el registro',
                            errors: err                           
                        });
                    }else {
                        return res.status(200).json({
                            ok: true,
                            message: 'Operación realizada de forma exitosa.',
                            objSaved
                        });

                    }

                })

            }
        });
    }

    deleteObject(Schema, id ,res){
        Schema.findById(id, (err, objFinded)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    message: 'No se puede eliminar el registro',
                    errors: err
                })
            }

            if(!objFinded){
                return res.status(400).json({
                    success: false,
                    message: 'No existe un registro con el id: ' + id,
                    errors: { message: 'No se pudo encontrar el registro para eliminar' },
                   
                });
            }else{                   
                
                objFinded.deletedAt = Date.now();
                objFinded.save((err, objSaved) =>{
                    if(err){
                        return res.status(400).json({
                            ok: false,
                            message: 'No se puede eliminar el registro',
                            errors: err                           
                        });
                    }else {
                        return res.status(200).json({
                            ok: true,
                            message: 'Operación realizada de forma exitosa.',
                            objSaved
                        });

                    }

                })

            }
        });
    }


}

module.exports = BaseController;