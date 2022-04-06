function limparTodosCampos(){
  tituloOrdem = document.getElementById("tituloOrdem");
  console.log(tituloOrdem.value);
  descricaoOrdem = document.getElementById("descricaoOrdem");
  console.log(descricaoOrdem.value);
  numeroOrdem = document.getElementById("numeroOrdem");
  tituloPesquisaOrdem = document.getElementById("tituloPesquisaOrdem");
  maquinaOrdemHelp = document.getElementById("maquinaOrdem");
  console.log(maquinaOrdem.value);
  horaOrdem = document.getElementById("horaOrdem");
  console.log(horaOrdem.value);
  dataAbertura = document.getElementById("dataOrdem");
  console.log(dataOrdem.value);
  setor = document.getElementById("setorOrdem");
  console.log(setorOrdem.value);
  maquinaParada = document.getElementById("maquinaParada");
  console.log(maquinaParada.value);
  
  // tituloOrdem.value = "";
  // descricaoOrdem.value = "";
  // numeroOrdem.value = "";
  // tituloPesquisaOrdem.value = "";
  //  sendOrdemPorEmail();
  
}




function sendOrdemPorEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "noreplyclever@gmail.com",
    Password: "Clever12#",
    To: "lurnakata@gmail.com",
    From: "noreplyclever@gmail.com",
    Subject: "Nova ordem de servico gerada",
    Body: "Nova ordem de servico gerada" + tituloOrdem.value,
  }).then(
    message => alert("E-mail com o ordem enviada!")
  );
}

