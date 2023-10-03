const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const currentLocation = location.href;
const navLinksLength = navLinks.length;

const hamburgerBtn = document.querySelector(".hamburger-btn");
const menu = document.querySelector(".nav-links");

const scrollToTopBtn = document.getElementById("scroll-to-top-button");
const body = document.querySelector("body");

const copyrightYear = document.getElementById("copyright-year");

// Object literal for dropdowns
const dropdowns = [
	{
		trigger: document.querySelector(".dropdown a"),
		menu: document.querySelector(".dropdown .dropdown-menu"),
	},
	// Add more dropdown objects as needed
];

// Function to toggle a dropdown
function toggleDropdown(dropdown) {
	const isOpen = dropdown.trigger.getAttribute("aria-expanded") === "true";

	dropdown.trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
	dropdown.menu.setAttribute("aria-hidden", isOpen ? "true" : "false");
}

// Event listener for dropdowns using event delegation
document.addEventListener("click", (event) => {
	for (const dropdown of dropdowns) {
		if (event.target === dropdown.trigger) {
			event.preventDefault();
			toggleDropdown(dropdown);
		} else if (!dropdown.menu.contains(event.target)) {
			dropdown.trigger.setAttribute("aria-expanded", "false");
			dropdown.menu.setAttribute("aria-hidden", "true");
		}
	}
});

// Add 'active' class to the current link
for (const link of navLinks) {
	if (link.href === currentLocation) {
		link.classList.add("active");
	}
}

// Event listener for the hamburger menu
function toggleMenu() {
	const currentState = hamburgerBtn.getAttribute("data-state");

	if (!currentState || currentState === "closed") {
		hamburgerBtn.setAttribute("data-state", "opened");
		hamburgerBtn.setAttribute("aria-expanded", "true");
		menu.classList.toggle("show");
		body.classList.add("fixed-position");
		scrollToTopBtn.classList.remove("show");
	} else {
		hamburgerBtn.setAttribute("data-state", "closed");
		hamburgerBtn.setAttribute("aria-expanded", "false");
		menu.classList.toggle("show");
		body.classList.remove("fixed-position");
	}
}

hamburgerBtn.addEventListener("click", toggleMenu);

// Scroll to the top function
function calcScrollValue() {
	const pos = document.documentElement.scrollTop;
	const showOnPx = 300;

	if (pos > showOnPx) {
		scrollToTopBtn.classList.add("show");
	} else {
		scrollToTopBtn.classList.remove("show");
	}
}

function goToTop() {
	scrollToTopBtn.classList.add("clicked");

	setTimeout(() => {
		scrollToTopBtn.classList.remove("clicked");
	}, 500);

	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

window.addEventListener("scroll", calcScrollValue);
window.addEventListener("load", calcScrollValue);
scrollToTopBtn.addEventListener("click", goToTop);

// Update copyright year
function updateCopyrightYear() {
	const startYear = 2023;
	const currentYear = new Date().getFullYear();
	const yearRange =
		currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;
	copyrightYear.textContent = yearRange;
}

updateCopyrightYear();

setInterval(updateCopyrightYear, 1000);

// Error handling for missing elements
if (!hamburgerBtn || !menu || !scrollToTopBtn || !body || !copyrightYear) {
	console.error("One or more required DOM elements not found.");
}
