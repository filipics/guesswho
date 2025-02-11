/************************************
 * 1) Referencias a elementos HTML
 ************************************/
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');
const gameBoard = document.getElementById('gameBoard');
const arriesgarContainer = document.getElementById('arriesgarContainer');
const arriesgarBtn = document.getElementById('arriesgarBtn');
const resultContainer = document.getElementById('resultContainer');
const resultMessage = document.getElementById('resultMessage');
const resetBtn = document.getElementById('resetBtn');

/************************************
 * 2) Datos de ejemplo: categorías y sus 20 imágenes
 *    Reemplaza las URLs de ejemplo con tus propias imágenes
 ************************************/
const categoriesData = {
  'jugadores-futbol': [
    'https://picsum.photos/seed/jug1/200/200',
    'https://picsum.photos/seed/jug2/200/200',
    'https://picsum.photos/seed/jug3/200/200',
    'https://picsum.photos/seed/jug4/200/200',
    'https://picsum.photos/seed/jug5/200/200',
    'https://picsum.photos/seed/jug6/200/200',
    'https://picsum.photos/seed/jug7/200/200',
    'https://picsum.photos/seed/jug8/200/200',
    'https://picsum.photos/seed/jug9/200/200',
    'https://picsum.photos/seed/jug10/200/200',
    'https://picsum.photos/seed/jug11/200/200',
    'https://picsum.photos/seed/jug12/200/200',
    'https://picsum.photos/seed/jug13/200/200',
    'https://picsum.photos/seed/jug14/200/200',
    'https://picsum.photos/seed/jug15/200/200',
    'https://picsum.photos/seed/jug16/200/200',
    'https://picsum.photos/seed/jug17/200/200',
    'https://picsum.photos/seed/jug18/200/200',
    'https://picsum.photos/seed/jug19/200/200',
    'https://picsum.photos/seed/jug20/200/200'
  ],
  'clubes-futbol': [
    'https://picsum.photos/seed/club1/200/200',
    'https://picsum.photos/seed/club2/200/200',
    'https://picsum.photos/seed/club3/200/200',
    'https://picsum.photos/seed/club4/200/200',
    'https://picsum.photos/seed/club5/200/200',
    'https://picsum.photos/seed/club6/200/200',
    'https://picsum.photos/seed/club7/200/200',
    'https://picsum.photos/seed/club8/200/200',
    'https://picsum.photos/seed/club9/200/200',
    'https://picsum.photos/seed/club10/200/200',
    'https://picsum.photos/seed/club11/200/200',
    'https://picsum.photos/seed/club12/200/200',
    'https://picsum.photos/seed/club13/200/200',
    'https://picsum.photos/seed/club14/200/200',
    'https://picsum.photos/seed/club15/200/200',
    'https://picsum.photos/seed/club16/200/200',
    'https://picsum.photos/seed/club17/200/200',
    'https://picsum.photos/seed/club18/200/200',
    'https://picsum.photos/seed/club19/200/200',
    'https://picsum.photos/seed/club20/200/200'
  ]
};

/************************************
 * 3) Variables de estado
 ************************************/
let currentCategory = null; 
let secretImage = null; 
let imagesList = [];

/************************************
 * 4) Mostrar/ocultar menú categorías
 ************************************/
openCategoryBtn.addEventListener('click', () => {
  // Alterna la visibilidad del menú
  categoryMenu.classList.toggle('hidden');
});

/************************************
 * 5) Detectar click en cada botón de categoría
 ************************************/
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Ocultar menú
    categoryMenu.classList.add('hidden');

    // Capturar la categoría elegida
    currentCategory = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${currentCategory}`;

    // Cargar las 20 imágenes en el tablero
    loadCategoryImages(currentCategory);

    // Mostrar el botón "Arriesgar"
    arriesgarContainer.classList.remove('hidden');

    // Ocultar contenedor de resultados por si está visible
    resultContainer.classList.add('hidden');
    resultMessage.textContent = '';
  });
});

/************************************
 * 6) Función para cargar imágenes
 ************************************/
function loadCategoryImages(category) {
  // Limpia el tablero
  gameBoard.innerHTML = '';

  // Obtiene la lista de rutas según la categoría
  imagesList = categoriesData[category];

  // Selecciona aleatoriamente la imagen secreta
  secretImage = pickRandomImage(imagesList);

  // Genera los elementos <img>
  imagesList.forEach((imgSrc, index) => {
    const imgElem = document.createElement('img');
    imgElem.src = imgSrc;
    imgElem.classList.add('game-image');
    imgElem.dataset.index = index; 

    // Evento: si clickeas (antes de arriesgar) hace fade
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });

    // Agrega cada imagen al tablero
    gameBoard.appendChild(imgElem);
  });
}

/************************************
 * 7) Función para elegir una imagen aleatoria
 ************************************/
function pickRandomImage(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/************************************
 * 8) Lógica del botón "Arriesgar"
 ************************************/
arriesgarBtn.addEventListener('click', () => {
  // Bloquea el fade en todas las imágenes
  const allImages = gameBoard.querySelectorAll('.game-image');
  allImages.forEach(img => {
    img.replaceWith(img.cloneNode(true));
  });

  // Nuevas referencias sin los listeners previos
  const newAllImages = gameBoard.querySelectorAll('.game-image');
  newAllImages.forEach(img => {
    // Al hacer click ahora, manejaremos la adivinanza final
    img.addEventListener('click', handleFinalGuess);
  });

  alert('Toca la imagen que crees que es la respuesta secreta.');
});

/************************************
 * 9) Función handleFinalGuess
 ************************************/
function handleFinalGuess(event) {
  const chosenImg = event.target;
  const chosenSrc = chosenImg.src;

  // Compara la imagen elegida con la secreta
  // Usamos includes() pero podrías usar === si ambos caminos son idénticos
  if (chosenSrc.includes(secretImage)) {
    resultMessage.textContent = '¡Acertaste! Era la imagen secreta.';
  } else {
    resultMessage.textContent = 'Lo siento, esa no era la correcta.';
  }

  // Muestra el contenedor con el resultado
  resultContainer.classList.remove('hidden');

  // Desactiva más clicks
  const allImages = gameBoard.querySelectorAll('.game-image');
  allImages.forEach(img => {
    img.replaceWith(img.cloneNode(true));
  });
}

/************************************
 * 10) Botón "Jugar de nuevo"
 ************************************/
resetBtn.addEventListener('click', () => {
  // Resetea estado y vista
  resultContainer.classList.add('hidden');
  gameBoard.innerHTML = '';
  selectedCategoryElem.textContent = '';
  arriesgarContainer.classList.add('hidden');
  currentCategory = null;
  secretImage = null;
  imagesList = [];
});
