// ===== 1. Basic setup =====

// Base URL of the Forkify API
const API_URL = "https://forkify-api.jonas.io/api/v2/recipes";

// A small list of "types" (search terms) the user can click on.
// The Forkify API only supports a limited set of search words.
const TYPES = [
  "pizza",
  "pasta",
  "chicken",
  "cake",
  "tacos",
  "sushi",
  "steak",
  "burger",
  "curry",
  "salad",
  "soup",
  "chocolate",
  "salami",
  "bacon",
  "fish",
  "ice cream",
  "sushi",
];

// Grab the HTML elements we will work with
const typesContainer = document.getElementById("typesContainer");
const recipesContainer = document.getElementById("recipesContainer");
const loader = document.getElementById("loader");

const modalBody = document.getElementById("modalBody");
const modalLoader = document.getElementById("modalLoader");
const recipeModalEl = document.getElementById("recipeModal");
const recipeModal = new bootstrap.Modal(recipeModalEl);

// ===== 2. Show the type buttons on page load =====

function renderTypeButtons() {
  TYPES.forEach((type) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark type-btn";
    btn.textContent = type;

    // Mark "pizza" as the default active type
    if (type === "pizza") {
      btn.classList.add("active");
    }

    // When a type button is clicked, load recipes for that type
    btn.addEventListener("click", () => {
      // Highlight the selected button
      document
        .querySelectorAll(".type-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      loadRecipesByType(type);
    });

    typesContainer.appendChild(btn);
  });
}

// ===== 3. Load recipes for a chosen type (search) =====

async function loadRecipesByType(type) {
  try {
    // Clear old recipes and show the loader
    recipesContainer.innerHTML = "";
    loader.classList.remove("d-none");

    const response = await fetch(`${API_URL}?search=${type}`);
    const data = await response.json();

    // Hide the loader once data has arrived
    loader.classList.add("d-none");

    const recipes = data.data.recipes;

    if (recipes.length === 0) {
      recipesContainer.innerHTML =
        '<p class="text-muted">No recipes found for this type.</p>';
      return;
    }

    renderRecipeCards(recipes);
  } catch (error) {
    loader.classList.add("d-none");
    recipesContainer.innerHTML =
      '<p class="text-danger">Something went wrong. Please try again.</p>';
    console.error(error);
  }
}

// ===== 4. Render recipe cards =====

function renderRecipeCards(recipes) {
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card recipe-card h-100" data-id="${recipe.id}">
        <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h6 class="card-title">${recipe.title}</h6>
          <p class="card-text text-muted small mb-0">${recipe.publisher}</p>
        </div>
      </div>
    `;

    // When a recipe card is clicked, open the modal with full details
    col.querySelector(".recipe-card").addEventListener("click", () => {
      loadRecipeDetails(recipe.id);
    });

    recipesContainer.appendChild(col);
  });
}

// ===== 5. Load full details for one recipe and show them in the modal =====

async function loadRecipeDetails(id) {
  // Open the modal right away and show its loader
  modalBody.innerHTML = "";
  modalLoader.classList.remove("d-none");
  recipeModal.show();

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const recipe = data.data.recipe;

    modalLoader.classList.add("d-none");
    renderRecipeDetails(recipe);
  } catch (error) {
    modalLoader.classList.add("d-none");
    modalBody.innerHTML =
      '<p class="text-danger">Could not load recipe details.</p>';
    console.error(error);
  }
}

// ===== 6. Render the recipe details inside the modal =====

function renderRecipeDetails(recipe) {
  // Build the ingredients list
  const ingredientsHTML = recipe.ingredients
    .map((ing) => {
      const quantity = ing.quantity ? ing.quantity : "";
      const unit = ing.unit ? ing.unit : "";
      return `<li>${quantity} ${unit} ${ing.description}</li>`;
    })
    .join("");

  modalBody.innerHTML = `
    <!-- Hero image with title overlay -->
    <div class="modal-hero">
      <img src="${recipe.image_url}" alt="${recipe.title}">
      <div class="modal-hero-title">
        <h3>${recipe.title}</h3>
        <p>By ${recipe.publisher}</p>
      </div>
    </div>

    <!-- Servings / cooking time badges -->
    <div class="recipe-meta">
      <span class="meta-pill">⏱️ <strong>${recipe.cooking_time}</strong> min</span>
      <span class="meta-pill">🍽️ <strong>${recipe.servings}</strong> servings</span>
    </div>

    <!-- Ingredients -->
    <div class="modal-section">
      <h6>Ingredients</h6>
      <ul class="ingredient-list">${ingredientsHTML}</ul>
    </div>

    <!-- Link to full recipe -->
    <div class="modal-section pt-0">
      <a href="${recipe.source_url}" target="_blank" class="btn btn-recipe-source">
        View Full Recipe →
      </a>
    </div>
  `;
}

// ===== 7. Start the app =====

renderTypeButtons();

// Show pizza recipes by default on page load
loadRecipesByType("pizza");
