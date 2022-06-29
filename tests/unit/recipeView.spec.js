import {mount} from "@vue/test-utils"
import RecipesView from "@/views/RecipesView"
import InputRecipe from "@/components/RecipeComponents/InputRecipe"


describe('Testing RecipeView.vue',() => {


  it('should have inputRecipe form component', () => {

    // when
    const wrapper = mount(RecipesView)

    // then
    const inputIngredient = wrapper.findComponent(InputRecipe)
    expect(inputIngredient.exists()).toBeTruthy()


  })


  it('should have 1 recipe card', () => {

    // when
    const wrapper = mount(RecipesView, {
      data () {
        return {
        recipes:
            [
              {
                id: 1,
                name: 'recipe1',
                prepTime: '01:30:40',
                instructions: 'this is an instruction',
                servings: 0
              }]
}
      }
    })

    // then
    const recipeIsVeganField = wrapper.findAll('.recipeCard')
    expect(recipeIsVeganField.length).toBe(1)
  })

  it('should capitalize the first char of the recipe', () => {

    // when
    const wrapper = mount(RecipesView, {
      data () {
        return {
          recipes:
            [
              {
                id: 1,
                name: 'recipe1',
                prepTime: '01:30:40',
                instructions: 'this is an instruction',
                servings: 0
              }]
        }
      }
    })

    // then
    const output = wrapper.vm.capitalizeFirstLetter(wrapper.vm.recipes[0].name)
    expect(output).toMatch('Recipe1')
  })

  it('should return "keine Zutaten" if recipe has no ingredients', () => {

    // when
    const wrapper = mount(RecipesView, {
      data () {
        return {
          recipes:
            [
              {
                id: 1,
                name: 'recipe2',
                prepTime: '01:30:40',
                instructions: 'this is an instruction',
                servings: 0
              }],
          allRecipeIngredients: [{
            id: {
              recipeId: 1,
              ingredientId: 2
            },
            recipeEntity: {
              id: 1,
              name: 'recipe2',
              prepTime: '01:30:40',
              servings: 0,
              instructions: 'this is an instruction'
            },
            ingredientEntity: {
              id: 2,
              name: 'Salz',
              vegetarian: true,
              vegan: true
            },
            amount: 0.01,
            unit: 'kg'
          }]
        }
      }
    })
    // then
    const output = wrapper.vm.isRecipeVegan(wrapper.vm.recipes[0])
    expect(output).toMatch('keine Zutaten')
  })
})
