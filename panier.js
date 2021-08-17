// Panier localstorage
panier = localStorage;

// Total panier
let totalPrix = 0;

// Ajouter le produit au panier HTML
function ajouterAuPanierHtml (objet, multiple) {
  // <li class="list-group-item d-flex justify-content-between lh-condensed"></li>
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

  // <div>
  const div = document.createElement("div");
  div.classList.add("mr-4");

  // <h6 class="my-0">Nom du produit 1</h6>
  const h6 = document.createElement("h6");
  h6.classList.add("my-0");
  if(multiple > 1)
    h6.textContent = objet.name + " (x" + multiple +")";
  else
    h6.textContent = objet.name;

  // <small class="text-muted">Brève description</small>
  const small = document.createElement("small");
  small.classList.add("text-muted");
  small.textContent = objet.description;

  // <div>
  const div2 = document.createElement("div");
  div2.classList.add("d-flex", "flex-column", "justify-content-between");

  // <span class="text-muted">12€</span>
  const span = document.createElement("span");
  span.classList.add("text-muted");
  span.textContent = objet.price*multiple + " €";

  // <button class="btn btn-danger btn-lg btn-block" type="submit">Retirer du panier</button>
  const button = document.createElement("button");
  button.classList.add("btn", "btn-secondary", "btn-sm", "btn-block");
  button.textContent = "Retirer";
  button.dataset.id = objet._id;
  // Retirer du panier (evenement click bouton "Retirer")
  button.addEventListener('click', function(event) {
    retirerDuPanier(button.dataset.id);
  });

  div.appendChild(h6);
  div.appendChild(small);
  li.appendChild(div);
  div2.appendChild(span);
  div2.appendChild(button);
  li.appendChild(div2);

  document.getElementById("liste-panier").prepend(li);
}

// Retirer l'elt du panier
function retirerDuPanier(id) {
  if (panier.length == 1) {
    panier.clear();
  }
  else {
    let trouve = false;
    Object.keys(panier).forEach(key => {
      if(!trouve) { // remplace break boucle for
        eltPanier = JSON.parse(panier.getItem(key));
        console.log(eltPanier + " " + eltPanier._id);
        if (id == eltPanier._id) {
          panier.removeItem(key);
          trouve = true;
        }
      }
    });
  }
  location.reload();
}

// Compter les multiples de cet elt (x2, x3, ...)
function compterMultiples(elt) {
  let multiple = 0; // compte lui-même =1
  for (let i = 0; i < panier.length; i++) {
    eltPanier = JSON.parse(panier.getItem(panier.key(i)));
    if (elt._id == eltPanier._id) {
      multiple++;
    }
  }
  return multiple;
}

// Comparer chaque elt avec les ID du paniers
function verifierDejaFait(elt, panierTemp) {
  let dejaFait = false;
  for (let j = 0; j < panierTemp.length; j++) {
    if (elt._id == panierTemp[j]._id) {
      dejaFait = true;
      break;
    }
  }
  return dejaFait;
}

// Ajouter tous les élements au panier HTML
function ajouterToutHtml (panier) {
  let panierTemp = []; // panier des éléments à comparer pour vérifier si déjà ajouté
  for (let i = 0; i < panier.length; i++) {
    let elt = JSON.parse(panier.getItem(panier.key(i)));
    totalPrix += elt.price;
    
    // Si pas déjà fait, alors ajouterAuPanierHtml
    if (!verifierDejaFait(elt, panierTemp)) {
      panierTemp.push(elt);
      ajouterAuPanierHtml(elt, compterMultiples(elt));  
    }
  }

  document.getElementById("total").textContent = totalPrix + " €";
}

// Au chargement de la page :
ajouterToutHtml(panier);

// Créer object contact
function creerContact() {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value
  }
  console.log(contact);
  return contact;
}

// Créer tableau products (à partir du panier localstorage)
function creerProducts() {
  const products = [];
  Object.keys(panier).forEach(key => {
    eltPanier = JSON.parse(panier.getItem(key));
    products.push(eltPanier._id);
  });
  console.log(products);
  return products;
}

// Envoi de la commande
function send(e) {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact: creerContact(), products: creerProducts()})
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value.orderId);
    window.open("commande.html?order=" + value.orderId, '_self');
  })
}

// EVENT envoyer commande
document.getElementById("link").addEventListener("click", send);