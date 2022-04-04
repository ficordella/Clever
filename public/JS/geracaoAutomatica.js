const { escapeRegExpChars } = require("ejs/lib/utils");
const mongoose = require("mongoose");
const uri = "mongodb+srv://admin-clever:Clever123@cluster0clever.wg8wg.mongodb.net/cleverDB"

async function connect() {
    await mongoose.connect(uri)
}

async function closeConnection() {
    await mongoose.connection.close()
}

const ordemPreventivaSchema = {
    codigoPreventiva: String,
    maquinaPreventiva: String,
    dataInicialPreventiva: Date,
    frequenciaPreventiva: String,
    tarefasPreventiva: {
        type: [String]
    },
    responsavelPreventiva: String  
  }

const ordemServicoSchema = {
    numeroOrdem: Number,
    tituloOrdem: String,
    descricaoOrdem: String,
    descricaoServicoRealizado: String,
    maquinaOrdem: String,
    horaInicial: String,
    horaFinal: String,
    dataInicial: Date,
    dataFinal: String, 
    setor: String,
    maquinaParada: String,
    tipoOrdem: String,
    status: String,
    responsavel: String
    }

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
const Ordem = new mongoose.model("ordems", ordemServicoSchema);
const OrdemPreventiva = new mongoose.model("preventivas", ordemPreventivaSchema);

async function buscarOrdensPreventivas(){
    connect()

    const moment = require('moment')
    const today = moment().startOf('day')
    const ordensPreventivas = await OrdemPreventiva.find({
        dataInicialPreventiva : { 
            $lt: moment(today).endOf('day').toDate() 
        }
    })
    return ordensPreventivas;
}

async function buscarNumeroDeOrdemsDeServico(codigo, tipo){
    connect()

    const nomeOrdem = determinaNomeDaOrdem(codigo, tipo)
    const ordem = await Ordem.find({ tituloOrdem : nomeOrdem })

    return ordem.length
}

function determinaNomeDaOrdem(codigo, tipo){
    const valor = determinaValorDaFrequencia(tipo)
    return 'PREV-' + codigo + '-' + valor + tipo.charAt(0)
}

function determinaValorDaFrequencia(tipo){
    let valor
    let date = new Date()
    
    switch(tipo){
        case 'mensal': 
            valor = date.getMonth(); break;
        case 'trimestral': 
            valor = Math.trunc((date.getMonth()-1)/3)+1 ; break;
        case 'semestral': 
            valor = Math.trunc((date.getMonth()-1)/6)+1 ; break;
        case 'anual': 
            valor = date.getFullYear(); break;
    } 
    return valor
}

async function verificaNecessidadeDeCriacaoDeOrdem(elemento){
    const quantidadeOrdens = await buscarNumeroDeOrdemsDeServico(
        elemento.codigoPreventiva,  
        elemento.frequenciaPreventiva)
    if(quantidadeOrdens <= 0){
        criarOrdemDeServico(elemento)
    }
}

async function criarOrdemDeServico(elemento) {
    const moment = require('moment')
    const today = moment().startOf('day')
    const setor = await buscarSetorDaMaquina(elemento.maquinaPreventiva)


    const novaOrdem = new Ordem({
        tituloOrdem: determinaNomeDaOrdem(
            elemento.codigoPreventiva,
            elemento.frequenciaPreventiva
        ),
        descricaoOrdem: 'Ordem preventiva ' + elemento.frequenciaPreventiva + ' a maquina ' + elemento.maquinaPreventiva,
        descricaoServicoRealizado: 'Manutenção preventiva',
        maquinaOrdem: elemento.maquinaPreventiva,
        horaInicial: '08:00',
        horaFinal: '18:00',
        dataInicial: today,
        dataFinal: today, 
        setor: setor,
        maquinaParada: '0',
        tipoOrdem: 'preventiva',
        status: 'Aberta',
        responsavel: 'Automação Preventiva'
    })

    connect()
    novaOrdem.save()
}

async function buscarSetorDaMaquina(codMaquina){
    connect()

    let setor
    const maquina = await Maquina.findOne({ idMaquina : codMaquina}).then((r) => {
        try {
            setor = r.setorMaquina
            return setor
        } catch(erro) {
            return 'Sem setor Cadastrado'
        }      
    })
}

async function geracaoAutomaticaOrdemDeServico() {

    const ordens = await buscarOrdensPreventivas()
    Array.from(ordens).forEach(
        elemento => { 
            verificaNecessidadeDeCriacaoDeOrdem(elemento)
        }
    )    
}

exports.geracaoAutomaticaOrdemDeServico() = geracaoAutomaticaOrdemDeServico
