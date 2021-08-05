const { getAllCameras } = require("./controllers/camera");

const listeProduits = document.getElementById('liste-produits');

function createCard() {
    /*
    <div class="card bg-light m-3">
        <div class="row no-gutters">
            <div class="col-4">
                <img class="card-img-top" src="..." alt="Image du produit">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">Nom du produit</h5>
                    <p class="card-text">Description</p>
                    <p class="card-text">Prix : 0€</p>
                    <a href="./produit.html" class="btn btn-warning float-right mb-3">Voir le produit</a>
                </div>
            </div>
        </div>
    </div>
    */
    const card = document.createElement("div");
    
    // <div class="card bg-light m-3">
    card.className = 'card';
    card.classList.add("bg-light", "m-3");
    
    // <div class="row no-gutters">
    const div1 = document.createElement("div");
    div1.classList.add("row", "no-gutters");

    // <div class="col-4">
    const div2 = document.createElement("div");
    div2.classList.add("col-4");

    // <img class="card-img-top" src="..." alt="Image du produit">
    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = "...";
    image.alt = "Image du produit";

    // <div class="col-8">
    const div3 = document.createElement("div");
    div3.classList.add("col-8");

    // <div class="card-body"></div>
    const body = document.createElement("div");
    body.classList.add("card-body");

    // <div class="card-title"></div>
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = "Nom du produit";

    // <div class="card-text"></div>
    const text1 = document.createElement("p");
    text1.classList.add("card-text");
    text1.textContent = "Description";

    // <div class="card-text"></div>
    const text2 = document.createElement("p");
    text2.classList.add("card-text");
    text2.textContent = "Prix : 0€";

    // <a href="./produit.html" class="btn btn-warning float-right mb-3">Voir le produit</a>
    const link = document.createElement("a");
    link.classList.add("btn", "btn-warning", "float-right", "mb-3");
    link.textContent = "Voir le produit";
    link.href = "./produit.html";

    body.appendChild(title);
    body.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(link);
    div3.appendChild(body);
    div2.appendChild(image);
    div1.appendChild(div2);
    div1.appendChild(div3);
    card.appendChild(div1);

    return card;
}

let id;
let name;
let price;
let description;
let imageUrl;

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

listeProduits.appendChild(createCard());

console.log(listeProduits);