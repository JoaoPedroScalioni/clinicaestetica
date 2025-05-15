document.addEventListener('DOMContentLoaded', function () {
  // === Carrossel de Imagens (Resultados) ===
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slider = carousel.querySelector('.slider-track');
    const images = slider.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicatorsContainer = carousel.querySelector('.slider-indicators');
    const totalSlides = images.length;
    let index = 0;
    let slideInterval;
    let userInteracted = false;
    let interactionTimeout;


    // Cria os indicadores
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('indicator');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
        delayAutoplayAfterInteraction();
      });
      indicatorsContainer.appendChild(dot);
    }
    const indicators = indicatorsContainer.querySelectorAll('.indicator');


    const updateIndicators = () => {
      indicators.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    };


    const updateSlider = () => {
      // Pega a margem direita definida via CSS
      const imageStyle = getComputedStyle(images[0]);
      const marginRight = parseFloat(imageStyle.marginRight);
      const slideWidth = images[0].offsetWidth + marginRight;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
      updateIndicators();
    };
   
    const showNextSlide = () => {
      index = (index + 1) % totalSlides;
      updateSlider();
    };


    const showPrevSlide = () => {
      index = (index - 1 + totalSlides) % totalSlides;
      updateSlider();
    };


    const startInterval = () => {
      slideInterval = setInterval(() => {
        if (!userInteracted) {
          showNextSlide();
        }
      }, 5000);
    };


    const delayAutoplayAfterInteraction = () => {
      userInteracted = true;
      clearInterval(slideInterval);
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        userInteracted = false;
        startInterval();
      }, 6000);
    };


    prevBtn.addEventListener('click', () => {
      showPrevSlide();
      delayAutoplayAfterInteraction();
    });


    nextBtn.addEventListener('click', () => {
      showNextSlide();
      delayAutoplayAfterInteraction();
    });


    const resizeObserver = new ResizeObserver(() => updateSlider());
    resizeObserver.observe(slider);


    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
      if (!userInteracted) startInterval();
    });


    updateSlider();
    startInterval();
  });


  // === Carrossel de Depoimentos ===
  document.querySelectorAll('[data-review-carousel]').forEach(carousel => {
    const slider = carousel.querySelector('.review-track');
    const reviewCards = slider.querySelectorAll('.review-card');
    const prevBtn = carousel.querySelector('.review-nav.prev');
    const nextBtn = carousel.querySelector('.review-nav.next');
    const totalReviews = reviewCards.length;
    let index = 0;
    let slideInterval;
    let userInteracted = false;
    let interactionTimeout;


    const updateReviewSlider = () => {
      // Pega a margem direita definida via CSS para a review-card
      const cardStyle = getComputedStyle(reviewCards[0]);
      const marginRight = parseFloat(cardStyle.marginRight);
      const slideWidth = reviewCards[0].offsetWidth + marginRight;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
    };


    const showNextReview = () => {
      index = (index + 1) % totalReviews;
      updateReviewSlider();
    };


    const showPrevReview = () => {
      index = (index - 1 + totalReviews) % totalReviews;
      updateReviewSlider();
    };


    const startReviewInterval = () => {
      slideInterval = setInterval(() => {
        if (!userInteracted) {
          showNextReview();
        }
      }, 6000);
    };


    const delayReviewAutoplay = () => {
      userInteracted = true;
      clearInterval(slideInterval);
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        userInteracted = false;
        startReviewInterval();
      }, 7000);
    };


    nextBtn.addEventListener('click', () => {
      showNextReview();
      delayReviewAutoplay();
    });


    prevBtn.addEventListener('click', () => {
      showPrevReview();
      delayReviewAutoplay();
    });


    window.addEventListener('resize', updateReviewSlider);
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
      if (!userInteracted) startReviewInterval();
    });


    updateReviewSlider();
    startReviewInterval();
  });
});


// Adicionando animação ao cabeçalho fixo quando o usuário rolar a página
document.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {  // Quando o usuário rola 50px para baixo
    header.classList.add('scrolled');  // Adiciona a classe que muda o fundo
  } else {
    header.classList.remove('scrolled');  // Remove a classe quando o topo da página é alcançado
  }
});


// Adicionando animação ao botão de voltar ao topo
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {  // Quando o usuário rola 300px para baixo
    backToTopBtn.classList.add('visible');  // Adiciona a classe que torna o botão visível
  } else {
    backToTopBtn.classList.remove('visible');  // Remove a classe quando o topo da página é alcançado
  }
});


// Adicionando animação ao cabeçalho fixo
document.addEventListener("DOMContentLoaded", () => {
  const estatisticas = document.querySelectorAll('.estatistica');


  // Opções de configuração para o IntersectionObserver
  const options = {
    root: null,  // viewport
    rootMargin: '0px',
    threshold: 0.5 // Dispara quando 50% do elemento estiver visível
  };


  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quando o elemento entra na tela, adiciona a classe "active"
        entry.target.classList.add('active');
        observer.unobserve(entry.target);  // Parar de observar o item após ele ser visível
      }
    });
  }, options);


  // Começa a observar os itens
  estatisticas.forEach(estatistica => {
    observer.observe(estatistica);
  });
});
