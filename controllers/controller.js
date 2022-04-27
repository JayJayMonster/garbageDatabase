let Garbage = require('../models/model');

const getGarbage = async (req, res) => {
  try {
    const garbage = await Garbage.find();
    res.json(garbage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postGarbage = async (req, res) => {
  let garbage = new Garbage({
    id: req.body.id,
    user_id: req.body.user_id,
    trashtag_id: req.body.trashtag_id,
    title: req.body.title,
    text: req.body.text,
  });

  try {
    const newGarbage = await garbage.save();
    res.status(201).json(newGarbage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const garbageOptions = res => {
  res
    .status(200)
    .header('Allow', 'GET,POST,OPTIONS')
    .header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    .send();
};

const garbageOptionsId = res => {
  res
    .status(200)
    .header('Allow', 'GET,OPTIONS,DELETE,PUT')
    .header('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,PUT')
    .header('Content-Type', 'application/json')
    .send();
};

const getGarbageId = async (req, res) => {
  let garbage;
  try {
    garbage = await Garbage.findById(req.params.garbageId);
    if (garbage == null) {
      return res
        .status(404)
        .json({ message: 'Cannot find this database entry' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.garbage = garbage;
  const itemJson = garbage.toJSON();
  res.status(200).header('Content-Type', 'application/json').json(itemJson);
};

const deleteGarbage = async (req, res) => {
  let garbage;
  try {
    garbage = await Garbage.findById(req.params.garbageId);
    if (garbage == null) {
      return res
        .status(404)
        .json({ message: 'Cannot find this database entry' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.garbage = garbage;

  try {
    await res.garbage.remove();
    res.json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const putGarbage = async (req, res) => {
  let garbage;
  try {
    garbage = await Garbage.findById(req.params.garbageId);
    if (garbage == null) {
      return res
        .status(404)
        .json({ message: 'Cannot find this database entry' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.garbage = garbage;

  if (req.body.id != null) {
    res.garbage.id = req.body.id;
  }
  if (req.body.user_id != null) {
    res.garbage.user_id = req.body.user_id;
  }
  if (req.body.trashtag_id != null) {
    res.garbage.trashtag_id = req.body.trashtag_id;
  }
  if (req.body.title != null) {
    res.garbage.title = req.body.title;
  }
  if (req.body.text != null) {
    res.garbage.text = req.body.text;
  }

  try {
    const updatedGarbage = await res.garbage.save();
    res.json(updatedGarbage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getGarbage,
  postGarbage,
  garbageOptions,
  garbageOptionsId,
  getGarbageId,
  deleteGarbage,
  putGarbage,
};
