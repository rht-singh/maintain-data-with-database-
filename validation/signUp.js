const joi = require("@hapi/joi");

exports.SignupValidate = joi.object({
  username: joi.string().trim().required(),
  password: joi
    .string()
    .regex(
      /^(?!.*pass|.*Pass|.*qwer|.*Qwer)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{5,}$/
    )
    .required(),
  first_name: joi.string().trim().required(),
  last_name: joi.string().trim().required(),
});
