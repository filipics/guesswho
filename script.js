// 1) Referencias a elementos HTML
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');
const gameBoard = document.getElementById('gameBoard');
const arriesgarContainer = document.getElementById('arriesgarContainer');
const arriesgarBtn = document.getElementById('arriesgarBtn');
const resultContainer = document.getElementById('resultContainer');
const resultMessage = document.getElementById('resultMessage');
const resetBtn = document.getElementById('resetBtn');

// 2) Datos de ejemplo: categorías y sus imágenes
//    (En la práctica, podrías cargar esto desde un archivo JSON o similar)
const categoriesData = {
  'jugadores-futbol': [
    'assets/images/jugadores-futbol/jugador1.png',
    'assets/images/jugadores-futbol/jugador2.png',
    // ... y así hasta los 20 (o más)
  ],
  'clubes-futbol': [
    'assets/images/clubes-futbol/club1.png',
    'assets/images/clubes-futbol/club2.png',
    // ...
  ]
  // ... más categorías
};

// 3) Variables de estado
let currentCategory = null;
let secretImage = null; // guardaremos la ruta de la imagen secreta
let imagesList = [];    // las rutas de las imágenes de la categoría actual

// 4) Mostrar/ocultar el menú de categorías
openCategoryBtn.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

// 5) Detectar click en los botones de categoría
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Oculte el menú de categorías
    categoryMenu.classList.add('hidden');

    // 2. Identificar la categoría elegida
    currentCategory = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${currentCategory}`;

    // 3. Cargar imágenes en el grid
    loadCategoryImages(currentCategory);

    // 4. Mostrar el botón de arriesgar
    arriesgarContainer.classList.remove('hidden');

    // 5. Reiniciar el contenedor de resultados (por si jugamos más de una vez)
    resultContainer.classList.add('hidden');
    resultMessage.textContent = '';
  });
});

// 6) Función para cargar imágenes en el #gameBoard
function loadCategoryImages(category) {
  // Limpiar el tablero primero
  gameBoard.innerHTML = '';

  imagesList = categoriesData[category];

  // Seleccionar aleatoriamente la "secreta"
  secretImage = pickRandomImage(imagesList);

  // Crear elementos <img> para cada ruta
  imagesList.forEach((imgSrc, index) => {
    const imgElem = document.createElement('img');
    imgElem.src = imgSrc;
    imgElem.classList.add('game-image');
    imgElem.dataset.index = index; // para identificarla si hace falta

    // Al hacer click, togglear "fade"
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });

    gameBoard.appendChild(imgElem);
  });
}

// 7) Función para obtener una imagen aleatoria
function pickRandomImage(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// 8) Botón "Arriesgar"
arriesgarBtn.addEventListener('click', () => {
  // Al arriesgar, el usuario debe "elegir" una imagen de la parrilla
  // Podemos implementar que, al tocar arriesgar, entremos en un modo "selección final"
  // Para hacerlo simple: al arriesgar, pedimos que el usuario haga click en la imagen que cree
  // que es la correcta.
  
  // Desactivamos el resto de interacciones (ej: no más fades)
  const allImages = gameBoard.querySelectorAll('.game-image');
  allImages.forEach(img => {
    // Removemos eventListener de fade
    img.replaceWith(img.cloneNode(true));
  });

  // Agregamos un listener especial para "adivinar"
  const newAllImages = gameBoard.querySelectorAll('.game-image');
  newAllImages.forEach(img => {
    img.addEventListener('click', handleFinalGuess);
  });

  // Podemos mostrar un mensaje al usuario: "Haz click en la imagen que crees que es el secreto"
  alert('Toca la imagen que crees que es la respuesta.');
});

// 9) Función que maneja el click final al arriesgar
function handleFinalGuess(event) {
  const chosenImg = event.target;
  const chosenSrc = chosenImg.src;

  // Comparamos con la imagen secreta
  if (chosenSrc.includes(secretImage)) {
    resultMessage.textContent = '¡Acertaste! Era la imagen secreta.';
  } else {
    resultMessage.textContent = 'Lo siento, esa no era la correcta.';
  }

  // Mostramos el resultContainer
  resultContainer.classList.remove('hidden');

  // Desactivamos más clics en todas las imágenes
  const allImages = gameBoard.querySelectorAll('.game-image');
  allImages.forEach(img => {
    img.replaceWith(img.cloneNode(true)); // elimina todos los event listeners
  });
}

// 10) Botón "Jugar de nuevo"
resetBtn.addEventListener('click', () => {
  // Reiniciamos todo a estado inicial (ocultar result, quitar imágenes, etc.)
  resultContainer.classList.add('hidden');
  gameBoard.innerHTML = '';
  selectedCategoryElem.textContent = '';
  arriesgarContainer.classList.add('hidden');
  currentCategory = null;
  secretImage = null;
  imagesList = [];
});
