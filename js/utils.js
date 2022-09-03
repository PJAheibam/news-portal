const categories = document.getElementsByClassName("category");

const handleCategoryClick = (event) => {
  const prevActiveCategory = document.querySelector(".category.active");
  prevActiveCategory.classList.remove("active");
  event.target.classList.add("active");
};

const getCategories = async () => {
  const API_URL = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(API_URL);
    const {
      data: { news_category },
    } = await res.json();
    displayCategories(news_category);
  } catch (error) {
    console.log(error);
  }
};

const displayCategories = (categories) => {
  const categoryContainer = document.querySelector(".category-container");
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn", "category");
    btn.onclick = handleCategoryClick;
    btn.innerText = category.category_name;

    categoryContainer.appendChild(btn);
  });
};

const fetchArticles = async (category_id) => {
  const API_URL = `ttps://openapi.programming-hero.com/api/news/category/${category_id}`;
};
