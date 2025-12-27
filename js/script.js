/* =====================================================
MODAL DE IMAGEM — GALERIA (VERSÃO FINAL)
===================================================== */

/* ===============================
   CONFIGURAÇÃO DAS GALERIAS
=============================== */
const galleries = {
  tipoia: [
    "../images/tipoia/tipoia_01.jpg",
    "../images/tipoia/tipoia_02.jpg",
    "../images/tipoia/tipoia_03.jpg"
  ],
   colar: [
    "../images/colar_cervical/colar_cervical.jpg",
  
  ]
  
};

/* ===============================
   VARIÁVEIS
=============================== */
let currentGallery = [];
let currentIndex = 0;
let modal = null;
let modalImg = null;

/* ===============================
   EVENTOS DE CLICK
=============================== */
document.addEventListener("click", function (e) {
  const target = e.target;

  /* ---- ABRIR MODAL ---- */
  if (target.dataset.gallery) {
    currentGallery = galleries[target.dataset.gallery];
    currentIndex = Number(target.dataset.index) || 0;

    if (!modal) {
      modal = document.createElement("div");
      modal.className = "image-modal";
      modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <span class="nav prev">&#10094;</span>
        <img alt="Imagem ampliada">
        <span class="nav next">&#10095;</span>
      `;
      document.body.appendChild(modal);
      modalImg = modal.querySelector("img");
    }

    updateModalImage();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /* ---- NAVEGAÇÃO ---- */
  if (target.classList.contains("next")) {
    nextImage();
  }

  if (target.classList.contains("prev")) {
    prevImage();
  }

  /* ---- FECHAR MODAL ---- */
  if (
    target.classList.contains("image-modal") ||
    target.classList.contains("close-modal")
  ) {
    closeImageModal();
  }
});

/* ===============================
   TECLADO
=============================== */
document.addEventListener("keydown", function (e) {
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "Escape") closeImageModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

/* ===============================
   FUNÇÕES
=============================== */
function updateModalImage() {
  modalImg.src = currentGallery[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateModalImage();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateModalImage();
}

function closeImageModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
/* =====================================================
TROCA DA IMAGEM PRINCIPAL AO CLICAR NA MINIATURA
===================================================== */

document.addEventListener("click", function (e) {
  const thumb = e.target;

  if (
    thumb.closest(".product-thumbs") &&
    thumb.dataset.gallery &&
    thumb.dataset.index
  ) {
    const mainImage = document.getElementById("mainProductImage");
    if (!mainImage) return;

    // troca imagem principal (miniatura grande)
    mainImage.src = thumb.src;
    mainImage.dataset.index = thumb.dataset.index;

    // controle de ativo
    document
      .querySelectorAll(".product-thumbs img")
      .forEach(img => img.classList.remove("active"));

    thumb.classList.add("active");
  }
});
