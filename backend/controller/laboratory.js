class LaboratoryController{
    constructor(){
        this.laboratoryModel = require('../model/laboratory');
    }

    /**
    *   @description: Controller responsavel pela listagem
    *   @param: req, res, next
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    list(req, res, next){
        var that = this;

        that.laboratoryModel.list().then((data) => {
            if(data.length == 0){
                res.json({ message: 'Nenhum laboratório encontrado', erro: [], retorno: data });
            }else{
                res.json({ message: 'Listagem de laboratório', erro: [], retorno: data });
            }
            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar a listagem de laboratório', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela inserção
    *   @param: req, res, next
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    insert(req, res, next){
        var that = this;
        var erro = this.validation(req.body, 'I')        

        if(erro){
            res.json({ message: 'Ocorreu um erro ao inserir o laboratório', erro: erro, retorno: [] });
            next();
            return;
        }

        let param = {
            ...req.body,
            status: 1
        }
        that.laboratoryModel.insert(param).then((data) => {
            that.laboratoryModel.consult([data.insertId]).then((data) => {
                res.json({ message: 'Laboratório cadastrado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do laboratório', erro: data, retorno: [] });
                next();
                return;
            })
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao inserir o laboratório', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela alteraçao
    *   @param: req, res, next
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    update(req, res, next){
        var that = this;
        var erro = this.validation(req.body, 'U')        

        if(erro){
            res.json({ message: 'Ocorreu um erro na alteração do laboratório', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = {...req.body}

        that.laboratoryModel.update(param).then((data) => {
            if(data.affectedRows > 0){
                that.laboratoryModel.consult([req.body.id]).then((data) => {
                    res.json({ message: 'Laboratório alterado com sucesso', erro: [], retorno: data });
                    next();
                    return;
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as informações do laboratório', erro: data, retorno: [] });
                    next();
                    return;
                })
            }else{
                res.json({ message: 'Nenhum laboratório alterado', erro: [{message: 'Nenhum laboratório alterado'}], retorno: [] });
                next();
                return;
            }
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro na alteração do laboratório', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pelo delete lógico
    *   @param: req, res, next
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
   delete(req, res, next){
    var that = this;

    var param = {
        id: req.body.id,
        status: '0'
    }

    that.laboratoryModel.update(param).then((data) => {
        if(data.affectedRows > 0){
            that.laboratoryModel.consult([req.body.id]).then((data) => {
                res.json({ message: 'Laboratório deletado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do laboratório', erro: data, retorno: [] });
                next();
                return;
            })
        }else{
            res.json({ message: 'Nenhum laboratório deletado', erro: [{message: 'Nenhum laboratório deletado'}], retorno: [] });
            next();
            return;
        }
    }).catch((data) => {
        res.json({ message: 'Ocorreu um erro na alteração do laboratório', erro: data, retorno: [] });
        next();
        return;
    })
}

    /**
    *   @description: Controller responsavel pela validação
    *   @param: campos
    *   @return: false or error
    */
    validation(fields, action){
        var erro = [];

        if(!fields.name){
            erro.push('Nome inválido')
        }

        if(!fields.address){
            erro.push('Endereço inválido')
        }

        if(!fields.status){
            erro.push('Status inválido')
        }

        if((!fields.id || /[^0-9\.]/.test(fields.id)) && action != 'I'){
            erro.push('Código inválido')
        }

        if(erro.length > 0){
            return erro;
        }

        return false;
    }
}
module.exports = new LaboratoryController();
