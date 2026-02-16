import type { ReactNode } from "react";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { compileMdx } from "@/lib/mdx";

type MarkdownProps = {
  source: string;
};

type CodeElement = {
  props?: {
    className?: string;
    children?: string;
  };
};

export async function Markdown({ source }: MarkdownProps) {
  const content = await compileMdx(source, {
    pre: ({ children, ...props }: { children?: CodeElement; [key: string]: unknown }) => {
      const className = children?.props?.className ?? "";

      if (className.includes("language-mermaid")) {
        const chart = String(children?.props?.children ?? "").trim();
        return <MermaidDiagram chart={chart} />;
      }

      return <pre {...props}>{children as ReactNode}</pre>;
    }
  });

  return <article className="prose-ui">{content}</article>;
}
