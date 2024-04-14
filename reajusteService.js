// Importando os dados de exemplo
const historicoInflacao = require('./historicoInflacao');

// Função para calcular o reajuste de valores
function calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
  // Filtrando os dados de inflação para o período informado
  const inflacaoPeriodo = historicoInflacao.filter(item => {
    if (item.ano > anoInicial && item.ano < anoFinal) {
      return true;
    } else if (item.ano === anoInicial && item.mes >= mesInicial) {
      return true;
    } else if (item.ano === anoFinal && item.mes <= mesFinal) {
      return true;
    }
    return false;
  });

  // Calculando o valor reajustado com base nos índices IPCA
  const resultado = inflacaoPeriodo.reduce((acc, curr) => {
    return acc * (1 + (curr.ipca / 100));
  }, valor);

  return resultado.toFixed(2);
}

module.exports = {
  calcularReajuste
};
