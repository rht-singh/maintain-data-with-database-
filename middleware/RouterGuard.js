const jwt = require("jsonwebtoken");
exports.Auth = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) throw new Error("Please provide a JWT token");
    let token = auth.split(" ")[1];
    if (!token.length) throw new Error("Please provide a JWT token");
    let validateToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (validateToken) {
      req.token = token;
      next();
    } else throw new Error("JWT Verification Failed");
  } catch (err) {
    return res.status(400).json({
      result: false,
      error: err.message,
    });
  }
};
