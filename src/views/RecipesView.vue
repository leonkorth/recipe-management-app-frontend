<template>
  <h1>Rezepte</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="recipe in recipes" :key="recipe.id">
        <div class="card">
          <img src="#" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ capitalizeFirstLetter(recipe.name) }}</h5>
            <p class="card-text">{{capitalizeFirstLetter(recipe.instructions)}}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Zubereitungszeit: {{recipe.prepTime}} </li>
            <li class="list-group-item">{{recipe.servings}} Portionen</li>
            <li class="list-group-item">vegetarisch? vegan? nicht vegetarisch?</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Rezept ansehen</a>
            <a href="#" class="card-link">Rezept bearbeiten</a>
          </div>
        </div>
      </div>
    </div>
  </div>





</template>

<script>
export default {
  name: 'RecipesView',

  data () {
    return {
      recipes: []

    }

  },
  methods: {
    capitalizeFirstLetter (string) {
      // https://www.codegrepper.com/code-examples/javascript/make+first+letter+capital+vue
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(recipe => {
        this.recipes.push(recipe)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
