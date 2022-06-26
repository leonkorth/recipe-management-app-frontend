<template>
  <div class="container">
    <form autocomplete="off">
      <div class="form-group row">
        <div class="mb-3">
          <input autocomplete="false" v-model="nameField" type="text" class="form-control" id="ingInput"
                 placeholder="Name des Rezeptes">
        </div>
        <div class="form-group">
          <label for="instructionsField">Anleitungstext:</label>
          <textarea class="form-control" id="instructionsField" rows="3" v-model="instructionsField"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Portionen:</label>
        <select class="form-control" id="servingsField" v-model="servingsField">
          <option value="" selected disabled>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
      </div>

      <div class="container">
        <label for="durationField">Dauer:</label>

        <input class="form-control" id="durationField" v-model="durationField" type="text" required
               pattern="[0-9]{2}:[0-9]{2}" title="Schreiben Sie die Zeit im folgendem Format hh:mm" placeholder="00:00">

      </div>
      <form>
        <div class="container from-group">
          <label for="selectedIngredients">Zutaten hinzufügen:</label>
          <div class="container">
            <select class="form-control" id="selectedIngredient" v-model="selectedIngredient">
              <option selected disabled>Zutat hinzufügen:</option>
              <option v-for="ingredient in this.ingredients" :value="{id: ingredient.id, name: ingredient.name}">
                {{ capitalizeFirstLetter(ingredient.name) }}
              </option>
            </select>
          </div>
          <br>

          <div class="container">
            <input class="btn btn-primary" type="button" value="Zutat hinzufügen:" @click="saveSelectedIngredient()">
          </div>
          <br>
          <div class="container" v-for="ingredient in this.selectedIngredients" :value="ingredient.id">
            <form class="row gx-3 gy-2 align-items-center" id="recipeIngredientsValues">
              <div class="col-sm-2 container">
                <b>{{ capitalizeFirstLetter(ingredient.name) }}</b>
              </div>
              <br>

              <div class="col-sm-4 container">
                <label class="visually-hidden" for="specificSizeInputGroupUsername">Username</label>
                <div class="input-group">
                  <input type="number" class="form-control" :name="ingredient.id">
                </div>
              </div>
              <br>

              <div class="col-sm-5">
                <label class="visually-hidden" for="specificSizeSelect">Preference</label>
                <select class="form-select" id="specificSizeSelect">
                  <option selected disabled>Einheit:</option>
                  <option>kg</option>
                  <option>Liter</option>
                  <option>Einheiten</option>
                </select>
              </div>
            </form>
            <br>

          </div>
        </div>
        <br>

        <div class="container">
          <input class="btn btn-primary" type="button" value="Rezept hinzufügen" @click="postRecipe()">
        </div>
      </form>


    </form>
  </div>
</template>

<script>
export default {
  name: "InputRecipe",
  data () {
    return {
      ingredients: [],
      selectedIngredient: '',
      selectedIngredients: [],
      selectedIngredientsRecipes: [],
      nameField: '',
      instructionsField: '',
      servingsField: '',
      durationField: '',
      isVeganField: '',
      returnedRecipeObject: ''
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1)
      else return ''

      // https://www.codegrepper.com/code-examples/javascript/make+first+letter+capital+vue
    },
    saveSelectedIngredient () {
      if (!this.selectedIngredients.map(ingredient => ingredient.id).includes(this.selectedIngredient.id) && this.selectedIngredient.name != null) {
        this.selectedIngredients.push(this.selectedIngredient)
      }
    },
    postRecipe () {
      this.getRecipeIngredientInputs()
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes'
      const data = {
        name: this.nameField,
        prepTime: this.durationField.toString().concat(':00'),
        servings: this.servingsField,
        instructions: this.instructionsField

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
        .then(result => {
          console.log('created new recipe: ' + JSON.stringify(result))
          this.returnedRecipeObject = result
          this.postRecipeIngredients()
        })
        .catch(error => console.log('error', error))
    },
    postRecipeIngredients () {
      this.selectedIngredientsRecipes.forEach(ingredientRecipe => {

        const ingredientObject = this.ingredients.filter(ingredient => ingredient.id === ingredientRecipe.ingredientId)[0]

        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipeIngredients'
        const data = {
          id: {
            recipeId: this.returnedRecipeObject.id,
            ingredientId: ingredientObject.id

          },
          recipeEntity: {
            id: this.returnedRecipeObject.id,
            name: this.returnedRecipeObject.name,
            prepTime: this.returnedRecipeObject.prepTime,
            servings: this.returnedRecipeObject.servings,
            instructions: this.returnedRecipeObject.instructions
          },
          ingredientEntity: {
            id: ingredientObject.id,
            name: ingredientObject.name,
            vegetarian: ingredientObject.vegetarian,
            vegan: ingredientObject.vegan
          },
          amount: ingredientRecipe.amount,
          unit: ingredientRecipe.unit
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
          .then(result => {
            console.log('created new recipeIngredient: ' + JSON.stringify(result))
          })
          .catch(error => console.log('error', error))
      })

    },
    getRecipeIngredientInputs () {

      const onlyInputs = document.querySelectorAll('#recipeIngredientsValues input')
      const onlySelects = document.querySelectorAll('#recipeIngredientsValues select')

      const selectedIngredientRecipes = []


      onlyInputs.forEach(input => {
        selectedIngredientRecipes.push({ingredientId: parseInt(input.name, 10), amount: input.value, unit: ''})
      })

      for (let i = 0; i < onlySelects.length; i++) {
        selectedIngredientRecipes[i].unit = onlySelects[i].value
      }

      this.selectedIngredientsRecipes = selectedIngredientRecipes


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
      .then(result => {

        result.forEach(ingredient => {
          this.ingredients.push(ingredient)
        })
      })
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>
