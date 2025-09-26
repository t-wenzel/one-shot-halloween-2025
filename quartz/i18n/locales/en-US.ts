import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sem título",
    description: "Nenhuma descrição providenciada",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Resumo",
      info: "Info",
      todo: "Todo",
      tip: "Dica",
      success: "Successo",
      question: "Pergunta",
      warning: "Aviso",
      failure: "Falha",
      danger: "Perigo",
      bug: "Bug",
      example: "Exemplo",
      quote: "Citação",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "Nenhum backlink encontrado",
    },
    themeToggle: {
      lightMode: "Modo claro",
      darkMode: "Modo escuro",
    },
    readerMode: {
      title: "Modo leitor",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Criado com",
    },
    graph: {
      title: "Tela de gráfico",
    },
    recentNotes: {
      title: "Notas recentes",
      seeRemainingMore: ({ remaining }) => `Veja mais ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclusão de ${targetSlug}`,
      linkToOriginal: "Link para o original",
    },
    search: {
      title: "Buscar",
      searchBarPlaceholder: "Buscar por algo",
    },
    tableOfContents: {
      title: "Tabela de Conteúdos",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `Leitura de ${minutes} minutos`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notas recentes",
      lastFewNotes: ({ count }) => `Últimas ${count} notas`,
    },
    error: {
      title: "Não encontrado",
      notFound: "Essa página é privada ou não existe.",
      home: "Retornar à Home",
    },
    folderContent: {
      folder: "Pasta",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item dentro desta pasta." : `${count} itens dentro desta pasta.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Índice da Tag",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item com esta tag." : `${count} itens com esta tag.`,
      showingFirst: ({ count }) => `Mostrando as primeiras ${count} tags.`,
      totalTags: ({ count }) => `Total de ${count} notas encontradas.`,
    },
  },
} as const satisfies Translation
