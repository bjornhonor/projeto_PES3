// logica.js

// Abrir modal e impedir rolagem do fundo ao clicar em Calcular
document.querySelector('.calculate').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir a submissão do formulário
    document.getElementById('modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Fechar modal e restaurar a rolagem ao clicar no botão Fechar
document.querySelector('.close-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir ações padrão, caso necessário
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Preencher dados simulados no modal ao clicar em Calcular
document.querySelector('.calculate').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir a submissão do formulário
    document.getElementById('valorBruto').textContent = 'Valor Bruto: R$' + Math.random().toFixed(2);
    document.getElementById('valorLiquido').textContent = 'Valor Líquido: R$' + Math.random().toFixed(2);
    document.getElementById('impostos').textContent = 'Impostos: R$' + Math.random().toFixed(2);
});
