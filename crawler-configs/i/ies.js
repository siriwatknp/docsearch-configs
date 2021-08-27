new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: [
    "https://ies-ingredients.com/en/produit/",
    "https://ies-ingredients.com/",
    "https://ies-ingredients.com/produit/",
    "https://ies-ingredients.com/equipe/",
  ],
  renderJavaScript: false,
  sitemaps: ["https://ies-ingredients.com/sitemap.xml"],
  exclusionPatterns: ["**/**?**", "**/**?**/**"],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://ies-ingredients.com/**"],
  schedule: "at 15:00 on Wednesday",
  actions: [
    {
      indexName: "ies",
      pathsToMatch: ["https://ies-ingredients.com/en/produit/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".prodsuggest";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".post-type-page h2, .prodnom h2",
            content: ".flexfull .span p, .flexitem p span, .pad li",
            lvl0: {
              selectors: "",
              defaultValue: "Produit",
            },
            lvl2: ".post-type-page h1, .prodnom h1",
            lvl3: ".prodinfo > div > p",
            lang: "",
            tags: {
              defaultValue: ["produit"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "ies",
      pathsToMatch: ["https://ies-ingredients.com/produit/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".prodsuggest";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".post-type-page h2, .prodnom h2",
            content: ".flexfull .span p, .flexitem p span, .pad li",
            lvl0: {
              selectors: "",
              defaultValue: "Produit",
            },
            lvl2: ".post-type-page h1, .prodnom h1",
            lvl3: ".prodinfo > div > p",
            lang: "",
            tags: {
              defaultValue: ["produit"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "ies",
      pathsToMatch: ["https://ies-ingredients.com/equipe/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".prodsuggest";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".equipes h3",
            content: ".flexitem p",
            lvl0: {
              selectors: "",
              defaultValue: "Equipe",
            },
            lvl2: ".flexitem span",
            lang: "",
            tags: {
              defaultValue: ["team"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "ies",
      pathsToMatch: [
        "https://ies-ingredients.com/**",
        "!https://ies-ingredients.com/en/produit/**",
        "!https://ies-ingredients.com/produit/**",
        "!https://ies-ingredients.com/equipe/**",
      ],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".prodsuggest";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".post-type-page h2",
            content: ".post-type-page p, .post-type-page li",
            lvl0: {
              selectors: ".post-type-page h1",
            },
            lvl2: ".post-type-page h3",
            lvl3: ".post-type-page h4",
            lvl4: ".post-type-page h5",
            lvl5: ".post-type-page h6",
            lang: "",
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    ies: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.page_rank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});