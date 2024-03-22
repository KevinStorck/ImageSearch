const Joi = require("joi");

const addToFavouritesSchema = Joi.object({
  id: Joi.string().required(),
  favourite: Joi.object({
    title: Joi.string().required(),
    byteSize: Joi.number().required(),
    url: Joi.string().required(),
    searchTerm: Joi.string().required(),
  }).required(),
});

const removeFromFavouritesSchema = Joi.object({
  id: Joi.string().required(),
  favourite: Joi.object({
    title: Joi.string().required(),
    byteSize: Joi.number().required(),
    url: Joi.string().required(),
    searchTerm: Joi.string().required(),
    id: Joi.number().required(),
  }).required(),
});

module.exports = { addToFavouritesSchema, removeFromFavouritesSchema };
