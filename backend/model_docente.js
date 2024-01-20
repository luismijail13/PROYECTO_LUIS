const mongoose = require("mongoose");

const DocenteSchema = new mongoose.Schema({
  prenombres: {
    type: String,
    required: true,
  },
  apellido_paterno: {
    type: String,
    required: true,
  },

  apellido_materno: {
    type: String,
    required: true,
  },

   correo_personal: {
    type: String,
    required: true,
  },

  celular_personal: {
    type: String,
    required: true,
  },

    taller_especialidad: {
    type: String,
    required: true,
    },

    grado_estudio: {
    type: String,
    required: true,
    },

});

const Docente = mongoose.model("Docente", DocenteSchema);

module.exports = { Docente };