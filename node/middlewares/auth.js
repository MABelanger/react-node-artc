'use strict';

// Add headers to enable Cross-origin resource sharing (CORS)
module.exports = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  else {
    res.redirect('/');
  }
}
