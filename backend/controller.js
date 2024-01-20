const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin

//integracion de modelos

const { Estudiante } = require("./model_estudiante");
const { Docente } = require("./model_docente");

// fin de integracion

const app = express();

app.use(express.json());

app.use(cors());

//___________________ENDPOINTS___________________________________

app.get("/estudiante", async (req, res) => {
  const allEstudiantes = await Estudiante.find();
  return res.status(200).json(allEstudiantes);
});


//____________________________________________________________________________


app.get("/estudiante/:id", async (req, res) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findById(id);
  return res.status(200).json(estudiante);
});

//__________________________________________________________________________


app.get("/estudiante/taller_matriculado/:nombreTaller", async (req, res) => {
    const { nombreTaller } = req.params;
  
    try {
      // Buscar estudiantes por el subcampo taller_matriculado
      const estudiantesEnTaller = await Estudiante.find({ "taller_matriculado": nombreTaller });
  
      if (estudiantesEnTaller.length === 0) {
        return res.status(404).json({ error: "No se encontraron estudiantes para este taller" });
      }
  
      return res.status(200).json(estudiantesEnTaller);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
  //___________________________________________________________________________

  app.get("/estudiante/nivel_dificultad/:nivelDificultad", async (req, res) => {
    const { nivelDificultad } = req.params;
  
    try {
      // Buscar estudiantes por el subcampo nivel_dificultad
      const estudiantesPorNivel = await Estudiante.find({ "nivel_dificultad": nivelDificultad });
  
      if (estudiantesPorNivel.length === 0) {
        return res.status(404).json({ error: "No se encontraron estudiantes para este nivel de dificultad" });
      }
  
      return res.status(200).json(estudiantesPorNivel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
//_____________________________________________________________________________________________

app.post("/estudiante/generar_correo", async (req, res) => {
    try {
      const { id } = req.body;
  
      // Verificar que se proporcionó el campo id
      if (!id) {
        return res.status(400).json({ error: "Se requiere el ID del estudiante para generar el correo electrónico" });
      }
  
      // Buscar el estudiante en la base de datos
      const estudiante = await Estudiante.findById(id);
  
      // Verificar si el estudiante fue encontrado
      if (!estudiante) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
  
      // Crear el correo electrónico utilizando la primera letra de los nombres y apellidos
      const correoElectronico = `${estudiante.prenombres.charAt(0).toLowerCase()}${estudiante.apellido_paterno.toLowerCase()}${estudiante.apellido_materno.charAt(0).toLowerCase()}@edmusic.edu.pe`;
  
      return res.status(200).json({ correo: correoElectronico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  


//_____________________________________________________________________________


app.post("/estudiante", async (req, res) => {
  const newEstudiante = new Estudiante({ ...req.body });
  const insertedEstudiante = await newEstudiante.save();
  return res.status(201).json(insertedEstudiante);
});

//________________________________________________________________________________

app.post("/docente", async (req, res) => {
    const newDocente = new Docente({ ...req.body });
    const insertedDocente = await newDocente.save();
    return res.status(201).json(insertedDocente);
  });

//__________________________________________________________________________________

  app.get("/docente/taller_especialidad/:impTaller", async (req, res) => {
    const { impTaller } = req.params;
  
    try {
      // Buscar docentes por el campo taller_especialidad dentro del objeto
      const docentesEnTaller = await Docente.find({ "taller_especialidad": impTaller });
  
      if (docentesEnTaller.length === 0) {
        return res.status(404).json({ error: "No se encontraron docentes para este taller" });
      }
  
      return res.status(200).json(docentesEnTaller);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
});

//____________________________________________________________________________________

app.get("/docente/grado_estudio/:impGradoEstudio", async (req, res) => {
    const { impGradoEstudio } = req.params;
  
    try {
      // Buscar docentes por el campo grado_estudio
      const docentesPorGradoEstudio = await Docente.find({ "grado_estudio": impGradoEstudio });
  
      if (docentesPorGradoEstudio.length === 0) {
        return res.status(404).json({ error: "No se encontraron docentes para este grado de estudio" });
      }
  
      return res.status(200).json(docentesPorGradoEstudio);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
});



//_____________________________________________________________________________

app.put("/estudiante/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Utiliza el método findByIdAndUpdate para actualizar el documento por su ID
      const updatedEstudiante = await Estudiante.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
  
      // Verifica si se encontró y actualizó el estudiante
      if (!updatedEstudiante) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
  
      // Devuelve el estudiante actualizado
      return res.status(200).json(updatedEstudiante);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

  //_____________________________________________________________________________
  
  app.delete("/estudiante/:id", async (req, res) => {
    const { id } = req.params;
    const deletedEstudiante = await Estudiante.findByIdAndDelete(id);
    return res.status(200).json(deletedEstudiante);
  });


//___________________________________________________________________________________

app.get("/estudiante/:id/count", async (req, res) => {
    try {
      const countEstudiante = await Estudiante.countDocuments();
      return res.status(200).json({ count: countEstudiante });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
//______________________________________________________________________________________

  app.get("/estudiante/count/taller_matriculado/Piano", async (req, res) => {
    try {
      const countEstudiantesEnPiano = await Estudiante.countDocuments({ "taller_matriculado": "Piano" });
  
      return res.status(200).json({ count: countEstudiantesEnPiano });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
//___________________________________________________________________________________________

  app.get("/estudiante/count/taller_matriculado/Guitarra", async (req, res) => {
    try {
      const countEstudiantesEnGuitarra = await Estudiante.countDocuments({ "taller_matriculado": "Guitarra" });
  
      return res.status(200).json({ count: countEstudiantesEnGuitarra });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
  //_____________________________________________________________________________________________


  app.get("/estudiante/count/taller_matriculado/Flauta", async (req, res) => {
    try {
      const countEstudiantesEnFlauta = await Estudiante.countDocuments({ "taller_matriculado": "Flauta" });
  
      return res.status(200).json({ count: countEstudiantesEnFlauta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  
//_____________________________________________________________________________________________

  app.get("/estudiante/count/taller_matriculado/Violin", async (req, res) => {
    try {
      const countEstudiantesEnViolin = await Estudiante.countDocuments({ "taller_matriculado": "Violin" });
  
      return res.status(200).json({ count: countEstudiantesEnViolin });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

  //_________________________________________________________________________________________

  app.get("/estudiante/count/edad/mayores", async (req, res) => {
    try {
      const countEstudiantesMayoresEdad = await Estudiante.countDocuments({ "edad": { $gte: 18 } });
  
      return res.status(200).json({ count: countEstudiantesMayoresEdad });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  

//_________________________________________________________________________________________

  app.get("/estudiante/count/edad/menores", async (req, res) => {
    try {
      const countEstudiantesMenoresEdad = await Estudiante.countDocuments({ "edad": { $lt: 18 } });
  
      return res.status(200).json({ count: countEstudiantesMenoresEdad });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

  //_________________________________________________________________________________________
  
  app.get("/estudiante/count/guitarra_basico", async (req, res) => {
    try {
      const countEstudiantesGuitarraNivelBasico = await Estudiante.countDocuments({
        "taller_matriculado": "Guitarra",
        "nivel_dificultad": "Basico"
      });
  
      return res.status(200).json({ count: countEstudiantesGuitarraNivelBasico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });


//_________________________________________________________________________________________

  app.get("/estudiante/count/guitarra_intermedio", async (req, res) => {
    try {
      const countEstudiantesGuitarraNivelIntermedio = await Estudiante.countDocuments({
        "taller_matriculado": "Guitarra",
        "nivel_dificultad": "Intermedio"
      });
  
      return res.status(200).json({ count: countEstudiantesGuitarraNivelIntermedio });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

//_________________________________________________________________________________________

  app.get("/estudiante/count/guitarra_avanzado", async (req, res) => {
    try {
      const countEstudiantesGuitarraNivelAvanzado = await Estudiante.countDocuments({
        "taller_matriculado": "Guitarra",
        "nivel_dificultad": "Avanzado"
      });
  
      return res.status(200).json({ count: countEstudiantesGuitarraNivelAvanzado });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  


  //_________________________________________________________________________________________
  
  app.get("/estudiante/count/piano_basico", async (req, res) => {
    try {
      const countEstudiantesPianoNivelBasico = await Estudiante.countDocuments({
        "taller_matriculado": "Piano",
        "nivel_dificultad": "Basico"
      });
  
      return res.status(200).json({ count: countEstudiantesPianoNivelBasico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });


//_________________________________________________________________________________________

  app.get("/estudiante/count/piano_intermedio", async (req, res) => {
    try {
      const countEstudiantesPianoNivelIntermedio = await Estudiante.countDocuments({
        "taller_matriculado": "Piano",
        "nivel_dificultad": "Intermedio"
      });
  
      return res.status(200).json({ count: countEstudiantesPianoNivelIntermedio });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

//_________________________________________________________________________________________

  app.get("/estudiante/count/piano_avanzado", async (req, res) => {
    try {
      const countEstudiantesPianoNivelAvanzado = await Estudiante.countDocuments({
        "taller_matriculado": "Piano",
        "nivel_dificultad": "Avanzado"
      });
  
      return res.status(200).json({ count: countEstudiantesPianoNivelAvanzado });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  


  //_________________________________________________________________________________________
  
  app.get("/estudiante/count/flauta_basico", async (req, res) => {
    try {
      const countEstudiantesFlautaNivelBasico = await Estudiante.countDocuments({
        "taller_matriculado": "Flauta",
        "nivel_dificultad": "Basico"
      });
  
      return res.status(200).json({ count: countEstudiantesFlautaNivelBasico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });


//_________________________________________________________________________________________

  app.get("/estudiante/count/flauta_intermedio", async (req, res) => {
    try {
      const countEstudiantesFlautaNivelIntermedio = await Estudiante.countDocuments({
        "taller_matriculado": "Flauta",
        "nivel_dificultad": "Intermedio"
      });
  
      return res.status(200).json({ count: countEstudiantesFlautaNivelIntermedio });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

//_________________________________________________________________________________________

  app.get("/estudiante/count/flauta_avanzado", async (req, res) => {
    try {
      const countEstudiantesFlautaNivelAvanzado = await Estudiante.countDocuments({
        "taller_matriculado": "Guitarra",
        "nivel_dificultad": "Avanzado"
      });
  
      return res.status(200).json({ count: countEstudiantesFlautaNivelAvanzado });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  

//_________________________________________________________________________________________
  
app.get("/estudiante/count/violin_basico", async (req, res) => {
    try {
      const countEstudiantesViolinNivelBasico = await Estudiante.countDocuments({
        "taller_matriculado": "Violin",
        "nivel_dificultad": "Basico"
      });
  
      return res.status(200).json({ count: countEstudiantesViolinNivelBasico });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });


//_________________________________________________________________________________________

  app.get("/estudiante/count/violin_intermedio", async (req, res) => {
    try {
      const countEstudiantesViolinNivelIntermedio = await Estudiante.countDocuments({
        "taller_matriculado": "Violin",
        "nivel_dificultad": "Intermedio"
      });
  
      return res.status(200).json({ count: countEstudiantesViolinNivelIntermedio });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

//_________________________________________________________________________________________

  app.get("/estudiante/count/violin_avanzado", async (req, res) => {
    try {
      const countEstudiantesViolinNivelAvanzado = await Estudiante.countDocuments({
        "taller_matriculado": "Violin",
        "nivel_dificultad": "Avanzado"
      });
  
      return res.status(200).json({ count: countEstudiantesViolinNivelAvanzado });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
  

//conexion con el localhost

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/myDB"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();