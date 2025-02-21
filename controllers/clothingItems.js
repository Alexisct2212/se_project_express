const Items = require("../models/clothingItem");
const {badRequestError,unauthorizedError,notFoundError,internalServerError} =require("../utils/centralizedErros")

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
    Items
    .create({ name, weather, imageUrl,owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return (badRequestError("Wrong Input Field"));
      }
      return (internalServerError());
    });
};

const getItem = (req, res) => {
   Items
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return (notFoundError("User Not Found"))
      }
      if (err.name === "CastError") {
        return (badRequestError("Wrong User ID"))
      }
      return (internalServerError())
    });
};

const updateLike = (req, res) => {
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
        return (notFoundError())
      }
      if (Items.owner.toString() !== req.user._id) {
        return (unauthorizedError("Wrong user"))
      }
      if (err.name === "CastError") {
        return (badRequestError())
      }
      return (internalServerError());
        });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Items.findById(itemId)
    .then((item) => {
      if (!item) {
        return (notFoundError())
      }

      if (item.owner.toString() !== req.user._id) {
        return (unauthorizedError("Wrong user"))
      }

      return item.deleteOne().then(() =>
        res.status(200).send({ data: item })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return (badRequestError());
      }
      return (internalServerError());
    });
};

const deleteLike = (req, res) => {
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
        return (notFoundError());
      } if (err.name === "CastError") {
        return (badRequestError());
      }
      return (internalServerError());
    });
};

module.exports = { createItem, getItem, deleteItem, updateLike, deleteLike };