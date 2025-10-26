document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    const calendarDates = document.querySelector('.calendar-dates');
    const calendarMonth = document.querySelector('.calendar-month');
    const prevBtn = document.querySelector('.calendar-prev');
    const nextBtn = document.querySelector('.calendar-next');
    
    let currentDate = new Date(2025, 9, 1); // October 1, 2025 (months are 0-indexed)
    const eventDate = new Date(2025, 10, 1); // November 1, 2025
    
    // Russian month names
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    // Initialize calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Set month and year in header
        calendarMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay() || 7; // Convert Sunday (0) to 7
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Clear previous dates
        calendarDates.innerHTML = '';
        
        // Add previous month's days
        for (let i = firstDay - 2; i >= 0; i--) {
            const dateElement = createDateElement(prevMonthDays - i, true);
            calendarDates.appendChild(dateElement);
        }
        
        // Add current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isEventDate = date.getTime() === new Date(2025, 10, 1).setHours(0, 0, 0, 0);
            const dateElement = createDateElement(i, false, isEventDate);
            
            // Highlight today
            const today = new Date();
            if (date.getDate() === today.getDate() && 
                date.getMonth() === today.getMonth() && 
                date.getFullYear() === today.getFullYear()) {
                dateElement.classList.add('today');
            }
            
            calendarDates.appendChild(dateElement);
        }
        
        // Add next month's days
        const totalDaysShown = firstDay - 1 + daysInMonth;
        const remainingCells = totalDaysShown <= 35 ? 35 - totalDaysShown : 42 - totalDaysShown;
        
        for (let i = 1; i <= remainingCells; i++) {
            const dateElement = createDateElement(i, true);
            calendarDates.appendChild(dateElement);
        }
    }
    
    function createDateElement(day, isOtherMonth, isEventDate = false) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = day;
        
        if (isOtherMonth) {
            dateElement.classList.add('other-month');
        }
        
        if (isEventDate) {
            dateElement.classList.add('event-date');
            dateElement.title = '1 ноября 2025 - A Night with Angel';
        }
        
        return dateElement;
    }
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initialize the calendar
    renderCalendar();
});