const Categories = document.getElementById("Categories");
const MealsByCategory = document.getElementById("MealsByCategory");
const categoriesCartona = document.querySelector(`#Categories .row`);
const mealsByCategoryCartona = document.querySelector(`#MealsByCategory .row`);

const Area = document.getElementById("Area");
const MealsByArea = document.getElementById("MealsByArea");
const areaCartona = document.querySelector(`#Area .row`);
const mealsByAreaCartona = document.querySelector(`#MealsByArea .row`);

const Ingredients = document.getElementById("Ingredients");
const MealsByIngredient = document.getElementById("MealsByIngredient");
const ingredientsCartona = document.querySelector(`#Ingredients .row`);
const mealsByIngredientCartona = document.querySelector(
  `#MealsByIngredient .row`
);

const Search = document.getElementById("Search");
const searchNameInput = document.querySelector(".search-name-input");
const searchLetterInput = document.querySelector(".search-letter-input");
let searchedMealsCartona = document.querySelector(`.searched-meals`);

const Home = document.getElementById("Home");
const homeCartona = document.querySelector(`#Home .row`);

const Recipe = document.getElementById("Recipe");
const recipeCartona = document.querySelector(`#Recipe .row`);
let meals = [];
let mealId;

// ?=================================
// ?============= NavBar ============
// ?=================================
let navLinksArr = Array.from(document.querySelectorAll(".navbar-nav li a"));
for (let i = 0; i < navLinksArr.length; i++) {
  navLinksArr[i].addEventListener("click", function (e) {
    let targetLink = e.target.getAttribute("href").substring(1).toLowerCase();
    if (targetLink == "home") {
      Categories.classList.add("d-none");
      MealsByCategory.classList.add("d-none");
      Area.classList.add("d-none");
      MealsByArea.classList.add("d-none");
      Ingredients.classList.add("d-none");
      MealsByIngredient.classList.add("d-none");
      Search.classList.add("d-none");
      homePage();
    } else if (targetLink == "search") {
      Categories.classList.add("d-none");
      MealsByCategory.classList.add("d-none");
      Area.classList.add("d-none");
      MealsByArea.classList.add("d-none");
      Ingredients.classList.add("d-none");
      MealsByIngredient.classList.add("d-none");
      Home.classList.add("d-none");
      searchPage();
    } else if (targetLink == "categories") {
      Area.classList.add("d-none");
      MealsByArea.classList.add("d-none");
      Ingredients.classList.add("d-none");
      MealsByIngredient.classList.add("d-none");
      Search.classList.add("d-none");
      Home.classList.add("d-none");
      categoriesPage();
    } else if (targetLink == "area") {
      Categories.classList.add("d-none");
      MealsByCategory.classList.add("d-none");
      Ingredients.classList.add("d-none");
      MealsByIngredient.classList.add("d-none");
      Search.classList.add("d-none");
      Home.classList.add("d-none");
      areaPage();
    } else if (targetLink == "ingredients") {
      Categories.classList.add("d-none");
      MealsByCategory.classList.add("d-none");
      Area.classList.add("d-none");
      MealsByArea.classList.add("d-none");
      Search.classList.add("d-none");
      Home.classList.add("d-none");
      ingredientsPage();
    } else if (targetLink == "contact") {
      Categories.classList.add("d-none");
      MealsByCategory.classList.add("d-none");
      Area.classList.add("d-none");
      MealsByArea.classList.add("d-none");
      Ingredients.classList.add("d-none");
      MealsByIngredient.classList.add("d-none");
      Search.classList.add("d-none");
      Home.classList.add("d-none");
      contactPage();
    }
  });
}

// ?=================================
// ?============= Recipe ============
// ?=================================
async function getRecipe(id) {
  const RecipeResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const RecipeData = await RecipeResponse.json();
  return RecipeData.meals[0];
}

function displayRecipe(recipe) {
  let tagsCartona = ``;
  if (recipe.strTags != null) {
    let tagsArr = recipe.strTags.split(",");
    for (let i = 0; i < tagsArr.length; i++) {
      tagsCartona += `
    <li>${tagsArr[i]}</li>
    `;
    }
  }
  let ingredientCartona = ``;
  for (let i = 1; i < 21; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredientCartona += `<li>${recipe[`strMeasure${i}`]}  ${
        recipe[`strIngredient${i}`]
      }</li>`;
    }
  }
  let cartona = `
  <div class="col-md-4 recipe-image">
  <img
    src="${recipe.strMealThumb}"
    alt="${recipe.strMeal}"
    class="w-100"
  />
  <h2 class="py-3">${recipe.strMeal}</h2>
  </div>
  <div class="col-md-8 recipe-caption">
  <h3 class="h3 fw-semibold">Instructions:</h3>
  <p class="lead">
  ${recipe.strInstructions}
  </p>
  <p class="lead my-3"><span class="h3">Area: </span>${recipe.strArea}</p>
  <p class="lead my-3"><span class="h3">Category: </span>${recipe.strCategory}</p>
  <p class="fw-semibold h3 mt-3">Recipes:</p>
  <ul class="mb-3 list-unstyled d-flex flex-wrap recipes-ul">
  ${ingredientCartona}
  </ul>
  <p class="fw-semibold h3 mt-3">Tags:</p>
  <ul class="mb-3 list-unstyled d-flex flex-wrap tags-ul">
  ${tagsCartona}
  </ul>
  <button class="btn btn-success m-2">
    <a
      href="${recipe.strSource}"
      target="_blank"
      class="text-decoration-none text-white p-2 fw-semibold"
      >Source</a
    >
  </button>
  <button class="btn btn-danger m-2">
    <a
      href="${recipe.strYoutube}"
      target="_blank"
      class="text-decoration-none text-white p-2 fw-semibold"
      >Youtube</a
    >
  </button>
  </div>
  `;
  recipeCartona.innerHTML = cartona;
}

// ?====================================
// ?============ Categories ============
// ?====================================
async function getCategories() {
  const categoriesResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const categoriesData = await categoriesResponse.json();
  return categoriesData.categories;
}
function displayCategories(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="category col-md-3">
    <img
      src="${arr[i].strCategoryThumb}"
      alt="${arr[i].strCategory}"
      class="w-100 rounded-3"
    />
    <div class="category-caption text-center rounded-3 p-3">
      <h3>${arr[i].strCategory}</h3>
      <p>${arr[i].strCategoryDescription}</p>
    </div>
    </div>
    `;
  }
  categoriesCartona.innerHTML = cartona;
}

// ?========== Meals by Category ==========
async function getMealsByCategory(category) {
  const MealsByCategoryResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const MealsByCategoryData = await MealsByCategoryResponse.json();
  return MealsByCategoryData.meals;
}
function displayMealsByCategory(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="meal col-md-3" data-id="${arr[i].idMeal}">
    <img
      src="${arr[i].strMealThumb}"
      alt="${arr[i].strMeal}"
      class="w-100 rounded-3"
    />
    <div class="meal-caption text-center rounded-3 p-3">
      <h3>${arr[i].strMeal}</h3>
    </div>
    </div>
    `;
  }
  mealsByCategoryCartona.innerHTML = cartona;
}

// ?========== Categories Run ==========
let categoriesArr;
let mealsByCategoryArr;

async function mealsByCategoryPage(i) {
  MealsByCategory.classList.remove("d-none");
  Categories.classList.add("d-none");
  const selectedCategory = categoriesArr[i].strCategory;
  mealsByCategoryArr = await getMealsByCategory(selectedCategory);
  if (mealsByCategoryArr.length > 20) {
    mealsByCategoryArr = mealsByCategoryArr.slice(0, 20);
  }
  displayMealsByCategory(mealsByCategoryArr);
  meals = Array.from(document.querySelectorAll(".meal"));
}

async function categoriesPage() {
  MealsByCategory.classList.add("d-none");
  Recipe.classList.add("d-none");
  Categories.classList.remove("d-none");
  categoriesArr = await getCategories();
  displayCategories(categoriesArr);
  const categories = Array.from(document.querySelectorAll(".category"));

  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", async function () {
      await mealsByCategoryPage(i);
      for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
          Recipe.classList.remove("d-none");
          MealsByCategory.classList.add("d-none");
          mealId = mealsByCategoryArr[i].idMeal;
          let recipe = await getRecipe(mealId);
          displayRecipe(recipe);
        });
      }
    });
  }
}

// ?=================================
// ?============= Area ==============
// ?=================================
async function getArea() {
  const areaResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const areaData = await areaResponse.json();
  return areaData.meals;
}

function displayArea(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="area col-md-3 text-center display-1 text-white p-3">
    <i class="fa-solid fa-house-laptop"></i>
    <h3 class="h1">${arr[i].strArea}</h3>
    </div>
    `;
  }
  areaCartona.innerHTML = cartona;
}

// ?========== Meals by Area ==========
async function getMealsByArea(area) {
  const MealsByAreaResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const MealsByAreaData = await MealsByAreaResponse.json();
  return MealsByAreaData.meals;
}

function displayMealsByArea(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="meal col-md-3" data-id="${arr[i].idMeal}">
    <img
      src="${arr[i].strMealThumb}"
      alt="${arr[i].strMeal}"
      class="w-100 rounded-3"
    />
    <div class="meal-caption text-center rounded-3 p-3">
      <h3>${arr[i].strMeal}</h3>
    </div>
    </div>
    `;
  }
  mealsByAreaCartona.innerHTML = cartona;
}
// ?========== Area Run ==========
let mealsByAreaArr;
let areasArr;

async function mealsByAreaPage(i) {
  MealsByArea.classList.remove("d-none");
  Area.classList.add("d-none");
  const selectedArea = areasArr[i].strArea;
  mealsByAreaArr = await getMealsByArea(selectedArea);
  if (mealsByAreaArr.length > 20) {
    mealsByAreaArr = mealsByAreaArr.slice(0, 20);
  }
  displayMealsByArea(mealsByAreaArr);
  meals = Array.from(document.querySelectorAll(".meal"));
}

async function areaPage() {
  MealsByArea.classList.add("d-none");
  Recipe.classList.add("d-none");
  Area.classList.remove("d-none");
  areasArr = await getArea();
  displayArea(areasArr);
  let areas = Array.from(document.querySelectorAll(".area"));
  for (let i = 0; i < areas.length; i++) {
    areas[i].addEventListener("click", async function () {
      await mealsByAreaPage(i);
      for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
          Recipe.classList.remove("d-none");
          MealsByArea.classList.add("d-none");
          mealId = mealsByAreaArr[i].idMeal;
          let recipe = await getRecipe(mealId);
          displayRecipe(recipe);
        });
      }
    });
  }
}

// ?=================================
// ?========= Ingredients ===========
// ?=================================
async function getIngredients() {
  const IngredientsResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const IngredientsData = await IngredientsResponse.json();
  return IngredientsData.meals;
}

function displayIngredients(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="ingredient col-md-3 text-center display-1 text-white p-3">
    <i class="fa-solid fa-drumstick-bite"></i>
    <h3>${arr[i].strIngredient}</h3>
    <p class="lead">${arr[i].strDescription.substring(
      0,
      arr[i].strDescription.indexOf(".") + 1
    )}</p>
    </div>
    `;
  }
  ingredientsCartona.innerHTML = cartona;
}
// ?======= Meals by Ingredient =======
async function getMealsByIngredient(ingredient) {
  const MealsByIngredientResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const MealsByIngredientData = await MealsByIngredientResponse.json();
  return MealsByIngredientData.meals;
}

function displayMealsByIngredient(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="meal col-md-3" data-id="${arr[i].idMeal}">
    <img
      src="${arr[i].strMealThumb}"
      alt="${arr[i].strMeal}"
      class="w-100 rounded-3"
    />
    <div class="meal-caption text-center rounded-3 p-3">
      <h3>${arr[i].strMeal}</h3>
    </div>
    </div>
    `;
  }
  mealsByIngredientCartona.innerHTML = cartona;
}
// ?========== Ingredients Run ==========
let MealsByIngredientArr;
let IngredientsArr;

async function mealsByIngredientPage(i) {
  MealsByIngredient.classList.remove("d-none");
  Ingredients.classList.add("d-none");
  const selectedIngredient = IngredientsArr[i].strIngredient;
  MealsByIngredientArr = await getMealsByIngredient(selectedIngredient);
  if (MealsByIngredientArr.length > 20) {
    MealsByIngredientArr = MealsByIngredientArr.slice(0, 20);
  }
  displayMealsByIngredient(MealsByIngredientArr);
  meals = Array.from(document.querySelectorAll(".meal"));
}

async function ingredientsPage() {
  MealsByIngredient.classList.add("d-none");
  Recipe.classList.add("d-none");
  Ingredients.classList.remove("d-none");
  IngredientsArr = await getIngredients();
  IngredientsArr = IngredientsArr.slice(0, 20);
  displayIngredients(IngredientsArr);
  let ingredients = Array.from(document.querySelectorAll(".ingredient"));
  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i].addEventListener("click", async function () {
      await mealsByIngredientPage(i);
      for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
          Recipe.classList.remove("d-none");
          MealsByIngredient.classList.add("d-none");
          mealId = MealsByIngredientArr[i].idMeal;
          let recipe = await getRecipe(mealId);
          displayRecipe(recipe);
        });
      }
    });
  }
}

// ?==================================
// ?============= Search =============
// ?==================================
let mealsNameArr = [];
function displaySearchedMeals(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="meal col-md-3" data-id="${arr[i].idMeal}">
    <img
      src="${arr[i].strMealThumb}"
      alt="${arr[i].strMeal}"
      class="w-100 rounded-3"
    />
    <div class="meal-caption text-center rounded-3 p-3 text-black">
      <h3>${arr[i].strMeal}</h3>
    </div>
    </div>
    `;
  }
  searchedMealsCartona.innerHTML = cartona;
}

function searchPage() {
  Search.classList.remove("d-none");
  Recipe.classList.add("d-none");
  searchNameInput.addEventListener("keyup", async function () {
    let mealName = searchNameInput.value;
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    let data = await response.json();
    mealsNameArr = data.meals;
    if (mealsNameArr.length > 20) {
      mealsNameArr = mealsNameArr.slice(0, 20);
    }
    displaySearchedMeals(mealsNameArr);
    meals = Array.from(document.querySelectorAll(".meal"));
    for (let i = 0; i < mealsNameArr.length; i++) {
      meals[i].addEventListener("click", async function () {
        Recipe.classList.remove("d-none");
        Search.classList.add("d-none");
        mealId = mealsNameArr[i].idMeal;
        let recipe = await getRecipe(mealId);
        displayRecipe(recipe);
      });
    }
  });

  searchLetterInput.addEventListener("keyup", async function () {
    let mealName = searchLetterInput.value;
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName.charAt(
        0
      )}`
    );
    let data = await response.json();
    mealsNameArr = data.meals;
    if (mealsNameArr.length > 20) {
      mealsNameArr = mealsNameArr.slice(0, 20);
    }
    displaySearchedMeals(mealsNameArr);
    meals = Array.from(document.querySelectorAll(".meal"));
    for (let i = 0; i < mealsNameArr.length; i++) {
      meals[i].addEventListener("click", async function () {
        Recipe.classList.remove("d-none");
        Search.classList.add("d-none");
        mealId = mealsNameArr[i].idMeal;
        let recipe = await getRecipe(mealId);
        displayRecipe(recipe);
      });
    }
  });
}

// ?==================================
// ?=============== Home =============
// ?==================================
function displayHomeMeals(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="meal col-md-3" data-id="${arr[i].idMeal}">
    <img
      src="${arr[i].strMealThumb}"
      alt="${arr[i].strMeal}"
      class="w-100 rounded-3"
    />
    <div class="meal-caption text-center rounded-3 p-3 text-black">
      <h3>${arr[i].strMeal}</h3>
    </div>
    </div>
    `;
  }
  homeCartona.innerHTML = cartona;
}

async function homePage() {
  Recipe.classList.add("d-none");
  Home.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let data = await response.json();
  mealsNameArr = data.meals;
  if (mealsNameArr.length > 20) {
    mealsNameArr = mealsNameArr.slice(0, 20);
  }
  displayHomeMeals(mealsNameArr);
  meals = Array.from(document.querySelectorAll(".meal"));
  for (let i = 0; i < mealsNameArr.length; i++) {
    meals[i].addEventListener("click", async function () {
      Recipe.classList.remove("d-none");
      Home.classList.add("d-none");
      mealId = mealsNameArr[i].idMeal;
      let recipe = await getRecipe(mealId);
      displayRecipe(recipe);
    });
  }
}

(async function () {
  await homePage();
})();
