<template>
  <h1>Ingredients</h1>
  <div>
    <div container>
    <InputIng></InputIng>
    </div>
    <br>
    <div class="container-fluid container">
      <ol class="list-group list-group-numbered">
        <div class="row row-cols-1 row-cols-md-4 g-4 container">
          <div class="col" v-for="ingredient in ingredients" :key="ingredient.id">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold ">{{ ingredient.name }}</div>
                <p>Die Zutat ist
                  <span class="font-weight-bold">{{ingredient.vegetarian ? 'vegetarisch' : 'nicht vegetarisch'}}</span> und
                  {{ ingredient.vegan ? 'vegan' : 'nicht vegan' }}</p>
                <img :src="getLabel(ingredient)"  class="logo" >
              </div>
            </li>
          </div>
        </div>
      </ol>
    </div>
  </div>

</template>

<script>
import InputIng from "@/components/InputIngriedient"
export default {
  name: 'IngredientsView',
  components: {InputIng},

  data (){
    return {
      ingredients: []

    }

  },
  methods: {
    getLabel (ingredient){
      if(ingredient.vegan){
        return require('../assets/vegan.png')
      } else if(!ingredient.vegan && ingredient.vegetarian){
        return require('../assets/vegetarian.png')
      } else return require('../assets/not_vegie.jpeg')
    }

  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/ingredients'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(ingredient => {
        this.ingredients.push(ingredient)
      }))
      .catch(error => console.log('error', error))

  }
}
</script>

<style scoped>

</style>
