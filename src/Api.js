const baseUrl = "http://localhost:5678/api/";

export const getWorks = async () => {
  try {
    const response = await fetch(`${baseUrl}works`);
    const works = await response.json();
    return works;
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
    throw error; // Réémet l'erreur pour que le composant puisse la gérer
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}categories`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};

export const addWork = async (work) => {
  try {
    const formData = new FormData();
    formData.append("image", work.image);
    formData.append("title", work.title);
    formData.append("category", work.category);

    const response = await fetch(`${baseUrl}works`, {
      method: "POST",
      headers: {
        // préciser le token de connexion pour auth post
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Erreur lors de l'ajout du travail :", error);
    throw error;
  }
};

export const deleteWork = async (id) => {
  const request = await fetch(`${baseUrl}works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

