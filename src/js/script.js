const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const searchForm = document.querySelector(".search-form");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const menuLinks = document.querySelectorAll(".menu-link");
const logo = document.getElementById("logo");
const logo_developer = document.getElementById("logo_developer");

// Caminhos das logos
const logoClara = "src/img/Letreiro.png";       // Logo para modo escuro
const logoEscura = "src/img/Letreiro_dark.png"; // Logo para modo claro

// Updates the theme icon based on current theme and sidebar state
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
};

// Função que troca a logo com base no tema atual
const atualizarLogo = () => {
  const isDark = document.body.classList.contains("dark-theme");
  logo.src = isDark ? logoClara : logoEscura;
};

// Função que troca a logo com base no tema atual
const atualizarLogo_developer = () => {
  const isDark = document.body.classList.contains("dark-theme");
  if (logo_developer) {
    logo_developer.src = isDark ? logoClara : logoEscura;
  }
};

// Apply dark theme if saved or system prefers, then update icon
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
document.body.classList.toggle("dark-theme", shouldUseDarkTheme);
updateThemeIcon();

atualizarLogo_developer();

// Toggle between themes on theme button click
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
  
  atualizarLogo_developer();
});

// Toggle sidebar collapsed state on buttons click
sidebarToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
  });
});

// Expand the sidebar when the search form is clicked
searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus();
  }
});

// Expand sidebar by default on large screens
if (window.innerWidth > 768) sidebar.classList.remove("collapsed");