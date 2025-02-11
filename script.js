/***********************************************
 * 1) Referencias a elementos HTML
 ***********************************************/
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');
const showSecretContainer = document.getElementById('showSecretContainer');
const showSecretBtn = document.getElementById('showSecretBtn');
const secretContainer = document.getElementById('secretContainer');
const secretImage = document.getElementById('secretImage');
const gameBoard = document.getElementById('gameBoard');

/***********************************************
 * 2) Datos de ejemplo: 20 imágenes en 2 categorías
 *    (Reemplaza estos links con tus imágenes reales)
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
let secretImgSrc = null; // Aquí guardaremos la ruta de la imagen secreta

/***********************************************
 * 4) Botón "Elegir Categoría"
 ***********************************************/
openCategoryBtn.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

/***********************************************
 * 5) Botones de categoría
 ***********************************************/
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Oculta el menú de categorías
    categoryMenu.classList.add('hidden');

    // Toma la categoría seleccionada
    const cat = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${cat}`;

    // Carga las 20 imágenes y elige 1 como secreta
    loadCategoryImages(cat);

    // Muestra el botón para revelar el secreto
    showSecretContainer.classList.remove('hidden');
    // Oculta (si estuviera visible) el contenedor del secreto
    secretContainer.classList.add('hidden');
    secretImage.src = ''; 
  });
});

/***********************************************
 * 6) Función para cargar las imágenes en el board
 ***********************************************/
function loadCategoryImages(category) {
  gameBoard.innerHTML = ''; // Limpia el contenido previo
  
  // Toma las rutas
  const images = categoriesData[category];

  // Selecciona 1 imagen aleatoria como secreta
  secretImgSrc = pickRandom(images);

  // Crea elementos <img> en el gameBoard
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('game-image');

    // Al hacer click, fade
    img.addEventListener('click', () => {
      img.classList.toggle('fade');
    });

    gameBoard.appendChild(img);
  });
}

/***********************************************
 * 7) Función para elegir un item al azar
 ***********************************************/
function pickRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/***********************************************
 * 8) Botón "Mostrar objeto secreto"
 ***********************************************/
showSecretBtn.addEventListener('click', () => {
  // Asigna la ruta secreta a <img id="secretImage">
  secretImage.src = secretImgSrc;
  // Muestra el contenedor
  secretContainer.classList.remove('hidden');
});
