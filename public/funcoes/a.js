document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = document.querySelectorAll('.currency');
    currencyInputs.forEach(input => {
        input.addEventListener('input', function(event) {
            let value = input.value.replace(/R\$ /g, '').replace(/[^0-9,]/g, '');

            let parts = value.split(',');
            if (parts.length > 2) {
                value = parts[0] + ',' + parts.slice(1).join('');
            }

            if (value) {
                if (parts.length > 1) {
                    value = `${parts[0]},${parts[1].slice(0, 2)}`;
                }
                input.value = `R$ ${value}`;
            } else {
                input.value = '';
            }

            input.setSelectionRange(input.value.length, input.value.length);
        });
    });

    const percentInput = document.getElementById('profitability');
    percentInput.addEventListener('input', function(event) {
        let value = percentInput.value.replace(/%/g, '').replace(/[^0-9,]/g, '');

        let parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }

        if (parts.length > 1) {
            value = `${parts[0]},${parts[1].slice(0, 2)}`;
        }

        if (event.inputType === "deleteContentBackward" && percentInput.selectionStart === value.length) {
            event.preventDefault();
            if (value.length > 0) {
                value = value.slice(0, -1);
                percentInput.value = (/\d/.test(value) ? value + '%' : value);
                percentInput.setSelectionRange(value.length, value.length);
            } else {
                percentInput.value = '';
            }
        } else {
            percentInput.value = (/\d/.test(value) ? value + '%' : value);
        }

        console.log('Alteração no input de percentual:', percentInput.value);
    });

    const termInput = document.getElementById('duration');
    termInput.addEventListener('keydown', function(event) {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault(); 
        }
    });

    termInput.addEventListener('input', function(event) {
        termInput.value = termInput.value.replace(/[^0-9]/g, '').slice(0, 4);
    });

    console.log(`Código completo após as alterações:
      ${document.documentElement.innerHTML}`);
});
