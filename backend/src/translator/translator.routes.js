const express = require("express");
const router = express.Router();
const { MET } = require("bing-translate-api");

router.post("/", async (req, res) => {
  const text = req.body.text;
  const target = req.body.target;

  MET.translate(text, null, target)
    .then((resp) => {
      // console.log(res);
      res.json({ data: resp });
    })
    .catch((err) => {
      res.status(201).json({ message: err.message });
    });
});

module.exports = router;
