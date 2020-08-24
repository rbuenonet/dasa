class ExamController{
    constructor(){
        this.examModel = require('../model/exam');
    }

    /**
    *   @description: Controller responsavel pela listagem
    *   @param: req, res, next
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    list(req, res, next){
        var that = this;

        that.examModel.list().then((data) => {
            if(data.length == 0){
                res.json({ message: 'Nenhum exame encontrado', erro: [], retorno: data });
            }else{
                res.json({ message: 'Listagem de exame', erro: [], retorno: data });
            }
            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar a listagem de exame', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro ao inserir o exame', erro: erro, retorno: [] });
            next();
            return;
        }

        let param = {
            ...req.body,
            status: 1
        }
        that.examModel.insert(param).then((data) => {
            that.examModel.consult([data.insertId]).then((data) => {
                res.json({ message: 'Exame cadastrado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do exame', erro: data, retorno: [] });
                next();
                return;
            })
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao inserir o exame', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro na alteração do exame', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = {...req.body}

        that.examModel.update(param).then((data) => {
            if(data.affectedRows > 0){
                that.examModel.consult([req.body.id]).then((data) => {
                    res.json({ message: 'Exame alterado com sucesso', erro: [], retorno: data });
                    next();
                    return;
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as informações do exame', erro: data, retorno: [] });
                    next();
                    return;
                })
            }else{
                res.json({ message: 'Nenhum exame alterado', erro: [{message: 'Nenhum exame alterado'}], retorno: [] });
                next();
                return;
            }
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro na alteração do exame', erro: data, retorno: [] });
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

    that.examModel.update(param).then((data) => {
        if(data.affectedRows > 0){
            that.examModel.consult([req.body.id]).then((data) => {
                res.json({ message: 'Exame deletado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do exame', erro: data, retorno: [] });
                next();
                return;
            })
        }else{
            res.json({ message: 'Nenhum exame deletado', erro: [{message: 'Nenhum exame deletado'}], retorno: [] });
            next();
            return;
        }
    }).catch((data) => {
        res.json({ message: 'Ocorreu um erro na alteração do exame', erro: data, retorno: [] });
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

        if(!fields.type){
            erro.push('Tipo inválido')
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
module.exports = new ExamController();
