const jwt = require("jsonwebtoken");
//this is for the scennario where there is no token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //if we want to get the user Id we have to decrypt the id
    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
    //validating the token here below
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
