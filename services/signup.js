const fs = require("fs");
const { SignupValidate } = require(process.env.PWD + "/validation/signUp");
const bcrypt = require("bcrypt");

/**
 *
 * @param {*} requestedData
 *username,
 *password,
 *first_name,
 *last_name,
 */

exports.Signup = async (requestedData) => {
  const { username, password, first_name, last_name } = requestedData;
  let obj = {
    data: [],
  };
  // Step 1: Validate the request data
  await SignupValidate.validateAsync({
    username,
    password,
    first_name,
    last_name,
  });
  const hashPassword = await bcrypt.hash(password, 10);
  // step 2: Check if the file exists  or not
  fs.exists(
    process.env.PWD + "/database_manually/data.json",
    function (exists) {
      // if file not exists then create a new file with the name of data.json and save data in it
      if (!exists) {
        obj.data.push({
          id: 1,
          username,
          password: hashPassword,
          first_name,
          last_name,
          token: "",
        });
        let json = JSON.stringify(obj);
        fs.writeFile(
          process.env.PWD + "/database_manually/data.json",
          json,
          (err, data) => {
            if (err) throw new Error(err);
            console.log("data saved");
          }
        );
      } else {
        // if file already exists then create read a file and add new data to it
        fs.readFile(
          process.env.PWD + "/database_manually/data.json",
          function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            // check ka username is already exists or not
            if (obj.data.length > 0) {
              let data = obj.data.filter((item) => {
                return item.username === username;
              });
              if (data.length) {
                throw new Error("Username already exists");
              }
            }
            let id = obj.data.length + 1;
            obj.data.push({
              id,
              username,
              password: hashPassword,
              first_name,
              last_name,
              token: "",
            });
            let json = JSON.stringify(obj);
            fs.writeFile(
              process.env.PWD + "/database_manually/data.json",
              json,
              (err, data) => {
                if (err) throw new Error(err);
                console.log("data saved");
              }
            );
          }
        );
      }
    }
  );
  return true;
};
