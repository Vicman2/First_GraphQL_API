const joi = require('joi')

exports.validateLogin = (args)=> {
    const schema = {
        email: joi.string().email().required(), 
        password: joi.string().min(5).required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateId = (args)=> {
    const schema = {
        id : joi.string().required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}
exports.validateSignUp =(args) => {
    const schema = {
        name: joi.string().min(3).required(), 
        phone: joi.string().min(10).required(),
        email: joi.string().email().required(), 
        password: joi.string().min(5).required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateAuthor = (args) => {
    const schema = {
        name: joi.string().min(3).required(),
        website: joi.string().uri().required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateEditUser = (args) => {
    const schema = {
        id: joi.string().required(), 
        name: joi.string().min(3).optional(),
        website: joi.string().uri().optional()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateBook = (args) => {
    const schema= {
        title: joi.string().min(3).required(), 
        description: joi.string().min(10).required(), 
        price: joi.number().required(), 
        imageUrl: joi.string().optional(), 
        paperBack: joi.number().integer().required(), 
        published: joi.number().required(), // Try to pull the year and make it the maximum value
        ISBN: joi.string().required(), 
        language: joi.string().min(3).required(), 
        author: joi.string().min(3).required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateEditBook = (args) => {
    const schema = {
        title: joi.string().min(3).optional(), 
        description: joi.string().min(10).optional(), 
        price: joi.number().optional(), 
        imageUrl: joi.string().optional(), 
        paperBack: joi.number().integer().optional(), 
        published: joi.number().optional(), // Try to pull the year and make it the maximum value
        ISBN: joi.string().optional(), 
        language: joi.string().min(3).optional(), 
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateCart = (args) => {
    const schema = {
        bookId: joi.string().required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message)
}

exports.validateMakeCart = args => {
    const schema = {
        books : joi.array().required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message);
}
exports.validateChangeBookQuantity = args => {
    const schema = {
        bookId : joi.string().required(), 
        quantity: joi.number().integer().required()
    }
    const result  = joi.validate(args, schema)
    if(result.error) throw new Error(result.error.message);
}