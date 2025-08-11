// Modern FlaskShopper JavaScript
document.addEventListener('DOMContentLoaded', function () {

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.modern-navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
  });

  // Search functionality enhancement
  const searchInput = document.querySelector('.modern-search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', function () {
      this.parentElement.style.transform = 'scale(1.02)';
    });

    searchInput.addEventListener('blur', function () {
      this.parentElement.style.transform = 'scale(1)';
    });
  }

  // Add to cart animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Create animation
      const cart = document.querySelector('.icon-container .fa-shopping-cart');
      const productCard = this.closest('.product-card');
      const productImage = productCard.querySelector('.product-image');

      if (cart && productImage) {
        // Clone the product image for animation
        const flyingImg = productImage.cloneNode();
        flyingImg.style.position = 'fixed';
        flyingImg.style.zIndex = '9999';
        flyingImg.style.width = '50px';
        flyingImg.style.height = '50px';
        flyingImg.style.borderRadius = '50%';
        flyingImg.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        flyingImg.style.opacity = '0.8';

        const rect = productImage.getBoundingClientRect();
        flyingImg.style.left = rect.left + 'px';
        flyingImg.style.top = rect.top + 'px';

        document.body.appendChild(flyingImg);

        // Animate to cart
        setTimeout(() => {
          const cartRect = cart.getBoundingClientRect();
          flyingImg.style.left = cartRect.left + 'px';
          flyingImg.style.top = cartRect.top + 'px';
          flyingImg.style.transform = 'scale(0.2)';
          flyingImg.style.opacity = '0';
        }, 50);

        // Remove element and update cart
        setTimeout(() => {
          document.body.removeChild(flyingImg);
          // Update cart badge with animation
          const cartBadge = document.querySelector('.cart-badge');
          if (cartBadge) {
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => {
              cartBadge.style.transform = 'scale(1)';
            }, 200);
          }
        }, 850);
      }

      // Button feedback
      this.style.transform = 'scale(0.95)';
      this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
      this.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';

      setTimeout(() => {
        this.style.transform = 'scale(1)';
        this.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Add to Cart';
        this.style.background = '';
      }, 1500);

      // Proceed with actual request
      setTimeout(() => {
        window.location.href = this.href;
      }, 600);
    });
  });

  // Product card hover effects
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Category item hover effects
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.paddingLeft = '30px';
    });

    item.addEventListener('mouseleave', function () {
      this.style.paddingLeft = '16px';
    });
  });

  // Loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.classList.add('loading');
      img.addEventListener('load', function () {
        this.classList.remove('loading');
      });
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Add stagger animation to product cards
        if (entry.target.classList.contains('product-card')) {
          const cards = document.querySelectorAll('.product-card');
          cards.forEach((card, index) => {
            if (card === entry.target) {
              card.style.animationDelay = `${index * 0.1}s`;
            }
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.reveal, .product-card, .service-card').forEach(el => {
    observer.observe(el);
  });

  // Newsletter form enhancement
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');

    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (input.value && input.value.includes('@')) {
        this.innerHTML = '<i class="fas fa-check"></i>';
        this.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';

        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-paper-plane"></i>';
          this.style.background = '';
          input.placeholder = 'Enter your email';
        }, 3000);
      } else {
        input.style.borderColor = '#ff6b6b';
        input.focus();
        setTimeout(() => {
          input.style.borderColor = '';
        }, 2000);
      }
    });
  }

  // Search suggestions (mock functionality)
  if (searchInput) {
    const suggestions = ['Electronics', 'Fashion', 'Home & Office', 'Sports', 'Books', 'Gaming'];
    let suggestionBox = null;

    searchInput.addEventListener('input', function () {
      const value = this.value.toLowerCase();

      if (value.length > 0) {
        const filtered = suggestions.filter(item =>
          item.toLowerCase().includes(value)
        );

        if (filtered.length > 0) {
          showSuggestions(filtered);
        } else {
          hideSuggestions();
        }
      } else {
        hideSuggestions();
      }
    });

    function showSuggestions(items) {
      hideSuggestions();

      suggestionBox = document.createElement('div');
      suggestionBox.className = 'search-suggestions';
      suggestionBox.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 0 0 12px 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
            `;

      items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.style.cssText = `
                    padding: 12px 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border-bottom: 1px solid #f8f9fa;
                `;

        div.addEventListener('mouseenter', function () {
          this.style.background = '#f8f9fa';
          this.style.color = '#667eea';
        });

        div.addEventListener('mouseleave', function () {
          this.style.background = '';
          this.style.color = '';
        });

        div.addEventListener('click', function () {
          searchInput.value = item;
          hideSuggestions();
        });

        suggestionBox.appendChild(div);
      });

      searchInput.parentElement.style.position = 'relative';
      searchInput.parentElement.appendChild(suggestionBox);
    }

    function hideSuggestions() {
      if (suggestionBox) {
        suggestionBox.remove();
        suggestionBox = null;
      }
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
      if (!searchInput.parentElement.contains(e.target)) {
        hideSuggestions();
      }
    });
  }

  // Price animation on scroll
  const prices = document.querySelectorAll('.current-price');
  prices.forEach(price => {
    observer.observe(price);
    price.addEventListener('animationend', function () {
      // Animate price counting up (mock)
      const finalPrice = this.textContent;
      let current = 0;
      const target = parseInt(finalPrice.replace(/[^\d]/g, ''));
      const increment = target / 30;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        this.textContent = `Ksh ${Math.floor(current).toLocaleString()}`;
      }, 50);
    });
  });

  // Mobile menu enhancement
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  }

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  // Add ripple effect to all buttons
  const buttons = document.querySelectorAll('.modern-btn, .add-to-cart-btn, .modern-search-btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  console.log('🛍️ FlaskShopper Modern UI Loaded Successfully!');
});

// Window load event for final touches
window.addEventListener('load', function () {
  // Remove any loading animations
  document.querySelectorAll('.loading').forEach(el => {
    el.classList.remove('loading');
  });

  // Trigger entrance animations
  setTimeout(() => {
    document.querySelectorAll('.animate__animated').forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('animate__fadeInUp');
    });
  }, 500);
});
