const User = require("../models/user.js");

module.exports.renderSignUp =  (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    try {
      req.flash("success", "Welcome Back!");
      const redirectUrl = res.locals.redirectUrl || "/listings";
      delete res.locals.redirectUrl;
      res.redirect(redirectUrl);
    } catch (err) {
      req.flash("error", "Something went wrong.");
      res.redirect("/login");
    }
  };

module.exports.logout =  (req, res , next) => {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You have logged out successfully!");
        res.redirect("/listings");
    });
};

module.exports.signup = async (req, res) => {
    try{
        let { username, email, password } = req.body;
    const newUser = new User({ email , username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err) return next(err);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    });

    }catch(e){
        req.flash("error", e.message);
        res.redirect("signup");
    }
};