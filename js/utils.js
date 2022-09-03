const categories = document.getElementsByClassName("category");

const handleCategoryClick = (event) => {
  const prevActiveCategory = document.querySelector(".category.active");
  if (prevActiveCategory !== null)
    prevActiveCategory.classList.remove("active");
  event.target.classList.add("active");
  const categoryID = event.target.getAttribute("data-category-id");
  const categoryName = event.target.innerText;
  fetchArticles(categoryID, categoryName);
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
  categories.forEach((category, i) => {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("data-category-id", category.category_id.toString());
    btn.classList.add("btn", "category");
    if (i === 7) {
      btn.classList.add("active");
      fetchArticles(category.category_id, category.category_name);
    }
    btn.onclick = handleCategoryClick;
    btn.innerText = category.category_name;
    categoryContainer.appendChild(btn);
  });
};

const fetchArticles = async (categoryID, categoryName) => {
  const API_URL = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
  try {
    const res = await fetch(API_URL);
    const { data } = await res.json();
    displayTotalResults(data.length, categoryName);
    displayArticles(data);
  } catch (error) {
    console.log(error);
  }
};
const displayTotalResults = (totalArticles, categoryName) => {
  const totalResults = document.querySelector(".total-results");
  // console.log(totalResults);
  totalResults.innerText = `Total ${totalArticles} news found for category ${categoryName}`;
};
const displayArticles = (articles) => {
  console.log(articles);
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="thumbnail">
            <img
              src="${article.thumbnail_url}"
              alt="thumbnail"
            />
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="title">
                ${article.title}
              </h3>
            </div>
            <div class="card-body">
              <p class="desc">
                ${article.details}
              </p>
            </div>
            <div class="card-footer">
              <div class="author">
                <div class="avatar">
                  <img src="${article.author.img}" />
                </div>
                <p class="name">${
                  article.author.name ? article.author.name : "Unknown Author"
                }</p>
              </div>
              <h4 class="views">${article.total_view}K</h4>
              <button class="btn">Read More</button>
            </div>
          </div>
    `;
    cards.appendChild(card);
  });
};
