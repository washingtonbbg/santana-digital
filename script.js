/**
 * =============================================================
 * Sant'Ana Digital — Script principal
 * Memorial Cultural da Festa de Sant'Ana da Família Barros
 *
 * Funcionalidades:
 * - Carrega dados JSON (linha do tempo, depoimentos, galeria)
 * - Fallback embutido para file:// e erros de rede
 * - Cápsula do Tempo com localStorage
 * - Busca por palavras-chave
 * - Menu mobile, rolagem suave e destaque de seção ativa
 *
 * Compatível com GitHub Pages (caminhos relativos).
 * =============================================================
 */

(function () {
  "use strict";

  /* ===========================================================
     CONFIGURAÇÃO — Caminhos relativos funcionam no GitHub Pages
     Ex.: https://usuario.github.io/santana-digital/dados/...
     =========================================================== */
  const DATA_PATHS = {
    timeline: "dados/linha-do-tempo.json",
    depoimentos: "dados/depoimentos.json",
    galeria: "dados/galeria.json",
  };

  const STORAGE_KEY = "santana-digital-capsula";

  /* Seções monitoradas para destacar link ativo no menu */
  const NAV_SECTIONS = [
    "inicio",
    "tradicao",
    "historia",
    "linha-do-tempo",
    "programacao",
    "galeria",
    "depoimentos",
    "capsula",
    "busca",
    "importancia",
    "referencias",
  ];

  /* ===========================================================
     DADOS DE FALLBACK — Usados quando fetch() falha (ex.: file://)
     Mantém o site funcional mesmo sem servidor local.
     =========================================================== */
  const FALLBACK = {
    timeline: [
      {
        ano: "1911",
        titulo: "Início da tradição",
        descricao:
          "A devoção familiar em honra a Sant'Ana passa a ser celebrada como tradição entre gerações da Família Barros.",
      },
      {
        ano: "2011",
        titulo: "Centenário da festa",
        descricao:
          "Durante a celebração dos 100 anos, foram registrados momentos importantes e criada uma cápsula do tempo com mensagens para o futuro.",
      },
      {
        ano: "2025",
        titulo: "Abertura da cápsula do tempo",
        descricao:
          "Cartas e mensagens guardadas foram abertas, emocionando familiares e reforçando a importância da memória entre gerações.",
      },
      {
        ano: "2050",
        titulo: "Nova cápsula para o futuro",
        descricao:
          "A proposta simbólica é manter viva a tradição com novos registros para serem revisitados pelas futuras gerações.",
      },
    ],
    depoimentos: [
      {
        nome: "Participante da família",
        vinculo: "Descendente da Família Barros",
        texto:
          "Participar da Festa de Sant'Ana é reencontrar nossa história e fortalecer os laços da família.",
      },
      {
        nome: "Organizador da tradição",
        vinculo: "Colaborador da festa",
        texto:
          "A tradição mantém viva a memória dos nossos antepassados e ensina os mais jovens sobre fé, respeito e união.",
      },
      {
        nome: "Visitante da comunidade",
        vinculo: "Comunidade de Várzea Grande",
        texto:
          "O memorial digital ajuda a preservar registros que antes ficavam espalhados em fotos, conversas e lembranças.",
      },
    ],
    galeria: [
      {
        titulo: "Foto antiga da família",
        descricao: "Espaço reservado para registros históricos da Família Barros.",
        ano: "Memória",
        imagem: "",
      },
      {
        titulo: "Registro da novena",
        descricao: "Momento de oração e encontro entre familiares e comunidade.",
        ano: "Tradição",
        imagem: "",
      },
      {
        titulo: "Imagem de Sant'Ana",
        descricao: "Símbolo da devoção e da continuidade da tradição.",
        ano: "Fé",
        imagem: "",
      },
      {
        titulo: "Abertura da cápsula",
        descricao: "Registro simbólico da preservação da memória entre gerações.",
        ano: "2025",
        imagem: "",
      },
      {
        titulo: "Encontro das gerações",
        descricao: "Momentos de convivência que unem antigos e novos participantes da tradição.",
        ano: "Família",
        imagem: "",
      },
    ],
  };

  /* Gradientes decorativos para placeholders sem imagem real */
  const GALLERY_GRADIENTS = [
    "linear-gradient(135deg, #9a7b1a 0%, #c9a227 50%, #5c4033 100%)",
    "linear-gradient(135deg, #4a7c59 0%, #6b9e7a 50%, #3d2a1f 100%)",
    "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #4a7c59 100%)",
    "linear-gradient(135deg, #5c4033 0%, #7a5c4a 50%, #c9a227 100%)",
    "linear-gradient(135deg, #6b9e7a 0%, #4a7c59 50%, #9a7b1a 100%)",
  ];

  /* Programação estática (cards no HTML) — incluída na busca */
  const PROGRAMACAO = [
    { titulo: "Novena", descricao: "Nove dias de oração em preparação à festa, reunindo familiares em momentos de reflexão e devoção." },
    { titulo: "Missa em honra a Sant'Ana", descricao: "Celebração eucarística dedicada à padroeira, coração espiritual da tradição familiar." },
    { titulo: "Chá com bolo", descricao: "Confraternização com partilha de alimentos, conversas e acolhimento entre gerações." },
    { titulo: "Encontro familiar", descricao: "Reunião de parentes próximos e distantes para fortalecer laços e reviver memórias." },
    { titulo: "Registro de memórias", descricao: "Coleta de fotos, relatos e documentos que preservam a história da festa para o futuro." },
    { titulo: "Doações e ação solidária", descricao: "Iniciativas de partilha e apoio à comunidade, expressando os valores de caridade da tradição." },
  ];

  /* Estado global preenchido após carregar JSON */
  let timelineData = [];
  let depoimentosData = [];
  let galeriaData = [];
  let searchIndex = [];

  /* Referências DOM reutilizadas */
  let navMenu = null;
  let navToggle = null;
  let navOverlay = null;

  /* ===========================================================
     UTILITÁRIOS
     =========================================================== */

  /**
   * Carrega arquivo JSON via fetch.
   * Se falhar (CORS, file://, 404), usa dados de fallback embutidos.
   */
  async function loadJSON(url, fallbackKey) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("JSON inválido");
      return data;
    } catch (err) {
      console.warn("[Sant'Ana Digital] Fallback ativado para " + url + ":", err.message);
      return FALLBACK[fallbackKey];
    }
  }

  /** Escapa HTML para prevenir XSS ao inserir dados dinâmicos */
  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  /** Normaliza texto para busca (remove acentos, minúsculas) */
  function normalize(str) {
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  /** Marca container como carregado (remove estado aria-busy) */
  function markLoaded(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.setAttribute("aria-busy", "false");
  }

  /* ===========================================================
     RENDERIZAÇÃO — Linha do tempo, depoimentos e galeria
     =========================================================== */

  function renderTimeline(items) {
    const container = document.getElementById("timelineContainer");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<p class="loading-message">Nenhum registro encontrado.</p>';
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
      <article class="timeline__item" role="listitem">
        <span class="timeline__year">${escapeHTML(item.ano)}</span>
        <h3 class="timeline__title">${escapeHTML(item.titulo)}</h3>
        <p class="timeline__desc">${escapeHTML(item.descricao)}</p>
      </article>`
      )
      .join("");

    markLoaded("timelineContainer");
  }

  function renderDepoimentos(items) {
    const container = document.getElementById("depoimentosContainer");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<p class="loading-message loading-message--full">Nenhum depoimento encontrado.</p>';
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
      <article class="card depoimento" role="listitem">
        <blockquote class="depoimento__text" cite="#">${escapeHTML(item.texto)}</blockquote>
        <footer>
          <p class="depoimento__nome">${escapeHTML(item.nome)}</p>
          <p class="depoimento__vinculo">${escapeHTML(item.vinculo)}</p>
        </footer>
      </article>`
      )
      .join("");

    markLoaded("depoimentosContainer");
  }

  function renderGaleria(items) {
    const container = document.getElementById("galleryContainer");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<p class="loading-message loading-message--full">Nenhuma imagem encontrada.</p>';
      return;
    }

    container.innerHTML = items
      .map((item, index) => {
        const gradient = GALLERY_GRADIENTS[index % GALLERY_GRADIENTS.length];
        const hasImage = item.imagem && String(item.imagem).trim() !== "";
        const titulo = escapeHTML(item.titulo);

        /* Imagem real ou placeholder com gradiente */
        const imageBlock = hasImage
          ? `<img src="${escapeHTML(item.imagem)}" alt="${titulo}" loading="lazy" decoding="async">`
          : titulo;

        const imageStyle = hasImage ? "" : ` style="background:${gradient}"`;

        return `
      <article class="gallery__item" role="listitem">
        <div class="gallery__image"${imageStyle}${hasImage ? "" : ' aria-hidden="true"'}>
          ${imageBlock}
        </div>
        <div class="gallery__body">
          <h3 class="gallery__title">${titulo}</h3>
          <p class="gallery__desc">${escapeHTML(item.descricao)}</p>
          <span class="gallery__year">${escapeHTML(item.ano)}</span>
        </div>
      </article>`;
      })
      .join("");

    /* Fallback visual se a imagem real não carregar (404, caminho errado) */
    container.querySelectorAll(".gallery__image img").forEach(function (img, imgIndex) {
      img.addEventListener("error", function () {
        const parent = img.parentElement;
        const gradient = GALLERY_GRADIENTS[imgIndex % GALLERY_GRADIENTS.length];
        parent.style.background = gradient;
        parent.setAttribute("aria-hidden", "true");
        parent.textContent = img.alt || "Imagem indisponível";
        img.remove();
      });
    });

    markLoaded("galleryContainer");
  }

  /* ===========================================================
     CÁPSULA DO TEMPO — Persistência via localStorage
     =========================================================== */

  function getMemorias() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveMemorias(memorias) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memorias));
    } catch {
      showFormFeedback("Não foi possível salvar. Verifique se o navegador permite armazenamento local.", "error");
    }
  }

  function showFormFeedback(message, type) {
    const feedback = document.getElementById("capsulaFeedback");
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = "form-feedback form-feedback--" + type;
    feedback.hidden = false;

    if (type === "success") {
      setTimeout(function () {
        feedback.hidden = true;
      }, 4000);
    }
  }

  function renderMemorias() {
    const lista = document.getElementById("capsulaLista");
    if (!lista) return;

    const memorias = getMemorias();

    if (memorias.length === 0) {
      lista.innerHTML =
        '<li class="capsula__lista-empty">Nenhuma memória registrada ainda. Seja o primeiro a deixar uma mensagem!</li>';
      return;
    }

    lista.innerHTML = memorias
      .slice()
      .reverse()
      .map(
        (m) => `
      <li class="capsula__memoria">
        <div class="capsula__memoria-header">
          <span class="capsula__memoria-nome">${escapeHTML(m.nome)}</span>
          <span class="capsula__memoria-meta">${escapeHTML(m.vinculo)} · Abertura simbólica: ${escapeHTML(String(m.ano))}</span>
        </div>
        <p class="capsula__memoria-texto">${escapeHTML(m.mensagem)}</p>
      </li>`
      )
      .join("");
  }

  function initCapsulaForm() {
    const form = document.getElementById("capsulaForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("capsulaNome").value.trim();
      const vinculo = document.getElementById("capsulaVinculo").value.trim();
      const mensagem = document.getElementById("capsulaMensagem").value.trim();
      const ano = document.getElementById("capsulaAno").value.trim();

      if (!nome || !vinculo || !mensagem || !ano) {
        showFormFeedback("Por favor, preencha todos os campos.", "error");
        return;
      }

      const memorias = getMemorias();
      memorias.push({
        nome,
        vinculo,
        mensagem,
        ano,
        dataRegistro: new Date().toISOString(),
      });

      saveMemorias(memorias);
      renderMemorias();
      form.reset();
      document.getElementById("capsulaAno").value = "2050";
      showFormFeedback("Memória registrada com sucesso neste dispositivo!", "success");

      document.getElementById("capsulaLista")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    renderMemorias();
  }

  /* ===========================================================
     BUSCA — Índice unificado de todo o conteúdo pesquisável
     =========================================================== */

  function buildSearchIndex() {
    const index = [];

    timelineData.forEach(function (item) {
      index.push({
        type: "Linha do Tempo",
        title: item.ano + " — " + item.titulo,
        desc: item.descricao,
        keywords: normalize([item.ano, item.titulo, item.descricao].join(" ")),
        anchor: "#linha-do-tempo",
      });
    });

    galeriaData.forEach(function (item) {
      index.push({
        type: "Galeria",
        title: item.titulo,
        desc: item.descricao + " (" + item.ano + ")",
        keywords: normalize([item.titulo, item.descricao, item.ano].join(" ")),
        anchor: "#galeria",
      });
    });

    depoimentosData.forEach(function (item) {
      index.push({
        type: "Depoimento",
        title: item.nome + " — " + item.vinculo,
        desc: item.texto,
        keywords: normalize([item.nome, item.vinculo, item.texto].join(" ")),
        anchor: "#depoimentos",
      });
    });

    PROGRAMACAO.forEach(function (item) {
      index.push({
        type: "Programação",
        title: item.titulo,
        desc: item.descricao,
        keywords: normalize([item.titulo, item.descricao].join(" ")),
        anchor: "#programacao",
      });
    });

    index.push({
      type: "História",
      title: "História da Festa de Sant'Ana",
      desc: "Tradição familiar em Várzea Grande-MT, transmissão de valores entre gerações.",
      keywords: normalize("história tradição família barros várzea grande memória fé"),
      anchor: "#historia",
    });

    index.push({
      type: "Cápsula do Tempo",
      title: "Cápsula do Tempo Digital",
      desc: "Espaço simbólico para registrar mensagens e lembranças para as futuras gerações.",
      keywords: normalize("cápsula capsula tempo memória futuro mensagem"),
      anchor: "#capsula",
    });

    return index;
  }

  function initSearch() {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    if (!input || !results) return;

    searchIndex = buildSearchIndex();

    input.addEventListener("input", function () {
      const rawQuery = input.value.trim();
      const query = normalize(rawQuery);

      if (query.length === 0) {
        results.innerHTML =
          '<p class="search__hint">Digite uma palavra-chave para buscar conteúdos do memorial.</p>';
        return;
      }

      const matches = searchIndex.filter(function (item) {
        return item.keywords.includes(query);
      });

      if (matches.length === 0) {
        results.innerHTML =
          '<p class="search__no-results">Nenhum resultado encontrado para "<strong>' +
          escapeHTML(rawQuery) +
          '</strong>".</p>';
        return;
      }

      results.innerHTML = matches
        .map(function (item) {
          return `
        <a href="${item.anchor}" class="search__result">
          <p class="search__result-type">${escapeHTML(item.type)}</p>
          <p class="search__result-title">${escapeHTML(item.title)}</p>
          <p class="search__result-desc">${escapeHTML(item.desc)}</p>
        </a>`;
        })
        .join("");

      /* Fecha menu mobile ao clicar em resultado da busca */
      results.querySelectorAll(".search__result").forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
      });
    });
  }

  /* ===========================================================
     NAVEGAÇÃO — Menu mobile, overlay e seção ativa
     =========================================================== */

  function closeMobileMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
    if (navOverlay) {
      navOverlay.classList.remove("is-visible");
      navOverlay.hidden = true;
    }
  }

  function openMobileMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
    if (navOverlay) {
      navOverlay.hidden = false;
      requestAnimationFrame(function () {
        navOverlay.classList.add("is-visible");
      });
    }
  }

  function initMobileMenu() {
    navToggle = document.getElementById("navToggle");
    navMenu = document.getElementById("navMenu");
    navOverlay = document.getElementById("navOverlay");
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    if (navOverlay) {
      navOverlay.addEventListener("click", closeMobileMenu);
    }

    /* Fecha menu com tecla Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  /** Destaca no menu a seção visível durante a rolagem */
  function initScrollSpy() {
    const navLinks = document.querySelectorAll(".nav__link[data-nav]");
    if (!navLinks.length) return;

    const sectionElements = NAV_SECTIONS.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    function updateActiveLink() {
      const scrollPos = window.scrollY + 120;
      let currentId = "inicio";

      sectionElements.forEach(function (section) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        }
      });

      navLinks.forEach(function (link) {
        const isActive = link.dataset.nav === currentId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
  }

  /* ===========================================================
     BOTÃO VOLTAR AO TOPO
     =========================================================== */

  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      function () {
        btn.hidden = window.scrollY <= 400;
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===========================================================
     INICIALIZAÇÃO — Ponto de entrada da aplicação
     =========================================================== */

  async function init() {
    const [timeline, depoimentos, galeria] = await Promise.all([
      loadJSON(DATA_PATHS.timeline, "timeline"),
      loadJSON(DATA_PATHS.depoimentos, "depoimentos"),
      loadJSON(DATA_PATHS.galeria, "galeria"),
    ]);

    timelineData = timeline;
    depoimentosData = depoimentos;
    galeriaData = galeria;

    renderTimeline(timelineData);
    renderDepoimentos(depoimentosData);
    renderGaleria(galeriaData);

    initCapsulaForm();
    initSearch();
    initMobileMenu();
    initScrollSpy();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
