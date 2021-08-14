// Récupérer les parametres de l'url http...?order=...
const urlSearchParams = new URLSearchParams(window.location.search);
const param = Object.fromEntries(urlSearchParams.entries());

console.log(param);