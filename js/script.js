// Обработка плавной прокрутки и отправки формы
document.addEventListener('DOMContentLoaded', function() {
  // Плавная прокрутка к форме
  const ctaButton = document.querySelector('.cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const rsvpSection = document.querySelector('#rsvp');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Обработка отправки формы
  const rsvpForm = document.getElementById('rsvpForm');
  const formMessage = document.getElementById('form-message');
  
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Показываем состояние загрузки
      const submitButton = rsvpForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Отправка...';
      submitButton.disabled = true;
      
      try {
        // Собираем данные формы
        const formData = new FormData(rsvpForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Выводим данные формы в консоль для отладки
        console.log('Данные формы:', formValues);
        
        // Отправляем форму через iframe
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = rsvpForm.action;
        tempForm.target = 'hidden-iframe';
        tempForm.style.display = 'none';
        
        // Добавляем все поля формы
        for (const [name, value] of Object.entries(formValues)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          tempForm.appendChild(input);
        }
        
        // Добавляем форму в документ и отправляем
        document.body.appendChild(tempForm);
        tempForm.submit();
        
        // Показываем сообщение об успехе
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.textContent = 'Спасибо! Ваш ответ сохранен.';
          formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
          formMessage.style.border = '1px solid rgba(76, 175, 80, 0.3)';
          formMessage.style.color = '#4CAF50';
          formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Скрываем сообщение через 5 секунд
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        }
        
        // Очищаем форму
        rsvpForm.reset();
        
        // Удаляем временную форму
        setTimeout(() => {
          document.body.removeChild(tempForm);
        }, 1000);
        
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.textContent = 'Ошибка при отправке. Пожалуйста, попробуйте ещё раз.';
          formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
          formMessage.style.border = '1px solid rgba(244, 67, 54, 0.3)';
          formMessage.style.color = '#f44336';
          formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } finally {
        // Восстанавливаем кнопку
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
});
