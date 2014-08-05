
/**
 * Created by MAKA on 6/08/14.
 */

module.exports = function (app) {

    //The signup route
    app.use('signup', require('./routes/signup'));
};