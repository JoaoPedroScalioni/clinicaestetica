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





function exibirDetalhes(local) {
  const detalhes = {
    labcenter: {
      titulo: 'Labcenter',
      endereco: 'Rua Domingos Vieira de Lima, 380 - Centro, Santana da Vargem - MG',
      telefone: '(35) 1234-5678',
      horario: 'Seg a Sex, 08:00 - 18:00',
      whatsapp: 'https://wa.me/5535123456789'
    },
    gislaine: {
      titulo: 'Gislaine Pedroso',
      endereco: 'Coqueiral - MG',
      telefone: '(35) 9876-5432',
      horario: 'Seg a Sex, 09:00 - 17:00',
      whatsapp: 'https://wa.me/5535987654321'
    },
    denise: {
      titulo: 'Denise Fróes Estética',
      endereco: 'Rua Barbosa Lima 441 B, Centro, Lavras - MG',
      telefone: '(35) 2345-6789',
      horario: 'Seg a Sex, 09:00 - 18:00',
      whatsapp: 'https://wa.me/553523456789'
    },
    bouganville: {
      titulo: 'Núcleo de Saúde Bouganville',
      endereco: 'Avenida Sérgio Biagi Bueno, 900 - Jardim Bouganville, Varginha - MG',
      telefone: '(35) 5566-7788',
      horario: 'Seg a Sex, 08:00 - 17:00',
      whatsapp: 'https://wa.me/553555667788'
    },
    bemestar: {
      titulo: 'Clínica Bem Estar',
      endereco: 'R. Barão da Boa Esperança, 511 - Catumbi, Três Pontas - MG',
      telefone: '(35) 9988-7766',
      horario: 'Seg a Sex, 07:00 - 19:00',
      whatsapp: 'https://wa.me/553599887766'
    },
    essentia: {
      titulo: 'Essentia',
      endereco: 'Avenida Monsenhor Luiz de Gonzaga, prédio 3 - sala 7, Nepomuceno - MG',
      telefone: '(35) 2233-4455',
      horario: 'Seg a Sex, 08:00 - 16:00',
      whatsapp: 'https://wa.me/553522334455'
    }
  };

  const localDetalhes = detalhes[local];

  if (localDetalhes) {
    document.getElementById('modal-titulo').innerText = localDetalhes.titulo;
    document.getElementById('modal-endereco').innerText = `Endereço: ${localDetalhes.endereco}`;
    document.getElementById('modal-telefone').innerText = `Telefone: ${localDetalhes.telefone}`;
    document.getElementById('modal-horario').innerText = `Horário: ${localDetalhes.horario}`;
    document.getElementById('whatsapp-link').href = localDetalhes.whatsapp;

    // Exibe o modal definindo o display como flex
    document.getElementById('detalhes-modal').style.display = 'flex';
  }
}

function fecharModal() {
  document.getElementById('detalhes-modal').style.display = 'none';
}

// Adiciona um listener para fechar o modal ao clicar fora da área de conteúdo
document.getElementById('detalhes-modal').addEventListener('click', function(event) {
  // Se o clique for exatamente no overlay e não em algum elemento interno,
  // o modal é fechado
  if (event.target === this) {
    fecharModal();
  }
});
