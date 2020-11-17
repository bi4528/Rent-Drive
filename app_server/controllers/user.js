var nodemailer = require('nodemailer');
var dataJSON = require('../models/avti-seznam.json');
var usersJSON = require('../models/users.json');
var fs = require('fs');

/* GET profile.hbs */
const login = (req, res) => {
    res.render('login', {
        layout: 'account-layout.hbs'
    });
};

const login_attempt = (req, res) => {
    console.log(usersJSON.users);
    var success = false;
    for (var i = 0; i < usersJSON.users.length; i++) {
        //console.log(usersJSON.users[i].email);
        //console.log(usersJSON.users[i].password);
        if(usersJSON.users[i].email == req.body.email && usersJSON.users[i].password==req.body.password) {
            success = true;
            break;
        }
    }
    if (success) res.render('home', dataJSON);
    else {
        res.render('login',  {layout: 'account-layout.hbs'});
    } 
};

const register = (req, res) => {
    res.render('register', {
        layout: 'account-layout.hbs'
    });
};

const register_attempt = (req,res) => {
    usersJSON.users.push(JSON.parse(JSON.stringify(req.body)));
    console.log(usersJSON.users);
    fs.writeFile('app_server/models/users.json', JSON.stringify(usersJSON,null,'\t'), function (err) {
        if (err) throw err;
    });
    res.render('login', {
        layout: 'account-layout.hbs'
    });
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {
        layout: 'account-layout.hbs'
    });
};

const forgot_password_recover = (req, res) => {
    const email_recover_password = req.body.email


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'skupina01.sp@gmail.com',
            pass: 'lavbicsp'
        }
    });

    var mailOptions = {
        from: 'skupina01.sp@gmail.com',
        to: email_recover_password,
        subject: 'Recover Password - Rent&Drive',
        text: 'Click on this link generate reset password link'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            login(req, res);
        }
    });
}

const profile = (req, res) => {
    res.render('profile', {
        firstname: 'Josh',
        lastname: 'Smith',
        mail: 'josh_smith@gmail.com',
        phone_number: '+38670789654',
        location: 'Koper, Slovenia',
        profile_picture: '/images/oseba_template.jpg',

        owned_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ],
        favourite_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ]

    });
};

const edit_profile_action = (req, res) => {
    console.log(req);
};


const edit_profile = (req, res) => {
    res.render('edit_profile', {
        firstname: 'Tone',
        lastname: 'Bine',
        mail: 'josh_smith@gmail.com',
        phone_number: '+38670789654',
        location: 'Koper, Slovenia',
        profile_picture: '/images/car_1.jpg',

        owned_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ],
        favourite_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ]

    });
};

const tuji_profile = (req, res) => {
    res.render('tuji_profile', {
        firstname: 'Tone',
        lastname: 'Bine',
        mail: 'josh_smith@gmail.com',
        phone_number: '+38670789654',
        location: 'Koper, Slovenia',
        profile_picture: '/images/car_1.jpg',

        owned_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ],
        favourite_cars: [{
            name: 'ferrari',
            image: '/images/car_2.jpg'
        },
        {
            name: 'mustang',
            image: "/images/car_3.jpg"
        }
        ]

    });
};

module.exports = {
    login,
    login_attempt,
    register,
    register_attempt,
    forgotpassword,
    profile,
    edit_profile,
    tuji_profile,
    edit_profile_action,
    forgot_password_recover
};