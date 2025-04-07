const inputValor = document.getElementById("input-valor"),
  inputDescricao = document.getElementById("input-descricao"),
  selectCategoria = document.getElementById("select-categoria"),
  output = document.getElementById("output");

let despesas = [];

const saveDebt = function () {
  if (
    inputValor.value === "" ||
    selectCategoria.value === "Escolha uma categoria"
  ) {
    alert("Insira os dados necessários!");
    return;
  }

  const valorDespesa =
    Number(inputValor.value) <= 0 ? 0 : Number(inputValor.value);
  const descricaoDespesa =
    inputDescricao.value === "" ? "Sem descrição" : inputDescricao.value;
  const categoriaDespesa = selectCategoria.value;

  const novaDespesa = {
    valor: valorDespesa,
    descrição: descricaoDespesa,
    categoria: categoriaDespesa,
  };
  despesas = [...despesas, novaDespesa];

  inputValor.value = "";
  inputDescricao.value = "";
  selectCategoria.value = "Escolha uma categoria";
};

const showDebts = function () {
  output.innerHTML = "";

  if (despesas.length === 0) {
    alert("Não existem despesas para exibição.");
    return;
  }

  const newOrderedList = document.createElement("ol");
  newOrderedList.classList.add("list-group", "list-group-numbered");

  despesas.forEach((despesa) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start"
    );
    listItem.style.gap = "15px";

    const { valor, categoria } = despesa;
    listItem.innerHTML = `
      <div class="ms-2 me-auto">
          Valor: R$${valor.toFixed(2)}
      </div>
      <span class="badge text-bg-primary rounded-pill">Categoria: ${categoria}</span>
    `;

    newOrderedList.append(listItem);
  });

  output.appendChild(newOrderedList);
};

const showTotal = function () {
  output.innerHTML = "";

  if (despesas.length === 0) {
    alert("Não existem despesas.");
    return;
  }

  let totalGeral = 0,
    totalAlimentacao = 0,
    totalTransporte = 0,
    totalLazer = 0;

  despesas.forEach((despesa) => {
    totalGeral += despesa.valor;
    if (despesa.categoria === "Alimentação") totalAlimentacao += despesa.valor;
    if (despesa.categoria === "Transporte") totalTransporte += despesa.valor;
    if (despesa.categoria === "Lazer") totalLazer += despesa.valor;
  });

  const totais = {
    total: totalGeral,
    totalAlimentacao,
    totalTransporte,
    totalLazer,
  };

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  card.innerHTML = `
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Total: R$${totais.total.toFixed(2)}</li>
      <li class="list-group-item">Total Alimentação: R$${totais.totalAlimentacao.toFixed(
        2
      )}</li>
      <li class="list-group-item">Total Transporte: R$${totais.totalTransporte.toFixed(
        2
      )}</li>
      <li class="list-group-item">Total Lazer: R$${totais.totalLazer.toFixed(
        2
      )}</li>
    </ul>
    <div class="card-footer">Cálculo dos Gastos</div>
  `;

  output.appendChild(card);

  const chartContainer = document.createElement("div");
  chartContainer.style.width = "400px";
  chartContainer.style.margin = "30px auto";

  const canvas = document.createElement("canvas");
  canvas.id = "graficoDespesas";
  chartContainer.appendChild(canvas);

  output.appendChild(chartContainer);

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Alimentação", "Transporte", "Lazer"],
      datasets: [
        {
          label: "Gastos por categoria",
          data: [
            totais.totalAlimentacao,
            totais.totalTransporte,
            totais.totalLazer,
          ],
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
          borderWidth: 1,
        },
      ],
    },
  });
};
