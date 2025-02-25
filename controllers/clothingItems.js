const Items = require("../models/clothingItem");
const {badRequestError,unauthorizedError,notFoundError,internalServerError,forbiddenError} =require("../utils/centralizedErros")

const createItem = (req, res,next) => {
  const { name, weather, imageUrl } = req.body;
    Items
    .create({ name, weather, imageUrl,owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(badRequestError("Wrong Input Field"));
      }
      return next(internalServerError());
    });
};

const getItem = (req, res,next) => {
   Items
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError("User Not Found"))
      }
      if (err.name === "CastError") {
        return next(badRequestError("Wrong User ID"))
      }
      return next(internalServerError())
    });
};

const updateLike = (req, res,next) => {
  Items
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError())
      }
      if (Items.owner.toString() !== req.user._id) {
        return next(unauthorizedError("Wrong user"))
      }
      if (err.name === "CastError") {
        return next(badRequestError())
      }
      return next(internalServerError());
        });
};

const deleteItem = (req, res,next) => {
  const { itemId } = req.params;

  Items.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(notFoundError())
      }

      if (item.owner.toString() !== req.user._id) {
        return next(forbiddenError("Wrong user"))
      }

      return item.deleteOne().then(() =>
        res.status(200).send({ data: item })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next (badRequestError());
      }
      return next(internalServerError());
    });
};

const deleteLike = (req, res, next) => {
   Items
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError());
      } if (err.name === "CastError") {
        return next(badRequestError());
      }
      return next(internalServerError());
    });
};

module.exports = { createItem, getItem, deleteItem, updateLike, deleteLike };