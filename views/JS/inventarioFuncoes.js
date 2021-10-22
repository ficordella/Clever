//funções da página de inventário.html e consultarEditarItensInventario.html

//funções da página de inventário.html e consultarEditarItensInventario.html

//método construtor de objetos do tipo item
function NovoItem(idItem, descricao, maquina, vendedor, marca, modelo, qnt, qntMin) {
  this.idItem = idItem;
  this.descricao = descricao;
  this.maquina = maquina;
  this.vendedor = vendedor;
  this.marca = marca;
  this.modelo = modelo;
  this.qnt = qnt;
  this.qntMin = qntMin;
}

//valida o campo da descrição que é obrigatório
function validaDescricao(){
  descricaoItem = document.getElementById("descricaoItem");
  if(descricaoItem.value == ""){
    alert ("Insira a descrição do item");
  } else{
    return true;
  }
}

//valida o campo da quantidade atual que é obrigatório
function validaQuantidade(){
  quantidadeAtualItem = document.getElementById("quantidadeAtualItem");
  if(quantidadeAtualItem.value == ""){
    alert ("Insira a quantidade atual do item");
  } else{
    return true;
  }
}

//essa função valida os campos digitados e cria um objeto com os dados informados
function validaCamposDigitados(){
  idItem = document.getElementById("idItem");
  descricaoItem = document.getElementById("descricaoItem");
  maquinaItem = document.getElementById("maquinaItem");
  vendedorItem = document.getElementById("vendedorItem");
  marcaItem = document.getElementById("marcaItem");
  modeloItem = document.getElementById("modeloItem");
  quantidadeAtualItem = document.getElementById("quantidadeAtualItem");
  quantidadeMinimaItem = document.getElementById("quantidadeMinimaItem");

      if (validaDescricao() == true){
        if(validaQuantidade() == true ){
          var item = new NovoItem(idItem.value, descricaoItem.value, maquinaItem.value, vendedorItem.value, marcaItem.value, modeloItem.value, quantidadeAtualItem.value, quantidadeMinimaItem.value );
          alert("Item cadastrado com sucesso!");
          document.getElementById("itemForm").submit();

          //imprime os valores do objeto
          alert(Object.values(item));
          return true;
          //limpar os campos após confirmação de item salvo
          idItem.value = "";
          descricaoItem.value = "";
          maquinaItem.value = "";
          vendedorItem.value = "";
          marcaItem.value = "";
          modeloItem.value = "";
          quantidadeAtualItem.value = "";
          quantidadeMinimaItem.value = "";

        } else {return false;}
      }else {return false;}
  }

  //função limpar campos que é ativada pelo botão Cancelar
  function cancelar(){
    idItem = document.getElementById("idItem");
    descricaoItem = document.getElementById("descricaoItem");
    maquinaItem = document.getElementById("maquinaItem");
    vendedorItem = document.getElementById("vendedorItem");
    marcaItem = document.getElementById("marcaItem");
    modeloItem = document.getElementById("modeloItem");
    quantidadeAtualItem = document.getElementById("quantidadeAtualItem");
    quantidadeMinimaItem = document.getElementById("quantidadeMinimaItem");

    idItem.value = "";
    descricaoItem.value = "";
    maquinaItem.value = "";
    vendedorItem.value = "";
    marcaItem.value = "";
    modeloItem.value = "";
    quantidadeAtualItem.value = "";
    quantidadeMinimaItem.value ="";
  }

//  _________________________editar itens do inventário __________________

function pesquisar(){

let checkbox = document.getElementById("todosItens");
idItem = document.getElementById("idItem");
descricaoItem = document.getElementById("descricaoItem");
maquinaItem = document.getElementById("maquinaItem");
vendedorItem = document.getElementById("vendedorItem");
marcaItem = document.getElementById("marcaItem");
modeloItem = document.getElementById("modeloItem");

//document.getElementById("itemProcura").submit();

  const inventory = [
      {id:0, descricao: "parafuso", maquina: "BT100", vendedor: "Fusopar", marca: "Bosch", modelo: "M8"},
      {id:1, descricao: "porca", maquina: "BT101", vendedor: "Macrosul", marca: "Sandvik", modelo: "M10"},
      {id:2, descricao: "olhal", maquina: "BT102", vendedor: "Dynamics", marca: "Tupy", modelo: "M12"},
  ];

    if (checkbox.checked) {
      inventarioTamanho = inventory.length;
      alert("Apresentando todos os itens do inventário:");
      for(var i = 0; i<=inventarioTamanho; i++){
        addOption(Object.values(inventory[i]));
      }


  }  else if (descricaoItem.value != ""){
    const result = inventory.find( item => item.descricao === descricaoItem.value );
    if (result != null){
      alert ("Item encontrado!");
      addOption(Object.values(result));
    } else{
      alert("Item com essa descrição não encontrado!");
    }
  }

  else if (maquinaItem.value != ""){
    const result = inventory.find( item => item.maquina === maquinaItem.value );
    if (result != null){
    alert ("Item encontrado!");
    addOption(Object.values(result));
  } else{
    alert("Item com essa máquina não encontrado!");
  }
  }

  else if (vendedorItem.value != ""){
    const result = inventory.find( item => item.vendedor === vendedorItem.value );
    if (result != null){
    alert ("Item encontrado!");
    addOption(Object.values(result));
  } else{
    alert("Item com esse vendedor não encontrado!");
  }
  }

  else if (marcaItem.value != ""){
    const result = inventory.find( item => item.marca === marcaItem.value );
    if (result != null){
    alert ("Item encontrado!");
    addOption(Object.values(result));
  } else{
    alert("Item com essa marca não encontrado!");
  }
  }

  else if (modeloItem.value != ""){
    const result = inventory.find( item => item.modelo === modeloItem.value );
    if (result != null){
    alert ("Item encontrado!");
    addOption(Object.values(result));
  } else{
    alert("Item com esse modelo não encontrado!");
  }
} else{
  alert("Nenhum dado inserido!");
}

}

// função para adicionar itens na caixa de opçoes
function addOption(resultado){
	var select = document.getElementById("resultadoItens");
  select.options[select.options.length] = new Option (resultado);
}

//remover item selecionado na caixa de opções
function removeOption() {
  var x = document.getElementById("resultadoItens");
  x.remove(x.selectedIndex);
}

//limpar todas seleções da caixa de opções
function removeAllOption() {
var x = document.getElementById("resultadoItens");
x.options.length = 0;
}

//limpar todos os campos
function limparTodosCampos(){
  idItem = document.getElementById("idItem");
  descricaoItem = document.getElementById("descricaoItem");
  maquinaItem = document.getElementById("maquinaItem");
  vendedorItem = document.getElementById("vendedorItem");
  marcaItem = document.getElementById("marcaItem");
  modeloItem = document.getElementById("modeloItem");

  idItem.value = "";
  descricaoItem.value = "";
  maquinaItem.value = "";
  vendedorItem.value = "";
  marcaItem.value = "";
  modeloItem.value = "";
  removeAllOption();
}

function myFunction() {
document.getElementById("idItemR").innerHTML="Hello World" ; }

/*
//função para buscar valor de item selecionado
function editar(a) {
    var x = (a.value || a.options[a.selectedIndex].value);
  alert(x);
}
function editarItem(){
      //alert(a.selectedIndex);
      //a.options[a.selectedIndex] = "teste";
  }
*/
