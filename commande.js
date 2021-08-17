// Récupérer les parametres de l'url http...?order=...
const urlSearchParams = new URLSearchParams(window.location.search);
const param = Object.fromEntries(urlSearchParams.entries());

console.log(param);

document.getElementById("commandeId").textContent = param.order;

panier = localStorage;

function calculerPrixTotal(panier) {
    let totalPrix = 0;
    for (let i = 0; i < panier.length; i++) {
        let elt = JSON.parse(panier.getItem(panier.key(i)));
        totalPrix += elt.price;
    }
    return totalPrix;
}

document.getElementById("prix").textContent = calculerPrixTotal(panier) + " €";

panier.clear();