<template>
<div class="container">
  <form autocomplete="off">
    <div class="form-group row">
      <div class="col-sm-auto container">
        <input autocomplete="false" v-model="nameField" type="text" class="form-control" id="ingInput" placeholder="Name der Zutat">
      </div>
    </div>
    <div class="form-row align-items-center container">
      <div class="col-auto my-1">
        <label class="mr-sm-2" for="inlineFormCustomSelect"></label>
        <select  v-model="isVeganField" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
          <option value="" selected disabled>Bitte wählen Sie: </option>
          <option selected>nicht vegetarisch</option>
          <option>vegetarisch</option>
          <option>vegan</option>
        </select>
      </div>
    </div>
    <div class="form-group row container" >
      <div class="col-sm-15">
        <button type="submit" class="btn btn-primary" @click="save()">Zutat hinzufügen</button>
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
        })
        .catch(error => console.log('error', error))
      this.nameField = ''
      this.isVeganField = ''
    }
  }
}
</script>

<style scoped>

</style>
