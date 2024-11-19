const items = require("../models/clothingItem");
const { BAD_REQUEST_STATUS_CODE, REQUEST_NOT_FOUND, DEFAULT_ERROR } = require("../utils/erros");
//
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  items
    .create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "error from createIem", e });
    });
};
const getItem = (req, res) => {
  items
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(DEFAULT_ERROR).send({ message: "get Items Failed", e });
    });
};

const updatelike = (req, res) => {
  items
    .findByIdAndUpdate(req.params.itemId,
      {$addToSet:{likes:req.user._id}},
      {new:True},)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(DEFAULT_ERROR).send({ message: "Error from UpdateLike", e })
    );
};

const deleteItem = (req, res) => {
  const {itemId} = req.params;
  items
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) =>
      res.status(DEFAULT_ERROR).send({ message: "error from deleteItem", e })
    );
};
const deleteLike = (req, res) => {
  items
    .findByIdAndDelete(req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true },)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) =>
      res.status(DEFAULT_ERROR).send({ message: "error from deleteLike", e })
    );
};
module.exports = { createItem, getItem, deleteItem, updatelike,deleteLike };
