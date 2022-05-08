const { Signup } = require("../services/signup");

exports.register = async (req, res) => {
  try {
    let result = await Signup(req.body);
    res.status(200).json({
      result: result,
      message: "SignUp success. Please proceed to Signin",
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
