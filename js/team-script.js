// Function to handle lazy loading of images
function lazyLoadImages() {
	const images = document.querySelectorAll('img[loading="lazy"]');

	const options = {
		root: null, // viewport
		rootMargin: "0px",
		threshold: 0.2, // 20% of the image must be visible
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				const src = img.getAttribute("data-src");

				if (src) {
					img.setAttribute("src", src);
					img.removeAttribute("data-src");
					observer.unobserve(img);
				}
			}
		});
	}, options);

	images.forEach((img) => {
		observer.observe(img);
	});
}

// Call the lazyLoadImages function when the page loads
window.addEventListener("load", lazyLoadImages);
