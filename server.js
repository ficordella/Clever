//Endereço no heroku:  https://agile-escarpment-85835.herokuapp.com/

const express = require("express"); //definir a função para requerir os modulos do node-express
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();



app.set('view engine', 'ejs'); // função para renderizar as views
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public")); // função para usar o CSS e JS

//mongoose.connect("mongodb://localhost:27017/cleverDB");
//estabelecer comunicação com o mongodb cloud
mongoose.connect("mongodb+srv://admin-clever:Clever123@cluster0clever.wg8wg.mongodb.net/cleverDB");

app.get("/", function(req, res) { //função para renderizar a pagina de login

  res.render("index");
});

app.get("/novoUsuario", function(req, res) {
  res.render("novoUsuario");
});

app.get("/confirmarUsuario", function(req, res) {
  res.render("confirmarUsuario");
});

app.get("/novaSenha", function(req, res) {
  res.render("novaSenha");
});

app.get("/password", function(req, res) {
  res.render("password");
});

app.get("/paginaPrincipal", function(req, res) {

  Ordem.find().exec(function(err, results) {
    count = results.length
    console.log(count);
    return count;
  });
  res.render("paginaPrincipal");
});

app.get("/cadastrarUsuarioInternal", function(req, res) {
  res.render("cadastrarUsuarioInternal");
});

app.get("/consultarEditarUsuarios", function(req, res) {
  res.render("consultarEditarUsuarios");
});

app.get("/cosultarEditarItensInventario", function(req, res) {
  res.render("cosultarEditarItensInventario");
});

app.get("/consultarEditarItensInventario", function(req, res) {
  res.render("consultarEditarItensInventario");
});

app.get("/inventario", function(req, res) {
  res.render("inventario");
});

app.get("/resultadosItens", function(req, res) {
  res.render("resultadosItens");
});

app.get("/resultadoUsuarios", function(req, res) {
  res.render("resultadoUsuarios");
});

app.get("/resultadoConfirmacaoUsuario", function(req, res) {
  res.render("resultadoConfirmacaoUsuario");
});

app.get("/criarOrdens", function(req, res) {

  Ordem.find().exec(function(err, results) {
    count = results.length
    count++;
    console.log(count);
  });

  res.render("criarOrdens");
});

app.get("/pesquisarOrdensServico", function(req, res) {
  res.render("pesquisarOrdensServico");
});

app.get("/resultadoOrdens", function(req, res) {
  res.render("resultadoOrdens");
});

app.get("/ordemPreventivaCriar", function(req, res) {

  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("ordemPreventivaCriar", {
      listaDeUsuarios: foundUser
    });
  });
});

app.get("/consultarPreventivas", function(req, res) {

  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("consultarPreventivas", {
      listaDeUsuarios: foundUser
    });
  });

});

app.get("/resultadoPreventivas", function(req, res) {

  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("resultadoPreventivas", {
      listaDeUsuarios: foundUser
    });
  });
});

app.get("/cadastrarMaquinas", function(req, res) {
  //res.render("cadastrarMaquinas");
  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("cadastrarMaquinas", {
      listaDeUsuarios: foundUser
    });
  });
});

app.get("/consultarMaquinas", function(req, res) {
  //res.render("consultarMaquinas");
  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("consultarMaquinas", {
      listaDeUsuarios: foundUser
    });
  });
});



app.get("/processoMaquinas", function(req, res) {
  res.render("processoMaquinas");
});

app.get("/excluirMaquinas", function(req, res) {
  Maquina.find({}, function(err, foundMaquina) {
    console.log(foundMaquina)
    res.render("excluirMaquinas", {
      listaDeMaquinas: foundMaquina
    });
  });

});

app.get("/resultadoMaquinas", function(req, res) {
  User.find({
    tipoUsuario: "Tecnico",
  }, function(err, foundUser) {
    console.log(foundUser)
    res.render("resultadoMaquinas", {
      listaDeUsuarios: foundUser
    });
  });
});


//função para o banco de dados do registro de usuário
// construtor para salvar o usuário no banco de dados
const userSchema = {
  login: String,
  email: String,
  nomeCompleto: String,
  password: String,
  dataNascimento: Date,
  tipoUsuario: String
};

const User = new mongoose.model("User", userSchema);

app.post("/novoUsuario", function(req, res) {
  const newUser = new User({
    login: req.body.loginNewUser,
    email: req.body.email,
    nomeCompleto: req.body.nomeCompleto,
    password: req.body.password,
    dataNascimento: req.body.dataNascimento
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Usuário salvo!");
      res.render("paginaPrincipal");
    }
  });
});


//função para logar com a busca do usuário

app.post("/", function(req, res) {
  const login = req.body.login;
  const password = req.body.password;
  //console.log(login, password);

  User.findOne({
    login: login
  }, function(err, foundUser) {
    if (err) {
      res.send("Login não encontrado");
      console.log(foundUser);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("paginaPrincipal");
        } else {
          res.send('Erro! senhha não encontrada');
        }
      }
    }
  });
});
///////////////////////////// função para atualizar senha do usuario//////////////////////////////////
app.post("/novaSenha", function(req, res) {
  const login = req.body.login;
  const password = req.body.password1;
  const passwordCheck = req.body.password2;

  if (password.length > 5) {
    if (password === passwordCheck) {
      User.updateOne({
          login: req.body.login
        }, {
          password: req.body.password1
        },
        //{$set: req.body},
        function(err) {
          if (!err) {
            res.render("index");
          } else {
            res.send("erro");
          }
        }
      );
    } else {
      res.send("As senhas digitadas não são iguais!")
    }
  } else {
    res.send("A senha precisa ter no mínimo 6 caracteres!");
  }
});

////////////////////////////////// localizar nome de usuário ///////////////////////////////////////
app.post("/confirmarUsuario", function(req, res) {
  const emailConfirmacao = req.body.emailConfirmacao;
  const nomeConfirmacao = req.body.nomeConfirmacao;

  if (emailConfirmacao != "") {
    User.findOne({
        email: emailConfirmacao,
      },
      function(err, foundUser) {
        if (foundUser) {
          res.send("Seu login para acesso é: " + foundUser.login);
          console.log(foundUser.login);
        } else {
          res.send("Esse email não está cadastrado no sistema!");
          console.log("No user found");
        }
      }
    );
  } else if (nomeConfirmacao != "") {
    User.findOne({
        nomeCompleto: nomeConfirmacao,
      },
      function(err, foundUser) {
        if (foundUser) {
          res.send("Seu login para acesso é: " + foundUser.login);
          console.log(foundUser.login);
        } else {
          res.send("Esse nome não está cadastrado no sistema!");
          console.log("No user found");
        }
      }
    );
  } else {
    res.send("Digite o email ou o nome para pesquisa!");
  }


});



//___________________________________________________funções para salvar usuários no banco de dados pagina cadastrarUsuarioInternal_________________

app.post("/cadastrarUsuarioInternal", function(req, res) {
  const novoUsuario = new User({
    login: req.body.nomeUsuario,
    email: req.body.usuarioEmail1,
    nomeCompleto: req.body.nomeCompletoUsuario,
    password: req.body.usuarioPassword1,
    dataNascimento: req.body.dataNascimento,
    tipoUsuario: req.body.flexRadioDefault
  });


  novoUsuario.save(function(err) {
    if (err) {
      console.log("O usuário não foi salvo, verifique os dados!");
    } else {
      console.log("Usuário salvo som sucesso!");
      res.render("cadastrarUsuarioInternal");
    }
  });
});


///////////////////////////////// funções para consulta de usuários//////////////////////////////////////////

app.post("/consultarEditarUsuarios", function(req, res) {
    const loginProcurado = req.body.loginProcurado;
    const nomeUsuarioProcurado = req.body.nomeUsuarioProcurado;
    const emailprocurado = req.body.emailprocurado;
    const tipoUsuario = req.body.flexRadioDefault;


    //inicia procura pelos parâmetros passados

    //////////////////////////////inicia a busca vendo se o campo login não está vazio///////////////////////////////////////////////
    if (loginProcurado != "") {
      console.log(loginProcurado);
      User.find({
        login: loginProcurado,
      }, function(err, foundUser) {
        if (foundUser) {
          res.render("resultadoUsuarios", {
            listaDeUsuarios: foundUser
          });
          console.log(foundUser);
        } else {
          //res.render("resultadosItens", {listaDeUsuarios: "Usuario não encontrado" });
          console.log("No user found")
        }
      });
    } else {

      /////////////////////////////////////// faz a busca pelo campo nome de usuario se não está vazio////////////////////////////////////////////////
      if (nomeUsuarioProcurado != "") {
        console.log(nomeUsuarioProcurado);
        User.find({
          nomeCompleto: nomeUsuarioProcurado,
        }, function(err, foundUser) {
          if (foundUser) {
            res.render("resultadoUsuarios", {
              listaDeUsuarios: foundUser
            });
            console.log(foundUser);
          } else {
            res.send("No user found!");
            console.log("No user found");
          }
        });
      } else {

        //////////////////////////////////////////// faz a busca pelo campo email se não está vazio//////////////////////////////////
        if (emailprocurado != "") {
          console.log(emailprocurado);
          User.find({
            email: emailprocurado,
          }, function(err, foundUser) {
            if (foundUser) {
              res.render("resultadoUsuarios", {
                listaDeUsuarios: foundUser
              });
              console.log(foundUser);
            } else {
              res.send("No user found!");
              console.log("No user found");
            }
          });
        } else {

          //////////////////////////////////// procura pelo tipo de usuario ///////////////////////////////////////
          if (tipoUsuario != "") {
            console.log(tipoUsuario);
            User.find({
              tipoUsuario: tipoUsuario,
            }, function(err, foundUser) {
              if (foundUser) {
                res.render("resultadoUsuarios", {
                  listaDeUsuarios: foundUser
                });
                console.log(foundUser);
              } else {
                res.send("No User found!");
                console.log("No User found");
              }
            });
          } else {

            ////////////////////////////////////// se nenhum campo for digitado ou selecionado retorna a mensagem ////////////////
            res.send("Nenhum item digitado ou selecionado");
            console.log("Nenhum item digitado ou selecionado");
          }
        }
      }
    }
  }


);

//////////////////////////////////////// funções para atualizar usuário ///////////////////////////////////////////

app.post("/resultadoUsuarios", function(req, res) {

  //atualiza o nome do usuário////
  const nomeUsuarioProcurado = req.body.nomeUsuarioProcurado;
  if (nomeUsuarioProcurado != "") {
    User.updateOne({
        login: req.body.loginProcurado
      }, {
        nomeCompleto: req.body.nomeUsuarioProcurado
      },
      //{$set: req.body},
      function(err) {
        if (!err) {
          res.render("consultarEditarUsuarios");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o email do usuário////
  const emailprocurado = req.body.emailprocurado;
  if (emailprocurado != "") {
    User.updateOne({
        login: req.body.loginProcurado
      }, {
        email: req.body.emailprocurado
      },
      //{$set: req.body},
      function(err) {
        if (!err) {
          res.render("consultarEditarUsuarios");
        } else {
          res.send("erro");
        }
      }
    );
  }

  /////////////////////////////////// atualiza a senha ////////////////////////
  const password = req.body.novaSenhaUser;
  const passwordCheck = req.body.confimacaoNovaSenhaUser;

  if (password != "") {

    if (password === passwordCheck) {
      User.updateOne({
          login: req.body.loginProcurado
        }, {
          password: req.body.novaSenhaUser
        },
        //{$set: req.body},
        function(err) {
          if (!err) {
            res.render("consultarEditarUsuarios");
          } else {
            res.send("erro");
          }
        }
      );
    } else {
      res.send("As senhas não são iguais!")
    }

  }

  /////////////////////////////////////// atualiza tipo de usuario ///////////////////////////
  const tipoDeUsuario = req.body.flexRadioDefault;

  if (tipoDeUsuario != "") {
    User.updateOne({
        login: req.body.loginProcurado
      }, {
        tipoUsuario: req.body.flexRadioDefault
      },
      function(err) {
        if (!err) {
          res.render("consultarEditarUsuarios");
        } else {
          res.send("erro");
        }
      }
    );
  }


});

//////////////////////////////// deletar usuario selecionado//////////////////////////////////
app.post("/deleteUser", function(req, res) {
  const listaUsuariosSelect = req.body.listaUsuariosSelect;
  console.log(listaUsuariosSelect);
  User.findOneAndDelete({
    login: listaUsuariosSelect
  }, function(err) {
    if (!err) {
      console.log("Sucesso!");
      //redireciona para atualizar a página
      res.render("consultarEditarUsuarios");
    } else {
      res.send("Erro!");
    }
  })
});



//////////////////////////// alterações para salvar itens da pagina Inventário no banco de dados////////////////////////////////

const itemSchema = {
  idItem: String,
  descricaoItem: String,
  maquinaItem: String,
  vendedorItem: String,
  marcaItem: String,
  modeloItem: String,
  quantidadeAtualItem: Number,
  quantidadeMinimaItem: Number
};

const Item = new mongoose.model("Item", itemSchema);

app.post("/inventario", function(req, res) {
  const newItem = new Item({
    idItem: req.body.idItem,
    descricaoItem: req.body.descricaoItem,
    maquinaItem: req.body.maquinaItem,
    vendedorItem: req.body.vendedorItem,
    marcaItem: req.body.marcaItem,
    modeloItem: req.body.modeloItem,
    quantidadeAtualItem: req.body.quantidadeAtualItem,
    quantidadeMinimaItem: req.body.quantidadeMinimaItem

  });



  //  console.log(newItem.descricaoItem)

  newItem.save(function(err) {
    if (err) {
      console.log("O item não foi salvo!");
    } else {
      console.log("Novo item salvo!");
      res.render("inventario");
    }
  });
});


//____________________________________________________________funções da página consultar itens______________________________________________
app.route("/consultarEditarItensInventario")
  .post(function(req, res) {
    const maquinaItemProcurado = req.body.maquinaItem;
    const idItemProcura = req.body.idItem;
    const descricaoItemProcura = req.body.descricaoItem;
    const vendedorProcura = req.body.vendedorItem;
    const marcaItemProcura = req.body.marcaItem;
    const modeloItemProcura = req.body.modeloItem;
    const todosItensCheck = req.body.todosItens;

    if (todosItensCheck == "true") { // se o check box esta marcado, responde com todos os itens cadastrados
      console.log("checked");
      Item.find(function(err, foundArticles) {
        if (!err) {
          console.log(foundArticles);
          res.render("resultadosItens", {
            listaDeItens: foundArticles
          });
        }
      });
    } else {

      /////////////////////////// se o checkbox está desmarcado, segue a busca pelos parâmetros descritos////////////////////////////

      console.log("unchecked");

      //////////////////////////////inicia a busca vendo se o campo máquina não está vazio///////////////////////////////////////////////

      if (maquinaItemProcurado != "") {
        console.log(maquinaItemProcurado);
        Item.find({
          maquinaItem: maquinaItemProcurado,
        }, function(err, foundItem) {
          if (foundItem) {
            res.render("resultadosItens", {
              listaDeItens: foundItem
            });
            console.log(foundItem);
          } else {
            res.render("resultadosItens", {
              listaDeItens: "Item não encontrado"
            });
            console.log("No item found")
          }
        });
      } else {

        /////////////////////////////////////// faz a busca pelo campo id para se não está vazio////////////////////////////////////////////////

        if (idItemProcura != "") {
          console.log(idItemProcura);
          Item.find({
            idItem: idItemProcura,
          }, function(err, foundItem) {
            if (foundItem) {
              res.render("resultadosItens", {
                listaDeItens: foundItem
              });
              console.log(foundItem);
            } else {
              res.send("No item found!");
              console.log("No item found");
            }
          });
        } else {

          //////////////////////////////////////////// se o campo item está vazio, procura pela descrição//////////////////////////////////
          if (descricaoItemProcura != "") {
            console.log(descricaoItemProcura);
            Item.find({
              descricaoItem: descricaoItemProcura,
            }, function(err, foundItem) {
              if (foundItem) {
                res.render("resultadosItens", {
                  listaDeItens: foundItem
                });
                console.log(foundItem);
              } else {
                res.send("No item found!");
                console.log("No item found");
              }
            });
          } else {

            //////////////////////////////////////////// se o campo descrição está vazio, procura pelo vendedor //////////////////////////////////

            if (vendedorProcura != "") {
              console.log(vendedorProcura);
              Item.find({
                vendedorItem: vendedorProcura,
              }, function(err, foundItem) {
                if (foundItem) {
                  res.render("resultadosItens", {
                    listaDeItens: foundItem
                  });
                  console.log(foundItem);
                } else {
                  res.send("No item found!");
                  console.log("No item found");
                }
              });
            } else {

              /////////////////////////////////////////// se o campo vendedor está vazio procira pela marca /////////////////////////////////////
              if (marcaItemProcura != "") {
                console.log(marcaItemProcura);
                Item.find({
                  marcaItem: marcaItemProcura,
                }, function(err, foundItem) {
                  if (foundItem) {
                    res.render("resultadosItens", {
                      listaDeItens: foundItem
                    });
                    console.log(foundItem);
                  } else {
                    res.send("No brand found!");
                    console.log("No brand found");
                  }
                });
              } else {

                //////////////////////////////////// se o campo marca está vazio procura pelo modelo ///////////////////////////////////////

                if (modeloItemProcura != "") {
                  console.log(modeloItemProcura);
                  Item.find({
                    modeloItem: modeloItemProcura,
                  }, function(err, foundItem) {
                    if (foundItem) {
                      res.render("resultadosItens", {
                        listaDeItens: foundItem
                      });
                      console.log(foundItem);
                    } else {
                      res.send("No model found!");
                      console.log("No model found");
                    }
                  });
                } else {

                  ////////////////////////////////////// se nenhum campo for digitado ou selecionado retorna a mensagem ////////////////

                  res.send("Nenhum item digitado ou selecionado");
                  console.log("Nenhum item digitado ou selecionado");
                }
              }
            }
          }
        }
      }
    }
  });

/////////////////////////////////////////////// atualizar item ////////////////////////////////////

app.post("/resultadosItens", function(req, res) {

  //atualiza o campo descrição
  const descricaoItem = req.body.descricaoItem;
  if (descricaoItem != "") {
    Item.updateOne({
        idItem: req.body.idItem
      }, {
        descricaoItem: req.body.descricaoItem
      },
      //{$set: req.body},
      function(err) {
        if (!err) {
          res.render("consultarEditarItensInventario");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo máquinas
  const maquinaItem = req.body.maquinaItem;
  if (maquinaItem != "") {
    Item.updateOne({
        idItem: req.body.idItem
      }, {
        maquinaItem: req.body.maquinaItem
      },
      function(err) {
        if (!err) {
          res.render("consultarEditarItensInventario");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo vendedor///
  const vendedorItem = req.body.vendedorItem;
  if (vendedorItem != "") {
    Item.updateOne({
        idItem: req.body.idItem
      }, {
        vendedorItem: req.body.vendedorItem
      },
      function(err) {
        if (!err) {
          res.render("consultarEditarItensInventario");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo marca//
  const marcaItem = req.body.marcaItem;
  if (marcaItem != "") {
    Item.updateOne({
        idItem: req.body.idItem
      }, {
        marcaItem: req.body.marcaItem
      },
      function(err) {
        if (!err) {
          res.render("consultarEditarItensInventario");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo modeloItem
  const modeloItem = req.body.modeloItem;
  if (modeloItem != "") {
    Item.updateOne({
        idItem: req.body.idItem
      }, {
        modeloItem: req.body.modeloItem
      },
      function(err) {
        if (!err) {
          res.render("consultarEditarItensInventario");
        } else {
          res.send("erro");
        }
      }
    );
  }

});

//------------------------------------- funções de criação de ordens ----------------------------------//

const ordemServicoSchema = {
  numeroOrdem: Number,
  tituloOrdem: String,
  descricaoOrdem: String,
  descricaoServicoRealizado: String,
  maquinaOrdem: String,
  horaInicial: String,
  horaFinal: String,
  dataInicial: Date,
  dataFinal: String, //possivelmente terá que voltar para formato data
  setor: String,
  maquinaParada: Boolean,
  tipoOrdem: String,
  status: String,
  responsavel: String
};

const Ordem = new mongoose.model("Ordem", ordemServicoSchema);


Ordem.find().exec(function(err, results) {
  count = results.length
  count++;
  console.log(count);
});


app.post("/criarOrdens", function(req, res) {

  const newOrdem = new Ordem({

    numeroOrdem: count,
    tituloOrdem: req.body.tituloOrdem,
    descricaoOrdem: req.body.descricaoOrdem,
    maquinaOrdem: req.body.maquinaOrdem,
    horaInicial: req.body.horaOrdem,
    horaFinal: req.body.horaFinal,
    dataInicial: req.body.dataOrdem,
    setor: req.body.setorOrdem,
    //maquinaParada: req.body.maquinaParada,
    tipoOrdem: req.body.flexRadioDefault,
    status: "Aberta"

  });



  //  console.log(newItem.descricaoItem)

  newOrdem.save(function(err) {
    if (err) {
      console.log("A ordem não foi salva");
    } else {
      console.log("Nova ordem salva!");
      var i = count;
      res.send("Sua ordem foi criada com sucesso, o número é: " + count);
    }
  });

});

/*--------------------------------Funções da parte de pesquisa de ordens de serviço-------------------------------------*/

app.post("/pesquisarOrdensServico", function(req, res) {
  const numeroOrdem = req.body.numeroOrdem;
  const tituloPesquisaOrdem = req.body.tituloPesquisaOrdem;
  const maquinaOrdem = req.body.maquinaOrdem;
  const statusOrdem = req.body.statusOrdem;
  const setorOrdem = req.body.setorOrdem;
  const dataOrdemAbertura = req.body.dataOrdemAbertura;
  const dataOrdemFechamento = req.body.dataOrdemFechamento;
  const flexRadioDefault = req.body.flexRadioDefault;


  if (numeroOrdem != "") { //procura pelo número da ordem
    console.log(numeroOrdem);
    Ordem.find({
      numeroOrdem: numeroOrdem,
    }, function(err, foundOrdens) {
      if (!err) {
        console.log(foundOrdens);
        res.render("resultadoOrdens", {
          listaDeOrdens: foundOrdens
        });
      }
    });
  } else {


    //////////////////////////////inicia a busca vendo se o titulo não está vazio///////////////////////////////////////////////

    if (tituloPesquisaOrdem != "") {
      console.log(tituloPesquisaOrdem);
      Ordem.find({
        tituloOrdem: tituloPesquisaOrdem,
      }, function(err, foundOrdens) {
        if (foundOrdens) {
          res.render("resultadoOrdens", {
            listaDeOrdens: foundOrdens
          });
          console.log(foundOrdens);
        } else {
          res.send(foundOrdens);
          res.render("resultadoOrdens", {
            listaDeOrdens: "Ordem não encontrada"
          });
          console.log("No ordem found")
        }
      });
    } else {

      /////////////////////////////////////// faz a busca pelo campo maquinaOrdem se não está vazio////////////////////////////////////////////////

      if (maquinaOrdem != "") {
        console.log(maquinaOrdem);
        Ordem.find({
          maquinaOrdem: maquinaOrdem,
        }, function(err, foundOrdens) {
          if (foundOrdens) {
            res.render("resultadoOrdens", {
              listaDeOrdens: foundOrdens
            });
            console.log(foundOrdens);
          } else {
            res.send("No ordem found!");
            console.log("No ordem found");
          }
        });
      } else {

        ////////////////////////////////////////////  procura pelo statusOrdem//////////////////////////////////
        if (statusOrdem != "") {
          console.log(statusOrdem);
          Ordem.find({
            status: statusOrdem,
          }, function(err, foundOrdens) {
            if (foundOrdens) {
              res.render("resultadoOrdens", {
                listaDeOrdens: foundOrdens
              });
              console.log(foundOrdens);
            } else {
              res.send("No ordem found!");
              console.log("No ordem found");
            }
          });
        } else {

          //////////////////////////////////////////// procura pelo setor //////////////////////////////////

          if (setorOrdem != "") {
            console.log(setorOrdem);
            Ordem.find({
              setor: setorOrdem,
            }, function(err, foundOrdens) {
              if (foundOrdens) {
                res.render("resultadoOrdens", {
                  listaDeOrdens: foundOrdens
                });
                console.log(foundOrdens);
              } else {
                res.send("No ordem found!");
                console.log("No ordem found");
              }
            });
          } else {

            /////////////////////////////////////////// Procutara pela data de abertura /////////////////////////////////////
            if (dataOrdemAbertura != "") {
              console.log(dataOrdemAbertura);
              Ordem.find({
                marcaItem: dataOrdemAbertura,
              }, function(err, foundOrdens) {
                if (foundOrdens) {
                  res.render("resultadoOrdens", {
                    listaDeOrdens: foundOrdens
                  });
                  console.log(foundOrdens);
                } else {
                  res.send("No ordem found!");
                  console.log("No ordem found");
                }
              });
            } else {

              ////////////////////////////////////  procura pela data de fechamento ///////////////////////////////////////

              if (dataOrdemFechamento != "") {
                console.log(dataOrdemFechamento);
                Ordem.find({
                  dataFinal: dataOrdemFechamento,
                }, function(err, foundOrdens) {
                  if (foundOrdens) {
                    res.render("resultadoOrdens", {
                      listaDeOrdens: foundOrdens
                    });
                    console.log(foundOrdens);
                  } else {
                    res.send("No ordem found!");
                    console.log("No ordem found");
                  }
                });
              } else {

                /*------------------------------ procura pelo tipo de ordem ------------------------*/

                ////////////////////////////////////  procura pelo tipo de ordem ///////////////////////////////////////

                if (flexRadioDefault != "") {
                  console.log(flexRadioDefault);
                  Ordem.find({
                    tipoOrdem: flexRadioDefault,
                  }, function(err, foundOrdens) {
                    if (foundOrdens) {
                      res.render("resultadoOrdens", {
                        listaDeOrdens: foundOrdens
                      });
                      console.log(foundOrdens);
                    } else {
                      res.send("No ordem found!");
                      console.log("No ordem found");
                    }
                  });
                } else {

                  ////////////////////////////////////// se nenhum campo for digitado ou selecionado retorna a mensagem ////////////////

                  res.send("Nenhum dado digitado ou selecionado");
                  console.log("Nenhum dado digitado ou selecionado");
                }
              }
            }
          }
        }
      }
    }
  }
});

/*----------------------------- atualizar campos das ordens ------------------------------------------*/


app.post("/resultadoOrdens", function(req, res) {

  //atualiza o campo descrição do serviço realizado
  const servicoOrdem = req.body.servicoOrdem;
  if (servicoOrdem != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        descricaoServicoRealizado: req.body.servicoOrdem
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o técnico que realizou o serviço
  const responsavelOrdem = req.body.responsavelOrdem;
  if (responsavelOrdem != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        responsavel: req.body.responsavelOrdem
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo status da ordem///
  const statusOrdem = req.body.statusOrdem;
  if (statusOrdem != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        status: req.body.statusOrdem
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo hora de fechamento//
  const horaFechamento = req.body.horaFechamento;
  if (horaFechamento != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        horaFinal: req.body.horaFechamento
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo data de fechamento
  const dataOrdemFechamento = req.body.dataOrdemFechamento;
  if (dataOrdemFechamento != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        dataFinal: req.body.dataOrdemFechamento
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

  //atualiza o campo tipo de ordem
  const flexRadioDefault = req.body.flexRadioDefault;
  if (flexRadioDefault != "") {
    Ordem.updateOne({
        numeroOrdem: req.body.numeroOrdem
      }, {
        tipoOrdem: req.body.flexRadioDefault
      },
      function(err) {
        if (!err) {
          res.render("pesquisarOrdensServico");
        } else {
          res.send("erro");
        }
      }
    );
  }

});

/*-------------------------------------- ordem preventiva -------------------------------------------------------------*/
const ordemPreventivaSchema = {
  codigoPreventiva: String,
  maquinaPreventiva: String,
  dataInicialPreventiva: Date,
  frequenciaPreventiva: String,
  tarefasPreventiva: {
    type: [String]
  },
  responsavelPreventiva: String

};

const Preventiva = new mongoose.model("Preventiva", ordemPreventivaSchema);

app.post("/ordemPreventivaCriar", function(req, res) {


  const newOrdemPreventiva = new Preventiva({

    codigoPreventiva: req.body.tituloOrdemPreventiva,
    maquinaPreventiva: req.body.maquinaOrdem,
    dataInicialPreventiva: req.body.dataOrdem,
    responsavelPreventiva: req.body.responsavelOrdem,
    frequenciaPreventiva: req.body.flexRadioDefault,
    tarefasPreventiva: req.body.lista

  });
  var teste = req.body.listaPreventiva;
  console.log(teste);

  newOrdemPreventiva.save(function(err) {
    if (err) {
      console.log("A ordem não foi salva");
    } else {
      console.log("Nova ordem salva!");
      var i = req.body.tituloOrdemPreventiva;
      res.send("Sua ordem preventiva foi criada com sucesso, o título dela é: " + i);
    }
  });

});

//---------------------------------------- pesquisar ordem preventiva ------------------------------------------------------//
app.post("/consultarPreventivas", function(req, res) {
  const tituloOrdemPreventiva = req.body.tituloOrdemPreventiva;
  const maquinaOrdem = req.body.maquinaOrdem;
  const dataOrdem = req.body.dataOrdem;
  const responsavelOrdem = req.body.responsavelOrdem;
  const frequencia = req.body.flexRadioDefault;



  //inicia procura pelos parâmetros passados

  if (tituloOrdemPreventiva != "") {
    console.log(tituloOrdemPreventiva);
    Preventiva.find({
      codigoPreventiva: tituloOrdemPreventiva,
    }, function(err, foundPreventiva) {
      if (foundPreventiva) {
        //res.send(foundPreventiva)
        console.log(foundPreventiva)
        res.render("resultadoPreventivas", {
          listaDeOrdensPreventivas: foundPreventiva,
        });
        console.log(foundPreventiva);
      } else {
        console.log("No preventiva found")
      }
    });

  } else {
    if (maquinaOrdem != "") {
      console.log(maquinaOrdem);
      Preventiva.find({
        maquinaPreventiva: maquinaOrdem,
      }, function(err, foundPreventiva) {
        if (foundPreventiva) {
          //res.send(foundPreventiva)
          res.render("resultadoPreventivas", {
            listaDeOrdensPreventivas: foundPreventiva
          });
          console.log(foundPreventiva);
        } else {
          console.log("No preventiva found")
        }
      });
    } else {
      if (responsavelOrdem != "") {
        console.log(responsavelOrdem);
        Preventiva.find({
          responsavelPreventiva: responsavelOrdem,
        }, function(err, foundPreventiva) {
          if (foundPreventiva) {
            //  res.send(foundPreventiva)
            res.render("resultadoPreventivas", {
              listaDeOrdensPreventivas: foundPreventiva
            });
            console.log(foundPreventiva);
          } else {
            console.log("No preventiva found")
          }
        });
      } else {
        if (frequencia != "") {
          console.log(frequencia);
          Preventiva.find({
            frequenciaPreventiva: frequencia,
          }, function(err, foundPreventiva) {
            if (foundPreventiva) {
              //  res.send(foundPreventiva)
              res.render("resultadoPreventivas", {
                listaDeOrdensPreventivas: foundPreventiva
              });
              console.log(foundPreventiva);
            } else {
              console.log("No preventiva found")
            }
          });
        } else {
          res.send("Nenhum dado inserido para pesquisa!")
        }
      }
    }
  }
});

//------------------------------------------------------atualizar preventiva------------------------------------------------------------------//
app.post("/resultadoPreventivas", function(req, res) {

  //atualiza o campo máquina
  const maquinaOrdem = req.body.maquinaOrdem;
  if (maquinaOrdem != "") {
    Preventiva.updateOne({
        codigoPreventiva: req.body.tituloOrdemPreventiva
      }, {
        maquinaPreventiva: req.body.maquinaOrdem
      },
      function(err) {
        if (!err) {
          res.render("consultarPreventivas");
        } else {
          res.send("erro, não foi possivel atualizar, tente novamente");
        }
      }
    );
  }

  const responsavelOrdem = req.body.responsavelOrdem;
  if (responsavelOrdem != "") {
    Preventiva.updateOne({
        codigoPreventiva: req.body.tituloOrdemPreventiva
      }, {
        responsavelPreventiva: req.body.responsavelOrdem
      },
      function(err) {
        if (!err) {
          res.render("consultarPreventivas");
        } else {
          res.send("erro, não foi possivel atualizar, tente novamente");
        }
      }
    );
  }

  const flexRadioDefault = req.body.flexRadioDefault;
  if (flexRadioDefault != "") {
    Preventiva.updateOne({
        codigoPreventiva: req.body.tituloOrdemPreventiva
      }, {
        frequenciaPreventiva: req.body.flexRadioDefault
      },
      function(err) {
        if (!err) {
          res.render("consultarPreventivas");
        } else {
          res.send("erro, não foi possivel atualizar, tente novamente");
        }
      }
    );
  }


});

///////////////////////////////////////////// cadastrar máquinas /////////////////////////////////////
const maquinaSchema = {
  idMaquina: String,
  nomeMaquina: String,
  descricaoMaquina: String,
  turnoTrabalho: String,
  setorMaquina: String,
  tecnicoMaquina: String,
  criticidadeMaquina: Number,
  dataInstalacaoMaquina: Date,
  itensCriticos: {
    type: [String]
  },
};

const Maquina = new mongoose.model("Maquina", maquinaSchema);

app.post("/cadastrarMaquinas", function(req, res) {

  /*const lista = [];
  const arr = req.body.listaDeItensMaquina;
  arr.forEach(element => {
    console.log(element);
    lista.push(element);
  });*/

  const newMaquina = new Maquina({

    idMaquina: req.body.idMaquina,
    nomeMaquina: req.body.nomeMaquina,
    descricaoMaquina: req.body.descricaoMaquina,
    turnoTrabalho: req.body.flexRadioDefault,
    setorMaquina: req.body.setorMaquina,
    tecnicoMaquina: req.body.tecnicoMaquina,
    criticidadeMaquina: req.body.criticidadeMaquina,
    dataInstalacaoMaquina: req.body.dataInstalacao,
    itensCriticos: req.body.listaItensCriticos,
  });




  newMaquina.save(function(err) {
    if (err) {
      console.log("A máquina não foi salva");
    } else {
      console.log("Nova máquina salva!");
      res.send("Nova máquina salva com sucesso no cadastro");
    }
  });


});

//////////////////////////////// função para excluirMaquinas /////////////////

app.post("/excluirMaquinas", function(req, res) {

  const flexRadioDefault = req.body.flexRadioDefault;
  console.log(flexRadioDefault);
  Maquina.findOneAndDelete({
    idMaquina: flexRadioDefault
  }, function(err) {
    if (!err) {
      console.log("Sucesso!");
      res.send("Máquina excluida do cadastro com sucesso!")
    } else {
      res.send("Erro!");
    }
  })

})



//https://mongoosejs.com/docs/queries.html explicação das queries usando where

//____________________________________________________________________________________________________________________________________________________

app.listen(process.env.PORT || 3000, function() { //função para definir as portas do servidor
  console.log("Servidor rodando");
});
