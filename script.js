// Selectors
const btn = document.getElementById('btn');
const output = document.getElementById('output');
const container = document.querySelector('.container');


// Events
btn.addEventListener('click', showRandomMeal);
output.addEventListener('click', showRandomMeal2);


// Functions
function showRandomMeal2(e) {
    if(e.target.classList.contains('show')) {
        showRandomMeal();
    }
}

function showRandomMeal() {

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then( (response) => response.json())
    .then( (data) => {
        console.log(data);
        // Clear the content of the page
        container.innerHTML = "";
        container.style.display = "none";
        // Create an empty array to store the ingredients and their measurement
        let mealIngredients = [];
        // DOM insertion
        output.innerHTML = `
            <button id="btn" class=" border-gradient show" style="display: block; margin: 2rem auto; width: 20%; color: black;" >Get Meal 🍔</button>
            <img src="${data.meals[0].strMealThumb}">
            <h2 id="foodName">${data.meals[0].strMeal}</h2>
            <p class="c-and-r"> Category: ${data.meals[0].strCategory}</p>
            <p class="c-and-r"> Area: ${data.meals[0].strArea}</p>
            <p class="list-heading"><strong>List of Ingredients</strong></p>
        `
        // Loop through the data from the api and get the ingredients and measurements to push into the empty array created earlier
        for(let i = 1; i <= 20; i++ ) {
            console.log(data.meals[0][`strIngredient${i}`]);
            if(data.meals[0][`strIngredient${i}`]) {
                mealIngredients.push(
                    `${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}`
                );
            } else {
                break;
            }
        }
        // Loop and display the ingredients
        mealIngredients.forEach(function(ingredient) {
            output.innerHTML += `
            <ul>
                <li>${ingredient}</li>
            </ul>
            `;
        });
        // Separate the instructions at the period sign into an array and display
        let instructionsArr = data.meals[0].strInstructions.split('.');
        output.innerHTML += `
            <h3 id="instrHeading">Instructions </h3>
        `
        instructionsArr.forEach(function(instruction) {
            output.innerHTML += `
            <ul>
                <li>${instruction}</li>
            </ul>
            `;
        });
        output.innerHTML += `
            <h3 id="video">Recipe Video Tutorial</h3>
            <div class="video-div">
                <iframe class="video-inner" width="320" height="200" src="https://www.youtube.com/embed/${data.meals[0].strYoutube.slice(-11)}">
                </iframe>
            </div>
        `;
    });
}