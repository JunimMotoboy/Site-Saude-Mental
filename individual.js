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
      // Salvar o valor digitado no Local Storage
      localStorage.setItem("userInput", input.value);
      document.body.removeChild(input); // Remove o input quando 'Enter' for pressionado
    }
  });

  // Quando o usuário clicar fora do input, também salvar e removê-lo
  input.addEventListener("blur", function () {
    // Salvar o valor digitado no Local Storage
    localStorage.setItem("userInput", input.value);
    document.body.removeChild(input);
  });
}


function mostrarDadosSalvosNaTela() {
  const savedData = localStorage.getItem("userInput");


  if (savedData) {

    var divHTML = document.getElementById('anotacoes')
    var pHTML = document.createElement('p')

    pHTML.textContent = savedData

    console.log(pHTML)

    divHTML.appendChild(pHTML)
  }

}



mostrarDadosSalvosNaTela()