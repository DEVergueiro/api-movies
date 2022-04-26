const Gender = require("../models/Gender");

const GenderController = {
  async listar(req, res) {
    const { id } = rq.params;

    const genders = await Gender.findAll();

    res.json(genders);
  },
};

module.exports = GenderController;
