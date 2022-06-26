import {mount, shallowMount} from "@vue/test-utils"
import RecipesView from "@/views/RecipesView";
import InputRecipe from "@/components/RecipeComponents/InputRecipe";


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
})
