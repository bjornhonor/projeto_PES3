// logica.js

// Abrir modal e impedir rolagem do fundo ao clicar em Calcular
document.querySelector('.calculate').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir a submissão do formulário
    if (validarCampos()) {
        calcularInvestimento(); // Chama a função para calcular o investimento
        document.getElementById('modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});

// Fechar modal e restaurar a rolagem ao clicar no botão Fechar
document.querySelector('.close-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir ações padrão, caso necessário
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Função para validar os campos de entrada
function validarCampos() {
    let camposValidos = true;
    const campos = ['initial-investment', 'duration', 'monthly-investment', 'profitability'];
    campos.forEach(function(campo) {
        const input = document.getElementById(campo);
        if (!input.value.trim()) {
            input.style.borderColor = 'red'; // Aplica borda vermelha se o campo estiver vazio
            camposValidos = false;
        } else {
            input.style.borderColor = ''; // Remove a borda vermelha se o campo estiver preenchido
        }
    });
    return camposValidos;
}

// Função para calcular o valor futuro dos investimentos com juros compostos
function calcularInvestimento() {
    const investimentoInicial = parseFloat(document.getElementById('initial-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const investimentoMensal = parseFloat(document.getElementById('monthly-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const rentabilidade = parseFloat(document.getElementById('profitability').value.replace('%', '').replace(',', '.'));
    const prazo = parseInt(document.getElementById('duration').value);
    const prazoUnidade = document.getElementById('duration-unit').value;
    const rentabilidadePeriodo = document.getElementById('profitability-period').value;

    // Convertendo a rentabilidade para mensal se necessário
    const taxaMensal = rentabilidadePeriodo === 'Anual' ? (Math.pow(1 + rentabilidade / 100, 1 / 12) - 1) : rentabilidade / 100;
    // Convertendo o prazo para meses se necessário
    const prazoMeses = prazoUnidade === 'Anos' ? prazo * 12 : prazo;

    const valorBruto = investimentoInicial * Math.pow(1 + taxaMensal, prazoMeses) + 
                        investimentoMensal * ((Math.pow(1 + taxaMensal, prazoMeses) - 1) / taxaMensal);

    const totalContribuicoes = investimentoInicial + (investimentoMensal * prazoMeses);
    const lucro = valorBruto - totalContribuicoes;
    const imposto = calcularImposto(lucro, prazoMeses);
    const taxaIRPercentual = calcularTaxaImpostoPercentual(prazoMeses); // Nova função para determinar a taxa de imposto
    const valorLiquido = valorBruto - imposto;

    // Exibindo os resultados
    document.getElementById('valorBruto').textContent = 'Valor Bruto: R$' + valorBruto.toFixed(2);
    document.getElementById('impostos').textContent = 'Impostos: R$' + imposto.toFixed(2);
    document.getElementById('taxaImposto').textContent = 'Taxa de Imposto: ' + taxaIRPercentual + '%';
    document.getElementById('valorTotalInvestido').textContent = 'Valor Total Investido: R$' + totalContribuicoes.toFixed(2);
    document.getElementById('valorEmJuros').textContent = 'Valor em Juros: R$' + lucro.toFixed(2);
    document.getElementById('valorLiquido').textContent = 'Valor Líquido: R$' + valorLiquido.toFixed(2);
}

// Função para calcular o imposto de renda com base no prazo
function calcularImposto(lucro, prazoMeses) {
    const prazoDias = prazoMeses * 30.44; // Ajustando para uma média mais precisa de dias por mês
    let taxaIR;
    if (prazoDias <= 180) {
        taxaIR = 0.225; // Até 180 dias
    } else if (prazoDias <= 360) {
        taxaIR = 0.20; // De 181 a 360 dias
    } else if (prazoDias <= 720) {
        taxaIR = 0.175; // De 361 a 720 dias
    } else {
        taxaIR = 0.15; // A partir de 721 dias
    }
    return lucro * taxaIR;
}

// Função para determinar a taxa de imposto como percentual
function calcularTaxaImpostoPercentual(prazoMeses) {
    const prazoDias = prazoMeses * 30.44; // Ajustando para uma média mais precisa de dias por mês
    if (prazoDias <= 180) {
        return 22.5;
    } else if (prazoDias <= 360) {
        return 20;
    } else if (prazoDias <= 720) {
        return 17.5;
    } else {
        return 15;
    }
}



