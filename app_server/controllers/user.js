var nodemailer = require('nodemailer');

/* GET profile.hbs */
const login = (req, res) => {
    res.render('login', {
        layout: 'account-layout.hbs'
    });
};

const register = (req, res) => {
    res.render('register', {
        layout: 'account-layout.hbs'
    });
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {
        layout: 'account-layout.hbs'
    });
};

const forgot_password_recover = (req, res) => {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'skupina01.sp@gmail.com',
            pass: 'lavbicsp'
        }
    });

    var mailOptions = {
        from: 'skupina01.sp@gmail.com',
        to: 'skupina01.sp@gmail.com',
        subject: 'Recover Password - Rent&Drive',
        text: 'Click on this link'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const profile = (req, res) => {
    res.render('profile', {
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
    register,
    forgotpassword,
    profile,
    edit_profile,
    tuji_profile,
    edit_profile_action,
    forgot_password_recover
};