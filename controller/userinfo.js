const { getUserInfo } = require("../services/userInfo");

exports.userInfo = async (req, res) => {
  try {
    const { token } = req;
    const result = await getUserInfo({ token });
    res.status(200).json({
      result: result.success,
      data: result.data,
    });
  } catch (err) {
    return res.status(400).json({
      result: false,
      error: err.message,
    });
  }
};
