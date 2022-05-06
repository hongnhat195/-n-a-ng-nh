//const Data = require("../models/Data");
const config = require("../config/default.json");
const axios = require("axios");

const getDataByDevice = (() => {
  const getdata = async (req, res) => {
    console.log(req.body);
    try {
      const response = await axios.get(
        `https://io.adafruit.com/api/v2/binhbuibksg0123/feeds/ourfarm-${req.body.name}/data?X-AIO-Key=${config.AIO_KEY}`
      );
      const datadb = response.data;
      console.log(datadb);
      let data = [];
      let start = new Date(req.body.start);
      let end = new Date(req.body.end);
      console.log(start.getTime(), end.getTime());
      let min = 1024,
        max = -1,
        avg = 0,
        n = 0;
      datadb.forEach((res) => {
        if (
          new Date(res.created_at).getTime() >= start.getTime() &&
          new Date(res.created_at).getTime() <= end.getTime()
        ) {
          n++;
          data.push({ val: Number(res.value), time: res.created_at });
          if (Number(res.value) < min) min = Number(res.value);
          if (Number(res.value) > max) max = Number(res.value);
          avg += Number(res.value);
        }
      });
      obj = Object.assign({ min, max, avg: avg / n, data });
      console.log(obj);
      return res.json(obj);
    } catch (err) {
      res.status(404).send(err);
    }
  };

  return {
    Get: getdata,
  };
})();

module.exports = getDataByDevice;
