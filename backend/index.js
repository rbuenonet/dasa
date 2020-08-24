var express = require('express')
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(cors())

app.listen(8080, function() {
    console.log('%s listening', app.name);
});

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  laboratory
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

var laboratoryController = require('./controller/laboratory');

app.route('/laboratory')
  .get(function (req, res, next) {
    laboratoryController.list(req, res, next)
  })
  .post(function (req, res, next) {
    laboratoryController.insert(req, res, next)
  })
  .put(function (req, res, next) {
    laboratoryController.update(req, res, next)
  })
  .delete(function (req, res, next) {
    laboratoryController.delete(req, res, next)
  })

/**------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  exam
 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 var examController = require('./controller/exam');

 app.route('/exam')
   .get(function (req, res, next) {
     examController.list(req, res, next)
   })
   .post(function (req, res, next) {
     examController.insert(req, res, next)
   })
   .put(function (req, res, next) {
     examController.update(req, res, next)
   })
   .delete(function (req, res, next) {
     examController.delete(req, res, next)
   })
