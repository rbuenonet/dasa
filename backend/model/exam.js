class ExamModel{   

    /**
     *   @description: Model responsavel pela listagem dos exames ativos
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    list(){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM exam WHERE status = 1').then((data) => {
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

            mysql.exec('SELECT * FROM exam WHERE id = ? LIMIT 1', param).then((data) => {
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

            mysql.exec('INSERT INTO exam SET ?', param).then((data) => {
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

            mysql.exec('UPDATE exam SET ? WHERE id = ?', [param, param.id]).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    

}
module.exports = new ExamModel();
