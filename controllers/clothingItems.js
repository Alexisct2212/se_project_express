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
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
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
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Items.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(REQUEST_NOT_FOUND.status)
          .send({ message: REQUEST_NOT_FOUND.message });
      }

      if (item.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete this item" });
      }

      return item.deleteOne().then(() =>
        res.status(200).send({ data: item })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE.status)
          .send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res
        .status(DEFAULT_ERROR.status)
        .send({ message: DEFAULT_ERROR.message });
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
         return res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      } if (err.name === "CastError") {
         return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

module.exports = { createItem, getItem, deleteItem, updateLike, deleteLike };