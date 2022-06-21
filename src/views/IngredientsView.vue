<template>
  <h1>Zutaten</h1>
  <div>
    <div container>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Zutat hinzufügen</button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">Fügen Sie hier eine Zutat hinzu: </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <InputIng></InputIng>
        </div>
      </div>
    </div>
    <br>
    <div class="container-fluid container">
      <ol class="list-group list-group-numbered">
        <div class="row row-cols-1 row-cols-md-4 g-4 container">
          <div class="col" v-for="ingredient in ingredients" :key="ingredient.id">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold ">{{ capitalizeFirstLetter(ingredient.name) }}</div>
                <p>Diese Zutat ist
                <span class="font-weight-bold">{{ ingredient.vegetarian ? 'vegetarisch' : 'nicht vegetarisch' }}</span>
                und
                {{ ingredient.vegan ? 'vegan' : 'nicht vegan' }}</p>
                <img :src="getLabel(ingredient)" class="logo">
              </div>
            </li>
          </div>
        </div>
      </ol>
    </div>
  </div>

</template>

<script>
import InputIng from "@/components/IngriedentComponents/InputIngriedient"

export default {
  name: 'IngredientsView',
  components: {InputIng},

  data () {
    return {
      ingredients: []

    }

  },
  methods: {
    getLabel (ingredient) {
      if (ingredient.vegan) {
        return require('../assets/vegan.png')
      } else if (!ingredient.vegan && ingredient.vegetarian) {
        return require('../assets/vegetarian.png')
      } else return require('../assets/not_vegie.jpeg')
    },
    capitalizeFirstLetter (string) {
      // https://www.codegrepper.com/code-examples/javascript/make+first+letter+capital+vue
      return string.charAt(0).toUpperCase() + string.slice(1)
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
