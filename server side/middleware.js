const ExpressError = require("./utils/ExpressError");
const { productsSchema } = require("./models/schemas");

module.exports.validateProduct = (req, res, next) => {
  const { error } = productsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 500);
  } else {
    next();
  }
};

// module.exports.validateDrinkType = (req, res, next) => {
//     const { error } = drinkTypeSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl
//         req.flash('error', 'Please login first!');
//         return res.redirect('/login');
//     }
//     next();
// }

// module.exports.isLoggedInAndRegistered = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl
//         return res.redirect('/register');
//     }
//     next();
// }

// module.exports.isFreshUser = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl
//         return res.redirect('/coffees');
//     }
//     next();
// }
