const fs = require("fs");
exports.getUserInfo = async (requestedData) => {
  const { token } = requestedData;
  let obj = {};
  // read the file
  let data = fs.readFileSync(
    process.env.PWD + "/database_manually/data.json",
    "utf8"
  );
  obj = JSON.parse(data);
  // check if the user exists or not
  let checkUserIsExist = obj.data.filter((item) => {
    return item.token === token;
  });
  if (checkUserIsExist.length) {
    return {
      success: true,
      data: {
        fname: checkUserIsExist[0].first_name,
        lname: checkUserIsExist[0].last_name,
        password: checkUserIsExist[0].password,
      },
    };
  } else throw new Error("user does not exist");
};
