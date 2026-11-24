import resumePT from '../../docs/CV-Pedro-Henrique-PTBR.pdf';
import resumeEN from '../../docs/CV-Pedro-Henrique-EN.pdf';

const translations = {
  pt: {
    page_title: 'Pedro Henrique Peixoto — Desenvolvedor Backend',
    aria_back_top: 'Voltar ao topo',
    aria_open_menu: 'Abrir menu',
    aria_scroll_about: 'Ir para sobre',

    nav_home: 'Início',
    header_contacts_label: 'Canais de contato',
    nav_about: 'Sobre',
    nav_experience: 'Experiência',
    nav_projects: 'Projetos',
    nav_skills: 'Habilidades',
    nav_education: 'Formação',
    nav_contact: 'Contato',

    availability: 'Disponível para oportunidades',
    hero_role: 'Desenvolvedor Backend',

    hero_lede:
      'Desenvolvedor backend com foco em C#/.NET, APIs, bancos de dados, integrações e automação. Gosto de entender o problema por completo antes de escolher a tecnologia.',

    hero_cta_projects: 'Ver projetos',
    hero_cta_contact: 'Entre em contato',
    hero_location: 'Brasil · UTC−3',

    hero_stack_label: 'STACK PRINCIPAL',
    hero_stack: ['C#', '.NET', 'Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],

    deliver_eyebrow: 'O QUE EU ENTREGO',
    deliver_title: 'Como posso ajudar.',

    deliver: [
      [
        '01',
        'APIs & Backend',
        'APIs REST, serviços backend, regras de negócio, autenticação e persistência de dados.'
      ],
      [
        '02',
        'Integrações',
        'Integração entre APIs, serviços externos, sistemas de automação e diferentes camadas de uma aplicação.'
      ],
      [
        '03',
        'Banco de Dados',
        'Modelagem, SQL, PostgreSQL, MySQL e implementação de regras de negócio próximas aos dados.'
      ],
      [
        '04',
        'Automações',
        'Processamento, transformação e organização de dados para reduzir tarefas manuais e repetitivas.'
      ],
      [
        '05',
        'Sistemas Web',
        'Desenvolvimento e manutenção de aplicações web, desde o backend até a integração com interfaces.'
      ],
      [
        '06',
        'E-commerce & Plataformas',
        'Desenvolvimento, configuração, integrações e manutenção técnica de plataformas digitais.'
      ]
    ],

    about_eyebrow: 'Sobre mim',
    about_title: 'A pessoa por trás do código.',

    about_p1:
      'Sou desenvolvedor backend e estudante de Sistemas de Informação. Minha experiência envolve desenvolvimento de APIs, integrações entre sistemas, processamento de dados e automação de processos.',

    about_p2:
      'Na Impulse B2B, atuei com APIs e fluxos de processamento de dados, integrações com automações e organização de indicadores operacionais. Em projetos independentes, desenvolvo e mantenho aplicações web, blogs e e-commerces.',

    about_p3:
      'Minha base vem de fundamentos como orientação a objetos, APIs, bancos de dados e arquitetura de software. Hoje, meu principal foco de evolução é o ecossistema C#/.NET.',

    about_photo_alt: 'Pedro Henrique Peixoto',
    about_metric_1: 'Foco atual',
    about_metric_1v: 'C# / .NET',
    about_metric_2: 'Formação',
    about_metric_2v: 'Sistemas de Informação',
    about_metric_3: 'Inglês',
    about_metric_3v: 'Cambridge B2',

    experience_eyebrow: 'Trajetória profissional',
    experience_title: 'Minha jornada no desenvolvimento.',
    experience_intro:
      'Experiência profissional combinando backend, integrações, automação e desenvolvimento web independente.',

    jobs: [
      {
        n: '01',
        title: 'Estagiário de Desenvolvimento',
        company: 'Impulse B2B',
        period: 'Nov 2024 · Mar 2025',
        bullets: [
          'Desenvolvimento de APIs para recebimento e processamento de payloads provenientes de sistemas externos.',
          'Implementação de fluxos para extração, filtragem e transformação de dados no backend.',
          'Integração entre APIs, sistemas de automação e planilhas utilizadas como destino dos dados processados.',
          'Desenvolvimento de automações para coleta e organização de indicadores operacionais.',
          'Manipulação de dados relacionados a atendimentos, tempo médio de atendimento, tempo de resposta e outros indicadores.'
        ],
        tags: ['APIs', 'Automação', 'ETL', 'Integrações']
      },
      {
        n: '02',
        title: 'Desenvolvimento Independente',
        company: 'Projetos próprios e clientes',
        period: 'Atual',
        bullets: [
          'Desenvolvimento e manutenção de sites e aplicações web.',
          'Desenvolvimento e gerenciamento técnico de blogs e plataformas de conteúdo.',
          'Desenvolvimento e gerenciamento de e-commerces.',
          'Integração e configuração de serviços de terceiros.',
          'Manutenção, evolução e suporte técnico das aplicações desenvolvidas.'
        ],
        tags: ['Web', 'E-commerce', 'Integrações', 'Manutenção']
      }
    ],

    problem: 'PROBLEMA',
    solution: 'SOLUÇÃO',
    send_email: 'Enviar e-mail',

    project_cats: {
      backend: ['Back-end', 'APIs e regras de negócio: o que roda por trás da tela.'],
      frontend: ['Front-end', 'Sites e interfaces feitos para clientes.'],
      blogs: ['Portais que mantenho', 'Portais de notícias que não desenvolvi, mas de cuja parte técnica eu cuido.']
    },
    project_one: 'projeto',
    project_many: 'projetos',
    projects_eyebrow: 'Projetos',
    projects_title: 'Onde o desenvolvimento acontece.',
    projects_intro:
      'Projetos públicos construídos para demonstrar decisões de arquitetura, domínio, persistência e desenvolvimento de APIs.',

    github_cta: 'Ver GitHub ↗',
    project_open: 'Abrir repositório ↗',
    project_live: 'Abrir o site ↗',
    project_details: 'Ver detalhes',
    project_hide: 'Ocultar detalhes',

    projects: [
      {
        name: 'MedRecord',
        cat: 'backend',
        badge: 'SaaS · Backend',
        desc:
          'Plataforma de prontuário eletrônico multi-tenant para clínicas, com gestão de pacientes, agendamentos, prontuários, RBAC e auditoria.',
        problem:
          'Isolar dados entre tenants e controlar o acesso às informações clínicas por papel.',
        solution:
          'API autenticada com regras de negócio, persistência PostgreSQL, isolamento por tenant e trilha de auditoria.',
        tags: [
          'Node.js',
          'Express',
          'TypeScript',
          'PostgreSQL',
          'Drizzle ORM',
          'RBAC'
        ],
        detail:
          'Frontend React + TypeScript consumindo API Express. Persistência PostgreSQL via Drizzle ORM, autenticação/RBAC, validação, auditoria, Helmet, rate limiting, bcrypt e AES-256-GCM para segredos de integração.',
        url: 'https://github.com/pedroalmeidapeixoto/MedRecord'
      },
      {
        name: 'Library Management API',
        cat: 'backend',
        badge: 'Backend · Java',
        desc:
          'API REST para gerenciamento de usuários, livros, exemplares físicos e empréstimos, construída com Java e Spring Boot.',
        problem:
          'Modelar as operações de uma biblioteca mantendo relações e regras de empréstimo consistentes.',
        solution:
          'Arquitetura em camadas com JPA/Hibernate, PostgreSQL, procedures para devolução e cálculo de multas, validações e testes.',
        tags: [
          'Java 17',
          'Spring Boot',
          'JPA/Hibernate',
          'PostgreSQL',
          'PL/pgSQL',
          'REST'
        ],
        detail:
          'Backend organizado em controller, service, repository, DTO e entity. A lógica de devolução e cálculo de multas utiliza PL/pgSQL no PostgreSQL, com validações e testes para o comportamento principal da API.',
        url: 'https://github.com/pedroalmeidapeixoto/library-management-api'
      },
      {
        name: 'GymCore',
        cat: 'backend',
        badge: 'Backend · C# / .NET',
        desc:
          'API de gestão de academias em C# e .NET 10: alunos, personal trainers, planos, matrículas, pagamentos, treinos e avaliações físicas, com três papéis de acesso. Em desenvolvimento.',
        problem:
          'Gerir alunos, personais, planos, matrículas e pagamentos de uma academia com regras de negócio consistentes e acesso por papel.',
        solution:
          'Entidades de domínio que validam os próprios invariantes, PostgreSQL com índice único parcial para uma matrícula ativa por aluno e casos de uso testados na camada Application.',
        tags: ['C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'xUnit'],
        detail:
          'Arquitetura em camadas (Api, Application, Domain, Infrastructure) com as 13 entidades da V1 no domínio, persistência com EF Core e seed inicial. Os serviços de alunos, personal trainers, planos e matrículas já têm testes unitários (43 testes). A capa é o painel do administrador do protótipo de front-end (V4), que mostra as três visões: administrador, personal trainer e aluno.',
        url: 'https://github.com/pedroalmeidapeixoto/GymCore'
      },
      {
        name: 'Panificadora Sevylha',
        cat: 'frontend',
        badge: 'Site de cliente · Front-end',
        desc:
          'Site e pedido por WhatsApp da Panificadora Sevylha, em Campina Grande (PB): o cliente monta o pedido, ou uma ceia de Natal completa, e envia pronto para a loja.',
        problem:
          'Deixar o cliente montar o pedido, ou a ceia, pelo celular e entregar à padaria uma mensagem já organizada.',
        solution:
          'Cardápio com filtros, gaveta de pedido, montador de ceia e checkout que gera a mensagem do WhatsApp, atrás de uma interface pronta para virar API.',
        tags: ['React 19', 'TypeScript', 'Vite', 'Vitest', 'Lenis', 'WhatsApp'],
        // live: the deployed site (the repository is private, so there is no repo link)
        live: 'https://panificadora-sevylha-site.vercel.app/',
        detail:
          'Landing page responsiva em pt-BR com selo de aberto/fechado pelos horários reais, pedido salvo no navegador e montador de ceia para 6 ou 10 pessoas. O envio passa por uma interface OrderGateway (WhatsApp hoje, API depois), a lógica de pedido tem testes unitários e a página tem transições entre seções, rolagem suave e fallback para movimento reduzido.'
      },
      {
        name: 'Portal do Callado',
        cat: 'blogs',
        badge: 'Portal · Parte técnica',
        desc:
          'Portal de notícias de Brasília, Goiás e Entorno, no ar há 22 anos segundo o próprio site.',
        caseLabels: ['Meu papel', 'Por baixo do capô'],
        problem:
          'Cuido da parte técnica do portal, a plataforma em que as notícias são publicadas. A gestão das publicações não é comigo.',
        solution:
          'WordPress com o tema Newspaper (com tema filho), plugin de anúncios AdRotate, Google Site Kit, dados estruturados, Open Graph, URL canônica e feed RSS.',
        tags: ['WordPress', 'Tema Newspaper', 'AdRotate', 'Site Kit', 'SEO técnico'],
        live: 'https://portaldocallado.com.br/',
        detail:
          'Site de notícias em WordPress 7.1 com o tema Newspaper (tagDiv) e um tema filho, anúncios gerenciados pelo AdRotate e métricas pelo Google Site Kit. Para busca e compartilhamento, tem dados estruturados (JSON-LD), Open Graph, URL canônica e feed RSS, em layout responsivo. As editorias são Brasil, Brasília, Goiás & Entorno, Política, Concursos, Economia, Variedades, Blogs, Eleições e Carta do Leitor. O portal não foi desenvolvido por mim: eu cuido da parte técnica, não da gestão das publicações.'
      },
      {
        name: 'Infforma',
        cat: 'blogs',
        badge: 'Portal · Parte técnica',
        desc:
          'Portal de notícias de Brasília e do Brasil: política, economia, cidades, cultura, tecnologia e os principais acontecimentos do dia.',
        caseLabels: ['Meu papel', 'Por baixo do capô'],
        problem:
          'Cuido da parte técnica do portal, a plataforma em que as notícias são publicadas. A gestão das publicações não é comigo.',
        solution:
          'WordPress com o tema Newspaper, Google Site Kit, dados estruturados, Open Graph, URL canônica e feed RSS, em layout responsivo.',
        tags: ['WordPress', 'Tema Newspaper', 'Site Kit', 'SEO técnico', 'RSS'],
        live: 'https://infformadf.com.br/',
        detail:
          'Site de notícias em WordPress 7.1 com o tema Newspaper (tagDiv) e métricas pelo Google Site Kit. Para busca e compartilhamento, tem dados estruturados (JSON-LD), Open Graph, URL canônica e feed RSS, em layout responsivo. As editorias são Brasília, GO & Entorno, Política, Opinião, Brasil, Universo Feminino e Variedades. O portal não foi desenvolvido por mim: eu cuido da parte técnica, não da gestão das publicações.'
      }
    ],

    skills_eyebrow: 'Habilidades',
    skills_title: 'Tecnologias com as quais trabalho.',

    skill_groups: [
      [
        'Backend',
        ['C#', '.NET', 'Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs', 'JWT']
      ],
      [
        'Banco de dados',
        ['PostgreSQL', 'MySQL', 'SQL', 'JPA / Hibernate', 'Drizzle ORM', 'PL/pgSQL']
      ],
      [
        'Frontend',
        ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
      ],
      [
        'Ferramentas',
        ['Git', 'GitHub', 'Docker', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Maven']
      ],
      [
        'Fundamentos',
        [
          'POO',
          'Estruturas de dados',
          'Arquitetura de software',
          'Validação',
          'Integrações',
          'Automação'
        ]
      ]
    ],

    architecture_title: 'CLIENT → API → BACKEND → DATABASE',

    console_lines: [
      'GET /api/health 200 OK',
      'API portfolio-api · operational',
      'DATABASE PostgreSQL · not configured',
      'GITHUB API · connected'
    ],

    architecture_status_online: 'operational',
    architecture_status_checking: 'checking',
    architecture_status_offline: 'offline',
    architecture_db_configured: 'configured',
    architecture_db_not_configured: 'not configured',
    architecture_live_label: 'LIVE HEALTH CHECK',
    architecture_checked_at: 'checked',

    education_eyebrow: 'Formação',
    education_title: 'Construindo a base.',

    education: [
      ['2024 · Atual', 'Sistemas de Informação', 'UNIFACISA'],
      ['Em andamento', 'C# e .NET', 'Estudo contínuo e desenvolvimento de projetos'],
      ['B2', 'Inglês', 'Cambridge English']
    ],

    contact_eyebrow: 'Contato',
    contact_title: 'Vamos construir novos projetos juntos!',

    contact_intro:
      'Estou aberto a oportunidades como desenvolvedor backend. Se você tem um projeto, oportunidade ou problema técnico, vamos conversar.',

    email: 'pedroalmeidapeixoto@gmail.com',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    resume: 'Currículo',

    form_name: 'Nome',
    form_contact: 'E-mail ou telefone',
    form_message: 'Mensagem',

    form_name_ph: 'Seu nome',
    form_contact_ph: 'seuemail@exemplo.com ou telefone',
    form_message_ph:
      'Olá, Pedro! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.',

    form_submit: 'Enviar mensagem',
    form_note: 'O formulário abre seu cliente de e-mail padrão via mailto:.',
    status: 'Disponível para oportunidades',
    footer_role: 'Desenvolvedor Backend',

    resume_label: 'CURRÍCULO',
    resume_title: 'Currículo profissional',
    resume_subtitle: 'Escolha a versão em português ou inglês.',

    resume_pt: 'PT-BR',
    resume_en: 'EN',

    // CORREÇÃO DOS CURRÍCULOS
    resume_file: {
      pt: resumePT,
      en: resumeEN
    },

    phone: '(83) 98659-0715',

    footer_copy:
      '© 2026 Pedro Henrique Peixoto. Todos os direitos reservados.'
  },

  en: {}
};

Object.assign(translations.pt, {
  api_kicker: 'API Client',
  api_title: 'A API deste portfólio, rodando ao vivo.',
  api_intro: 'Isto não é uma imagem: é a API que eu escrevi, em produção. Enquanto você lê, esta página chama a rota /api/projects com GET, POST, PATCH e DELETE, grava e apaga um registro de verdade no PostgreSQL e mostra aqui cada resposta.',
  api_connected: 'conectado',
  api_unavailable: 'indisponível',
  api_flow_client: 'navegador',
  api_flow_service: 'camada de serviço',
  api_live: 'AO VIVO',
  api_request: 'REQUISIÇÃO',
  api_logs: 'registros',
  api_status: 'Status HTTP',
  api_time: 'Tempo de resposta',
  api_waiting: 'aguardando',
  api_cycle: 'Sequência de requisições',
  api_note: 'Cada ciclo cria um registro de teste (POST), altera (PATCH), lê (GET) e apaga (DELETE), sem deixar nada para trás.',
  api_history: 'Histórico',
  api_history_hint: 'últimas 6 respostas',
  api_col_time: 'Hora',
  api_col_method: 'Método',
  api_col_route: 'Rota',
  api_col_status: 'Status',
  projects_hint: 'Role para ver os projetos',
  manifesto_label: 'Como eu trabalho',
  manifesto: 'Gosto de entender o problema por completo antes de escolher a tecnologia.',
  journey_eyebrow: 'Como uma API funciona',
  journey_title: 'Uma requisição, de ponta a ponta.',
  journey_steps: [
    ['Cliente', 'A requisição sai do navegador ou do app, com método, rota e dados.'],
    ['API', 'A rota recebe, valida os dados e confere autenticação e permissões.'],
    ['Serviço', 'As regras de negócio ficam aqui, separadas da camada HTTP.'],
    ['Banco de dados', 'O PostgreSQL grava os dados e a resposta volta ao cliente com o status certo.']
  ]
});

translations.en = {
  ...translations.pt,

  page_title: 'Pedro Henrique Peixoto — Backend Developer',

  aria_back_top: 'Back to top',
  aria_open_menu: 'Open menu',
  aria_scroll_about: 'Go to about',

  nav_home: 'Home',
  nav_about: 'About',
  nav_experience: 'Experience',
  nav_projects: 'Projects',
  nav_skills: 'Skills',
  nav_education: 'Education',
  nav_contact: 'Contact',

  availability: 'Open to opportunities',
  hero_role: 'Backend Developer',

  hero_lede:
    'Backend developer focused on C#/.NET, APIs, databases, integrations and automation. I like understanding the whole problem before choosing the technology.',

  hero_cta_projects: 'View projects',
  hero_cta_contact: 'Get in touch',
  hero_location: 'Brazil · UTC−3',

  hero_stack_label: 'CORE STACK',

  deliver_eyebrow: 'WHAT I DELIVER',
  deliver_title: 'How I can help.',

  deliver: translations.pt.deliver.map(([n, t, d]) => [
    n,
    ({
      'APIs & Backend': 'APIs & Backend',
      Integrações: 'Integrations',
      'Banco de Dados': 'Databases',
      Automações: 'Automation',
      'Sistemas Web': 'Web Systems',
      'E-commerce & Plataformas': 'E-commerce & Platforms'
    })[t] || t,
    ({
      'APIs & Backend':
        'REST APIs, backend services, business rules, authentication and data persistence.',
      Integrações:
        'Integration between APIs, external services, automation systems and application layers.',
      'Banco de Dados':
        'Modeling, SQL, PostgreSQL, MySQL and business rules implemented close to the data.',
      Automações:
        'Processing, transforming and organizing data to reduce manual and repetitive tasks.',
      'Sistemas Web':
        'Development and maintenance of web applications, from backend services to interface integration.',
      'E-commerce & Plataformas':
        'Development, configuration, integrations and technical maintenance of digital platforms.'
    })[t] || d
  ]),

  about_eyebrow: 'About me',
  about_title: 'The person behind the code.',

  about_p1:
    'I am a backend developer and Information Systems student. My experience includes API development, system integrations, data processing and process automation.',

  about_p2:
    'At Impulse B2B, I worked with APIs and data-processing flows, integrations with automation systems and operational indicators. In independent projects, I develop and maintain web applications, blogs and e-commerce stores.',

  about_p3:
    'My foundation comes from object-oriented programming, APIs, databases and software architecture. My current growth focus is the C#/.NET ecosystem.',

  about_photo_alt: 'Pedro Henrique Peixoto',

  about_metric_1: 'Current focus',
  about_metric_1v: 'C# / .NET',
  about_metric_2: 'Education',
  about_metric_2v: 'Information Systems',
  about_metric_3: 'English',
  about_metric_3v: 'Cambridge B2',

  experience_eyebrow: 'Professional journey',
  experience_title: 'My journey in development.',
  experience_intro:
    'Professional experience combining backend, integrations, automation and independent web development.',

  jobs: [
    {
      ...translations.pt.jobs[0],
      title: 'Development Intern',
      company: 'Impulse B2B',
      period: 'Nov 2024 · Mar 2025',
      bullets: [
        'Developed APIs to receive and process payloads from external systems.',
        'Implemented backend flows for extracting, filtering and transforming data.',
        'Integrated APIs, automation systems and spreadsheets used as destinations for processed data.',
        'Built automations for collecting and organizing operational indicators.',
        'Handled service-ticket data, average handling time, response time and other indicators.'
      ]
    },
    {
      ...translations.pt.jobs[1],
      title: 'Independent Development',
      company: 'Own projects and clients',
      period: 'Current',
      bullets: [
        'Development and maintenance of websites and web applications.',
        'Technical development and management of blogs and content platforms.',
        'Development and management of e-commerce stores.',
        'Integration and configuration of third-party services.',
        'Maintenance, evolution and technical support for applications.'
      ]
    }
  ],

  problem: 'PROBLEM',
  solution: 'SOLUTION',
  send_email: 'Send email',

  projects_eyebrow: 'Projects',
  projects_title: 'Where development happens.',
  projects_intro:
    'Public projects built to demonstrate architecture, domain, persistence and API development decisions.',

  github_cta: 'View GitHub ↗',
  project_open: 'Open repository ↗',
  project_live: 'Open the website ↗',
  project_details: 'View details',
  project_hide: 'Hide details',

  projects: [
    {
      ...translations.pt.projects[0],
      badge: 'SaaS · Backend',
      desc:
        'Multi-tenant electronic medical record platform for clinics, with patient management, appointments, medical records, RBAC and auditing.',
      problem:
        'Isolate tenant data and control access to clinical information by role.',
      solution:
        'Authenticated API with business rules, PostgreSQL persistence, tenant isolation and audit trail.',
      detail:
        'React + TypeScript frontend consuming an Express API. PostgreSQL persistence through Drizzle ORM, authentication/RBAC, validation, auditing, Helmet, rate limiting, bcrypt and AES-256-GCM for integration secrets.'
    },
    {
      ...translations.pt.projects[1],
      badge: 'Backend · Java',
      desc:
        'REST API for managing users, books, physical copies and loans, built with Java and Spring Boot.',
      problem:
        'Model library operations while keeping relationships and loan rules consistent.',
      solution:
        'Layered architecture with JPA/Hibernate, PostgreSQL, procedures for returns and fine calculation, validation and tests.',
      detail:
        'Backend organized into controller, service, repository, DTO and entity. Return and fine-calculation logic uses PL/pgSQL in PostgreSQL, with validation and tests for core API behavior.'
    },
    {
      ...translations.pt.projects[2],
      badge: 'Backend · C# / .NET',
      desc:
        'Gym management API in C# and .NET 10: students, personal trainers, plans, enrollments, payments, workouts and physical assessments, with three access roles. In development.',
      problem:
        "Manage a gym's students, trainers, plans, enrollments and payments with consistent business rules and role-based access.",
      solution:
        'Domain entities that validate their own invariants, PostgreSQL with a partial unique index for one active enrollment per student, and use cases tested in the Application layer.',
      detail:
        'Layered architecture (Api, Application, Domain, Infrastructure) with the 13 V1 entities in the domain, EF Core persistence and initial seed data. The student, personal trainer, plan and enrollment services already have unit tests (43 tests). The cover is the administrator dashboard of the front-end prototype (V4), which shows the three views: administrator, personal trainer and student.'
    },
    {
      ...translations.pt.projects[3],
      badge: 'Client site · Front-end',
      desc:
        'Website and WhatsApp ordering for Panificadora Sevylha, a bakery in Campina Grande (PB): customers build an order, or a full Christmas dinner, and send it ready to the store.',
      problem:
        'Let customers build an order, or the dinner, on their phone and hand the bakery an already organized message.',
      solution:
        'Menu with filters, an order drawer, a dinner builder and a checkout that writes the WhatsApp message, behind an interface ready to become an API.',
      detail:
        'Responsive pt-BR landing page with an open/closed badge from the real opening hours, an order saved in the browser and a dinner builder for 6 or 10 people. Delivery goes through an OrderGateway interface (WhatsApp today, an API later), the order logic is unit-tested, and the page has section transitions, smooth scrolling and a reduced-motion fallback.'
    },
    {
      ...translations.pt.projects[4],
      badge: 'Portal · Technical side',
      desc:
        'News portal for Brasília, Goiás and the surrounding area, online for 22 years according to the site itself.',
      caseLabels: ['My role', 'Under the hood'],
      tags: ['WordPress', 'Newspaper theme', 'AdRotate', 'Site Kit', 'Technical SEO'],
      problem:
        'I take care of the technical side of the portal, the platform the news is published on. Managing the posts is not my job.',
      solution:
        'WordPress with the Newspaper theme (plus a child theme), the AdRotate ad plugin, Google Site Kit, structured data, Open Graph, canonical URLs and an RSS feed.',
      detail:
        'WordPress 7.1 news site with the Newspaper theme (tagDiv) and a child theme, ads managed by AdRotate and metrics through Google Site Kit. For search and sharing it has structured data (JSON-LD), Open Graph, canonical URLs and an RSS feed, in a responsive layout. Sections: Brasil, Brasília, Goiás & Entorno, Política, Concursos, Economia, Variedades, Blogs, Eleições and Carta do Leitor. I did not build the portal: I take care of the technical side, not of managing the posts.'
    },
    {
      ...translations.pt.projects[5],
      badge: 'Portal · Technical side',
      desc:
        'News portal for Brasília and Brazil: politics, economy, cities, culture, technology and the main events of the day.',
      caseLabels: ['My role', 'Under the hood'],
      tags: ['WordPress', 'Newspaper theme', 'Site Kit', 'Technical SEO', 'RSS'],
      problem:
        'I take care of the technical side of the portal, the platform the news is published on. Managing the posts is not my job.',
      solution:
        'WordPress with the Newspaper theme, Google Site Kit, structured data, Open Graph, canonical URLs and an RSS feed, in a responsive layout.',
      detail:
        'WordPress 7.1 news site with the Newspaper theme (tagDiv) and metrics through Google Site Kit. For search and sharing it has structured data (JSON-LD), Open Graph, canonical URLs and an RSS feed, in a responsive layout. Sections: Brasília, GO & Entorno, Política, Opinião, Brasil, Universo Feminino and Variedades. I did not build the portal: I take care of the technical side, not of managing the posts.'
    }
  ],

  skills_eyebrow: 'Skills',
  skills_title: 'Technologies I work with.',

  skill_groups: [
    [
      'Backend',
      ['C#', '.NET', 'Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs', 'JWT']
    ],
    [
      'Databases',
      ['PostgreSQL', 'MySQL', 'SQL', 'JPA / Hibernate', 'Drizzle ORM', 'PL/pgSQL']
    ],
    [
      'Frontend',
      ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
    ],
    [
      'Tools',
      ['Git', 'GitHub', 'Docker', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Maven']
    ],
    [
      'Fundamentals',
      [
        'OOP',
        'Data structures',
        'Software architecture',
        'Validation',
        'Integrations',
        'Automation'
      ]
    ]
  ],

  architecture_title: 'CLIENT → API → BACKEND → DATABASE',

  console_lines: [
    'GET /api/health 200 OK',
    'API portfolio-api · operational',
    'DATABASE PostgreSQL · not configured',
    'GITHUB API · connected'
  ],

  architecture_status_online: 'operational',
  architecture_status_checking: 'checking',
  architecture_status_offline: 'offline',
  architecture_db_configured: 'configured',
  architecture_db_not_configured: 'not configured',
  architecture_live_label: 'LIVE HEALTH CHECK',
  architecture_checked_at: 'checked',

  education_eyebrow: 'Education',
  education_title: 'Building the foundation.',

  education: [
    ['2024 · Current', 'Information Systems', 'UNIFACISA'],
    ['In progress', 'C# and .NET', 'Continuous study and project development'],
    ['B2', 'English', 'Cambridge English']
  ],

  contact_eyebrow: 'Contact',
  contact_title: 'Let’s build new projects together!',

  contact_intro:
    'I am open to backend development opportunities. If you have a project, opportunity or technical problem, let’s talk.',

  email: 'pedroalmeidapeixoto@gmail.com',
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
  github: 'GitHub',

  form_name: 'Name',
  form_contact: 'Email or phone',
  form_message: 'Message',

  form_name_ph: 'Your name',
  form_contact_ph: 'you@company.com or phone',
  form_message_ph:
    'Hi, Pedro! I saw your portfolio and would like to talk about an opportunity.',

  form_submit: 'Send message',
  form_note: 'The form opens your default email client via mailto:.',

  status: 'Open to opportunities',
  footer_role: 'Backend Developer',

  header_contacts_label: 'Contact channels',

  resume_label: 'RESUME',
  resume_title: 'Professional resume',
  resume_subtitle: 'Choose the Portuguese or English version.',

  resume_pt: 'PT-BR',
  resume_en: 'EN',

  phone: '(83) 98659-0715',

  footer_copy:
    '© 2026 Pedro Henrique Peixoto. All rights reserved.'
};

Object.assign(translations.en, {
  api_kicker: 'API Client',
  api_title: "This portfolio's API, running live.",
  api_intro: 'This is not an image: it is the API I wrote, in production. While you read, this page calls the /api/projects route with GET, POST, PATCH and DELETE, writes and deletes a real record in PostgreSQL and shows every response here.',
  api_connected: 'connected',
  api_unavailable: 'unavailable',
  api_flow_client: 'browser',
  api_flow_service: 'service layer',
  api_live: 'LIVE',
  api_request: 'REQUEST',
  api_logs: 'logs',
  api_status: 'HTTP status',
  api_time: 'Response time',
  api_waiting: 'waiting',
  api_cycle: 'Request sequence',
  api_note: 'Each cycle creates a test record (POST), updates it (PATCH), reads it (GET) and deletes it (DELETE), leaving nothing behind.',
  api_history: 'History',
  api_history_hint: 'last 6 responses',
  api_col_time: 'Time',
  api_col_method: 'Method',
  api_col_route: 'Route',
  api_col_status: 'Status',
  project_cats: {
    backend: ['Back-end', 'APIs and business rules: what runs behind the screen.'],
    frontend: ['Front-end', 'Websites and interfaces built for clients.'],
    blogs: ['Portals I maintain', 'News portals I did not build, but whose technical side I take care of.']
  },
  project_one: 'project',
  project_many: 'projects',
  projects_hint: 'Scroll to see the projects',
  manifesto_label: 'How I work',
  manifesto: 'I like understanding the whole problem before choosing the technology.',
  journey_eyebrow: 'How an API works',
  journey_title: 'One request, end to end.',
  journey_steps: [
    ['Client', 'The request leaves the browser or the app, with a method, a route and data.'],
    ['API', 'The route receives it, validates the data and checks authentication and permissions.'],
    ['Service', 'The business rules live here, apart from the HTTP layer.'],
    ['Database', 'PostgreSQL stores the data and the response goes back to the client with the right status.']
  ]
});

export { translations };