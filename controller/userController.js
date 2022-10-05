const axios = require("axios");

module.exports = {
  getImage: async (req, res) => {
    await axios({
      url: "https://www.fillmurray.com/1000/1000",
      method: "get",
      responseType: "stream",
    })
      .then((imageData) =>
        res.json(Buffer.from(imageData.data).toString("base64"))
      )
      .catch((e) => res.json(e));
    // return async () => {
    //   await axios({
    //     url: "https://www.fillmurray.com/1000/1000",
    //     method: "get",
    //     responseType: "stream",
    //   })
    //     .then((imageRes) =>
    //       res.json(Buffer.from(imageRes.data).toString("base64"))
    //     )
    //     .catch((e) => res.json(e));
    // };
  },
};
