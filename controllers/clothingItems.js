const items = require("../models/clothingItem");
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
      res.status(500).send({ message: "error from createIem", e });
    });
};
const getItem = (req, res) => {
  items
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "get Items Failed", e });
    });
};
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;
  console.log(itemId, imageUrl);
  items
    .findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: "Error from Updateitem", e })
    );
};

const deleteItem = (req, res) => {
  items
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) =>
      res.status(500).send({ message: "error from deleteItem", e })
    );
};
module.exports = { createItem, getItem, deleteItem, updateItem };
