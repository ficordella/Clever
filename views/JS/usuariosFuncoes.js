//Fução para validação do campo nome de usuário cadastrarUsuarioInternal.html

function validarNomeUsuarioInternal(nomeUsuario) {
  nomeUsuario = document.getElementById("nomeUsuario");
  if (nomeUsuario.value == "") {
    alert("Digite um nome de usuário válido");
  } else if (nomeUsuario.value.length < 5) {
    alert("O nome de usuário deve possuir pelo menos 6 caracteres");
  } else if (nomeUsuario.value.indexOf(' ') > 0) {
    alert("O nome de usuário não pode conter caracteres em branco!");
  } else {
    return true;
  }
}

//função para validação do campo Nome Completo cadastrarUsuarioInternal.html

function validacaoNomeCompletoInternal(nomeCompletoUsuario) {
  nomeCompletoUsuario = document.getElementById("nomeCompletoUsuario");
  if (nomeCompletoUsuario.value == "") {
    alert("Digite seu nome completo!");
  } else if (nomeCompletoUsuario.value.length < 5) {
    alert("Digite seu nome completo!");
  } else if (nomeCompletoUsuario.value.indexOf(' ') < 0) {
    alert("Por favor informe seu nome e sobrenome!");
  } else {
    return true;
  }
}

//função para validação do campo e-mail

function validacaoEmailInformado(newUserEmail) {
  newUserEmail = document.getElementById("usuarioEmail1");
  usuario = usuarioEmail1.value.substring(0, usuarioEmail1.value.indexOf("@"));
  dominio = usuarioEmail1.value.substring(usuarioEmail1.value.indexOf("@") + 1, usuarioEmail1.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  } else {
    alert("Informe um e-mail válido");
  }
}

//função para validação de senha digitada e senha de Confirmação

function novaSenhaInformada(usuarioPassword1) {
  usuarioPassword1 = document.getElementById("usuarioPassword1");
  var usuarioPassword2 = document.getElementById("usuarioPassword2");
  var newPasswordTamanho = usuarioPassword1.value;
  if (newPasswordTamanho.length > 5) {
    if (usuarioPassword1.value == usuarioPassword2.value) {
      return true;
    } else {
      alert("As senhas digitadas não são iguais!");
    }
  } else {
    alert("A senha precisa ter no mínimo 6 caracteres!");
  }
}

//essa função busca o valor da data de nascimento informada
function dataNascimentoInformada(dataNascimento) {
  dataNascimento = document.getElementById("dataNascimento");
  if (dataNascimento.value == "") {
    alert("Data de nascimento não informada");
    return dataNascimento.value;
  } else {
    alert(dataNascimento.value);
    return dataNascimento.value;
  }
}

//essa função busca o valor informado no campo tipo de usuário
function tipoUsuarioInformado(tipoUsuarioSelecionado) {
  var tipoUsuarioSelecionado;
  if (document.getElementById("tipoAdministrador").checked) {
    tipoUsuarioSelecionado = "Administrador";
    //alert (tipoUsuarioSelecionado);
  }
  if (document.getElementById("tipoTecnico").checked) {
    tipoUsuarioSelecionado = "Técnico";
    //alert (tipoUsuarioSelecionado);
  }

  if (document.getElementById("tipoUsuario").checked) {
    tipoUsuarioSelecionado = "Usuário";
    //alert (tipoUsuarioSelecionado);
  }
  return tipoUsuarioSelecionado;
}



//essa função envia o usuário cadastrado por email para o novo usuario
function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "maintenanceclever@gmail.com",
    Password: "Clever12#",
    To: "ficordella@gmail.com",
    From: "maintenanceclever@gmail.com",
    Subject: "Novo usuário cadastrado!",
    Body: "Cadastramos seu novo usuário no Clever Maintenance Software com as seguintes informações: Login: " + nomeUsuario.value + ", Senha: " + usuarioPassword1.value + ", Nome: " + nomeCompletoUsuario.value + ", E-mail informado: " + usuarioEmail1.value + ", Data de nascimento: " + dataNascimento.value + " Tipo de usuário: " + tipoUsuarioInformado() + ", muito obrigado!",
  }).then(
    message => alert("E-mail com dados enviados!")
  );
}



//Essa função valida se os campos foram preenchidos corretamente
function validaCamposNovoUsuario() {
  function NovoUsuario(nomeDoUsuario, nomeCompletoUsuario, emailInformado, dataNascimentoUsuario, senhaUsuario, tipoUsuarioInforadoR) {
    this.nomeDoUsuario = nomeDoUsuario;
    this.nomeCompletoUsuario = nomeCompletoUsuario;
    this.emailInformado = emailInformado;
    this.dataNascimentoUsuario = dataNascimentoUsuario;
    this.senhaUsuario = senhaUsuario;
    this.tipoUsuarioInforadoR = tipoUsuarioInforadoR;
  }

  if (validarNomeUsuarioInternal() == true) {
    if (validacaoNomeCompletoInternal() == true) {
      if (validacaoEmailInformado() == true) {
        if (novaSenhaInformada() == true) {

          sendEmail();
          alert("Cadastramos seu novo usuário no Clever Maintenance Software com as seguintes informações: Login: " + nomeUsuario.value + ", Senha: " + usuarioPassword1.value + ", Nome: " + nomeCompletoUsuario.value + ", E-mail informado: " + usuarioEmail1.value + ", Data de nascimento: " + dataNascimento.value + " Tipo de usuário: " + tipoUsuarioInformado() + ", muito obrigado!");
          document.getElementById("usuarioForm").submit();
          return true;
          /*
          nomeUsuario.value = "";
          nomeCompletoUsuario.value = "";
          usuarioEmail1.value = "";
          usuarioPassword1.value = "";
          usuarioPassword2.value = "";
          dataNascimento.value = "";
          */
        } else{return false;}
      } else{return false;}
    } else{return false;}
  } else{return false;}
}

//____________________________________ funções da página consultar e editar usuários__________________________

// função para adicionar usuario na caixa de opçoes
function addOption(resultado) {
  var select = document.getElementById("resultadoUsuarios");
  select.options[select.options.length] = new Option(resultado);
}

//remover usuario selecionado na caixa de opções
function removeOption() {
  var x = document.getElementById("resultadoUsuarios");
  x.remove(x.selectedIndex);
}

//limpar todas seleções da caixa de opções
function removeAllOption() {
  var x = document.getElementById("resultadoUsuarios");
  x.options.length = 0;
}

//limpar todos os campos
function limparTodosCampos() {
  procurarNomeUsuario = document.getElementById("procurarNomeUsuario");
  procurarNomeCompleto = document.getElementById("procurarNomeCompleto");
  procurarEmail = document.getElementById("procurarEmail");
  procurarNomeUsuario.value = "";
  procurarNomeCompleto.value = "";
  procurarEmail.value = "";
  document.getElementById("tipoAdministrador").checked = false;
  document.getElementById("tipoTecnico").checked = false;
  document.getElementById("tipoUsuario").checked = false;
  removeAllOption();
}

//função para pesquisar usuários
function pesquisar() {

  procurarNomeUsuario = document.getElementById("procurarNomeUsuario");
  procurarNomeCompleto = document.getElementById("procurarNomeCompleto");
  procurarEmail = document.getElementById("procurarEmail");
  var checkboxAdmin = document.getElementById("tipoAdministrador");
  //tipoTecnico = document.getElementById("tipoTecnico");
  //tipoUsuario document.getElementById("tipoUsuario");


  const usuarios = [{
      id: 0,
      login: "fcordella",
      nome: "Filipe Cordella",
      email: "ficordella@gmail.com",
      tipoUsuario: "Administrador"
    },
    {
      id: 1,
      login: "jose123",
      nome: "Jose Santos",
      email: "jose123@gmail.com",
      tipoUsuario: "Tecnico"
    },
    {
      id: 2,
      login: "joaquim12",
      nome: "Joaquim",
      email: "joaquim@gmail.com",
      tipoUsuario: "Usuario"
    },
  ];

  //Verifica se os checkbox estão selecionados e retorna todos usuarios com esse valor

  if (checkboxAdmin.checked == true && tipoTecnico.checked == true && tipoUsuario.checked == true ){
    alert("Apresentando todos usuários selecionados:");
    usuariosTamanho = usuarios.length;
    for (var i = 0; i <= usuariosTamanho; i++) {
      addOption(Object.values(usuarios[i]));
}
}

//Verifica se os checkbox estão selecionados e retorna todos usuarios com esse valor
  if (checkboxAdmin.checked) {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.tipoUsuario === "Administrador");
    alert("Usuario encontrado!");
    addOption(Object.values(result));
  }
  if (tipoTecnico.checked) {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.tipoUsuario === "Tecnico");
    alert("Usuario encontrado!");
    addOption(Object.values(result));
  }
  if (tipoUsuario.checked) {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.tipoUsuario === "Usuario");
    alert("Usuario encontrado!");
    addOption(Object.values(result));
  }


  //valida os campos digitados e procura os usuarios
  if (procurarNomeUsuario.value != "") {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.login === procurarNomeUsuario.value);
    if (result != null) {
      alert("Usuario encontrado!");
      addOption(Object.values(result));
    } else {
      alert("Usuario com esse login não encontrado!");
    }
  } else if (procurarNomeCompleto.value != "") {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.nome === procurarNomeCompleto.value);
    if (result != null) {
      alert("Usuario encontrado!");
      addOption(Object.values(result));
    } else {
      alert("Usuario com esse nome não encontrado!");
    }
  } else if (procurarEmail.value != "") {
    const result = usuarios.find(usuarioEncontrado => usuarioEncontrado.email === procurarEmail.value);
    if (result != null) {
      alert("Usuario encontrado!");
      addOption(Object.values(result));
    } else {
      alert("Usuario com esse email não encontrado!");
    }
  } else if (checkboxAdmin.checked == false && tipoTecnico.checked == false && tipoUsuario.checked == false){
    alert("Insira alguma descrição ou selecione um tipo de usuário para realizar a pesquisa!");
  }


}
