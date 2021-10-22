//Funções responsáveis pela tela de login na página index.html
mongoose.connect("mongodb://localhost:27017/userDB");
const mongoose = require("mongoose");


function logar() {
  var login = document.getElementById("login");
  var password = document.getElementById("password");
  if (login.value == "admin" && password.value == "admin") {
    //verificar checkbox para salvar senha e login
    let checkbox = document.getElementById("salvar");
    if (checkbox.checked) {
      salvarDados();
    }
    window.location.href = "/paginaPrincipal"; //alteração da extenção html para vi
  } else {
    login.value = "";
    password.value = "";
    alert("Usuario ou senha inválidos");
  }
}

function salvarDados() {
  var x = confirm("Deseja salvar senha e login?");
  if (x == true) {
    //alteração para salvar senha;
    var login = document.getElementById("login");
    var password = document.getElementById("password");

    localStorage.setItem("login", login);
    localStorage.setItem("password", password);
    alert("Senha e usuário salvos com sucesso!");
  } else {
    alert("Senha e usuários não foram salvos!");
  }
}

//Funções da tela de redefinição de senha( password.html) ____________________________________
// essa função busca um código de forma aleatório do array
function gerarCodigo() {
  var listaCodigos = ["biscoito", "abacate", "doritos", "guacamole", "tapioca",
    "cerveja", "catchup", "lasanha", "churrasco", "maionese"
  ];
  var n = (listaCodigos.length);
  n = Math.floor(Math.random() * n);
  return listaCodigos[n];

}

//essa função envia código por email para acessar a página de troca de senha// alteração feita para a inclusão da função envio de email
/*function enviarCodigo() {
  alert("Código " + gerarCodigo() + " enviado para o email " + email.value);
  email.value = "";
}*/

function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "maintenanceclever@gmail.com",
    Password: "Clever12#",
    To: email.value,
    From: "maintenanceclever@gmail.com",
    Subject: "Código de validação para troca de senha",
    Body: "Seu código para troca de senha é: " + gerarCodigo(),
  }).then(
    message => alert("E-mail com o código enviado!")
  );
}

//Essa função confirma se o email informado é válido.

function validacaoEmail() {
  //var destinatario = email.value;
  usuario = email.value.substring(0, email.value.indexOf("@"));
  dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {

    sendEmail();
    //enviarCodigo();
  } else {
    alert("Informe um e-mail válido");
  }
}

//essa função valida o código inserido e acessa a página para troca de senha
function validarCodigo() {
  var codigoConfirmacao = document.getElementById("codigoConfirmacao");
  var listaCodigos = ["biscoito", "abacate", "doritos", "guacamole", "tapioca",
    "cerveja", "catchup", "lasanha", "churrasco", "maionese"
  ];
  if (listaCodigos.includes(codigoConfirmacao.value)) {
    window.location.href = "/novaSenha";
  } else {
    alert("O código informado não é válido!");
    codigoConfirmacao.value = "";
  }
}

//essa função limpa os campos quando a tecla cancelar é acionada

function limparCampos() {
  email.value = "";
  codigoConfirmacao.value = "";
}

//funções para o cadastro da nova senha (novaSenha.html)____________________________________
//função para verificar e salvar a nova senha;

function salvarSenha() {
  var novaSenha = document.getElementById("password1");
  var confirmacaoSenha = document.getElementById("password2");
  var novaSenhaTamanho = novaSenha.value;
  if (novaSenhaTamanho.length > 5) {
    if (novaSenha.value == confirmacaoSenha.value) {
      alert("Nova senha salva com sucesso!");
      localStorage.setItem("password", novaSenha);
      password1.value = "";
      password2.value = "";
    } else {
      alert("As senhas digitadas não são iguais!");
      password1.value = "";
      password2.value = "";
    }
  } else {
    alert("A senha precisa ter no mínimo 6 caracteres!");
    password1.value = "";
    password2.value = "";
  }
}

//_______________________________________________________________________


//Funções da página novoUsuario.html
//realizada modificação inserindo else return false para chamada pelo servidor
//Essa função valida se os campos foram preenchidos corretamente
function validaCamposNovoUsuario() {
  //newUserEmail = document.getElementById("newUserEmail");
  //alert(newUserEmail.value);

  function NovoUsuario(nomeDoUsuario, emailInformado, nomeCompletoUsuario, dataNascimentoUsuario, senhaUsuario) {
    this.nomeDoUsuario = nomeDoUsuario;
    this.nomeCompletoUsuario = nomeCompletoUsuario;
    this.dataNascimentoUsuario = dataNascimentoUsuario;
    this.senhaUsuario = senhaUsuario
  }

  if (validarNomeUsuario() == true) {
    if (validacaoEmailInformado() == true) {
      if (validacaoNomeCompleto() == true) {
        if (novaSenhaInformada() == true) {
          alert("Usuário cadastrado com sucesso!");
          sendEmailUsuario();
          return true;
          //document.getElementById("user").submit();
          loginNewUser.value = "";
          newUserEmail.value = "";
          nomeCompleto.value = "";
          newPassword.value = "";
          passwordCheck.value = "";
          dataNascimento.value = "";

        } else {
          return false
        };
      } else {
        return false
      };
    } else {
      return false
    };
  } else {
    return false
  };
}

//Essa função valida se o nome de usuário atende os requisitos básicos!
function validarNomeUsuario(loginNewUser) {
  loginNewUser = document.getElementById("loginNewUser");
  if (loginNewUser.value == "") {
    alert("Digite um nome de usuário válido");
  } else if (loginNewUser.value.length < 5) {
    alert("O nome de usuário deve possuir pelo menos 5 caracteres");
  } else if (loginNewUser.value.indexOf(' ') > 0) {
    alert("O nome de usuário não pode conter caracteres em branco!");
  } else {
    return true;
  }
}

//Essa função valida se o email digitado está correto!
function validacaoEmailInformado(newUserEmail) {
  newUserEmail = document.getElementById("newUserEmail");
  usuario = newUserEmail.value.substring(0, newUserEmail.value.indexOf("@"));
  dominio = newUserEmail.value.substring(newUserEmail.value.indexOf("@") + 1, newUserEmail.value.length);

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

// essa função valida se o Nome Completo informado é válido
function validacaoNomeCompleto(nomeCompleto) {
  nomeCompleto = document.getElementById("nomeCompleto");
  if (nomeCompleto.value == "") {
    alert("Digite seu nome completo!");
  } else if (nomeCompleto.value.length < 5) {
    alert("Digite seu nome e sobrenome!");
  } else if (nomeCompleto.value.indexOf(' ') < 0) {
    alert("Por favor informe seu nome e sobrenome!");
  } else {
    return true;
  }
}

//Essa função busca a data de nascimento informada
function dataNascimentoInformada(dataNascimento) {
  dataNascimento = document.getElementById("dataNascimento");
  if (dataNascimento.value == "") {
    alert("Data de nascimento não informada");
    return dataNascimento.value;
  } else {
    return dataNascimento.value;
  }
}

//Essa função valida se as senhas informadas atentendem os requisitos básicos
function novaSenhaInformada(newPassword) {
  newPassword = document.getElementById("newPassword");
  var passwordCheck = document.getElementById("passwordCheck");
  var newPasswordTamanho = newPassword.value;
  if (newPasswordTamanho.length > 5) {
    if (newPassword.value == passwordCheck.value) {
      return true;
    } else {
      alert("As senhas digitadas não são iguais!");
    }
  } else {
    alert("A senha precisa ter no mínimo 6 caracteres!");
  }
}

//essa função envia o usuário cadastrado por email para o novo usuario
function sendEmailUsuario() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "maintenanceclever@gmail.com",
    Password: "Clever12#",
    To: newUserEmail.value,
    From: "maintenanceclever@gmail.com",
    Subject: "Novo usuário cadastrado!",
    Body: "Cadastramos seu novo usuário no Clever Maintenance Software com as seguintes informações: Login: " + loginNewUser.value + ", Senha: " + newPassword.value + ", Nome: " + nomeCompleto.value + ", E-mail informado: " + newUserEmail.value + ", Data de nascimento: " + dataNascimento.value + ", muito obrigado!",
  }).then(
    message => alert("E-mail com dados enviados!")
  );
}

//_______________________________________________________________________________
// As funções abaixo são funções utilizas na tela confirmarUsuario.html

//Cadastrado usuário para teste sem banco de dados
function User(nome, email, login) {
  this.nome = nome;
  this.email = email;
  this.login = login;
}
var usuario1 = new User("Filipe", "ficordella@gmail.com", "fcordella");

//função para enviar email para usuário préviamente cadastrado
function enviarEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "maintenanceclever@gmail.com",
    Password: "Clever12#",
    To: usuario1.email,
    From: "maintenanceclever@gmail.com",
    Subject: "Usuário encontrado!",
    Body: "Olá, seu nome de usuário é: " + usuario1.login,
  }).then(
    message => alert("E-mail com login enviado!")
  );
}

// função para checar o nome ou email digitado e enviar para o email localizado o nome de usuário para login
function teste() {
  if (usuario1.email == emailConfirmacao.value || usuario1.nome == nomeConfirmacao.value) {

    enviarEmail();
    //alert(JSON.stringify(usuario1));
  } else {
    alert("Usuário não encontrado!");
  }
}

//__________________________________ alterações para salvar no banco de dados_________________________________-
