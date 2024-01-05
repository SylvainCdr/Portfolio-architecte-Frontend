// Import des modules React et des fonctions/utilitaires nécessaires
import React, { useEffect, useState } from "react";
import { getWorks, addWork, deleteWork, getCategories } from "../../Api"; // Import des fonctions liées à l'API
import "./style.scss"; // Import du fichier de style
import { createPortal } from "react-dom"; // Import pour créer un portail React pour les modales
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import des icônes FontAwesome
import {
  faTrash,
  faPencil,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// Définition du composant fonctionnel Admin
function Admin() {
  // Déclaration des états avec les fonctions set correspondantes
  const [works, setWorks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Effet de chargement initial pour récupérer les projets depuis l'API
  useEffect(() => {
    (async () => {
      setWorks(await getWorks());
    })();
  }, []);

  // Fonctions pour gérer l'ouverture et la fermeture des modales d'édition et d'ajout
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Fonction pour gérer le changement de l'image lors de l'ajout d'un nouveau projet
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  // Fonction pour ajouter un nouveau projet
  const handleAddNewProject = async () => {
    try {
      const work = {
        image: newImage,
        title: newTitle,
        category: newCategory,
      };

      await addWork(work);

      setWorks(await getWorks());

      // Réinitialisation des valeurs
      setNewImage(null);
      setNewTitle("");
      setNewCategory("");

      closeAddModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau projet", error);
    }
  };

  // Fonction pour supprimer un projet
  const handleDelete = async (id) => {
    await deleteWork(id);
    setWorks(await getWorks());
  };

  // Effet pour récupérer les projets et les catégories depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setWorks(await getWorks());
        setCategories(await getCategories());
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="Home">
      {/* Modale d'édition */}
      {isEditModalOpen &&
        createPortal(
          <div className="modal">
            <div className="modal__content">
              <h2>Modifier Mes Projets</h2>
              <div className="modal__content-gallery">
                {/* Affichage des projets avec possibilité de suppression */}
                {works.map((work) => (
                  <div key={work.id}>
                    <img src={work.imageUrl} alt={work.title} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(work.id)}
                    />
                  </div>
                ))}
              </div>
              {/* Boutons pour fermer la modale et ouvrir la modale d'ajout */}
              <button onClick={closeEditModal} className="closeModal">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={openAddModal} className="addButton">
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Ajouter une photo
              </button>
            </div>
          </div>,
          document.body
        )}
      {/* Modale d'ajout */}
      {isAddModalOpen &&
        createPortal(
          <div className="modal__content-add">
            <div className="modal">
              <div className="modal__content">
                <h2>Ajouter un Nouveau Projet</h2>
                {/* Formulaire pour ajouter un nouveau projet */}
                <label htmlFor="newImage">Importer une Photo :</label>
                <input
                  className="inputFile"
                  type="file"
                  id="newImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="newTitle">Titre :</label>
                <input
                  className="inputTitle"
                  type="text"
                  id="newTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <label htmlFor="newCategory">Catégorie :</label>
                {/* Menu déroulant pour sélectionner une catégorie */}
                <select
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {/* Boucle sur les catégories disponibles */}
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {/* Boutons pour ajouter le nouveau projet et fermer la modale */}
                <button onClick={handleAddNewProject}>Ajouter Projet</button>
                <button onClick={closeAddModal} className="closeModal">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      <section id="introduction">
        <figure>
          <img src="/images/sophie-bluel.png" alt="" />
        </figure>
        <article>
          <h2>Designer d'espace</h2>
          <p>
            Je raconte votre histoire, je valorise vos idées. Je vous accompagne
            de la conception à la livraison finale du chantier.
          </p>
          <p>
            Chaque projet sera étudié en commun, de façon à mettre en valeur les
            volumes, les matières et les couleurs dans le respect de l’esprit
            des lieux et le choix adapté des matériaux. Le suivi du chantier
            sera assuré dans le souci du détail, le respect du planning et du
            budget.
          </p>
          <p>
            En cas de besoin, une équipe pluridisciplinaire peut-être constituée
            : architecte DPLG, décorateur(trice)
          </p>
        </article>
      </section>
      <section id="portfolio">
        <div className="modifyProjects">
          <h2>Mes Projets</h2>
          {/* Bouton pour ouvrir la modale d'édition */}
          <button onClick={openEditModal} className="modifyButton">
            <span>
              <FontAwesomeIcon icon={faPencil} />
            </span>
            Modifier{" "}
          </button>
        </div>
        {/* Galerie de projets */}
        <div className="gallery">
          {works.map((work) => (
            <figure key={work.id}>
              <img src={work.imageUrl} alt={work.title} />
              <figcaption>{work.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Vous avez un projet ? Discutons-en !</p>
        <form action="#" method="post">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" cols="30" rows="10"></textarea>
          <input type="submit" value="Envoyer" />
        </form>
      </section>
    </main>
  );
}

export default Admin;
