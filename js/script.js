/* =====================================================
   GALERIA DE IMAGEM — MODAL ÚNICO
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CRIA MODAL (OCULTO POR PADRÃO)
  ============================== */
  const modal = document.createElement("div");
  modal.className = "image-modal";

  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img alt="Imagem ampliada" style="display:none;">
  `;

  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".close-modal");

  /* ===============================
     FUNÇÕES
  ============================== */

  function openModal(src) {
    if (!src) return;

    modalImg.src = src;
    modalImg.style.display = "block";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modalImg.src = "";
    modalImg.style.display = "none";
    document.body.style.overflow = "";
  }

  /* ===============================
     EVENTOS DO MODAL
  ============================== */

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ===============================
     IMAGEM PRINCIPAL → ABRE MODAL
  ============================== */
  document.querySelectorAll(".product-main-image").forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.src);
    });
  });

  /* ===============================
     MINIATURAS → TROCAM IMAGEM
  ============================== */
  document.querySelectorAll(".product-thumbs").forEach((group) => {

    const mainImage = group
      .closest(".product-image")
      ?.querySelector(".product-main-image");

    if (!mainImage) return;

    group.querySelectorAll("img").forEach((thumb) => {
      thumb.addEventListener("click", (e) => {

        e.stopPropagation(); // não abre modal

        mainImage.src = thumb.src;

        group.querySelectorAll("img").forEach(img =>
          img.classList.remove("active")
        );

        thumb.classList.add("active");
      });
    });
  });

});


/* =====================================================
   CONTATO — VALIDAÇÃO DE FORMULÁRIO
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  if (!form) return;

  const campos = document.querySelectorAll(".required");
  const spans = document.querySelectorAll(".span-required");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

  function setError(index) {
    campos[index].style.border = "3px solid #e63636";
    spans[index].style.display = "block";
  }

  function removeError(index) {
    campos[index].style.border = "";
    spans[index].style.display = "none";
  }

  window.nameValidate = function () {
    campos[0].value.length < 3 ? setError(0) : removeError(0);
  };

  window.emailValidate = function () {
    emailRegex.test(campos[1].value) ? removeError(1) : setError(1);
  };

  window.telefoneValidate = function () {
    campos[2].value.length < 11 ? setError(2) : removeError(2);
  };

});
