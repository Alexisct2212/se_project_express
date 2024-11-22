const Items = require("../models/clothingItem");
const { BAD_REQUEST_STATUS_CODE, REQUEST_NOT_FOUND, DEFAULT_ERROR } = require("../utils/erros");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
    Items
    .create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
         res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const getItem = (req, res) => {
   Items
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
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
         res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      } if (err.name === "CastError") {
         res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
   Items
    .findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      }
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
         res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
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
         res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      } if (err.name === "CastError") {
         res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

module.exports = { createItem, getItem, deleteItem, updateLike, deleteLike };