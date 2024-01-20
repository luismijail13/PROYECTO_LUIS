const mongoose = require("mongoose");

const EstudianteSchema = new mongoose.Schema({
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

  edad: {
    type: Number,
    required: true,
    validate: {
        validator: function (value) {
            return value > 0;
            },
            message: () => "Please enter a valid age",
        },
  },
  
  correo_personal: {
    type: String,
    required: true,
  },

    taller_matriculado: {
    type: String,
    required: true,
  
  },

  nivel_dificultad: {
    type: String,
    required: true,
  },

});

const Estudiante = mongoose.model("Estudiante", EstudianteSchema);

module.exports = { Estudiante };