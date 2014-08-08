
var express=require('express');
var router=express.Router();
var moment=require('moment');
var _=require=('underscore');
var color=require('cli-color');
var db=require('../../database');
var Users=db.users;

router.post('/',function(req,res) {

    //Posted info from front-end
    var body=req.body;
    //Current time this occurred
    var time=moment().format('MMMM DO YYYY, h:mm:ss a');

    //Check if user already exists
    // using their mail address
    Users.findOne({
            'email': body.email
    }), function(err, user) {
        //If there is an error, log it and return to user
        if (err) {
            console.log('Couldn\'t create new user at' + color.red(time)+ 'by' +
                color.red(body.email)+ 'because of:' + err);

            //Send the error
            res.status(500).json({
                'message': 'Internal server error from signing up new user'
            });
        }
        if(!user) {
            console.log('Creating a new user at'+ color.green(time)+ 'with the email:'+ color.green(body.email));

            //setup new user
            var newUser= new Users ({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: body.password1
            });

            newUser.save(function(err,savedUser, numberAffected) {
                if(err) {
                    console.log('Problem saving the user'+ color.yello(body.email)+
                    'due to'+ err);
                    res.status(500).json({
                        'message': 'Database error trying to sing up'
                    });
                }

                //Log sucess and send the filtered user back
                console.log('Succesfully created new user:'+ color.green(body.email));

                    res.status(201).json({
                        'message': 'Successfully created new user',
                        'client': _.omit(savedUser,'password')
                    });
            });
        }

        if(user) {
            res.status(409).json({
                'message': body.email +' already exists!'
            })
        }


    }



    console.log(req.body);

    res.json({
        'msg': 'success'
    });
});

module.exports =router;


