const Person = require("../models/Person");
const { Op } = require("sequelize");
const parse = require("nodemon/lib/cli/parse");

const PersonController = {
  async listar(req, res) {
    const { termo, page = 1, limit = 30 } = req.query; // valor padrão/default
    const offset = parseInt(limit) * parseInt(page - 1);

    const filter = {
      limit: parseInt(limit),
      offset,
      attributes: ["person_name"],
    };

    if (termo) {
      Object.assign(filter, {
        where: {
          //person_name: { [Op.like]: `%${termo}%` },
          person_name: { [Op.substring]: termo },
        },
      });
    }

    const Persons = await Person.findAll(filter);

    res.json(Persons);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    await Person.update(
      {
        person_name: nome,
      },
      {
        where: {
          person_id: id,
        },
      }
    );

    // if (personUpdated[0] != 1) {
    //   return res.status(400).json("Error ao tentar atuaizar");
    // }

    // return res.json(nome);

    const personUpdated = await Person.findByPk(id);
    // const personUpdated = await Person.find({
    //   where:{
    //     person_id: id
    //   }
    // })

    return res.json(personUpdated);
  },
};

module.exports = PersonController;