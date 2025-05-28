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
      cep: '37195-000',
      whatsapp: 'https://wa.me/553598038161' // Certifique-se que o número está correto
    },
    gislaine: {
      titulo: 'Gislaine Pedroso',
      endereco: 'Coqueiral - MG',
      cep: 'N/A', // Exemplo se não houver CEP
      whatsapp: 'https://wa.me/553598038161'
    },
    denise: {
      titulo: 'Denise Fróes Estética',
      endereco: 'Rua Barbosa Lima 441 B, Centro, Lavras - MG',
      cep: '37200-090',
      whatsapp: 'https://wa.me/553598038161' // Removido 'h' extra do https
    },
    bouganville: {
      titulo: 'Núcleo de Saúde Bouganville',
      endereco: 'Avenida Sérgio Biagi Bueno, 900 - Jardim Bouganville, Varginha - MG',
      cep: '37031-000',
      whatsapp: 'https://wa.me/553598038161'
    },
    bemestar: {
      titulo: 'Clínica Bem Estar',
      endereco: 'R. Barão da Boa Esperança, 511 - Catumbi, Três Pontas - MG',
      cep: '37190-000',
      whatsapp: 'https://wa.me/553598038161'
    },
    essentia: {
      titulo: 'Essentia',
      endereco: 'Avenida Monsenhor Luiz de Gonzaga, prédio 3 - sala 7, Nepomuceno - MG',
      cep: '37250-000',
      whatsapp: 'https://wa.me/553598038161'
    }
    // Adicione mais locais aqui conforme necessário
  };

  const localDetalhes = detalhes[local];
  const modalElement = document.getElementById('detalhes-modal');

  if (localDetalhes && modalElement) {
    // Preenche os detalhes no modal
    // Certifique-se que os IDs no HTML do modal correspondem exatamente
    document.getElementById('modal-titulo').innerText = localDetalhes.titulo;
    document.getElementById('modal-endereco').innerText = `Endereço: ${localDetalhes.endereco}`;
    document.getElementById('modal-CEP').innerText = `CEP: ${localDetalhes.cep}`;
    
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
      whatsappLink.href = localDetalhes.whatsapp;
    }

    // Exibe o modal
    modalElement.style.display = 'flex';
    document.body.classList.add('modal-aberto'); // Adiciona classe para travar o scroll do body
  } else {
    console.error("Detalhes do local não encontrados ou elemento modal não existe.");
  }
}

function fecharModal() {
  const modalElement = document.getElementById('detalhes-modal');
  if (modalElement) {
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-aberto'); // Remove classe para liberar o scroll do body
  }
}

// Adiciona listeners após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('detalhes-modal');
  
  // Event listener para fechar o modal ao clicar fora da área de conteúdo (no overlay)
  if (modalElement) {
    modalElement.addEventListener('click', function(event) {
      // Verifica se o clique foi no próprio modal (fundo) e não em um filho dele
      if (event.target === this) {
        fecharModal();
      }
    });
  }

  // Adicionar listeners para os botões "Veja Mais" dos cards, se eles não forem links diretos
  // Exemplo: se os cards tiverem um atributo data-local="nomedolocal"
  // document.querySelectorAll('.localizacao-card[data-local]').forEach(card => {
  //   card.addEventListener('click', function() {
  //     exibirDetalhes(this.dataset.local);
  //   });
  // });

  // Se o botão de fechar dentro do modal tem uma classe ou ID específico:
  // const closeButton = document.querySelector('.detalhes-modal .fechar'); // ou por ID
  // if (closeButton) {
  //   closeButton.addEventListener('click', fecharModal);
  // }
  // Assumindo que o botão fechar é um elemento com onclick="fecharModal()" no HTML
  // ou você pode adicionar um seletor e um event listener aqui se ele tiver uma classe/id.
  // Por exemplo, se o span do fechar tiver a classe 'fechar-modal-btn':
  const fecharBtn = document.querySelector('.detalhes-modal .fechar'); // usando a classe que já existe
  if (fecharBtn) {
    fecharBtn.addEventListener('click', fecharModal);
  }

});
