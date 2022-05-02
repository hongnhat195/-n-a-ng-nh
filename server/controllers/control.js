const Control = require("../models/Control");
const axios = require("axios");

const Control = (() => {
  const setControl = async (req, res) => {
    try {
      const name = req.body.name; 
     console.log("body: ", req.body);
      await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/Tien9258/feeds/${name}/data`,
        headers: {
          "content-type": "application/json",
          "X-AIO-Key": "aio_sEMr10Iggj80Vwy3w2a76lvTBwOI",
        },
        data: {
          value: req.body.value,
        },
      });
      res.status(200).send(name);
    } catch (err) {
      if (err.message === "Invalid Date") res.status(400).send(err);
      else res.status(404).send(err);
    }
  };

  return {
    Set: setControl,
  };
})();
module.exports = Control;
