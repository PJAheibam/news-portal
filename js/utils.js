const navLinks = document.getElementsByClassName("nav-link");
console.log(navLinks);
const activeLink = (index) => {
  for (let i = 0; i < navLinks.length; i++) {
    if (i === index) {
      navLinks[i].classList.add(".active");
    } else {
      navLinks[i].classList.remove(".active");
    }
  }
};
