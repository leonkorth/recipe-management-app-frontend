[![CI](https://github.com/leonkorth/recipe-management-app-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/leonkorth/recipe-management-app-frontend/actions/workflows/ci.yml)

# recipe-management-app-frontend
https://recipe-management-app-frontend.herokuapp.com/about

The frontend for our recipe management app from Webtechnologien. Contains a simple UI to interact with recipes and ingredients. 

## Usage

### Ingredients
+ view all the ingredients users have already added and see whether they are vegetarian or vegan
+ add a new ingredient with a name and mark them as vegetarian or vegan
  + click on the "Zutat hinzufügen" button
  + enter a name and choose a dietary category via dropdown in the column on the right-hand side
  + click the "Zutat hinzufügen" button on the columns bottom
+ calculate an ingredients price with the Spoonacular Api
  + click on the "Preis berechnen" button
  + choose one of the existing ingredients via dropdown in the column on the left-hand side
  + click the "Preis berechnen" button on the columns bottom
  + the calculated price will be shown below
+ search for a specific ingredient name
  + type one or more letters into the "Zutaten durchsuchen..." bar
  + all ingredients whose name contains the letters will be shown in real-time
+ filter the ingredients by vegetarian or vegan, or show all of them
  + click on the corresponding radio button
  + only ingredients fulfilling the criterion will be shown

### Recipes
+ view a summary of the recipes users have already created, including the amount of servings it provides as well as info about whether it is vegetarian or vegan
+ add a new recipe
  + click on the "Rezept hinzufügen" button
  + type a title and instructions into the upper two boxes
  + select the number of servings your recipe is intended for by the arrows in the next row
  + choose an ingredient of the options in the drop-down menu below, click on "Ausgewählte Zutat hinzufügen:"
  + the chosen ingredient will be listed below, adjust the amount by the arrows or typing a decimal number into the field, choose one of the units provided
  + to add more ingredients, repeat the last two steps
  + when your recipe is complete, click on "Rezept speichern"
  + should you change your mind, you can click "Reset" to clear all inputs above and restart
+ search for a specific recipe by name
  + type one or more letters into the "Rezepte durchsuchen..." bar
  + all recipes whose name contains the letters will be shown in real-time
+ display a recipe in detail
  + click "Rezept ansehen" on one of the recipe cards
  + in addition to the information provided by the summary, you will also see the instructions and a list of ingredients needed to prepare the recipe
+ delete a recipe by clicking the "Rezept löschen" button
