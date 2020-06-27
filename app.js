window.onload = function() {
  var tl = new TimelineMax({ repeat: 1, yoyo: false, repeatDelay: 0 });
  tl.to(resaltado, 0.8, {
    text: "Solo en 10 años se registraron 2679 Femicidios",
    ease: Linear.easeNone,
    delay: 5.5
  });
  tl.to(resaltado, 0.8, {
    text: {
      value:
        "En el 66 % de los casos, fueron víctimas de quienes dijeron amarlas",
      ease: Linear.easeNone
    },
    delay: 5.5
  });
  tl.to(resaltado, 0.8, {
    text: {
      value:
        "El 59% de los femicidios se dieron dentro de la vivienda de la víctima",
      ease: Linear.easeNone
    },
    delay: 5.5
  });
  tl.to(resaltado, 0.8, {
    text: {
      value: "3378 niños y niñas quedaron sin sus madres entre 2008 y 2017",
      ease: Linear.easeNone
    },
    delay: 5.5
  });
};

var busqueda = 0;
var json;
var input = document.querySelector("#input");
var content = document.querySelector("#content");
var btn = document.querySelector("#buscar");
var info = document.querySelector(".info");
var resaltado = document.querySelector(".resaltado");
var wrapper = document.querySelector(".wrapper");
var advertencia = document.querySelector(".advertencia");
var contacto = document.querySelector("#contacto");
btn.addEventListener("click", validar);
const meses = {
  Ene: "Jan",
  Feb: "Feb",
  Mar: "Mar",
  Abr: "Apr",
  May: "May",
  Jun: "Jun",
  Jul: "Jul",
  Ago: "Aug",
  Sep: "Sep",
  Oct: "Oct",
  Nov: "Nov",
  Dic: "Dec"
};
function validar() {
  for (var element of datalist.children) {
    if (element.value === input.value) {
      console.log("ok");
      handler();
      return true;
    }     
  }
  advertencia.classList.toggle("oculto");
  return false;
}

function handler() {
  if (busqueda) {
    content.innerHTML = "";
    input.value = "";
    busqueda = 0;
    wrapper.classList.toggle("top");
    wrapper.classList.toggle("bg");
    info.classList.toggle("oculto");
    resaltado.classList.toggle("oculto");
    content.classList.toggle("oculto");
    input.classList.toggle("format");
    input.readOnly = false;
    contacto.classList.toggle("oculto");
    contacto.classList.toggle("mensaje");
  } else {
    busqueda = 1;
    wrapper.classList.toggle("top");
    wrapper.classList.toggle("bg");
    info.classList.toggle("oculto");
    resaltado.classList.toggle("oculto");
    content.classList.toggle("oculto");
    input.classList.toggle("format");
    input.readOnly = true;
    contacto.classList.toggle("oculto");
    contacto.classList.toggle("mensaje");
    advertencia.classList.add("oculto");
    buscar();
  }
}

function buscar(e) {
  var url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyCMIhir8Ccx9kT-ZacjLHkqs33R4YLn6fM&cx=005438347368936070682:avdruws81j6&q="${
    input.value
  }"hallada muerta`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      insertar(data);
    });
}

function parsearFecha(fecha) {
  let partes = fecha.split(" ");
  partes[1] = meses[partes[1]];
  if (partes[1] === undefined) return " ";
  let fechaUnida = new Date(partes.join(" "));
  let day = fechaUnida.getDate();
  let month = fechaUnida.getMonth() + 1;
  let year = fechaUnida.getFullYear();
  let fechaFormateada;
  if (month < 10) {
    fechaFormateada = `${day}/0${month}/${year}`;
  } else {
    fechaFormateada = `${day}/${month}/${year}`;
  }
  return fechaFormateada;
}

function insertar(response) {
  json = response;
  content.innerHTML = "";
  var cantidadItems = response.items.length;
  var random = Math.floor(Math.random() * cantidadItems);
  var twitter = `parendematarnos.com.ar%0D%0ABusqué%20${input.value}%0D%0A`;
  for (let i = 0; i < cantidadItems; i++) {
    var item = response.items[i];
    var fechaydesc = item.htmlSnippet.split(" <b>...</b> ");
    var fecha = parsearFecha(fechaydesc[0]);
    var imagen = "";
    if (item.pagemap === undefined) continue;
    if (item.pagemap.cse_thumbnail) {
      imagen = item.pagemap.cse_thumbnail[0].src;
    } else if (item.pagemap.thumbnail) {
      imagen = item.pagemap.thumbnail[0].src;
    } else if (item.pagemap.cse_image) {
      imagen = item.pagemap.cse_image[0].src;
    } else {
      imagen = "#";
    }
    var title =
      item.pagemap.metatags === undefined ||
      item.pagemap.metatags[0].src === undefined
        ? item.htmlTitle
        : item.pagemap.metatags[0]["og:title"];
    content.innerHTML += `
        <article>
          <figure>
            <img src="${imagen}" alt="" class="imgarticle" />
          </figure>
          <div class="descripcion">
            <h2>${title}</h2>
            <p>${fecha == " " ? fechaydesc[0] : fechaydesc[1]}</p> 
          </div>
          <div class="mas">
          <h3>${fecha}</h3>
          <a href="${item.link}" target="blank">Saber Más</a></div>
        </article>
        `;
    if (i == random) {
      twitter += title + "%0A";
    }
  }
  content.innerHTML += `
    <article class="informacion">
    <div class="hashtags">
      <div class="hash">#ParenDeMatarnos</div>
      <div class="hash">#NoTeQuedesCallada</div>
      <div class="hash">#Linea144</div>
      <div class="hash">#${input.value}SomosTodas</div>
      <div class="hash">#NiUnaMenos</div>
    </div>
    <div class="social">
          <!-- Sharingbutton Facebook -->
      <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=www.parendematarnos.com.ar" target="_blank" rel="noopener" aria-label="Share on Facebook">
        <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
          </div>Compartir en Facebook</div>
      </a>

      <!-- Sharingbutton Twitter -->
<a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=${twitter}&hashtags=ParenDeMatarnos,NiUnaMenos,NoTeQuedesCallada,Linea144,${input.value}SomosTodas;url=www.parendematarnos.com.ar" target="_blank" rel="noopener" aria-label="Share on Twitter">
        <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
          </div>Compartir en Twitter</div>
      </a>

      <!-- Sharingbutton E-Mail -->
      <a class="resp-sharing-button__link" href="mailto:?subject=Una%20Mujer%20es%20asesinada%20cada%2023%20horas%20en%20Argentina%20&body=${twitter}%23ParenDeMatarnos%0A%23NiUnaMenos%0A%23NoTeQuedesCallada%0A%23Linea144%0A%23${
    input.value}SomosTodas" target="_blank" rel="noopener" aria-label="Share by E-Mail">
        <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg></div>Compartir por E-Mail</div>
      </a>

      <!-- Sharingbutton WhatsApp -->
      <a class="resp-sharing-button__link" href="https://wa.me/?text=${twitter}%23ParenDeMatarnos%0A%23NiUnaMenos%0A%23NoTeQuedesCallada%0A%23Linea144%0A%23${
    input.value}SomosTodas" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
        <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>
          </div>Compartir en WhatsApp</div>
      </a>
    </div>
  </article>
  `;
}
