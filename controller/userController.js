const axios = require("axios");

module.exports = {
  getImage: async (req, res) => {
    await axios({
      url: req.body.url,
      method: "get",
      responseType: "arraybuffer",
    })
      .then((imageData) => {
        const imageType = imageData.headers["content-type"];
        const encodedString = Buffer.from(imageData.data).toString("base64");
        res.json({
          data: { imageData: `data:${imageType};base64, ${encodedString}` },
        });
      })
      .catch((e) => {
        res.status(422).json(e);
      });
  },
};
