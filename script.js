document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0; // Get header height if it exists

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Adjust for sticky header and add some padding
                    behavior: 'smooth'
                });
            }
        });
    });

    // Example of a simple scroll animation (e.g., header shadow on scroll)
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)'; // Sutil al inicio
            }
        });
    }
});