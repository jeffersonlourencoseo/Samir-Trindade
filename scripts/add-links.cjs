const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // 1. Linkar 'Sou Samir Trindade' para /sobre (apenas na bio final)
  content = content.replace(/Sou Samir Trindade/g, 'Sou [Samir Trindade](/sobre)');

  // 2. Linkar 'corretor especializado' para /sobre
  content = content.replace(/um corretor especializado/g, 'um [corretor especializado](/sobre)');
  content = content.replace(/corretor especializado/g, '[corretor especializado](/sobre)');

  // 3. Linkar 'corretor acompanhante' para /sobre
  content = content.replace(/um corretor acompanhante/g, 'um [corretor acompanhante](/sobre)');
  content = content.replace(/corretor acompanhante/g, '[corretor acompanhante](/sobre)');

  // 4. Linkar operadoras (primeira ocorrência de cada, evitando duplicar links já existentes)
  const operadoras = ['Unimed', 'Amil', 'Bradesco Saúde', 'Bradesco', 'SulAmérica', 'Hapvida', 'NotreDame', 'Porto Seguro', 'Prevent Senior', 'Assim Saúde'];
  operadoras.forEach(op => {
    // Só substitui se ainda não estiver entre colchetes de link markdown
    const escaped = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?<!\\[)\\b' + escaped + '\\b(?!\\])', 'g');
    content = content.replace(regex, '[' + op + '](/servicos)');
  });

  fs.writeFileSync(fp, content);
});

console.log('Done:', files.length, 'files');
