document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = document.querySelectorAll('.currency');
    currencyInputs.forEach(input => {
      input.addEventListener('input', function() {
        let value = input.value.replace(/[^\d]/g, '');
        if (value.length > 4) {
          value = value.substring(0, 4);
        }
        value = value.padStart(4, '0');
        input.value = `R$ ${value.substring(0, 2)},${value.substring(2)}`;
      });
    });
  
    const percentInput = document.getElementById('profitability');
    percentInput.addEventListener('input', function() {
      let value = percentInput.value.replace(/[^\d,]/g, '');
      if (value.includes(',')) {
        let parts = value.split(',');
        value = parts[0] + ',' + (parts[1] ? parts[1].substring(0, 2) : '');
      }
      percentInput.value = `${value}%`;
    });
  });
  