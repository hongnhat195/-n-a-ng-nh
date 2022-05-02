const Data = require("../models/Data");

const getDataByDevice = (() => {
  const getdata = async (req, res) => {
    try {
      console.log("body: ", req.body);
      const datadb = await Data.find({ name: req.body.name });
      if (!datadb) throw { message: "Lost database connection!" };
      var data = [];
      var start = new Date(req.body.start);
      var end = new Date(req.body.end);
      var min = 1024,
        max = -1,
        avg = 0,
        n = 0;
      if (
        start.toString() === "Invalid Date" ||
        end.toString() === "Invalid Date"
      )
        throw { message: "Invalid Date" };
      datadb.forEach((res) => {
        if (
          res.time.getTime() >= start.getTime() &&
          res.time.getTime() <= end.getTime()
        ) {
          n++;
          data.push({ val: res.value, time: res.time });
          if (Number(res.value) < min) min = Number(res.value);
          if (Number(res.value) > max) max = Number(res.value);
          avg += Number(res.value);
        }
      });
      res.status(200).send({ min: min, max: max, avg: avg / n, data: data });
    } catch (err) {
      if (err.message === "Invalid Date") res.status(400).send(err);
      else res.status(404).send(err);
    }
  };

  return {
    Get: getdata,
  };
})();

module.exports = getDataByDevice;
