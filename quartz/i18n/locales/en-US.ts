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
      noBacklinksFound: "No backlinks found",
    },
    themeToggle: {
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    readerMode: {
      title: "Reader mode",
    },
    explorer: {
      title: "Explorer",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "Graph View",
    },
    recentNotes: {
      title: "Recent Notes",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclude of ${targetSlug}`,
      linkToOriginal: "Link to original",
    },
    search: {
      title: "Search",
      searchBarPlaceholder: "Search for something",
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
