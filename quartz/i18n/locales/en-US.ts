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
      title: "Table of Contents",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min read`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Recent notes",
      lastFewNotes: ({ count }) => `Last ${count} notes`,
    },
    error: {
      title: "Not Found",
      notFound: "Either this page is private or doesn't exist.",
      home: "Return to Homepage",
    },
    folderContent: {
      folder: "Folder",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item under this folder." : `${count} items under this folder.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `Showing first ${count} tags.`,
      totalTags: ({ count }) => `Found ${count} total tags.`,
    },
  },
} as const satisfies Translation
