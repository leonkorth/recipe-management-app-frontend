<template>
<div class="container">

  <form autocomplete="off" id="ingredient-create-form" class="needs-validation" novalidate >
    <div class="form-group row" >
      <div class="mb-3">
        <input autocomplete="false" v-model="nameField" type="text" class="form-control" id="ingInput" placeholder="Name der Zutat" required>
        <div class="invalid-feedback">
          Bitte geben Sie der Zutat einen Namen.
        </div>
      </div>

    </div>
    <div class="form-row align-items-center container">
      <div class="mb-3">
        <label class="mr-sm-2" for="inlineFormCustomSelect"></label>
        <select  v-model="isVeganField" class="custom-select mr-sm-2 form-control form-select" id="inlineFormCustomSelect" required>
          <option value="" selected disabled>Bitte wählen Sie: </option>
          <option>nicht vegetarisch</option>
          <option>vegetarisch</option>
          <option>vegan</option>
        </select>
      </div>
    </div>
    <div class="mb-3" >
      <div class="col-sm-15">
        <button type="submit" class="btn btn-primary" @click.prevent="save()">Zutat hinzufügen</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  // kopiert aus Prof. Wider Frontend Repo
  name: "InputIng",
  data () {
    return{
      nameField: '',
      isVeganField: ''
    }
  },
  methods: {
    save () {
      if (this.validate()){
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/ingredients'
        const data = {
          name: this.nameField,
          vegetarian: this.isVeganField === 'vegetarisch' || this.isVeganField === 'vegan',
          vegan: this.isVeganField === 'vegan'
        }
        const requestOptions = {
          method: 'POST',
          redirect: 'follow',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
            location.reload()
          })
          .catch(error => console.log('error', error))
      }

    },
    validate () {
      const form = document.getElementById('ingredient-create-form')
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>

</style>
