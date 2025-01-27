const texts = [
  "Ingeniero de Sistemas",
  "Entusiasta de la programación",
  "Desarrollador FullStack",
  "Desarrollador de automatización",
  "Apasionado por la tecnología",
  "Desarrollador de Software",
  "Programador de Machine Learning",
];
let currentText = 0;
let currentChar = 0;
let isDeleting = false;
let delay = false;

const typedTextElement = document.getElementById("typed-text");

function type() {
  const currentString = texts[currentText];
  if (isDeleting) {
    typedTextElement.innerHTML = currentString.substring(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentText = (currentText + 1) % texts.length;
    }
    setTimeout(type, 100);
  } else {
    typedTextElement.innerHTML = currentString.substring(0, currentChar + 1);
    currentChar++;
    if (currentChar === currentString.length) {
      if (!delay) {
        delay = true;
        setTimeout(() => {
          isDeleting = true;
          delay = false;
          type();
        }, 3000);
        return;
      }
    }
    setTimeout(type, 200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

let oldSection = "inicio";
let newSection = "inicio";

document.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  const viewportHeight = window.innerHeight;
  let maxVisibleSection = null;
  let maxVisiblePercentage = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    const visiblePercentage = (visibleHeight / rect.height) * 100;

    if (visiblePercentage > maxVisiblePercentage) {
      maxVisiblePercentage = visiblePercentage;
      maxVisibleSection = section;
    }
  });

  sections.forEach((section) => {
    if (section.classList === maxVisibleSection.classList) {
      newSection = section.className;
      if (newSection === oldSection) return;
      document.querySelector(`#${newSection}`).classList.add("current");
      document.querySelector(`#${oldSection}`).classList.add("notCurrent");
      document.querySelector(`#${oldSection}`).classList.remove("current");
      document.querySelector(`#${newSection}`).classList.remove("notCurrent");
      oldSection = newSection;
    }
  });
});

function mostrarventana(titulo, texto, imagenes, link) {
  document.querySelector(".ventana").style.visibility = "visible";
  document.querySelector(".ventana").innerHTML = `
  <div class="ventana-contenido">
    <h3>${titulo}</h3>
    <img src="src/x.png" alt="" class="x" onclick="ocultarventana()">
    <div>
      <span>
          ${texto}
          <br>
          <br>
          ${link ? `<a href="${link}" class="link">Link al repositorio</a>` : ""}
        </span>
        <div class="fotos">
          ${imagenes.map((imagen) => `<img src="${imagen}" alt="" style="margin: auto" />`).join("")}
        </div>
    </div>
  </div>
  `;
}

function ocultarventana() {
  document.querySelector(".ventana").style.visibility = "hidden";
}

function mostrarcreditos() {
  document.querySelector(".creditos").classList.remove("salir");
  document.querySelector(".creditos").classList.add("entrada");
  document.querySelector(".creditos").style.visibility = "visible";
}

function ocultarcreditos() {
  document.querySelector(".creditos").classList.remove("entrada");
  document.querySelector(".creditos").classList.add("salir");
  setTimeout(() => {
    document.querySelector(".creditos").style.visibility = "hidden";
}, 500);
}