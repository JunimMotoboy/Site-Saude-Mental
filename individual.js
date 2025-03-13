
function criarInputTelaCheia() {
  const input = document.createElement("input");
  // Criação do elemento input

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
      const userInput = input.value.trim(); // Remove espaços em branco

      // Verifica se o input não está vazio
      if (userInput !== "") {
        // Recuperar anotações antigas ou criar uma nova lista
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        // Adicionar a nova anotação à lista
        notes.push(userInput);

        // Salvar a lista atualizada no localStorage
        localStorage.setItem("notes", JSON.stringify(notes));

        // Limpar o valor do input
        input.value = '';

        // Remover o input da tela
        document.body.removeChild(input);

        // Atualizar as anotações na tela
        mostrarDadosSalvosNaTela();
      } else {
        // Se o input estiver vazio, mostrar alerta
        alert("Por favor, insira algum texto antes de salvar.");
      }
    }
  });

  // Quando o usuário clicar fora do input, também salvar e removê-lo
  input.addEventListener("blur", function () {
    const userInput = input.value.trim(); // Remove espaços em branco

    // Verifica se o input não está vazio
    if (userInput !== "") {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(userInput);
      localStorage.setItem("notes", JSON.stringify(notes));
      document.body.removeChild(input);
      mostrarDadosSalvosNaTela();
    }
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

    ulHTML.style.listStyle = "square"
    
    // Adiciona um item <li> para cada anotação
    notes.forEach((note, index) => {
      const liHTML = document.createElement('li');
      liHTML.textContent = note;

      // Criação do botão de exclusão
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '✔';
      deleteButton.style.marginLeft = '10px';
      deleteButton.style.background = "url('✔')"
      deleteButton.style.padding = "5px"
      deleteButton.style.background = "greenyellow"
      deleteButton.style.borderRadius = "50%"
      deleteButton.style.height = "30px"
      deleteButton.style.width = "30px"
      
      // Função para excluir a anotação
      deleteButton.addEventListener('click', function () {

        if(excluirTarefa){
          alert("Parabêns por ter concluído a tarefa")
          excluirTarefa(index);
        }

      });

      // Adiciona o botão ao item de lista
      liHTML.appendChild(deleteButton);
      ulHTML.appendChild(liHTML);
    });

    // Adiciona a lista à div
    divHTML.appendChild(ulHTML);
  }
}

// Função para excluir uma tarefa específica
function excluirTarefa(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Remove a anotação da lista usando o índice
  notes.splice(index, 1);

  // Atualiza as anotações no localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Atualiza as anotações na tela
  mostrarDadosSalvosNaTela();
}

// Chama a função para exibir dados ao carregar a página
mostrarDadosSalvosNaTela();
