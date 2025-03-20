let tableauVide = [];                                   // on cree un tableau vide 
let form = document.getElementById('formProduits');     // pour ajouter un produit
let formModifier = document.getElementById('formModifier');    // pour modifier un produit
let liste = document.getElementById('listeProduits'); 

fetch('produits.json')           // on charge le fichier json         
  .then (function(response){
    if (!response.ok) {
      throw new Error("Erreur : le fichier JSON n’a pas pu être chargé.");  
  }
  return response.json();
  })
  .then(function(data){              
    tableauVide = data;

    afficherListe();          // fonction afficher liste 
  })
  .catch(function(error){
    console.error("Erreur lors du chargement du fichier json :", error);  // si on a un probleme dans notre code 
  });

  function getStockPastille(stock) {                    // fonction pour gere les pastille 
    if (stock > 0) {
      return "<img src='assets/images/icons/green-circle.png' alt='En stock' style='width:12px; height:12px;'>";
    } else {
      return "<img src='assets/images/icons/red-circle.png' alt='Hors stock' style='width:12px; height:12px;'>";
    }
  }

  function afficherListe() {      // fonction pour afficher les produits dans un tableau 
    liste.innerHTML ="";          

    for (let i = 0; i < tableauVide.length; i++) {  
      let produit = tableauVide[i];
      let row = document.createElement('tr');
     
      let contenu = "<td>" + produit.reference + "</td>";
      contenu += " <td>" + produit.categorie + "</td>";
      contenu += " <td>" + produit.libelle + "</td>";
      contenu += " <td>" + produit.prix + " €</td>";
      contenu += " <td class='text-center'>" + getStockPastille(produit.stock) + "</td>";
      contenu += " <img src='assets/images/icons/eye.png' alt='voir le produit' onclick='voirProduit(\"" + produit.reference + "\")'>";                               
      contenu += " <img src='assets/images/icons/edit.png' alt='modifier le produit' onclick='modifierProduit(\"" + produit.reference + "\")'>";
      contenu += " <img src='assets/images/icons/trash.png' alt='modifier le produit' onclick='supprimer(\"" + produit.reference + "\")'>";
      
      row.innerHTML = contenu;

      liste.appendChild(row);
  }
  }

  form.addEventListener('submit', function(e) {  // fonction pour enregistrer 
    e.preventDefault();                         // Empêche le rechargement de la page lors de l'envoi du formulaire

    let reference = document.getElementById('reference').value;    
    let libelle = document.getElementById('libelle').value;
    let description = document.getElementById('description').value;
    let stock = document.getElementById('enStock').checked ? 1 : 0;
    let prix = document.getElementById('prix').value;
    let categorie = document.getElementById('categorie').value;
    let photo = document.getElementById('photo').value;

    let referenceExist = false;                       // pour verifier si une reference est deja la ou pas 
    for (let i = 0; i < tableauVide.length; i++) {  
        if (tableauVide[i].reference === reference) {
            referenceExist = true;                    // Si la référence existe, on change la variable à true
            tableauVide[i].libelle = libelle;
            tableauVide[i].description = description;
            tableauVide[i].stock = stock;
            tableauVide[i].prix = prix;
            tableauVide[i].categorie = categorie;
            tableauVide[i].photo = photo;
            break;  
        }
    }

    if (!referenceExist) {                  // Si la référence n'existe pas
        let nouvelUtilisateur = {  
            reference: reference,
            libelle: libelle,
            description: description,
            stock: stock,
            prix: prix,
            categorie: categorie,
            photo: photo
        };
        tableauVide.push(nouvelUtilisateur);           // On ajoute ce nouvel objet dans le tableau
        console.log(tableauVide);                     // Affiche le tableau pour vérifier
    } 

    form.reset();                                     // Réinitialise le formulaire après l'ajout
    document.getElementById('reference').value = "";  // Vide spécifiquement le champ 'reference'

    afficherListe();                                  // Appelle la fonction pour afficher la liste mise à jour
});
formModifier.addEventListener('submit', function(e) {           // pour modifier 
  e.preventDefault();

  let reference = document.getElementById('referenceModifier').value;
  let libelle = document.getElementById('libelleModifier').value;
  let description = document.getElementById('descriptionModifier').value;
  let stockC = document.getElementById('enStockModifier').checked ? 1 : 0;
  let stock = document.getElementById('stockAjouter').value;
  let prix = document.getElementById('prixModifier').value;
  let categorie = document.getElementById('categorieModifier').value;
  let photo = document.getElementById('photoModifier').value;

  for (let i = 0; i < tableauVide.length; i++) {
      if (tableauVide[i].reference === reference) {
          tableauVide[i].libelle = libelle;
          tableauVide[i].description = description;
          tableauVide[i].stockC = stockC;
          tableauVide[i].stock = stock;
          tableauVide[i].prix = prix;
          tableauVide[i].categorie = categorie;
          tableauVide[i].photo = photo;
          break;
      }
  }

  afficherListe();
  modalModifier.style.display = "none"; // Fermer la modale après modification
});

  function modifier (reference){                      // fonction pour modifier un produit 
    for (let i = 0; i < tableauVide.length; i++){                
      if (tableauVide[i].reference === reference) {                            
        document.getElementById('referenceModifier').value = tableauVide[i].reference;
        document.getElementById('libelleModifier').value = tableauVide[i].libelle;
        document.getElementById('descriptionModifier').value =tableauVide[i].description;
        document.getElementById('prixModifier').value = tableauVide[i].prix;
        document.getElementById('photoModifier').value = tableauVide[i].photo;
        document.getElementById('categorieModifier').value = tableauVide[i].categorie;
        document.getElementById('enStockModifier').checked = tableauVide[i].stockC;
        document.getElementById('stockAjouter').value = tableauVide[i].stock;
        break;
      }
    }
  }

  function supprimer(reference) {                // fonction pour suprimer un article
    let nouvelleListe = [];                 

    for (let i = 0; i < tableauVide.length; i++){      
      if (tableauVide[i].reference !== reference) {
        nouvelleListe.push(tableauVide[i]);
      }
    }
    tableauVide =  nouvelleListe;
    afficherListe();
  }

  
    let btnAjout = document.getElementById("btnAjouter");         // creation de 3 variable pour les modal 2 bouton et le corps de la modal 
    let modal = document.getElementById("modalAjout");
    let closeBtn = document.getElementById("fermerModal");
    
    btnAjout.addEventListener("click",function () {  //ouvrir le modal au clique du bouton ajouter 
      modal.style.display = "block";
    });
  
    closeBtn.addEventListener("click",function () { // fermer 
      modal.style.display = "none";
    });
    
    window.addEventListener("click",function (e) {    // Fermer modal si clique à l’extérieur
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    function modifierProduit(reference) {       // fonction pour la modal modifier 
      modalModifier.style.display = "block";
      modifier(reference);
      const checkbox = document.getElementById("enStockModifier");
      const stockInput = document.getElementById("stockAjouter");
    
      if (checkbox.checked) {           // on viens verifier si le checkbox est cocher ou pas 
        stockInput.disabled = false;  // si il est cochéé on active le champ 
      } else {
        stockInput.disabled = true;   //on désactive le champ stock
      }
      checkbox.addEventListener("change", function() {
        if (this.checked) {
          stockInput.disabled = false;   // pour changer le champ stock en actif ou inactif en
        } else {                         // cliquant sur la checkbox
          stockInput.disabled = true;
        }
      });
      }

      let modalModifier = document.getElementById("modalModifier");   // voir le modal modifier 
      let closeBtnM = document.getElementById("fermerModifier");

      closeBtnM.addEventListener("click",function () {                // fermer  la modal
        modalModifier.style.display = "none";
      });
      window.addEventListener("click",function (e) {                // Fermer modal si clique à l’extérieur
        if (e.target === modalModifier) {
          modalModifier.style.display = "none";
        }
      });
    
    let voirP = document.getElementById('productDetails');

    function voirProduit(reference){                          // function pour voir les produits creation de la modal dans le js 
      modalProduit.style.display = "block";
      voirP.innerHTML ="";          

    for (let i = 0; i < tableauVide.length; i++) {   // on vient chercher le numero de reference par rapport au bouton voir 
      if (tableauVide[i].reference === reference){
    
      
      let pageProduit = document.createElement('div');
      pageProduit.classList.add('row');
      let contenu = " <div class='col-4'> <img class='img-fluid rounded w-10' src=" + tableauVide[i].photo + " ></div>";
      contenu += " <div class='col-8'><div class='mb-3'><h3 class='card-title'>" + tableauVide[i].libelle +"</h3><p class='text-succes'><strong> Stock : </strong>" + getStockPastille(tableauVide[i].stock)+" "+tableauVide[i].stock +"</p></div>";
      contenu += "<div class='mb-3'><p><strong>Réference : </strong>" + tableauVide[i].reference +"</p><p><strong>Categorie : </strong>"+ tableauVide[i].categorie + "</p></div>";
      contenu += "<div class='mb-3'><p><strong>Prix : </strong>" + tableauVide[i].prix + " €</p><p><strong>Description : </strong>"+ tableauVide[i].description + "</p>";
      contenu += "<a href='#' title='fournisseur'>Nom du fournisseur</a>";
      
      
      pageProduit.innerHTML = contenu;

      voirP.appendChild(pageProduit);
      } 
    }
  }
    let closeBtnP = document.getElementById("fermerProduit");  // pour fermer le modal voir produit 

    closeBtnP.addEventListener("click",function () {  
      modalProduit.style.display = "none";
    });