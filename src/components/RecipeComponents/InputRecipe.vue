<template>
  <div class="container">
    <form id="recipe-create-form" autocomplete="off" class="needs-validation" novalidate>
      <div class="form-group row">
        <div class="mb-3">
          <input id="ingInput" v-model="nameField" autocomplete="false" class="form-control"
                 placeholder="Name des Rezeptes"
                 required type="text">
          <div class="invalid-feedback">
            Bitte geben Sie einen Namen ein.
          </div>
        </div>
        <div class="form-group">
          <label for="instructionsField">Anleitungstext:</label>
          <textarea id="instructionsField" v-model="instructionsField" class="form-control"
                    required rows="3"></textarea>
          <div class="invalid-feedback">
            Bitte geben Sie einen Anleitungstext ein.
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-xs-3">
          <label for="exampleFormControlSelect1">Portionen:</label>
          <input id="servingsField" v-model="servingsField" class="form-control" max="100" min="1" type="number">
          <div class="invalid-feedback">
            Bitte geben Sie eine Zahl zwischen 1 und 100 an.
          </div>
        </div>
      </div>
      <form>
        <div class="container from-group">
          <label for="selectedIngredients">Zutat auswählen:</label>
          <div class="container input-group mb-3">
            <select id="selectedIngredient" v-model="selectedIngredient" class="form-select">
              <option value="" disabled selected>Zutat auswählen:</option>
              <option v-for="ingredient in this.ingredients" :value="{id: ingredient.id, name: ingredient.name}">
                {{ capitalizeFirstLetter(ingredient.name) }}
              </option>
            </select>
          </div>
          <br>
          <div class="container">
            <input class="btn btn-primary" type="button" value="Ausgewählte Zutat hinzufügen:"
                   @click="saveSelectedIngredient()">
          </div>
          <br>
          <div v-for="ingredient in this.selectedIngredients" :value="ingredient.id" class="container">
            <form id="recipeIngredientsValues" class="row gx-1 gy-2 align-items-center">
              <div class="col-sm-3 container">
                <b>{{ capitalizeFirstLetter(ingredient.name) }}</b>
              </div>
              <br>
              <div class="col-sm-3 container">
                <label class="visually-hidden" for="specificSizeInputGroupUsername"></label>
                <div class="input-group">
                  <input :name="ingredient.id" class="form-control" required type="number">
                </div>
              </div>
              <br>
              <div class="col-sm-5">
                <label class="visually-hidden" for="specificSizeSelect">Preference</label>
                <select id="specificSizeSelect" class="form-select">
                  <option disabled selected>Einheit:</option>
                  <option>kg</option>
                  <option>g</option>
                  <option>l</option>
                  <option>ml</option>
                  <option>TL</option>
                  <option>Stück</option>
                </select>
              </div>
            </form>
            <br>
          </div>
        </div>
        <br>
      </form>
      <br>
      <div class="container">
        <button class="btn btn-primary" type="submit" @click.prevent="postRecipe()" style="margin-right: 10px">Rezept speichern</button>
        <button class="btn btn-danger" type="reset" @click="reset()">Reset</button>
      </div>
      <br>
    </form>
    <div>
    </div>
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
      servingsField: 1,
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
        this.selectedIngredient = ''
      }
    },
    postRecipe () {
      if (this.validate()) {
        this.getRecipeIngredientInputs()
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes'
        const data = {
          name: this.nameField,
          prepTime: '00:00:00',
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
            this.postRecipeIngredients(this.selectedIngredientsRecipes, result, this.ingredients)
            location.reload()
          })
          .catch(error => console.log('error', error))
      }


    },
    postRecipeIngredients (selectedIngredientsRecipes, returnedRecipeObject, ingredients) {
      selectedIngredientsRecipes.forEach(ingredientRecipe => {

        const ingredientObject = ingredients.filter(ingredient => ingredient.id === ingredientRecipe.ingredientId)[0]

        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipeIngredients'
        const data = {
          id: {
            recipeId: returnedRecipeObject.id,
            ingredientId: ingredientObject.id

          },
          recipeEntity: {
            id: returnedRecipeObject.id,
            name: returnedRecipeObject.name,
            prepTime: '00:00:00',
            servings: returnedRecipeObject.servings,
            instructions: returnedRecipeObject.instructions
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


    },
    validate () {
      const form = document.getElementById('recipe-create-form')
      form.classList.add('was-validated')
      return form.checkValidity()
    },
    reset () {
        this.selectedIngredient = ''
        this.selectedIngredients = []
        this.selectedIngredientsRecipes = []
        this.nameField = ''
        this.instructionsField = ''
        this.servingsField = 1
        this.durationField = ''
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
