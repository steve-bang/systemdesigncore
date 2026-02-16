"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

type MermaidDiagramProps = {
  chart: string;
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "neutral"
});

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const render = async () => {
      try {
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
        if (mounted) {
          setSvg(rendered);
        }
      } catch {
        if (mounted) {
          setSvg("");
        }
      }
    };

    render();

    return () => {
      mounted = false;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <pre className="overflow-x-auto rounded-2xl border border-[#1a2440] bg-[#0f172e] p-5 text-sm text-[#d8e7ff]">
        <code>{chart}</code>
      </pre>
    );
  }

  return <div className="mermaid-wrapper" dangerouslySetInnerHTML={{ __html: svg }} />;
}
