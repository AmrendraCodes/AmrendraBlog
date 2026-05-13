document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Open mobile menu
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Close mobile menu
  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };

  closeMenuBtn.addEventListener('click', closeMenu);

  // Close when clicking any link inside the mobile menu
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
