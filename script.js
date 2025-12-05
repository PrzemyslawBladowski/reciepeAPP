const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeContainer = document.getElementById('recipeContainer');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchBtn.addEventListener('click', szukajPrzepisow);

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        szukajPrzepisow();
    }
});

function szukajPrzepisow() {
    const haslo = searchInput.value.trim();

    if (!haslo) {
        alert("Wpisz nazwę potrawy!");
        return;
    }

    recipeContainer.innerHTML = '<p class="placeholder-text">Szukam pyszności...</p>';

    fetch(API_URL + haslo)
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd połączenia z siecią");
            }
            return response.json();
        })
        .then(data => {
            wyswietlPrzepisy(data.meals);
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
            recipeContainer.innerHTML = '<p class="placeholder-text">Coś poszło nie tak. Spróbuj ponownie.</p>';
        });
}

function wyswietlPrzepisy(przepisy) {
    recipeContainer.innerHTML = '';

    if (przepisy === null) {
        recipeContainer.innerHTML = '<p class="placeholder-text">Nie znaleziono przepisów dla tego hasła. Spróbuj "Chicken", "Pie", "Soup".</p>';
        return;
    }

    przepisy.forEach(przepis => {
        const karta = document.createElement('div');
        karta.classList.add('card');

        karta.innerHTML = `
            <img src="${przepis.strMealThumb}" alt="${przepis.strMeal}">
            <div class="card-content">
                <span class="category">🍽️ ${przepis.strCategory} | 🌍 ${przepis.strArea}</span>
                <h3>${przepis.strMeal}</h3>
                <a href="${przepis.strSource || przepis.strYoutube}" target="_blank" class="btn-link">Zobacz przepis</a>
            </div>
        `;

        recipeContainer.appendChild(karta);
    });
}