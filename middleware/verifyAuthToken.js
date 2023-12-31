const jwt = require("jsonwebtoken");
const HttpError = require("../Models/http-error");

const verifyIsLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.cookies.UserAccess_token;
    if (!token) {
      return res.status(403).send("Token is required for authentication.");
    }
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodeToken;
      return next();
    } catch (error) {
      return res.status(401).send("unauthorized invalid token.");
    }
  } catch (err) {
    const error = new HttpError("Unable to authenticate", 401);
    return next(err);
  }
};
const verifyIsAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized, Admin required");
  }
};
module.exports = { verifyIsLoggedIn, verifyIsAdmin };
