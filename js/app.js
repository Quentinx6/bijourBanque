import { user } from "./user.js";

console.dir(user);

console.log(
   `hello ${user.firstname}, i know your password :-) ${user.password}`
);



// on stocke toutes les opérations de compte dans un array[]
const operationsCompte = [
  // exemples
  // ["+", "salaire", 1520],
  // ["-", "achat PS4", 499.99],
  // ["-", "achat TV", 599],
];
// on déclare nos variables
let solde = 0;
let depense = 0;
let operator = "";
let devise = "€";
let debit = document.getElementById('detailsDebit');
let credit = document.getElementById('detailsCredit');
let totalpercent = document.getElementById('totalDebitPercent');
let spanpourcent = document.getElementsByClassName('pourcent');

document.querySelector("#firstname").textContent = user.firstname;
let total = document.getElementById('total');
let fullcredit = document.getElementById('totalCredit');
let fulldebit = document.getElementById('totalDebit');
let recupmontant = document.getElementsByClassName('recuptonmontant');

function calcul(symbole, libelle, montant) {
  if(symbole === "+"){
    let li = document.createElement("li");
    let span = document.createElement("span");
    let span2 = document.createElement('span');
    credit.appendChild(li);
    li.appendChild(span);
    span.classList.add('intitule');
    span.textContent = libelle;
    li.appendChild(span2);
    span2.setAttribute("class", "montant txt-color-gazoil");
    span2.textContent = montant + " " + devise;
    solde += montant;
    fullcredit.textContent = solde + '€';
    totalpercent.textContent = ((depense / solde) * 100).toFixed(0) + '%';
    MajPercent();
  }
  else if(symbole === "-"){
    let li = document.createElement("li");
    let span = document.createElement("span");
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    debit.appendChild(li);
    li.appendChild(span);
    span.classList.add('intitule');
    span.textContent = libelle;
    li.appendChild(span2);
    span2.setAttribute("class", "montant txt-color-red recuptonmontant")
    span2.textContent = montant + " " + devise;
    li.appendChild(span3);
    span3.setAttribute("class", "percent txt-color-red pourcent");
    depense += montant;
    span3.textContent = ((montant / solde) * 100).toFixed(0) + '%';
    fulldebit.textContent = depense + '€';
    totalpercent.textContent = ((depense / solde) * 100).toFixed(0) + '%';
  }
  total.textContent = parseInt(solde) - parseInt(depense) + '€';
}
// on execute la function
// calcul();
calcul('+', 'Montre', 200);
calcul('-', 'Achat', 100);
function MajPercent(){
  for (let i = 0; i < spanpourcent.length; i++){
    let calculpourcent= (parseInt(recupmontant[i].textContent) / parseInt(solde)) * 100;
    spanpourcent[i].textContent = parseInt(calculpourcent).toFixed(0) + '%';
  }

};

// send form, add operation
const formulaire = document.getElementById("ajoutOperation");
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  // on récupère les valeurs des champs du formulaire
  let symbole = document.getElementById('operation').value;
  let libelle = document.getElementById('intitule').value;
  let montant = document.getElementById('montant').value;
  // on stocke ces valeurs dans un array[]
  let tableau = [symbole, libelle, montant];
  // on ajoute cet array dans notre array global operationsCompte
  operationsCompte.push(tableau);

  // on execute la fonction pour actualiser
  calcul(symbole, libelle, parseInt(montant));

  // on reset le formulaire
  formulaire.reset();
});
