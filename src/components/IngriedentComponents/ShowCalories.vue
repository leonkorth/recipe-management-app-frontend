<template>

  <button @click="getData()" type="button" class="btn btn-primary">Preis für {{ingName}} berechnen </button>

  <h3>Preis: {{ this.price}} {{this.unit}}</h3>

</template>

<script>
export default {
  name: "ShowCalories",
  props: ['ingName'],
  data () {
    return {
      id: '',
      price: '',
      unit: ''


    }

  },
  methods: {
    getData () {

      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }


      fetch("https://api.spoonacular.com/food/ingredients/search?" + new URLSearchParams({
        apiKey: process.env.VUE_APP_PRICE_API_KEY,
        sort: 'calories',
        sortDirection: 'desc',
        number: 1,
        query: this.ingName

      }), requestOptions)
        .then(response => response.json())
        .then(result => {
          this.id = result.results[0].id
          this.getPrice()
        })
        .catch(error => console.log('error', error))




    },
    getPrice () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch('https://api.spoonacular.com/food/ingredients/' + this.id + '/information?' + new URLSearchParams({
        apiKey: process.env.VUE_APP_PRICE_API_KEY,
        amount: 1

      }), requestOptions)
        .then(response => response.json())
        .then(result => {
          this.price = result.estimatedCost.value
          this.unit = result.estimatedCost.unit
        })
        .catch(error => console.log('error', error))
    }
  },
  mounted () {



  }


}
</script>

<style scoped>

</style>
