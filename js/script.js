/* =====================================================
   SCRIPT GLOBAL — STYLE WAY
   (simples, seguro e previsível)
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  console.log("SCRIPT STYLE WAY CARREGADO");

  /* =====================================================
     MODAL DE IMAGEM — PRODUTO
     (COM DELEGAÇÃO DE EVENTO)
  ===================================================== */

  /* cria modal se não existir */
  let imageModal = document.querySelector(".image-modal");

  if (!imageModal) {
    imageModal = document.createElement("div");
    imageModal.className = "image-modal";

    imageModal.innerHTML = `
      <span class="close-modal">&times;</span>
      <img alt="Imagem ampliada do produto">
    `;

    document.body.appendChild(imageModal);
  }

  const modalImg = imageModal.querySelector("img");
  const closeBtn = imageModal.querySelector(".close-modal");

  /* abrir modal */
  function openImageModal(src) {
    if (!src) return;

    modalImg.src = src;
    imageModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /* fechar modal */
  function closeImageModal() {
    imageModal.classList.remove("active");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  /* fechar no X */
  closeBtn.addEventListener("click", closeImageModal);

  /* fechar clicando fora da imagem */
  imageModal.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      closeImageModal();
    }
  });

  /* fechar no ESC */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeImageModal();
    }
  });

  /* =====================================================
     DELEGAÇÃO DE EVENTO — ABRIR MODAL
     (FUNCIONA EM PORTRAIT E LANDSCAPE)
  ===================================================== */
document.addEventListener("click", function (e) {

  const container = e.target.closest(".product-image");
  if (!container) return;

  const img = container.querySelector(".product-main-image");
  if (!img || !img.src) return;

  openImageModal(img.src);

});

  /* =====================================================
     MINIATURAS — TROCA IMAGEM PRINCIPAL
     (NÃO ABRE MODAL)
  ===================================================== */
  document.querySelectorAll(".product-thumbs").forEach(function (group) {

    const mainImage = group.closest(".product-image")
      ?.querySelector(".product-main-image");

    if (!mainImage) return;

    group.querySelectorAll("img").forEach(function (thumb) {
      thumb.addEventListener("click", function (e) {

        e.stopPropagation(); // impede abrir modal

        mainImage.src = thumb.src;

        group.querySelectorAll("img").forEach(img =>
          img.classList.remove("active")
        );

        thumb.classList.add("active");
      });
    });
  });

  /* =====================================================
     FORMULÁRIO DE CONTATO (SE EXISTIR)
  ===================================================== */

  const form = document.getElementById("form");
  if (!form) return;

  const campos = document.querySelectorAll(".required");
  const spans = document.querySelectorAll(".span-required");

  function setError(index) {
    campos[index].style.border = "2px solid #e63636";
    spans[index].style.display = "block";
  }

  function removeError(index) {
    campos[index].style.border = "";
    spans[index].style.display = "none";
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* validações públicas */
  window.nameValidate = function () {
    campos[0].value.length < 3 ? setError(0) : removeError(0);
  };

  window.emailValidate = function () {
    validarEmail(campos[1].value) ? removeError(1) : setError(1);
  };

  window.telefoneValidate = function () {
    campos[2].value.length < 10 ? setError(2) : removeError(2);
  };

});
