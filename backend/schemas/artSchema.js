const Joi = require('joi')

exports.artSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required':'Please Enter Title',
    }),
    imageUrl: Joi.required().messages({
        'any.required':'Please Provide image link'
    }),
    user_id: Joi.string().required().messages({
        'any.required':'Please Provide user id'
    }),
    category: Joi.string().required().messages({
        'any.required':'Please Provide art category'
    }),
    description: Joi.string().required().messages({
        'any.required':'Please Provide art description'
    }),
    
});


exports.reviewSchema = Joi.object({
    comment: Joi.string().required().messages({
        'any.required':'Please Enter comment',
    }),
    rating: Joi.number().required().messages({
        'any.required':'Please choose rating',
    }),
    artId: Joi.string().required().messages({
        'any.required':'Please choose rating',
    }),
    userId: Joi.string().required().messages({
        'any.required':'Please choose rating',
    }),
    
})

exports.orderSchema = Joi.object({
    artId: Joi.string().required().messages({
        'any.required':'Please Enter art id comment',
    }),
    userName: Joi.string().required().messages({
        'any.required':'Please enter your name',
    }),
    email: Joi.string().required().email().messages({
        'any.required':'Please enter your email',
    }),
    userEmail: Joi.string().required().email().messages({
        'any.required':'Please enter user email',
    }),
    address: Joi.string().required().messages({
        'any.required':'Please choose address',
    }),
    number: Joi.string().required().messages({
        'any.required':'Please enter your phone number',
    }),
    
})
