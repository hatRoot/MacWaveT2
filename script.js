document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle - Enhanced Version
    function setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuToggle && mainNav) {
            console.log('Mobile Menu Elements found');

            // Remove existing listener to avoid duplicates if this is called multiple times
            mobileMenuToggle.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isActive = document.body.classList.toggle('menu-active');
                mobileMenuToggle.classList.toggle('active', isActive);
                console.log('Menu Toggled via onclick. Active:', isActive);

                // Force layout recalculation for Safari
                mainNav.style.display = 'none';
                mainNav.offsetHeight;
                mainNav.style.display = 'flex';
            };

            // Close menu when a link is clicked
            navLinks.forEach(link => {
                link.onclick = () => {
                    document.body.classList.remove('menu-active');
                    mobileMenuToggle.classList.remove('active');
                    console.log('Menu closed via link click');
                };
            });
        } else {
            console.error('Mobile Menu Elements NOT found:', { toggle: !!mobileMenuToggle, nav: !!mainNav });
        }
    }

    // Run setup
    setupMobileMenu();

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

    // Modal Logic
    const modal = document.getElementById('scheduling-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const durationBtns = document.querySelectorAll('.duration-btn');

    // Helper to open modal
    function openModal(e) {
        e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Helper to close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Attach event listeners to specific buttons
    const contactButtons = document.querySelectorAll('.cta-button.secondary, .large-cta');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Duration Selection Logic
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            durationBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
        });
    });

    // Calendar Logic
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthSpan = document.querySelector('.current-month');
    const prevMonthBtn = document.querySelector('.calendar-nav-btn:first-child');
    const nextMonthBtn = document.querySelector('.calendar-nav-btn:last-child');
    const nextMonthLink = document.querySelector('.next-month-link');
    const calendarAlert = document.querySelector('.calendar-alert');

    // Let's use the current date to show availability from today
    let displayDate = new Date();

    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Update Header
        currentMonthSpan.textContent = `${monthNames[month]} ${year}`;

        // Clear existing days (keep headers)
        // We need to keep the first 7 divs (headers)
        const headers = Array.from(calendarGrid.children).slice(0, 7);
        calendarGrid.innerHTML = '';
        headers.forEach(header => calendarGrid.appendChild(header));

        // Get first day of month and days in month
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...
        // Adjust for Monday start (Monday=0, Sunday=6)
        // Standard getDay(): Sun=0, Mon=1, Tue=2...
        // We want: Mon=0, Tue=1... Sun=6
        const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty cells for days before start
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = i;

            // Simulate availability: Disable Sundays (Day 0) only
            // Saturdays (Day 6) are now OPEN (10:00 - 15:00)
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0) {
                dayCell.classList.add('disabled');
            } else {
                // Add click event for available days
                dayCell.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    dayCell.classList.add('selected');

                    // Show Confirmation Button
                    const selectedDateText = document.getElementById('selected-date-text');
                    const confirmContainer = document.getElementById('booking-confirmation-container');
                    const noSelectionMsg = document.getElementById('no-selection-message');
                    const whatsappBtn = document.getElementById('confirm-whatsapp-btn');

                    if (selectedDateText && confirmContainer && noSelectionMsg && whatsappBtn) {
                        const dateString = `${i} de ${monthNames[month]} ${year}`;
                        selectedDateText.textContent = dateString;
                        confirmContainer.style.display = 'block';
                        noSelectionMsg.style.display = 'none';

                        // Update WhatsApp Link
                        const message = `Hola, quisiera agendar una cita para el ${dateString}.`;
                        whatsappBtn.href = `https://wa.me/525535757364?text=${encodeURIComponent(message)}`;
                    }

                    // Hide calendar alert if present
                    if (calendarAlert) calendarAlert.style.display = 'none';
                });
            }

            calendarGrid.appendChild(dayCell);
        }

        // Update Alert Message based on month
        // Just a simple logic for demo: "No availability" if it's the past, otherwise available
        const today = new Date();
        if (date < new Date(today.getFullYear(), today.getMonth(), 1)) {
            if (calendarAlert) {
                calendarAlert.style.display = 'block';
                calendarAlert.querySelector('p').innerHTML = `<strong>No hay fechas disponibles en ${monthNames[month]}</strong>`;
            }
        } else {
            if (calendarAlert) calendarAlert.style.display = 'none';
        }
    }

    // Initial Render
    renderCalendar(displayDate);

    // Event Listeners
    prevMonthBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() - 1);
        renderCalendar(displayDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() + 1);
        renderCalendar(displayDate);
    });

    if (nextMonthLink) {
        nextMonthLink.addEventListener('click', (e) => {
            e.preventDefault();
            displayDate.setMonth(displayDate.getMonth() + 1);
            renderCalendar(displayDate);
        });
    }
});