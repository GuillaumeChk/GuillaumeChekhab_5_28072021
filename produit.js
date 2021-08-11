// Récupérer les parametres de l'url http...?id=...
const urlSearchParams = new URLSearchParams(window.location.search);
const param = Object.fromEntries(urlSearchParams.entries());

const urlProduit = "http://localhost:3000/api/cameras/" + param.id;

// Définir les valeurs du produit sur la page
function definirValeursProduit (objet) {
    document.getElementById("name").textContent = objet.name;
    document.getElementById("desc").textContent = objet.description;
    document.getElementById("name").textContent = objet.name;
    document.getElementById("price").textContent = "Prix : " + objet.price + "€";
    document.getElementById("img").src = objet.imageUrl;
    document.getElementById("choixLabel").textContent = "Lentilles"; // pour Cameras only
    
    // Ajouter les options du select
    for (const i in objet.lenses) {
        if (Object.hasOwnProperty.call(objet.lenses, i)) {
            const selectLine = document.createElement("option");
            selectLine.textContent = objet.lenses.at(i); // attribut "lenses" de l'objet
            document.getElementById("choixSelect").appendChild(selectLine);
        }
    }

    // Ajouter lien au bouton "Ajouter au panier"
    // document.getElementById("goPanier").href = "./panier.html?id=" + objet._id;
    document.getElementById("goPanier").href = "./panier.html";
}

// Panier localstorage
panier = localStorage;
// panier.clear();
boutonAjouter = document.getElementById("goPanier");

// Récupérer les valeurs du produit
fetch(urlProduit)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    // console.log(value);
    definirValeursProduit(value);
    // Ajouter au panier (evenement click bouton "Ajouter au panier")
    boutonAjouter.addEventListener('click', function(event) {
      panier.setItem(panier.length, JSON.stringify(value));
      // console.log("event fired");
    });
  })
  .catch(function(err) {
    // Une erreur est survenue
    console.log("Catch erreur dans le fetch : " + err);
  });

//console.log(urlProduit);