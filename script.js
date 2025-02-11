// 1) Referencias a elementos
const openCategoryBtn = document.getElementById('openCategoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const selectedCategoryElem = document.getElementById('selectedCategory');
const showSecretBtn = document.getElementById('showSecretBtn');
const secretContainer = document.getElementById('secretContainer');
const secretImage = document.getElementById('secretImage');
const gameBoard = document.getElementById('gameBoard');

// 2) Datos de ejemplo: 20 URLs por categoría
//    Reemplaza estas URLs con las tuyas (assets/images/...). 
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

// 3) Variables
let secretImgSrc = null; // Ruta de la imagen secreta elegida al azar

// 4) Botón "Elegir Categoría"
openCategoryBtn.addEventListener('click', () => {
  categoryMenu.classList.toggle('hidden');
});

// 5) Al hacer clic en un botón de categoría
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Ocultar menú
    categoryMenu.classList.add('hidden');

    // Tomar el nombre de la categoría
    const category = btn.dataset.category;
    selectedCategoryElem.textContent = `Categoría: ${category}`;

    // Cargar las 20 imágenes
    loadCategoryImages(category);

    // Mostrar el botón "Mostrar objeto secreto"
    showSecretBtn.classList.remove('hidden');

    // Al ocultar la imagen secreta, si se mostró antes
    secretContainer.classList.add('hidden');
    secretImage.src = ''; 
  });
});

// 6) Función para cargar las 20 imágenes en el board
function loadCategoryImages(cat) {
  gameBoard.innerHTML = ''; // limpio
  
  // cojo la lista de la categoría
  const imgs = categoriesData[cat];

  // Elijo 1 imagen aleatoria como secreta
  secretImgSrc = pickRandomImage(imgs);

  // Muestro las 20 en el board
  imgs.forEach(src => {
    const imgElem = document.createElement('img');
    imgElem.src = src;
    // Permitir fade al hacer clic
    imgElem.addEventListener('click', () => {
      imgElem.classList.toggle('fade');
    });
    gameBoard.appendChild(imgElem);
  });
}

// 7) Función aleatoria
function pickRandomImage(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// 8) Botón "Mostrar objeto secreto"
showSecretBtn.addEventListener('click', () => {
  // Poner la ruta aleatoria en la imagen
  secretImage.src = secretImgSrc;

  // Mostrar contenedor
  secretContainer.classList.remove('hidden');
});

// (No hay botón "arriesgar" ni nada más)
