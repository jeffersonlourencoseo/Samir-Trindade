const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// Regexes to skip: already inside markdown link [text](url)
function isInsideLink(text, index) {
  const before = text.slice(0, index);
  // Check if there's an unmatched [ after the last ]
  const lastOpen = before.lastIndexOf('[');
  const lastClose = before.lastIndexOf(']');
  if (lastOpen > lastClose) {
    // We're inside a link text, but check if there's ( after ]
    const after = text.slice(index);
    const nextClose = after.indexOf(']');
    const nextOpenParen = after.indexOf('(');
    if (nextClose !== -1 && nextOpenParen !== -1 && nextOpenParen < nextClose) {
      return true;
    }
  }
  return false;
}

// Helper: replace only in body, not frontmatter
function replaceInBody(content, regex, replacement) {
  const parts = content.split('---');
  if (parts.length < 3) return content; // No frontmatter

  const frontmatter = parts.slice(0, 2).join('---') + '---';
  let body = parts.slice(2).join('---');

  body = body.replace(regex, (match, ...args) => {
    const offset = args[args.length - 2];
    if (isInsideLink(body, offset)) return match;
    return replacement;
  });

  return frontmatter + body;
}

files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // 1. Linkar 'Sou Samir Trindade' para /sobre (apenas no corpo)
  content = replaceInBody(content, /Sou Samir Trindade/g, 'Sou [Samir Trindade](/sobre)');

  // 2. Linkar 'corretor especializado' para /sobre
  content = replaceInBody(content, /corretor especializado/g, '[corretor especializado](/sobre)');

  // 3. Linkar 'corretor acompanhante' para /sobre
  content = replaceInBody(content, /corretor acompanhante/g, '[corretor acompanhante](/sobre)');

  // 4. Linkar operadoras (apenas no corpo, primeira ocorrência de cada nome)
  // Usar replaceInBody com regex global, mas isInsideLink impede duplicação
  const operadoras = ['Unimed', 'Amil', 'Bradesco Saúde', 'Bradesco', 'SulAmérica', 'Hapvida', 'NotreDame', 'Porto Seguro', 'Prevent Senior', 'Assim Saúde'];
  operadoras.forEach(op => {
    const escaped = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?<!\\[)\\b' + escaped + '\\b(?!\\])', 'g');
    content = replaceInBody(content, regex, '[' + op + '](/servicos)');
  });

  fs.writeFileSync(fp, content);
});

console.log('Done:', files.length, 'files');
