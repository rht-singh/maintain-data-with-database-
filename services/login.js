const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

/**
 *
 * @param {*} requestedData
 * {
 * username , password
 * }
 * @returns - { success :true , jwt: token}
 *
 */
exports.Login = async (requestedData) => {
  const { username, password } = requestedData;
  if (!username.length || !password.length)
    throw new Error("Username or password is empty");
  let obj = {};
  // read the file
  let data = fs.readFileSync(
    process.env.PWD + "/database_manually/data.json",
    "utf8"
  );
  obj = JSON.parse(data);
  // check if the user exists or not
  let checkUserIsExist = obj.data.filter((item) => {
    return item.username === username;
  });
  // check password is valid or not
  let checkPassword = await bcrypt.compare(
    password,
    checkUserIsExist[0].password
  );
  if (!checkPassword) throw new Error("Password is incorrect");
  // assign a token when the user logged in successfully
  let token = jwt.sign(
    {
      username: checkUserIsExist[0].username,
      firstname: checkUserIsExist[0].first_name,
    },
    process.env.SECRET_KEY
  );
  for (let i = 0; i < obj.data.length; i++) {
    if (obj.data[i].username === username) {
      obj.data[i].token = token;
    }
  }
  let json = JSON.stringify(obj);
  // save the data again
  fs.writeFile(
    process.env.PWD + "/database_manually/data.json",
    json,
    (err) => {
      if (err) throw err;
    }
  );
  return {
    success: true,
    jwt: token,
  };
};
