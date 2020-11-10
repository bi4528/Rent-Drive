/* GET profile.hbs */
const login = (req, res) => {
    res.render('login', {layout:'account-layout.hbs'});
};

const register = (req, res) => {
    res.render('register', {layout:'account-layout.hbs'});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {layout:'account-layout.hbs'});
};

const profile = (req, res) => {
    res.render('profile', { firstname: 'Tone', lastname: 'Bine', mail:'josh_smith@gmail.com', phone_number:'+38670789654', location: 'Koper, Slovenia', profile_picture: '/images/car_1.jpg',
    
        owned_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
            ],
        favourite_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
            ]
        
    });
};

const edit_profile_action = (req, res) => {
    console.log(req);
};


const edit_profile = (req, res) => {
    res.render('edit_profile', { firstname: 'Tone', lastname: 'Bine', mail:'josh_smith@gmail.com', phone_number:'+38670789654', location: 'Koper, Slovenia', profile_picture: '/images/car_1.jpg',
    
        owned_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
            ],
        favourite_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
            ]
        
    });
};

const tuji_profile = (req, res) => {
    res.render('tuji_profile', { firstname: 'Tone', lastname: 'Bine', mail:'josh_smith@gmail.com', phone_number:'+38670789654', location: 'Koper, Slovenia', profile_picture: '/images/car_1.jpg',
    
        owned_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
            ],
        favourite_cars: [
            {name: 'ferrari', image:'/images/car_2.jpg'},
            {name: 'mustang', image:"/images/car_3.jpg"}
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
    edit_profile_action
};