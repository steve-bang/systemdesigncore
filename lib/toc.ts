import GithubSlugger from "github-slugger";

export function extractToc(source: string): Array<{ id: string; title: string; level: 2 | 3 }> {
  const slugger = new GithubSlugger();
  const lines = source.split("\n");

  return lines
    .map((line) => line.match(/^(##|###)\s+(.*)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const level = match[1] === "##" ? 2 : 3;
      const title = match[2].trim();

      return {
        id: slugger.slug(title),
        title,
        level
      } as const;
    });
}
