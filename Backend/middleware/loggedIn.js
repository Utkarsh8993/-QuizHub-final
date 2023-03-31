const isLoggedIn = (req , res, next) =>{
    if(!req?.user){
        res.headers
        return res.redirect('http://localhost:3000/login');
    }
    next();
}

module.exports = isLoggedIn