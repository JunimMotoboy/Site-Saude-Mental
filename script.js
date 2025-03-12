document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        let alertCard = document.createElement("div");
        alertCard.classList.add("alert-card");
        alertCard.style.position = "fixed";
        alertCard.style.top = "50%";
        alertCard.style.left = "50%";
        alertCard.style.transform = "translate(-50%, -50%)";
        alertCard.style.background = " rgba(255, 255, 255, 0.9)";
        alertCard.style.padding = "50px";
        alertCard.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        alertCard.style.borderRadius = "10px";
        alertCard.style.zIndex = "1000";
  
        let alertText = document.createElement("p");
        alertText.textContent = "Quais problemas você está enfrentando?";
        alertCard.appendChild(alertText);
        alertText.style.color = 'black'
  
        let issues = [
          "Ansiedade",
          "Depressão",
          "Estresse",
          "Insônia",
          "Baixa autoestima",
          "Falta de motivação"
        ];
  
        let form = document.createElement("form");
        
        issues.forEach(issue => {
          let label = document.createElement("label");
          label.style.display = "block";
          
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = issue;
          checkbox.classList.add("issue-checkbox");
          
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(" " + issue));
          form.appendChild(label);
        });
  
        alertCard.appendChild(form);
  
        let confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirmar";
        confirmButton.style.marginTop = "10px";
        confirmButton.style.marginRight = "10px";
        confirmButton.addEventListener("click", function () {
          let checkboxes = document.querySelectorAll(".issue-checkbox");
          let checked = Array.from(checkboxes).some(cb => cb.checked);

          if (checked) {
            window.location.href = "individual.html#exercicios";
          } else {
            alert("Por favor, selecione pelo menos um problema antes de confirmar.");
          }
        });
        alertCard.appendChild(confirmButton);
  
        let closeButton = document.createElement("button");
        closeButton.textContent = "Fechar";
        closeButton.style.marginTop = "10px";
        closeButton.addEventListener("click", function () {
          alertCard.remove();
        });
        alertCard.appendChild(closeButton);
  
        document.body.appendChild(alertCard);

      });
    });
  });