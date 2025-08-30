/* Minimal client-side enhancements */
(function () {
	function setActiveNav() {
		var path = (location.pathname || '').toLowerCase();
		var links = document.querySelectorAll('.nav a');
		links.forEach(function (link) {
			var href = link.getAttribute('href') || '';
			if (href && path.endsWith(href.toLowerCase())) {
				link.classList.add('active');
			}
		});
	}

	function injectYear() {
		var yearEl = document.querySelector('[data-year]');
		if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
	}

	setActiveNav();
	injectYear();

	// Mobile Navigation Toggle
	function initMobileNav() {
		var toggle = document.querySelector('.mobile-nav-toggle');
		var nav = document.querySelector('.nav');
		
		if (!toggle || !nav) return;
		
		toggle.addEventListener('click', function() {
			toggle.classList.toggle('active');
			nav.classList.toggle('active');
			document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
		});
		
		// Close mobile nav when clicking on a link
		var navLinks = nav.querySelectorAll('a');
		navLinks.forEach(function(link) {
			link.addEventListener('click', function() {
				toggle.classList.remove('active');
				nav.classList.remove('active');
				document.body.style.overflow = '';
			});
		});
		
		// Close mobile nav when clicking outside
		document.addEventListener('click', function(e) {
			if (!toggle.contains(e.target) && !nav.contains(e.target)) {
				toggle.classList.remove('active');
				nav.classList.remove('active');
				document.body.style.overflow = '';
			}
		});
	}

	// Simple Lightbox for Media Page
	function createLightbox() {
		var overlay = document.createElement('div');
		overlay.className = 'lightbox-overlay';
		overlay.innerHTML = '';
		document.body.appendChild(overlay);
		return overlay;
	}

	function openLightbox(src, type) {
		if (!window._lightboxOverlay) {
			window._lightboxOverlay = createLightbox();
		}
		var overlay = window._lightboxOverlay;
		overlay.innerHTML = '';
		var content = document.createElement('div');
		content.className = 'lightbox-content';
		if (type === 'video') {
			var video = document.createElement('video');
			video.controls = true;
			video.autoplay = true;
			var source = document.createElement('source');
			source.src = src;
			source.type = 'video/mp4';
			video.appendChild(source);
			content.appendChild(video);
		} else {
			var img = document.createElement('img');
			img.src = src;
			img.alt = '';
			content.appendChild(img);
		}
		overlay.appendChild(content);
		overlay.classList.add('visible');
		document.documentElement.style.overflow = 'hidden';
	}

	function closeLightbox() {
		var overlay = window._lightboxOverlay;
		if (!overlay) return;
		overlay.classList.remove('visible');
		overlay.innerHTML = '';
		document.documentElement.style.overflow = '';
	}

	function bindGallery() {
		var gallery = document.querySelector('.gallery-grid');
		if (!gallery) return;
		gallery.addEventListener('click', function (e) {
			var target = e.target;
			if (target && target.tagName === 'IMG') {
				openLightbox(target.getAttribute('src'), 'image');
			}
			if (target && target.tagName === 'VIDEO') {
				var source = target.querySelector('source');
				var src = source ? source.getAttribute('src') : target.getAttribute('src');
				if (src) openLightbox(src, 'video');
			}
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeLightbox();
		});

		document.addEventListener('click', function (e) {
			var overlay = window._lightboxOverlay;
			if (!overlay || !overlay.classList.contains('visible')) return;
			if (e.target === overlay) closeLightbox();
		});
	}

	bindGallery();
	
	// Initialize mobile navigation
	initMobileNav();
})();

