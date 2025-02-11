/***********************************************
 * 1) Referencias a elementos
 ***********************************************/
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');

const actionButtons = document.getElementById('actionButtons');
const showSecretBtn = document.getElementById('showSecretBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');

const secretContainer = document.getElementById('secretContainer');
const secretImage = document.getElementById('secretImage');
const gameBoard = document.getElementById('gameBoard');

/***********************************************
 * 2) Datos: solo una categoría ("jugadores-futbol") 
 *    con 20 imágenes en la carpeta /jugadores
 ***********************************************/
const categoriesData = {
  'jugadores-futbol': [
    'jugadores/jugador1.png',
    'jugadores/jugador2.png',
    'jugadores/jugador3.png',
    'jugadores/jugador4.png',
    'jugadores/jugador5.png',
    'jugadores/jugador6.png',
    'jugadores/jugador7.png',
    'jugadores/jugador8.png',
    'jugadores/jugador9.png',
    'jugadores/jugador10.png',
    'jugadores/jugador11.png',
    'jugadores/jugador12.png',
    'jugadores/jugador13.png',
    'jugadores/jugador14.png',
    'jugadores/jugador15.png',
    'jugadores/jugador16.png',
    'jugadores/jugador17.png',
    'jugadores/jugador18.png',
    'jugadores/jugador19.png',
    'jugadores/jugador20.png'
  ]
};

/***********************************************
 * 3) Variables de estado
 ***********************************************/
let currentCategory = null;
let secretImgSrc = null; // Ruta de la imagen secreta

/***********************************************
 * 4) Botón "Elegir Categoría"
 ***********************************************/
openCategoryBtn.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

/***********************************************
 * 5) Botón de categoría
 ***********************************************/
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Oculta menú
    categoryMenu.classList.add('hidden');
    // Toma la categoría
    currentCategory = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${currentCategory}`;

    // Carga imágenes en el board y escoge la secreta
    loadCategoryImages(currentCategory);

    // Muestra los botones (Objeto Secreto, Reiniciar)
    actionButtons.classList.remove('hidden');

    // Oculta el contenedor del secreto (por si estuviera visible)
    secretContainer.classList.add('hidden');
    secretImage.src = "";
  });
});

/***********************************************
 * 6) Carga de imágenes
 ***********************************************/
function loadCategoryImages(category) {
  gameBoard.innerHTML = "";

  // Tomamos la lista local
  const images = categoriesData[category];

  // Escoge 1 al azar
  secretImgSrc = pickRandom(images);

  // Crea las 20 imágenes en el tablero
  images.forEach(src => {
    const imgElem = document.createElement('img');
    imgElem.src = src;  // <-- ruta local, ej: 'jugadores/jugador3.png'
    imgElem.classList.add('game-image');

    // Fade al click
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });

    gameBoard.appendChild(imgElem);
  });
}

/***********************************************
 * 7) Elección aleatoria
 ***********************************************/
function pickRandom(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

/***********************************************
 * 8) Botón "Objeto Secreto" (toggle mostrar/ocultar)
 ***********************************************/
showSecretBtn.addEventListener('click', () => {
  secretImage.src = secretImgSrc;
  secretContainer.classList.toggle('hidden');
});

/***********************************************
 * 9) Botón "Reiniciar" (misma categoría)
 ***********************************************/
reiniciarBtn.addEventListener('click', () => {
  loadCategoryImages(currentCategory);
  secretContainer.classList.add('hidden');
  secretImage.src = "";
});
