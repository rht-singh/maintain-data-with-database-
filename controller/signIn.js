const { Login } = require("../services/login");

exports.signIn = async (req, res) => {
  try {
    const result = await Login(req.body);
    if (result.success) {
      res.status(200).json({
        result: result.success,
        jwt: result.jwt,
        message: "Signin success",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
