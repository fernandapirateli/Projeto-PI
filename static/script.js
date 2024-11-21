// Seleção dos elementos HTML necessários
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCalorias = document.querySelector('#m-calorias');
const btnSalvar = document.querySelector('#btnSalvar');

// Variáveis globais
let itens;
let id;

// Função para abrir o modal de inclusão/edição de itens
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  // Evento para fechar o modal ao clicar fora dele
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  // Se estiver editando um item, preencher os campos do modal com os dados do item
  if (edit) {
    sNome.value = itens[index].nome;
    sCalorias.value = itens[index].calorias;
    id = index;
  } else {
    // Se for uma inclusão, limpar os campos do modal
    sNome.value = '';
    sCalorias.value = '';
  }
}

// Função para editar um item na tabela
function editItem(index) {
  openModal(true, index);
}

// Função para excluir um item da tabela e atualizar a tabela e o armazenamento local
function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

// Função para inserir um item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr');

  // Inserção do HTML na nova linha da tabela
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.calorias} kcal</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Evento de clique do botão "Salvar"
btnSalvar.onclick = e => {
  // Verificar se os campos estão preenchidos
  if (sNome.value == '' || sCalorias.value == '') {
    return;
  }

  e.preventDefault();

  // Se estiver editando um item, atualizar o item; caso contrário, adicionar um novo item
  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].calorias = sCalorias.value;
  } else {
    itens.push({'nome': sNome.value, 'calorias': sCalorias.value});
  }

  // Atualizar o armazenamento local, fechar o modal e recarregar a lista de itens na tabela
  setItensBD();
  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

// Função para calcular a soma total das calorias dos itens
function calculateTotalCalories() {
  let totalCalories = 0;
  itens.forEach(item => {
    totalCalories += parseFloat(item.calorias);
  });
  return totalCalories;
}

// Função para carregar os itens do armazenamento local e exibi-los na tabela
function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
  updateTotalCalories(); // Atualizar a soma total de calorias após carregar os itens
}

// Função para obter os itens do armazenamento local
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];

// Função para definir os itens no armazenamento local
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

// Função para atualizar a exibição da soma total de calorias
function updateTotalCalories() {
  const totalCalories = calculateTotalCalories();
  const totalCaloriesElement = document.getElementById('totalCalories');
  totalCaloriesElement.textContent = `Total de Calorias: ${totalCalories} kcal`;
}

// Carregar os itens ao iniciar a aplicação
loadItens();
