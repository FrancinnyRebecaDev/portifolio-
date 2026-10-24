
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenu();
    inicializarSaudacao();
    inicializarTema();
    inicializarProjetos();
    inicializarFormulario();
    inicializarAno();
    inicializarBotaoTopo();
});

// Abre e fecha o menu no celular e mantém o estado acessível para leitores de tela.
function inicializarMenu() {
    const botaoMenu = document.getElementById("btn-menu");
    const menu = document.getElementById("menu-principal");

    if (!botaoMenu || !menu) return;

    // Alterna a abertura do menu e atualiza seus rótulos acessíveis.
    botaoMenu.addEventListener("click", () => {
        const expandido = botaoMenu.getAttribute("aria-expanded") !== "true";
        menu.classList.toggle("ativo", expandido);
        botaoMenu.setAttribute("aria-expanded", String(expandido));
        botaoMenu.setAttribute("aria-label", expandido ? "Fechar menu" : "Abrir menu");
        botaoMenu.querySelector("span").textContent = expandido ? "✕" : "☰";
    });

    // Fecha o menu depois que uma seção for escolhida.
    menu.querySelectorAll("a").forEach((link) => {
        // Restaura o botão de menu após a navegação.
        link.addEventListener("click", () => {
            menu.classList.remove("ativo");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.querySelector("span").textContent = "☰";
        });
    });
}


function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) return "Bom dia!";
    if (hora >= 12 && hora < 18) return "Boa tarde!";
    return "Boa noite!";
}

function inicializarSaudacao() {
    const saudacao = document.getElementById("saudacao");
    if (saudacao) saudacao.textContent = obterSaudacao(new Date().getHours());
}

// Restaura a preferência de tema e configura o botão de alternância.
function inicializarTema() {
    const botaoTema = document.getElementById("btn-tema");
    if (!botaoTema) return;

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "light") document.body.classList.add("tema-claro");
    atualizarBotaoTema(botaoTema);

    // Alterna o tema e salva a preferência escolhida.
    botaoTema.addEventListener("click", () => {
        const temaClaroAtivo = document.body.classList.toggle("tema-claro");
        localStorage.setItem("tema", temaClaroAtivo ? "light" : "dark");
        atualizarBotaoTema(botaoTema);
    });
}

// Atualiza o nome acessível e o ícone de acordo com o tema ativo.
function atualizarBotaoTema(botaoTema) {
    const temaClaroAtivo = document.body.classList.contains("tema-claro");
    const rotulo = temaClaroAtivo ? "Ativar tema escuro" : "Ativar tema claro";
    botaoTema.setAttribute("aria-label", rotulo);
    botaoTema.setAttribute("title", rotulo);
    botaoTema.querySelector("span").textContent = temaClaroAtivo ? "🌙" : "☀️";
}

const projetos = [
    {
        titulo: "Página institucional responsiva",
        descricao: "Estudo de uma página web com estrutura semântica e layout adaptável a diferentes telas.",
        tecnologias: "html",
        tecnologiaTexto: "HTML5 · CSS3",
        imagem: "img/projeto-pagina.svg",
        textoAlternativo: "Ilustração de uma página institucional responsiva",
        url: "https://github.com/francinnyrebecadgurgel-ui/UC14---HTML-e-CSS/blob/main/gabi.html"
    },
    {
        titulo: "Painel interativo",
        descricao: "Exercício de interface com manipulação do DOM e recursos desenvolvidos em JavaScript.",
        tecnologias: "js",
        tecnologiaTexto: "JavaScript · DOM",
        imagem: "img/projeto-painel.svg",
        textoAlternativo: "Ilustração de um painel interativo com gráfico",
        url: "https://github.com/francinnyrebecadgurgel-ui/UC-15-JAVASCRIPT/tree/main/uc%20dom%201709"
    },
    {
        titulo: "Interface de loja virtual",
        descricao: "Prática de organização visual com CSS Grid e criação de uma experiência de navegação simples.",
        tecnologias: "html",
        tecnologiaTexto: "Figma",
        imagem: "img/projeto-loja.svg",
        textoAlternativo: "Ilustração de uma interface de loja virtual",
        url: "https://www.figma.com/proto/n9SDCHezAjlYmPAPAjnWjf/gold-garden?node-id=8-6&starting-point-node-id=8%3A6"
    }
];

// Cria os cartões de projeto a partir dos dados definidos no array.
function renderizarProjetos(projetosExibidos) {
    const grade = document.getElementById("grade-projetos");
    if (!grade) return;

    grade.replaceChildren();

    // Constrói um cartão acessível para cada projeto.
    projetosExibidos.forEach((projeto, indice) => {
        const cartao = document.createElement("article");
        cartao.classList.add("card-projeto");

        const imagem = document.createElement("img");
        imagem.classList.add("card-projeto-capa");
        imagem.src = projeto.imagem;
        imagem.alt = projeto.textoAlternativo;
        imagem.width = 800;
        imagem.height = 450;
        imagem.loading = "lazy";

        const corpo = document.createElement("div");
        corpo.classList.add("card-corpo");

        const numero = document.createElement("span");
        numero.classList.add("numero-card");
        numero.textContent = `PROJETO DE ESTUDO ${String(indice + 1).padStart(2, "0")}`;

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;

        const tecnologias = document.createElement("span");
        tecnologias.classList.add("card-techs");
        tecnologias.textContent = projeto.tecnologiaTexto;

        const link = document.createElement(projeto.url ? "a" : "span");
        link.classList.add(projeto.url ? "botao" : "status-projeto");
        link.textContent = projeto.url ? "Ver código no GitHub ↗" : "Projeto de estudo · link em breve";
        if (projeto.url) {
            link.href = projeto.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        corpo.append(numero, titulo, descricao, tecnologias, link);
        cartao.append(imagem, corpo);
        grade.append(cartao);
    });
}

// Desenha os projetos e liga os botões de filtro por tecnologia.
function inicializarProjetos() {
    renderizarProjetos(projetos);

    const botoesFiltro = document.querySelectorAll(".filtro-btn");
    // Associa cada categoria ao filtro correspondente.
    botoesFiltro.forEach((botao) => {
        // Filtra os cartões e atualiza o estado anunciado pelo botão.
        botao.addEventListener("click", (evento) => {
            const botaoSelecionado = evento.currentTarget;
            const filtro = botaoSelecionado.getAttribute("data-filtro");

            // Mantém visível qual filtro está selecionado.
            botoesFiltro.forEach((item) => {
                const selecionado = item === botaoSelecionado;
                item.classList.toggle("ativo", selecionado);
                item.setAttribute("aria-pressed", String(selecionado));
            });

            const projetosFiltrados = filtro === "todos"
                ? projetos
                : projetos.filter((projeto) => projeto.tecnologias === filtro);
            renderizarProjetos(projetosFiltrados);
        });
    });
}

// Valida os campos e exibe erros junto aos controles correspondentes.
function validarFormulario() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    const consentimento = document.getElementById("consentimento");
    if (!nome || !email || !mensagem || !consentimento) return false;

    // Limpa mensagens de uma tentativa anterior.
    document.querySelectorAll(".erro").forEach((erro) => {
        erro.textContent = "";
        erro.classList.remove("visivel");
    });
    // Remove o estado inválido antes de validar novamente.
    [nome, email, mensagem, consentimento].forEach((campo) => {
        campo.removeAttribute("aria-invalid");
    });

    let formularioValido = true;

    if (!nome.value.trim()) {
        mostrarErro("nome", "Informe seu nome.");
        formularioValido = false;
    }

    if (!email.validity.valid || !email.value.trim()) {
        mostrarErro("email", "Informe um endereço de e-mail válido.");
        formularioValido = false;
    }

    if (mensagem.value.trim().length < 20) {
        mostrarErro("mensagem", "A mensagem precisa ter pelo menos 20 caracteres.");
        formularioValido = false;
    }

    if (!consentimento.checked) {
        mostrarErro("consentimento", "Marque o consentimento para que sua mensagem possa ser considerada.");
        formularioValido = false;
    }

    if (!formularioValido) {
        const primeiroCampoInvalido = document.querySelector('[aria-invalid="true"]');
        if (primeiroCampoInvalido) primeiroCampoInvalido.focus();
    }

    return formularioValido;
}

// Associa a mensagem de erro ao controle e o sinaliza como inválido.
function mostrarErro(idCampo, textoErro) {
    const erro = document.getElementById(`erro-${idCampo}`);
    if (!erro) return;

    erro.textContent = textoErro;
    erro.classList.add("visivel");
    const campo = document.getElementById(idCampo);
    if (campo) campo.setAttribute("aria-invalid", "true");
}

// Impede o envio real, valida o formulário e confirma a limpeza após sucesso.
function inicializarFormulario() {
    const formulario = document.getElementById("form-contato");
    const mensagemSucesso = document.getElementById("sucesso-msg");
    if (!formulario || !mensagemSucesso) return;

    // Intercepta o envio para validar sem transmitir ou guardar os dados.
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        mensagemSucesso.hidden = true;

        if (!validarFormulario()) return;

        formulario.reset();
        mensagemSucesso.textContent = "Mensagem validada com sucesso. Este formulário demonstrativo não envia nem armazena os dados.";
        mensagemSucesso.hidden = false;
    });
}

// Atualiza automaticamente o ano exibido no rodapé.
function inicializarAno() {
    const ano = document.getElementById("ano-atual");
    if (ano) ano.textContent = String(new Date().getFullYear());
}

// Mostra o atalho para o início depois que a página é rolada.
function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById("btn-topo");
    if (!botaoTopo) return;

    // Alterna a visibilidade do atalho conforme a posição da página.
    const atualizarVisibilidade = () => {
        botaoTopo.classList.toggle("escondido", window.scrollY <= 300);
    };

    window.addEventListener("scroll", atualizarVisibilidade, { passive: true });
    atualizarVisibilidade();
}
