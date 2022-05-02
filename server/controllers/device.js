const Device = require("../models/Device");
const axios = require("axios");
const jsons = require("../config/default");

const device = (() => {
  const getDevice = async (req, res) => {
    try {
      console.log("body:", req.body);
      const device = await Device.find();
      res.status(200).send(device);
    } catch (err) {
      res.status(404).send(err);
    }
  };
  const setDeviceLevel = async (req, res) => {
    const { name, level } = req.body;
    try {
      let device = await Device.findOne({ name });

      if (!device) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const update = {
        $set: { level: Number(level) },
      };
      const result = await Device.updateOne({ name: name }, update);
      res.json({ level });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
  const setDeviceStatus = async (req, res) => {
    try {
      const name = req.body.name;
      console.log("setDeviceStatus", req.body);
      await axios({
        method: "post",
        url: `https://io.adafruit.com/api/v2/Tien9258/feeds/${name}/data`,
        headers: {
          "content-type": "application/json",
          "X-AIO-Key": jsons.AIO_KEY,
        },
        data: {
          value: req.body.value,
        },
      }).then((data) => {
        res.status(200).send(data.data.value);
      });
    } catch (err) {
      res.status(404).send(err);
    }
  };
  return {
    Get: getDevice,
    SetLevel: setDeviceLevel,
    Setstatus: setDeviceStatus,
  };
})();
module.exports = device;
