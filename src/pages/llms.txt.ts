import { getCollection } from 'astro:content';
import { SITE_CONFIG, SITE_UPDATED } from '../data/config';
import { absUrl } from '../data/schema';

// llms.txt gerado a partir do config e das coleções, para nunca ficar desatualizado.
export async function GET() {
  const servicos = (await getCollection('servicos')).sort((a, b) => a.data.title.localeCompare(b.data.title, 'pt-BR'));
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  const a = SITE_CONFIG.address;
  const linha = (titulo: string, url: string, desc: string) => `- [${titulo}](${url}): ${desc}`;

  const texto = [
    `# ${SITE_CONFIG.shortName}, corretor de planos de saúde no Rio de Janeiro`,
    '',
    `> Corretor de planos de saúde credenciado ANS (registro ${SITE_CONFIG.ansRegister}) no Centro do Rio de Janeiro. Atende empresas, MEI e famílias, presencialmente e por WhatsApp.`,
    '',
    '## Serviços',
    '',
    ...servicos.map((s) => linha(s.data.title, absUrl(`/servicos/${s.slug}/`), s.data.description)),
    '',
    '## Blog',
    '',
    ...posts.map((p) => linha(p.data.title, absUrl(`/blog/${p.slug}/`), p.data.description)),
    '',
    '## Sobre e contato',
    '',
    linha('Sobre o corretor', absUrl('/sobre/'), 'Quem é Samir Trindade, como ele trabalha com cotação comparativa e acompanhamento depois da contratação do plano de saúde.'),
    linha('Contato', absUrl('/contato/'), 'Endereço, telefone, WhatsApp, horário de atendimento e formulário para pedir cotação de plano de saúde sem custo extra.'),
    linha('Todos os planos', absUrl('/servicos/'), 'Lista das operadoras e das páginas de plano de saúde empresarial e por operadora, atendidas pelo corretor no Rio de Janeiro.'),
    '',
    '## Contato',
    '',
    `- Nome: ${SITE_CONFIG.name}`,
    `- Endereço: ${a.street}, ${a.neighborhood}, ${a.city} - ${a.state}, CEP ${a.zip}`,
    `- Telefone e WhatsApp: ${SITE_CONFIG.telefone}`,
    `- E-mail: ${SITE_CONFIG.email}`,
    `- Horário: ${SITE_CONFIG.hours}`,
    `- Registro ANS: ${SITE_CONFIG.ansRegister}`,
    `- Instagram: ${SITE_CONFIG.social.instagram}`,
    '',
    `Última atualização: ${SITE_UPDATED}`,
    '',
  ].join('\n');

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
