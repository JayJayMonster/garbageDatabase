const express = require('express');
const {
  getGarbage,
  postGarbage,
  garbageOptions,
  garbageOptionsId,
  getGarbageId,
  deleteGarbage,
  putGarbage,
} = require('../controllers/controller');

let router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept');
  next();
});

router.use(function (req, res, next) {
  if (req.headers.accept == 'application/json' || req.method == 'OPTIONS') {
    next();
  } else {
    //Geen next
    //Stuur foutmelding
    res.status(400).send();
  }
});

router.get('/', getGarbage);
router.post('/', postGarbage);
router.options('/', garbageOptions);
router.options('/:garbageId', garbageOptionsId);
router.get('/:garbageId', getGarbageId);
router.delete('/:garbageId', deleteGarbage);
router.put('/:garbageId', putGarbage);

module.exports = router;
