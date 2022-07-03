<template>
  <h1>Zutaten</h1>








  <div>
    <div class="container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-auto">
            <div class="container">
              <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Preis berechnen
              </button>
            </div>
          </div>
          <div class="col-md-auto">
            <div class="">
              <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Zutat hinzufügen</button>
            </div>
            <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Fügen Sie hier eine Zutat hinzu: </h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <InputIng></InputIng>
              </div>
            </div>
          </div>
        </div>
      </div>
  <br>



     <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
       <div class="offcanvas-header">
         <h5 class="offcanvas-title" id="offcanvasExampleLabel">Preis berechnen</h5>
         <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
       </div>
       <div class="offcanvas-body">
         <div>
           Berechnen Sie hier den Preis für die Zutat ihrer Wahl. Die Abfrage erfolgt über die <a href="https://spoonacular.com/" target="_blank" > Spoonacular</a> Datenbank.
         </div>


         <form class="form-inline">
           <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Zutat: </label>
           <select v-model="selected">
             <option v-for="ingredient in this.ingredients" :value="ingredient.name">
               {{ capitalizeFirstLetter(ingredient.name) }}
             </option>
           </select>
         </form>
         <div class="container">
           <ShowPrice :ing-name="capitalizeFirstLetter(this.selected)"></ShowPrice>
         </div>
       </div>
     </div>
   </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="container" >
          <input  class="form-control" type="text" v-model="searchCrit" placeholder="Zutaten suchen..." />
        </div>
      </div>
    </div>
    <br>
    <div class="container">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked="checked" v-model="filterCrit">
        <label class="form-check-label" for="inlineRadio1">alle Zutaten</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="vegetarian" v-model="filterCrit">
        <label class="form-check-label" for="inlineRadio2">vegetarisch</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="vegan" v-model="filterCrit">
        <label class="form-check-label" for="inlineRadio3">vegan</label>
      </div>
    </div>

    <br>
    <div class="container-fluid container">
      <ol class="list-group list-group-numbered">
        <div class="row row-cols-1 row-cols-md-4 g-4 container">
          <div class="col" v-for="ingredient in filterIngredients(this.filterCrit, this.searchCrit)" :key="ingredient.id">
            <li class="list-group-item d-flex justify-content-between align-items-start ingredientCard">
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
import ShowPrice from "@/components/IngriedentComponents/ShowPrice"

export default {
  name: 'IngredientsView',
  components: {ShowPrice, InputIng},

  data () {
    return {
      ingredients: [],
      selected: '',
      filterCrit: 'all',
      searchCrit: ""

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
      return string?.charAt(0).toUpperCase() + string?.slice(1)
    },
    filterIngredients (filterCrit, searchCrit){
      switch (filterCrit){
        case 'all':
          return this.ingredients.filter(ing => ing.name.toLocaleLowerCase().includes(searchCrit.toLocaleLowerCase()))
        case 'vegetarian':
          return this.ingredients.filter(ing => ing.vegetarian === true).filter(ing => ing.name.toLowerCase().includes(searchCrit.toLocaleLowerCase()))
        case 'vegan':
          return this.ingredients.filter(ing => ing.vegan === true).filter(ing => ing.name.toLocaleLowerCase().includes(searchCrit.toLocaleLowerCase()))
      }
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

<style lang="scss">
@import "src/assets/style/overall.scss";

$button: #00CC99;

input {
  padding: 5px;
  margin: 10px;
}

</style>
