const SEED_PLACES = [
    {
        id: "riosul-ecoponto",
        name: "Ecoponto RIOSUL (G4)",
        category: "Shopping",
        address: "Shopping RIOSUL, Rua Lauro Müller 116, Botafogo, Rio de Janeiro - RJ",
        hours: "Diariamente (horário do shopping)",
        infoUrl: "https://www.instagram.com/p/C5n0DpVunsp/",
        lat: -22.9462,
        lng: -43.1804
    },
    {
        id: "nova-america-coleta",
        name: "Coleta Seletiva — Shopping Nova América",
        category: "Shopping",
        address: "Shopping Nova América, Av. Pastor Martin Luther King Jr, 126 - Del Castilho, Rio de Janeiro - RJ",
        infoUrl: "https://www.novaamerica.com.br/projeto/coleta-seletiva",
        lat: -22.8769,
        lng: -43.2648
    },
    {
        id: "pev-tijuca",
        name: "PEV Tijuca — Resíduos (inclui e-lixo)",
        category: "PEV",
        address: "Rua Dr. Renato Rocco, 400 - Tijuca, Rio de Janeiro - RJ",
        infoUrl: "https://www.1746.rio/hc/pt-br/articles/10734710270747-Informações-sobre-os-postos-de-entrega-voluntária-de-materiais",
        lat: -22.9286,
        lng: -43.2343
    },
    {
        id: "pev-penha",
        name: "PEV Penha — Resíduos (inclui e-lixo)",
        category: "PEV",
        address: "Rua Merindiba, s/n - Penha, Rio de Janeiro - RJ",
        infoUrl: "https://www.1746.rio/hc/pt-br/articles/10734710270747-Informações-sobre-os-postos-de-entrega-voluntária-de-materiais",
        lat: -22.8436,
        lng: -43.2835
    },
    {
        id: "pev-bangu",
        name: "PEV Bangu — Resíduos (inclui e-lixo)",
        category: "PEV",
        address: "Rua Roque Barbosa, 348 - Vila Catiri, Bangu, Rio de Janeiro - RJ",
        infoUrl: "https://www.1746.rio/hc/pt-br/articles/10734710270747-Informações-sobre-os-postos-de-entrega-voluntária-de-materiais",
        lat: -22.8833,
        lng: -43.4719
    },
    {
        id: "real-grandeza",
        name: "Ponto de Coleta — Real Grandeza (Botafogo)",
        category: "Instituição",
        address: "Rua Mena Barreto, 143 - Botafogo, Rio de Janeiro - RJ",
        infoUrl: "https://www.frg.com.br/quem-somos/comunicacao-e-informativos/novidades-e-destaques/real-grandeza-possui-ponto-de-coleta-de-lixo-eletronico-7424.html",
        lat: -22.9508,
        lng: -43.1869
    },
    {
        id: "freguesia-ecoponto",
        name: "Ecoponto Eletrônicos — Freguesia (Jacarepaguá)",
        category: "Shopping",
        address: "Estrada dos Três Rios, 200 - Freguesia, Rio de Janeiro - RJ",
        infoUrl: "https://diariodorio.com/freguesia-na-zona-oeste-do-rio-recebe-ecoponto-para-descarte-de-eletronicos/",
        lat: -22.9394,
        lng: -43.3472
    },
    {
        id: "sesc-copacabana",
        name: "Sesc Copacabana — Ponto de E-lixo",
        category: "Sesc",
        address: "Sesc Copacabana, Rio de Janeiro - RJ",
        infoUrl: "https://www.sescrio.org.br/noticias/sustentabilidade/lixo-eletronico-10-unidades-do-sesc-rj-passam-a-ser-ponto-de-entrega-de-eletroeletronicos/",
        lat: -22.9714,
        lng: -43.1826
    }
];

let state = {
    places: [],
    filteredPlaces: [],
    activePlace: null,
    loadingIds: [],
    map: null,
    markers: {}
};
