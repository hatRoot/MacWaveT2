document.addEventListener('DOMContentLoaded', () => {
    // Clean Navigation Handler (Prevents URL preview on hover)
    document.querySelectorAll('[data-link]').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const url = el.getAttribute('data-link');
            if (url && url !== '#') {
                // For a smoother transition feel
                document.body.style.opacity = '0.7';
                window.location.href = url;
            }
        });
    });

    // Mobile Menu Link Handling (Closes menu on click)
    document.querySelectorAll('.nav-link, [data-link]').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-active');
            const btn = document.getElementById('mobile-menu-toggle');
            if (btn) btn.classList.remove('active');
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href') || this.getAttribute('data-scroll');
            if (!targetId || targetId === '#' || targetId.startsWith('javascript')) return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
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
        if (!calendarGrid) return;
        const headers = Array.from(calendarGrid.children).slice(0, 7);
        calendarGrid.innerHTML = '';
        headers.forEach(header => calendarGrid.appendChild(header));

        // Get first day of month and days in month
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...
        // Adjust for Monday start (Monday=0, Sunday=6)
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

            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    dayCell.classList.add('selected');

                    const selectedDateText = document.getElementById('selected-date-text');
                    const confirmContainer = document.getElementById('booking-confirmation-container');
                    const noSelectionMsg = document.getElementById('no-selection-message');
                    const whatsappBtn = document.getElementById('confirm-whatsapp-btn');

                    if (selectedDateText && confirmContainer && noSelectionMsg && whatsappBtn) {
                        const dateString = `${i} de ${monthNames[month]} ${year}`;
                        selectedDateText.textContent = dateString;
                        confirmContainer.style.display = 'block';
                        noSelectionMsg.style.display = 'none';

                        const message = `Hola, quisiera agendar una cita para el ${dateString}.`;
                        whatsappBtn.href = `https://wa.me/525535757364?text=${encodeURIComponent(message)}`;
                    }

                    if (calendarAlert) calendarAlert.style.display = 'none';
                });
            }

            calendarGrid.appendChild(dayCell);
        }

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
    if (calendarGrid) renderCalendar(displayDate);

    // Event Listeners
    if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
        displayDate.setMonth(displayDate.getMonth() - 1);
        renderCalendar(displayDate);
    });

    if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
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
});/**
 * Joel Virtual - Frontend Logic
 * Conecta tu sitio con el cerebro de IA en Railway/Vercel
 */

class JoelVirtual {
    constructor(backendUrl) {
        this.backendUrl = backendUrl;
        this.history = [];
        this.init();
    }

    init() {
        // Crear elementos del DOM si no existen
        this.container = document.createElement('div');
        this.container.innerHTML = `
            <div class="joel-trigger" id="joel-trigger">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="joel-chat-widget" id="joel-widget">
                <div class="joel-header">
                    <div class="joel-avatar">JV</div>
                    <div class="joel-header-info">
                        <h3>Joel Virtual</h3>
                        <span><div class="online-dot"></div> Especialista MacWave</span>
                    </div>
                </div>
                <div class="joel-messages" id="joel-messages">
                    <div class="msg ai">Hola, soy Joel Virtual. ¿Qué problema tiene tu Mac hoy? No te preocupes, rescatamos equipos que otros dan por perdidos.</div>
                </div>
                <div class="joel-input-area">
                    <input type="text" id="joel-input" placeholder="Escribe tu duda aquí...">
                    <button class="joel-send-btn" id="joel-send">➤</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.container);

        this.widget = document.getElementById('joel-widget');
        this.trigger = document.getElementById('joel-trigger');
        this.input = document.getElementById('joel-input');
        this.sendBtn = document.getElementById('joel-send');
        this.messagesContainer = document.getElementById('joel-messages');

        this.trigger.addEventListener('click', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggle() {
        this.widget.classList.toggle('active');
    }

    addMessage(text, role) {
        const div = document.createElement('div');
        div.className = `msg ${role}`;
        div.innerText = text;
        this.messagesContainer.appendChild(div);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        // Indicador de "escribiendo..."
        const typing = document.createElement('div');
        typing.className = 'msg ai typing';
        typing.innerText = 'Joel está analizando...';
        this.messagesContainer.appendChild(typing);

        try {
            const res = await fetch(`${this.backendUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history: this.history })
            });

            const data = await res.json();
            typing.remove();

            this.addMessage(data.response, 'ai');
            this.history = data.updated_history;

            if (data.handoff) {
                this.injectHandoffButton();
            }
        } catch (err) {
            typing.innerText = 'Error de conexión. Intenta de nuevo.';
            console.error(err);
        }
    }

    injectHandoffButton() {
        const btn = document.createElement('a');
        btn.className = 'handoff-btn';
        btn.href = "https://wa.me/525535757364?text=Hola ¿me ayudas a resolver un problema con mi mac?";
        btn.target = "_blank";
        btn.innerText = "➤ Confirmar prioridad con Ingeniero real";
        this.messagesContainer.appendChild(btn);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Inicialización: Reemplaza con tu URL de Railway después
// const assistant = new JoelVirtual('https://tu-app.railway.app');

// Inicialización de Joel Virtual
const assistant = new JoelVirtual('https://web-production-c97c6.up.railway.app');
