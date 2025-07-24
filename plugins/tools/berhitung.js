exports.default = {
   names: ['Kalkulator'],
   tags: ['sumar', 'restar', 'multiplicar', 'dividir'],
   command: ['sumar', 'restar', 'multiplicar', 'dividir'],
   start: (m, { prefix, text, command }) => {
      if (!text) return m.reply(`Uso correcto: ${prefix + command} <número1> <número2>\nEjemplo: ${prefix + command} 5 3`);
      
      const [num1, num2] = text.split(' ').map(Number);
      if (isNaN(num1) || isNaN(num2)) return m.reply(`Solo se aceptan números\nEjemplo: ${prefix + command} 5 3`);
      
      let resultado;
      if (command === 'sumar') resultado = num1 + num2;
      if (command === 'restar') resultado = num1 - num2;
      if (command === 'multiplicar') resultado = num1 * num2;
      if (command === 'dividir') resultado = num2 !== 0 ? num1 / num2 : 'No se puede dividir entre 0';

      m.reply(`「📊」Resultado: *${resultado}*`);
   },
   premium: false
};