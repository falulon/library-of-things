Joi = require("joi");

module.exports.productsSchema = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    amount: Joi.number(),
    numOfUse: Joi.number(),
    value: Joi.number(),
    location: Joi.string(),
    asDesk: Joi.string(),
    oldBorrowHistory: Joi.string(),
    comments: Joi.string(),
    reservedTo: Joi.array(),
    currentlyBorrowedTo: Joi.array(),
    borrowHistory: Joi.array(),
    returnDate: Joi.date(),
    donatedFrom: Joi.string(),
    image: Joi.string().uri(),
    description: Joi.string(),
  }).required(),
});

// module.exports.commentSchema = Joi.object({
//   comment: Joi.object({
//     body: Joi.string().required().escapeHTML(),
//   }).required(),
//   deleteImages: Joi.array(),
// });

// module.exports.dictionarySchema = Joi.object({
//   hebrew: Joi.string().required().escapeHTML(),
//   english: Joi.string().allow(null).allow("").escapeHTML(),
//   arabic: Joi.string().allow(null).allow("").escapeHTML(),
//   link: Joi.string().optional().allow(null).allow("").escapeHTML(),
//   importantInfo: Joi.any(),
// });
