function criarInputTelaCheia() {
  // Criação do elemento input
  const input = document.createElement("input");

  // Estilo para cobrir toda a tela
  input.type = "text";
  input.placeholder = "Digite algo...";
  input.style.position = "fixed";
  input.style.top = "0";
  input.style.left = "0";
  input.style.width = "100vw";
  input.style.height = "100vh";
  input.style.fontSize = "24px";
  input.style.padding = "20px";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.zIndex = "1000"; // Coloca o input acima de outros elementos
  input.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; // Cor de fundo semi-transparente
  input.style.color = "black";
  input.style.textAlign = "center";

  // Verificando se há algum valor salvo no localStorage e definindo no input
  const savedData = localStorage.getItem("userInput");
  if (savedData) {
    input.value = savedData;
  }

  // Adiciona o input à tela
  document.body.appendChild(input);

  // Focar no input
  input.focus();

  // Quando o usuário pressionar 'Enter', salvar o valor e remover o input
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Recuperar anotações antigas ou criar uma nova lista
      let notes = JSON.parse(localStorage.getItem("notes")) || [];

      // Adicionar a nova anotação à lista
      notes.push(input.value);
      
      // Salvar a lista atualizada no localStorage
      localStorage.setItem("notes", JSON.stringify(notes));

      // Limpar o valor do input
      input.value = '';

      // Remover o input da tela
      document.body.removeChild(input);

      // Atualizar as anotações na tela
      mostrarDadosSalvosNaTela();
    }
  });

  // Quando o usuário clicar fora do input, também salvar e removê-lo
  input.addEventListener("blur", function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(input.value);
    localStorage.setItem("notes", JSON.stringify(notes));
    document.body.removeChild(input);
    mostrarDadosSalvosNaTela();
  });
}

function mostrarDadosSalvosNaTela() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const divHTML = document.getElementById('anotacoes');
  
  // Verifica se a div foi encontrada
  if (divHTML) {
    // Limpa a div antes de atualizar as anotações
    divHTML.innerHTML = '';

    // Cria uma lista <ul> para as anotações
    const ulHTML = document.createElement('ul');

    // Adiciona um item <li> para cada anotação
    notes.forEach(note => {
      const liHTML = document.createElement('li');
      liHTML.textContent = note;
      ulHTML.appendChild(liHTML);
    });

    // Adiciona a lista à div
    divHTML.appendChild(ulHTML);
  }
}

// Chama a função para exibir dados ao carregar a página
mostrarDadosSalvosNaTela();
