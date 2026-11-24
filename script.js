// 1. Dades
const cotxes = [
  { 
    id: 1, 
    nom: "Bugatti Chiron Super Sport 300+", 
    potencia: 1500, 
    motor: "8.0 litres W16", 
    foto: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTSpxad-pfn2JnBEPvv9U0Yag2HZzfrRFJHmQHDLmjWmNOCq0FyrkcvxCjB4-cwuYAHMwTnfxiGfh2g1yY" 
  },
  { 
    id: 2, 
    nom: "Koenigsegg Jesko", 
    potencia: 1600, 
    motor: "V8 de 5.0 litres", 
    foto: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQhPxKSV0g5p6sRQqdq_s8xsoHHwsL2hQpEqjMNP5WcCTYxbwzFox1Xmwng7j9qWbJAaf-G3HsgKKEh9YQ" 
  },
  { 
    id: 3, 
    nom: "Hennessey Venom F5", 
    potencia: 1800, 
    motor: "V8 de 6.6 litres", 
    foto: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSpbx5zRa7Dh8RDcL1CwouwQe5rTUYCnCefl4Iup6F_klP2UnLIX8xXZVM1X4QIozZpf9drwbljQn0kKKk" 
  },
  { 
    id: 4, 
    nom: "Rimac C_Two", 
    potencia: 1900, 
    motor: "Elèctric", 
    foto: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSZLXqi9y7QOGOP5TIBGk78RrenWI-TxnQGj7qDO1--9PDX-Wyib4FFX9nq9MFTCIo3WfNiTfvyOfvOtnM" 
  },
  { 
    id: 5, 
    nom: "Lamborghini Sian", 
    potencia: 800, 
    motor: "V12 híbrid", 
    foto: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcS_o8btBnv0DDbgyMzTr6HeuUqdQ8INAqRPSEZaHca0S2t4luqe35dhXtakQFYdJVtaDQna02KhdtvSiuI" 
  }
];

// 2. Targetes
const divTargetes = document.getElementById("targetes");

cotxes.forEach(function (cotxe) {
  divTargetes.innerHTML += `
    <div class="targeta">
      <img src="${cotxe.foto}" alt="${cotxe.nom}">
      <h3>${cotxe.nom}</h3>
      <p>Potència: ${cotxe.potencia} cavalls de força</p>
      <p>Motor: ${cotxe.motor}</p>
    </div>`;
});

// 3. Selectors
const select1 = document.getElementById("cotxe1");
const select2 = document.getElementById("cotxe2");

select1.innerHTML = '<option value="">Selecciona un cotxe</option>';
select2.innerHTML = '<option value="">Selecciona un cotxe</option>';

cotxes.forEach(function (cotxe) {
  const opcio = `<option value="${cotxe.id}">${cotxe.nom}</option>`;
  select1.innerHTML += opcio;
  select2.innerHTML += opcio;
});

// 4. Comparar
document.getElementById("btnComparar").addEventListener("click", function () {
  const error = document.getElementById("errorComparar");
  const resultat = document.getElementById("resultatComparar");
  const id1 = select1.value;
  const id2 = select2.value;

  error.textContent = "";
  resultat.innerHTML = "";

  if (id1 === "" || id2 === "") {
    error.textContent = "Has de seleccionar dos cotxes.";
    return;
  }
  if (id1 === id2) {
    error.textContent = "Has de seleccionar dos cotxes diferents.";
    return;
  }

  const c1 = cotxes.find(function (c) { return c.id == id1; });
  const c2 = cotxes.find(function (c) { return c.id == id2; });

  resultat.innerHTML = `
    <table>
      <tr><th>Característica</th><th>${c1.nom}</th><th>${c2.nom}</th></tr>
      <tr><td>Potència</td><td>${c1.potencia} cavalls</td><td>${c2.potencia} cavalls</td></tr>
      <tr><td>Motor</td><td>${c1.motor}</td><td>${c2.motor}</td></tr>
    </table>`;
});

// 5. Cercar per potència
document.getElementById("btnCercar").addEventListener("click", function () {
  const valor = document.getElementById("potenciaMin").value.trim();
  const error = document.getElementById("errorCerca");
  const resultat = document.getElementById("resultatCerca");
  const limit = Number(valor);

  error.textContent = "";
  resultat.innerHTML = "";

  if (valor === "" || isNaN(limit) || limit < 0) {
    error.textContent = "Introdueix un número vàlid (no buit i no negatiu).";
    return;
  }

  // Hora en format hh:mm
  const ara = new Date();
  const hh = String(ara.getHours()).padStart(2, "0");
  const mm = String(ara.getMinutes()).padStart(2, "0");

  const trobats = cotxes.filter(function (c) { return c.potencia > limit; });

  let html = `<p><strong>Cerca feta a les ${hh}:${mm}</strong></p>`;

  if (trobats.length === 0) {
    html += "<p>No s'han trobat cotxes</p>";
  } else {
    html += "<ul>";
    trobats.forEach(function (c) {
      html += `<li>${c.nom} - ${c.potencia} cavalls</li>`;
    });
    html += "</ul>";
  }

  resultat.innerHTML = html;
});