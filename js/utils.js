const categories = document.getElementsByClassName("category");

const handleCategoryClick = (event) => {
  const prevActiveCategory = document.querySelector(".category.active");
  prevActiveCategory.classList.remove("active");
  event.target.classList.add("active");
};

const getCategories = async () => {
  const API_URL = "";
  const res = await fetch(API_URL);
  const data = await res.json;
  console.log(data);
};

const displayCategories = (articles) => {
  const categoryContainer = document.querySelector(".category-container");
  articles.forEach((article) => {});
  console.log(articles);
};
