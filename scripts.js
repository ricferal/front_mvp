/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5001/estudos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.estudos.forEach(item => insertList(item.disciplina, item.conteudo, item.contato,
       item.primeira_revisao, item.segunda_revisao,item.questao_feita,item.questao_acertada))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postItem = async (inputDisciplina, inputConteudo, inputContato,inputPrimeiraRevisao,
  inputSegundaRevisao,inputQuestõesFeitas,inputQuestõesAcertadas) => {
  const formData = new FormData();
  formData.append('disciplina', inputDisciplina);
  formData.append('conteudo', inputConteudo);
  formData.append('contato', inputContato);
  formData.append('primeira_revisao', inputPrimeiraRevisao);
  formData.append('segunda_revisao', inputSegundaRevisao);
  formData.append('questao_feita', inputQuestõesFeitas);
  formData.append('questao_acertada', inputQuestõesAcertadas);

  let url = 'http://127.0.0.1:5001/estudo';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/estudo?disciplina=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com disciplina, conteúdo ,revisões,questões 
  --------------------------------------------------------------------------------------

*/
const newItem = () => {
  let inputDisciplina = document.getElementById("newDisciplinaEstudada").value;
  let inputConteudo = document.getElementById("newConteudo").value;
  let inputContato = document.getElementById("newContato").value;
  let inputPrimeiraRevisao = document.getElementById("newPrimeiraRevisao").value;
  let inputSegundaRevisao = document.getElementById("newSegundaRevisao").value;
  let inputQuestõesFeitas = document.getElementById("newQuestõesFeitas").value;
  let inputQuestõesAcertadas = document.getElementById("newQuestõesAcertadas").value;
  // let inputDataPrimeiraRevisao = document.getElementById("dataPrimeiraRevisao").value;


  if (inputDisciplina === '') {
    alert("Escreva Disciplina!");
  }else if (inputConteudo === '') {
    alert("Escreva conteúdo!");
  }else if (inputContato === '') {
    alert("Escreva contato!");
  }else if (inputPrimeiraRevisao === '') {
    alert("Escreva Primeira Revisão!");
  }else if (inputSegundaRevisao === '') {
    alert("Escreva Segunda Revisão!");
  }else if (inputQuestõesFeitas === '') {
    alert("Escreva Qtde de Questões Feitas!");
  }else if (inputQuestõesAcertadas === '') {
    alert("Escreva Qtde de Questões Acertadas!");
  } else if (isNaN(inputQuestõesFeitas) || isNaN(inputQuestõesFeitas)) {
     alert("A Quantidade de questões deve ser números!");
   }else {
    insertList(inputDisciplina, inputConteudo,inputContato, inputPrimeiraRevisao,inputSegundaRevisao, inputQuestõesFeitas, inputQuestõesAcertadas)
	
    postItem(inputDisciplina, inputConteudo, inputContato,inputPrimeiraRevisao,inputSegundaRevisao, inputQuestõesFeitas, inputQuestõesAcertadas)
	
    alert("Disciplina adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameDisciplina,nameConteudo,nameContato, namePrimeiraRevisao, nameSegundaRevisao,
nameQuestõesFeitas,nameQuestõesAcertadas) => {
  var item = [nameDisciplina,nameConteudo,nameContato, namePrimeiraRevisao, nameSegundaRevisao,
nameQuestõesFeitas,nameQuestõesAcertadas]

  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newDisciplinaEstudada").value = "";
  document.getElementById("newConteudo").value = "";
  document.getElementById("newContato").value = "";
  document.getElementById("newPrimeiraRevisao").value = "";
  document.getElementById("newSegundaRevisao").value = "";
  document.getElementById("newQuestõesFeitas").value = "";
  document.getElementById("newQuestõesAcertadas").value = "";

  removeElement()
}