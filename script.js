/**********************************************
 * 1) Referencias a elementos HTML
 **********************************************/
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');
const secretContainer = document.getElementById('secretContainer');
const secretName = document.getElementById('secretName');
// const secretImage = document.getElementById('secretImage'); // si quieres mostrar la foto secreta
const gameBoard = document.getElementById('gameBoard');
const resetContainer = document.getElementById('resetContainer');
const resetBtn = document.getElementById('resetBtn');

/**********************************************
 * 2) Datos de ejemplo (20 imágenes por categoría)
 *    Si quieres mostrar "nombres" distintos, cambia la estructura a { name, src } 
 *    y asocia el 'name' y la ruta 'src' a cada imagen.
 **********************************************/
const categoriesData = {
  'jugadores-futbol': [
    // Para el ejemplo, uso URLs de picsum.photos
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

/**********************************************
 * 3) Variables de estado
 **********************************************/
let currentCategory = null;
let secretImgSrc = null; // ruta de la imagen secreta
let imagesList = [];

/**********************************************
 * 4) Botón para mostrar/ocultar el menú de categorías
 **********************************************/
openCategoryBtn.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

/**********************************************
 * 5) Configurar el evento de cada botón de categoría
 **********************************************/
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Oculta el menú
    categoryMenu.classList.add('hidden');
    resetContainer.classList.remove('hidden'); // mostramos el botón "Elegir otra categoría"

    // Toma la categoría
    currentCategory = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${currentCategory}`;

    // Carga las 20 imágenes en el tablero
    loadCategoryImages(currentCategory);

    // Muestra el contenedor del secreto
    secretContainer.classList.remove('hidden');
  });
});

/**********************************************
 * 6) Función para cargar y mostrar las 20 imágenes
 **********************************************/
function loadCategoryImages(category) {
  // Limpia el tablero
  gameBoard.innerHTML = '';

  // Obtén la lista de rutas según la categoría
  imagesList = categoriesData[category];

  // Selecciona 1 imagen aleatoria como la secreta
  secretImgSrc = pickRandomImage(imagesList);

  // Muestra el nombre de la imagen secreta
  // En un juego real, quizás quieras un "nombre" asociado a esa imagen,
  // pero aquí solo mostramos la ruta de forma simplificada
  secretName.textContent = secretImgSrc;

  // Si quieres mostrar la imagen secreta, descomenta:
  // secretImage.src = secretImgSrc;

  // Crea cada <img> en el DOM
  imagesList.forEach((imgSrc) => {
    const imgElem = document.createElement('img');
    imgElem.src = imgSrc;
    imgElem.classList.add('game-image');

    // Permite hacer fade (descartar)
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });

    // Añadimos la imagen al tablero
    gameBoard.appendChild(imgElem);
  });
}

/**********************************************
 * 7) Función para seleccionar un elemento al azar
 **********************************************/
function pickRandomImage(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**********************************************
 * 8) Botón "Elegir otra categoría" (reset parcial)
 **********************************************/
resetBtn.addEventListener('click', () => {
  // Volver al estado inicial
  selectedCategoryElem.textContent = '';
  secretContainer.classList.add('hidden');
  secretName.textContent = '';
  // secretImage.src = ''; // si mostrabas la imagen secreta
  gameBoard.innerHTML = '';
  categoryMenu.classList.remove('hidden');
  resetContainer.classList.add('hidden');

  // Variables en null
  currentCategory = null;
  secretImgSrc = null;
  imagesList = [];
});
