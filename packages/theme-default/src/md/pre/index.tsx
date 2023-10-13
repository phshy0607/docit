import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { BaseProps } from "@/types";

interface CodeChildren {
  props: {
    children: string;
    className: `language-${string}`;
  };
}

const fixLang = (lang: string) => {
  if (SyntaxHighlighter.supportedLanguages.includes(lang)) {
    return lang;
  }

  if (lang === "sh") {
    return "bash";
  }
  if (lang === "rs") {
    return "rust";
  }
  if (lang === "js") {
    return "javascript";
  }
  if (lang === "ts") {
    return "typescript";
  }

  // Fallback to javascript
  return "javascript";
};

export const Pre: React.FC<BaseProps> = (props) => {
  const { children } = props;
  console.log(props);
  const codeChild = children as CodeChildren;
  const codeString = codeChild?.props?.children;
  const language = (codeChild?.props?.className || "").replace("language-", "");

  return (
    codeString?.trim() && (
      <SyntaxHighlighter language={fixLang(language)} style={codeStyle} showLineNumbers wrapLines>
        {codeString?.trim()}
      </SyntaxHighlighter>
    )
  );
};