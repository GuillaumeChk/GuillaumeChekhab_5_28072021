// Récupérer les parametres de l'url http...?id=...
const urlSearchParams = new URLSearchParams(window.location.search);
const param = Object.fromEntries(urlSearchParams.entries());

const urlProduit = "http://localhost:3000/api/cameras/" + param.id;

// Panier localstorage
panier = localStorage;
//panier.clear();

console.log(panier);

// Ajouter le produit au panier HTML
function ajouterAuPanierHtml (objet) {
    // <li class="list-group-item d-flex justify-content-between lh-condensed"></li>
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

    // <div>
    const div = document.createElement("div");

    // <h6 class="my-0">Nom du produit 1</h6>
    const h6 = document.createElement("h6");
    h6.classList.add("my-0");
    h6.textContent = objet.name;

    // <small class="text-muted">Brève description</small>
    const small = document.createElement("small");
    small.classList.add("text-muted");
    small.textContent = objet.description;

    // <span class="text-muted">12€</span>
    const span = document.createElement("span");
    span.classList.add("text-muted");
    span.textContent = objet.price + "€";

    div.appendChild(h6);
    div.appendChild(small);
    li.appendChild(div);
    li.appendChild(span);

    document.getElementById("liste-panier").prepend(li);
}

// TODO: Faire un get all, enregistrer dans une variable
// Comparer chaque elt avec ceux les ID du paniers, si oui : ajouterAuPanierHtml

// Ajouter tous les élements au panier HTML
function ajouterToutPanierHtml (panier) {
    for (let i = 0; i < panier.length; i++) {
        ajouterAuPanierHtml(panier.getItem(panier.key(i))); // ici
    }
}

// Récupérer les valeurs du produit
fetch(urlProduit)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    //console.log(value);
    panier.setItem(panier.length, value._id);
    ajouterToutPanierHtml(panier);
    console.log(panier);
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Catch erreur dans le fetch : " + err);
  });

  // Récupérer la valeur de tous les produits