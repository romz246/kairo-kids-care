const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const currentLocation = location.href;
const navLinksLength = navLinks.length;

const hamburgerBtn = document.querySelector(".hamburger-btn");
const menu = document.querySelector(".nav-links");

const body = document.querySelector("body");

const copyrightYear = document.getElementById("copyright-year");

// Adds active class on current link

for (let i = 0; i < navLinksLength; i++) {
	if (navLinks[i].href === currentLocation) {
		navLinks[i].className = "active";
	}
}

// Hamburger Menu

hamburgerBtn.addEventListener("click", () => {
	const currentState = hamburgerBtn.getAttribute("data-state");

	if (!currentState || currentState === "closed") {
		hamburgerBtn.setAttribute("data-state", "opened");
		hamburgerBtn.setAttribute("aria-expanded", "true");
		menu.classList.toggle("show");
		body.classList.toggle("fixed-position");
		scrollToTopBtn.classList.remove("show");
	} else {
		hamburgerBtn.setAttribute("data-state", "closed");
		hamburgerBtn.setAttribute("aria-expanded", "false");
		menu.classList.toggle("show");
		body.classList.toggle("fixed-position");
	}
});

// Scroll To The Top function

function calcScrollValue() {
	const scrollProgress = document.getElementById("progress");
	const progressValue = document.getElementById("progress-value");
	const pos = document.documentElement.scrollTop;
	const showOnPx = 100;
	const calcHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	const scrollValue = Math.round((pos * showOnPx) / calcHeight);

	if (pos > showOnPx) {
		scrollProgress.style.display = "grid";
	} else {
		scrollProgress.style.display = "none";
	}

	scrollProgress.addEventListener("click", goToTop);

	scrollProgress.style.background = `conic-gradient(#00008bcc ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}

const goToTop = () => {
	document.body.scrollIntoView({
		behavior: "smooth",
	});
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// Copyright Function

function updateCopyrightYear() {
	const startYear = 2023;
	const currentYear = new Date().getFullYear();

	const yearRange = () => {
		if (currentYear > startYear) {
			return `${startYear} - ${currentYear}`;
		} else {
			return `${startYear}`;
		}
	};

	copyrightYear.textContent = yearRange();

	setTimeout(() => {
		updateCopyrightYear();
	}, 1000);
}

updateCopyrightYear();
