// Fonte única dos dados da empresa (NAP, contato, geo, autor, GA4).
// Tudo no site lê daqui. Dados conferidos com o "GEOSETTER DADOS.txt" do cliente.

const whatsapp = '5521964625163';
const whatsappMensagem = 'Olá, gostaria de saber mais informações sobre plano de saúde.';
const whatsappLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMensagem)}`;

export const SITE_CONFIG = {
  name: 'Samir Trindade — Consultor de Planos de Saúde',
  shortName: 'Samir Trindade',
  nicho: 'plano de saúde',
  domain: 'https://www.planodesaudenorio.com.br',
  description:
    'Corretor credenciado ANS especializado em planos de saúde empresariais, MEI e familiares no Rio de Janeiro. Mais de 10 operadoras, atendimento presencial e online.',
  email: 'samirtrindade1983@gmail.com',
  phone: '(21) 96462-5163',
  phoneRaw: '5521964625163',
  telefone: '+55 21 96462-5163',
  telefoneLink: 'tel:+5521964625163',
  whatsapp,
  whatsappMensagem,
  whatsappLink,
  address: {
    street: 'Avenida Rio Branco, 108, 21º andar',
    neighborhood: 'Centro',
    city: 'Rio de Janeiro',
    state: 'RJ',
    stateFull: 'Rio de Janeiro',
    zip: '20040-001',
    country: 'BR',
  },
  geo: {
    latitude: -22.90398157414969,
    longitude: -43.17894073613387,
  },
  ansRegister: '73719199730',
  hours: 'Segunda a sexta das 8h às 19h. Sábado das 8h às 15h.',
  // Bairros/cidades atendidos citados no briefing do cliente (Centro do Rio e região)
  areaServed: ['Rio de Janeiro', 'Duque de Caxias', 'Nova Iguaçu', 'São João de Meriti', 'Belford Roxo', 'Nilópolis', 'Mesquita'],
  social: {
    instagram: 'https://www.instagram.com/samir_trindade_oficial/',
  },
  author: 'Samir Trindade',
  authorBio:
    'Corretor de planos de saúde credenciado ANS (registro 73719199730), com escritório no Centro do Rio de Janeiro. Atende empresas, MEI e famílias e acompanha o contrato depois da venda.',
  maps: 'https://maps.app.goo.gl/gowgcwBiBtbi5EKd7',
  ogImage: '/og-image.jpg',
  ogImageSize: { width: 1200, height: 630 },
  // ID de medição do GA4 (propriedade "Plano de Saúde Samir Trindade").
  ga4Id: 'G-KH3RB77HEF',
};

export const whatsappUrl = whatsappLink;

// Data de atualização do conteúdo institucional (usada no sitemap e no schema)
export const SITE_UPDATED = '2026-11-03';
