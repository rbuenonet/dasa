class LaboratoryModel{   

    /**
     *   @description: Model responsavel pela listagem dos laboratórios ativos
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    list(){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM laboratory WHERE status = 1').then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela listagem
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consult(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM laboratory WHERE id = ? LIMIT 1', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela inserção
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    insert(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('INSERT INTO laboratory SET ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela alteração
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    update(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('UPDATE laboratory SET ? WHERE id = ?', [param, param.id]).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    

}
module.exports = new LaboratoryModel();
