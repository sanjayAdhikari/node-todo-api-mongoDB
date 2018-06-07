const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';
bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(password,salt, (err, hash) => {
        console.log(hash);
    });
});

var hashed = '$2a$10$q0WuOYM51jsM0E6oXTeOoO/4sK3G2TVERwfXxbiaVjzl34dOV.8mm';
bcrypt.compare(password, hashed, (err, result) => {
    console.log(result);
})

// var data = {id:10};

// var token = jwt.sign(data,'Ahref6753');
// var decode = jwt.decode(token,'Ahref6753');

// console.log('decode:', decode);

// var user="Ahref6753";
// var hashed = SHA256("05").toString();

// console.log('user: ',user);
// console.log('hased:', hashed);

// var data = {
//     id:4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(this.data) + 'secretKey').toString()
// }

// if data is changed 
// token.data.id=5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secretKey').toString();
// if(resultHash === token.hash) {
//     //data was not changed
// }else{
//     //do not trust the party
// }
// console.log(token.hash);