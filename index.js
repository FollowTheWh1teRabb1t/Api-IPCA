// Importando o módulo 'express'
const express = require('express');

// Importando o array de histórico de inflação
const historicoInflacao = require('./historicoInflacao');

// Importando o serviço de reajuste
const reajusteService = require('./reajusteService'); 

// Inicializando o aplicativo Express
const app = express();

// Definindo a porta do servidor
const port = 8080;

// Rota para obter todo o histórico de inflação
app.get('/api/historico-inflacao', (req, res) => {
    res.json(historicoInflacao);
});

// Rota para obter o histórico de inflação de um ano específico
app.get('/api/historico-inflacao/:ano', (req, res) => {
    // Obtendo o ano requisitado da URL e convertendo para número inteiro
    const anoRequisitado = parseInt(req.params.ano);
    
    // Filtrando o histórico de inflação pelo ano específico
    const inflacaoAnoEspecifico = historicoInflacao.filter(item => item.ano == anoRequisitado);

    // Verificando se há registros de inflação para o ano especificado
    if (inflacaoAnoEspecifico.length > 0) {
        res.json(inflacaoAnoEspecifico);
    } else {
        res.status(404).json({ message: 'Nenhum registro de inflação foi encontrado neste ano!' });
    }
});

// Rota para obter o histórico de inflação por ID
app.get('/api/historico-inflacao/id/:id', (req, res) => {
    // Obtendo o ID requisitado da URL e convertendo para número inteiro
    const idRequisitado = parseInt(req.params.id);
    
    // Buscando o registro de inflação pelo ID
    const inflacaoPorId = historicoInflacao.find(item => item.id === idRequisitado);

    // Verificando se há registro de inflação para o ID especificado
    if (inflacaoPorId) {
        res.json(inflacaoPorId);
    } else {
        res.status(404).json({ message: 'Nenhum registro de inflação foi encontrado nesse ID!' });
    }
});

// Rota para calcular o reajuste com base nos parâmetros fornecidos
app.get('/api/reajuste', (req, res) => {
    // Obtendo os parâmetros da query string da requisição
    const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;

    // Verificando se todos os parâmetros necessários foram fornecidos
    if (!valor || !mesInicial || !anoInicial || !mesFinal || !anoFinal) {
        return res.status(400).json({ message: 'Todos os parâmetros devem ser fornecidos: valor, mesInicial, anoInicial, mesFinal, anoFinal' });
    }

    // Convertendo os parâmetros para números
    const valorFloat = parseFloat(valor);
    const mesInicialInt = parseInt(mesInicial);
    const anoInicialInt = parseInt(anoInicial);
    const mesFinalInt = parseInt(mesFinal);
    const anoFinalInt = parseInt(anoFinal);

    // Verificando se os valores fornecidos são números válidos
    if (isNaN(valorFloat) || isNaN(mesInicialInt) || isNaN(anoInicialInt) || isNaN(mesFinalInt) || isNaN(anoFinalInt)) {
        return res.status(400).json({ message: 'Todos os parâmetros devem ser números válidos' });
    }

    // Calculando o reajuste com base nos parâmetros fornecidos
    const resultado = reajusteService.calcularReajuste(valorFloat, mesInicialInt, anoInicialInt, mesFinalInt, anoFinalInt);

    // Retornando o resultado do cálculo
    res.json({ resultado });
});
''
// Iniciando o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
