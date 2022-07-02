import IngredientsView from "@/views/IngredientsView"
import InputIngriedient from "@/components/IngriedentComponents/InputIngriedient"
import {shallowMount, mount} from "@vue/test-utils"
import ShowPrice from "@/components/IngriedentComponents/ShowPrice"

describe('Testing IngredientsView.vue',() => {


  it('should have inputIngredient form component', () => {

    // when
    const wrapper = mount(IngredientsView)

    // then
    const inputIngredient = wrapper.findComponent(InputIngriedient)
    expect(inputIngredient.exists()).toBeTruthy()


  })

  it('should have showprice component', () => {

    // when
    const wrapper = mount(IngredientsView)

    // then
    const inputIngredient = wrapper.findComponent(ShowPrice)
    expect(inputIngredient.exists()).toBeTruthy()



  })

  it('should have 1 ingredient card', async () => {

    // when
    const wrapper = shallowMount(IngredientsView)
    await wrapper.setData({
    ingredients:
    [
      {
      id: 1,
      name: 'Pasta',
      vegetarian: true,
      vegan: true
    }]
    })

    // then
    const ingredientCards = wrapper.findAll('.ingredientCard')
    expect(ingredientCards.length).toBe(1)
  })
})
