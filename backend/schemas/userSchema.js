const Joi = require('joi')
exports.userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'any.required':'Please Enter Your Name',
        'string.min':'Name must me greater then 3 characters',
        'string.max':'Name must be smaller then 30 characters'
    }),
    userName: Joi.string().regex(/^[a-z]+$/).lowercase().disallow(Joi.string().regex(/\s/)).min(3).max(30).required().messages({
        'string.pattern.base':'Username must contain only lowercase alphabetical characters',
        'any.required':'username is required',
        'string.min':'username must me greater then 3 characters',
        'string.max':'username must be smaller then 30 characters',
        'string.disallow': 'Username cannot contain whitespace characters',
    }),
    
    email: Joi.string().email().required().messages({
        'any.required':'Please Enter Your Email',
        'string.email':'Please Enter a valid Email'
    }),
    password: Joi.string().required().messages({
        'any.required':'Please Enter Your Password'
    }),
  });


exports.loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required':'Please Enter Your Email',
        'string.email':'Please Enter a valid Email'
    }),
    password: Joi.string().required().messages({
        'any.required':'Please Enter Your Password'
    }),
});

exports.updateUserSchema = Joi.object({
    wNumber: Joi.string().required().messages({
        'any.required':'Please Enter Your Contact Number',
    }),
    cNumber: Joi.string().required().messages({
        'any.required':'Please Enter Your Contact Number',
    }),
    profileUrl: Joi.string().required().messages({
        'any.required':'Please Enter Your Contact Number',
    }),
    address: Joi.string().required().messages({
        'any.required':'Please Enter Your Address'
    }),
    email: Joi.string().required().messages({
        'any.required':'Please Enter Your Email'
    }),
});



