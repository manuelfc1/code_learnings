/**
 * Created by MAKA on 6/08/14.
 */

var mongoose = require('mongoose');
var UserModel= require('./schemas/users');

//connections

var developmentDB = 'mongodb://localhost/test';

var productionDB= 'urltoyorproductiomongoDB';

var usedDB;

//if we are in development

if (process.env.NODE_ENV==='development') {

    usedDB=developmentDB;

    //connect to it via mongoose
    mongoose.connect(usedDB);
}

if (process.env.NODE_ENV==='production') {

    usedDB=productionDB;

    //connect to it via mongoose
    mongoose.connect(usedDB);

}

var db= mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));

//open the connection
db.once('open',function callbak(){
    console.log('Database Connection succesfully opened at '+ usedDB);
})

exports.users= UserModel;