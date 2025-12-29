document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MODAL ÚNICO
  =============================== */
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img src="" alt="Imagem ampliada">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".close-modal");

  function openModal(src) {
    modalImg.src = src;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* ===============================
     IMAGEM PRINCIPAL → ABRE MODAL
  =============================== */
  document.querySelectorAll(".product-main-image").forEach(img => {
    img.addEventListener("click", () => {
      openModal(img.src);
    });
  });

  /* ===============================
     MINIATURAS → TROCAM A IMAGEM
  =============================== */
  document.querySelectorAll(".product-thumbs").forEach(group => {

    const mainImage = group
      .closest(".product-image")
      .querySelector(".product-main-image");

    group.querySelectorAll("img").forEach(thumb => {
      thumb.addEventListener("click", (e) => {

        e.stopPropagation(); // evita abrir o modal

        // troca a imagem principal
        mainImage.src = thumb.src;

        // estado ativo
        group.querySelectorAll("img").forEach(i =>
          i.classList.remove("active")
        );
        thumb.classList.add("active");

      });
    });
  });

});
/* =========================================================
   CONTATO — VALIDAÇÃO DE FORMULÁRIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  if (!form) return; // garante que só roda na página de contato

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
    if (campos[0].value.length < 3) {
      setError(0);
    } else {
      removeError(0);
    }
  };

  window.emailValidate = function () {
    if (emailRegex.test(campos[1].value)) {
      removeError(1);
    } else {
      setError(1);
    }
  };

  window.telefoneValidate = function () {
    if (campos[2].value.length < 11) {
      setError(2);
    } else {
      removeError(2);
    }
  };
});
