/***********************************************
 * 1) Referencias a elementos HTML
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
 * 2) Datos: 2 categorías, 20 imágenes cada una
 *    Reemplaza estos links por tus rutas reales (assets/images/...)
 ***********************************************/
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

/***********************************************
 * 3) Variables
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
 * 5) Escuchar los botones de categoría
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

    // Oculta el contenedor del secreto (por si estuvo visible antes)
    secretContainer.classList.add('hidden');
    secretImage.src = "";
  });
});

/***********************************************
 * 6) Función para cargar imágenes
 ***********************************************/
function loadCategoryImages(category) {
  gameBoard.innerHTML = "";

  // Lista de 20 imágenes
  const images = categoriesData[category];

  // Escoge 1 al azar como "secret"
  secretImgSrc = pickRandom(images);

  // Agrego las 20 al board
  images.forEach(src => {
    const imgElem = document.createElement('img');
    imgElem.src = src;
    imgElem.classList.add('game-image');

    // Permite fade al clic
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });

    gameBoard.appendChild(imgElem);
  });
}

/***********************************************
 * 7) Función para elegir un item al azar
 ***********************************************/
function pickRandom(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

/***********************************************
 * 8) Botón "Objeto Secreto" (mostrar/ocultar)
 ***********************************************/
showSecretBtn.addEventListener('click', () => {
  // Asigna la ruta a <img>
  secretImage.src = secretImgSrc;

  // Toggle del contenedor
  secretContainer.classList.toggle('hidden');
});

/***********************************************
 * 9) Botón "Reiniciar" (misma categoría)
 ***********************************************/
reiniciarBtn.addEventListener('click', () => {
  // Carga de nuevo la misma categoría
  loadCategoryImages(currentCategory);

  // Oculta el contenedor secreto
  secretContainer.classList.add('hidden');
  secretImage.src = "";
});
