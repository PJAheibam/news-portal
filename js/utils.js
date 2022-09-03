const categories = document.getElementsByClassName("category");
const modalContainer = document.getElementById("modal-container");
const modal = document.querySelector("#modal-container .wrapper .modal");
const loadingWrapper = document.querySelector(".loading-wrapper");
const mainLoader = document.querySelector(".profile-main-loader");
const cards = document.getElementById("cards");

const handleCategoryClick = (event) => {
  const prevActiveCategory = document.querySelector(".category.active");
  if (prevActiveCategory !== null)
    prevActiveCategory.classList.remove("active");
  event.target.classList.add("active");
  const categoryID = event.target.getAttribute("data-category-id");
  const categoryName = event.target.innerText;
  toggleSpinner(true);
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
  const zeroResults = document.querySelector(".zero-result");
  if (articles.length === 0) {
    console.log(zeroResults);
    zeroResults.style.display = "flex";
    return;
  }
  zeroResults.style.display = "none";
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
              <h3 onclick="fetchArticle('${article._id}')" class="title">
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
              <h4 class="views"> 
              <i class="fa-regular fa-eye"></i>
              ${article.total_view ? article.total_view : "000"}K
              </h4>
              
            </div>
          </div>
    `;
    cards.appendChild(card);
  });

  console.log("off");
  toggleSpinner(false);
};

const fetchArticle = async (newsID) => {
  const NEWS_API_URL = `https://openapi.programming-hero.com/api/news/${newsID}`;
  try {
    const res = await fetch(NEWS_API_URL);
    const {
      data: [article],
    } = await res.json();
    openArticle(article);
  } catch (error) {
    console.log(error);
  }
};

const openArticle = ({
  rating: { number },
  total_view,
  title,
  author: { name, published_date, img },
  image_url,
  details,
}) => {
  modalContainer.style.opacity = 1;
  modalContainer.style.pointerEvents = "auto";
  modal.style.transform = "scale(1)";
  modal.innerHTML = "";
  modal.innerHTML = `
  <button onclick="closeArticle()" class="btn modal-close-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
  <div class="content">
              <div class="image-container">
                <img
                  src="${image_url}"
                  alt="thumbnail"
                />
              </div>
              <h4 class="title">
                ${title}
              </h4>
              <div class="info">
                <div class="author">
                  <div class="avatar">
                    <img
                      src="${img}"
                      alt=""
                    />
                  </div>
                  <div>
                    <div class="name">${name}</div>
                    <p class="date">Published On: <span>${published_date}</span></p>
                  </div>

                  <div class="views">
                    <div class="rating">
                      <span class="star"><i class="fa-solid fa-star"></i></span>
                      <span class="star"><i class="fa-solid fa-star"></i></span>
                      <span class="star"><i class="fa-solid fa-star"></i></span>
                      <span class="star"
                        ><i class="fa-regular fa-star-half-stroke"></i
                      ></span>
                      <span class="star"
                        ><i class="fa-regular fa-star"></i
                      ></span>
                    </div>
                    <div><i class="fa-regular fa-eye"></i>${total_view} K</div>
                  </div>
                </div>
              </div>
              <p class="desc">
                ${details}
              </p>
            </div>
  `;
};

const closeArticle = () => {
  modalContainer.style.opacity = 0;
  modalContainer.style.pointerEvents = "none";
  modal.style.transform = "scale(0)";
};

const toggleSpinner = (isLoading) => {
  if (isLoading) {
    loadingWrapper.classList.add("active");
    mainLoader.classList.add("active");
    cards.innerHTML = "";
  } else {
    loadingWrapper.classList.remove("active");
    mainLoader.classList.remove("active");
  }
};
