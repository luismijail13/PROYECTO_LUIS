<template>

   <div>
    <img src="C:\Users\luism\Desktop\logo.jpg" alt="Logo LMUSIC">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    
    

    <!-- Barra para ingresar datos -->
    <form @submit.prevent="submitForm">

         <h2>{{ greeting3 }}</h2>

      <div class="form-column">
          <label for="campo8">Ingresa el taller al que deseas inscribirte:</label>
          <input v-model="formData.campo8" type="text" id="campo8" placeholder="Ej:Flauta">
        </div>
        
        <button @click="onClickButton">Enviar Datos</button>

        <h2>{{ greeting2 }}</h2>

      <div class="form-row">
        <div class="form-column">
          <label for="campo1">Prenombres:</label>
          <input v-model="formData.campo1" type="text" id="campo1" placeholder="Ej: Luis Mijail">
        </div>

        <div class="form-column">
          <label for="campo2">Apellido Paterno:</label>
          <input v-model="formData.campo2" type="text" id="campo2" placeholder="Ej: Tacca">
        </div>

         <div class="form-column">
          <label for="campo3">Apellido Materno:</label>
          <input v-model="formData.campo3" type="text" id="campo3" placeholder="Ej: Quispe">
        </div>

        	<div class="form-column">
          <label for="campo4">Edad:</label>
          <input v-model="formData.campo4" type="text" id="campo4" placeholder="Ej:29">
        </div>

           <div class="form-column">
          <label for="campo5">Correo Personal:</label>
          <input v-model="formData.campo5" type="text" id="campo5" placeholder="Ej:luis.tacca@gmail.com">
        </div>

        <div class="form-column">
          <label for="campo6">Taller Escogido:</label>
          <input v-model="formData.campo6" type="text" id="campo6" placeholder="Ej:Piano">
        </div>

         <div class="form-column">
          <label for="campo7">Nivel Dificultad:</label>
          <input v-model="formData.campo7" type="text" id="campo7" placeholder="Ej:Basico">
        </div>
       

        <!-- Repetir la estructura para los demás campos -->
        <!-- ... -->
      </div>


        
        <button type="submit">Enviar Datos</button>



      
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      greeting: "EDMUSIC ACADEMIA",
      greeting2: "Inscripción del estudiante:",
      greeting3: "Busca a los docentes que imparten el taller:",
      message: "Bienvenido. Comienza con tu inscripción",
      formData: {
        campo1: "",
        campo2: "",
        campo3: "",
        campo4: "",
        campo5: "",
        campo6: "",
        campo7: "",
        campo8: ""
      }
    };
  },

  methods: {
   
        async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:3000/estudiante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prenombres: this.formData.campo1,
            apellido_paterno: this.formData.campo2,
            apellido_materno: this.formData.campo3,
            edad: this.formData.campo4,
            correo_personal: this.formData.campo5,
            taller_matriculado: this.formData.campo6,
            nivel_dificultad: this.formData.campo7,
           
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
        } else {
          console.error('Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }, 
       
 
  }
};
</script>

<style scoped>
  img {
    max-width: 50%;
    height: auto;
    margin-bottom: 20px;
  }

  h1 {
    color: #9e5e0a;
    font-size: 50px;
  }

  h2 {
    color: #063080;
    font-size: 17px;
    text-align: left;
  }

  p {
    font-size: 18px;
    color: #333;
  }

  button {
    background-color: #9e5e0a;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }

  button:hover {
    background-color: #7b4208;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  .form-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .form-column {
    flex-basis: calc(20% - 15px); /* 100% / 7 - margin */
  }

</style>
