<template>
  <h1>Rezepte</h1>
  <input type="text" v-model="searchCrit" placeholder="Search recipes..." />

  <div class="container">
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Rezept hinzufügen</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Rezept hinzufügen: </h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <InputRecipe></InputRecipe>
      </div>
    </div>
  </div>
  <br>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="recipe in filterRecipes(this.recipes)" :key="recipe.id">
        <div class="card recipeCard">
          <div class="card-body">
            <h5 class="card-title">{{ capitalizeFirstLetter(recipe.name) }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item isRecipeVeganField" v-if="loaded"> {{isRecipeVegan(recipe.id)}}</li>
            <li class="list-group-item" v-if="!loaded">Platzhalter</li>
            <li class="list-group-item">Zubereitungszeit: {{recipe.prepTime}} </li>
            <li class="list-group-item">{{recipe.servings}} Portionen</li>
          </ul>
          <div class="card-body">
            <div class="card-body">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click=saveChosenRecipeID(recipe.id)>
              Rezept ansehen
            </button>
            </div>
            <a href="#" class="card-link">Rezept bearbeiten</a>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Rezept anzeigen:</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h1> {{ capitalizeFirstLetter(this.chosenRecipe.name) }}</h1>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{isRecipeVegan(chosenRecipe.id)}}</li>
            <li class="list-group-item">Zubereitungszeit: {{this.chosenRecipe.prepTime}} </li>
            <li class="list-group-item">{{this.chosenRecipe.servings}} Portionen</li>
          </ul>
          <h3>Anleitung: </h3>
          <p>
            {{this.chosenRecipe.instructions}}
          </p>
          <h3>Zutaten: </h3>
          <div>
            <ol class="list-group" v-for="recipeIngredient in recipeIngredientsForChosenRecipe" :key="recipeIngredient.id">
              <li class="list-group-item">{{recipeIngredient.amount}} {{recipeIngredient.unit.replace(/['"]+/g, '')}}  {{capitalizeFirstLetter(recipeIngredient.ingredientEntity.name)}}</li>
            </ol>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Schließen</button>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import InputRecipe from "@/components/RecipeComponents/InputRecipe"
export default {
  name: 'RecipesView',
  components: {InputRecipe},
  data () {
    return {
      loaded: false,
      searchCrit: "",
      recipes: [],
      ingredientsIds: [],
      recipeId: '',
      chosenRecipe: {
        id: '',
        name: '',
        prepTime: '',
        servings: '',
        instructions: ''
      },
      recipeIngredientsForChosenRecipe: [
        {
          id: {
            recipeId: '',
            ingredientId: ''
          },
          recipeEntity: {
            id: '',
            name: '',
            prepTime: '',
            servings: '',
            instructions: ''
          },
          ingredientEntity: {
            id: '',
            name: '',
            vegetarian: '',
            vegan: ''
          },
          amount: '',
          unit: ''
        }
      ],
      allRecipeIngredients: []


    }

  },
  methods: {
    capitalizeFirstLetter (string) {
      // https://www.codegrepper.com/code-examples/javascript/make+first+letter+capital+vue
      return string?.charAt(0).toUpperCase() + string?.slice(1)
    },

    saveChosenRecipeID (recipeId) {
      this.ingredientsIds = []
      this.recipeId = recipeId
      this.chosenRecipe = this.recipes.find(recipe => recipe.id === this.recipeId)

      const chosenRecipeIngredients = this.allRecipeIngredients.filter(recipeIngredient => recipeIngredient.id.recipeId === recipeId)
      this.recipeIngredientsForChosenRecipe = []
      chosenRecipeIngredients.forEach(chosenRecipeIngredient => this.recipeIngredientsForChosenRecipe.push(chosenRecipeIngredient))

    },

    getRecipeIngredients (recipeId) {

      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipeIngredients?recipeId=' + recipeId
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(recipeIngredient => {
          this.allRecipeIngredients.push(recipeIngredient)
        }))
        .catch(error => console.log('error', error))
    },

    isRecipeVegan (recipeId) {
      if(this.allRecipeIngredients.length === 0) return '               '
      const recipeIngredientList = this.allRecipeIngredients.filter(recipeIngredient => recipeIngredient.id.recipeId === recipeId)
      if(!recipeIngredientList.some(recipeIngredient => recipeIngredient.id.recipeId === recipeId)) { return 'keine Zutaten' } else if(recipeIngredientList.every(recipeIngredient => recipeIngredient.id.recipeId === recipeId & recipeIngredient.ingredientEntity.vegan)) { return 'vegan' } else if(recipeIngredientList.every(recipeIngredient => recipeIngredient.id.recipeId === recipeId & recipeIngredient.ingredientEntity.vegetarian)) { return 'vegetarisch' } else { return 'nicht vegetarisch' }
    },
    filterRecipes (searchCrit) {
      if (searchCrit?.length < 1) return this.recipes
      const result = []
      for (const recipe of this.recipes) {
        if (recipe.name.toLowerCase().includes(this.searchCrit.toLowerCase())){
          result.push(recipe)
        }
      }
      return result
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
        this.getRecipeIngredients(recipe.id)
        this.recipes.push(recipe)
      }))
      .then(x => { this.loaded = true })
      .catch(error => console.log('error', error))

  }



}
</script>

<style scoped>
.offcanvas{
  width: 500px;
}


</style>
