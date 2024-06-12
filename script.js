const appId = '';
const appKey = '';

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    if (ingredients) {
        searchRecipes(ingredients);
    }
});

function searchRecipes(ingredients) {
    const url = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error('Error fetching the recipes:', error);
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    if (recipes.length > 0) {
        recipes.forEach(item => {
            const recipe = item.recipe;
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('col-md-4');
            recipeCard.innerHTML = `
                <div class="card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.label}</h5>
                        <p class="card-text">${recipe.ingredientLines.join(', ')}</p>
                        <a href="${recipe.url}" class="btn btn-primary" target="_blank">View Recipe</a>
                    </div>
                </div>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    } else {
        recipesContainer.innerHTML = '<p class="text-center">No recipes found.</p>';
    }
}
