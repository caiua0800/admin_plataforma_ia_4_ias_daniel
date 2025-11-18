// src/components/Markdown/CodeBlock.tsx
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Escolhi o tema 'vscDarkPlus' que é igual ao VS Code, bem bonito
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import * as S from './CodeBlock.styles';

interface CodeBlockProps {
  language: string;
  value: string;
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Language>{language || 'Texto'}</S.Language>
        <S.CopyButton onClick={handleCopy}>
          {isCopied ? (
            <>
              <CheckIcon /> Copiado!
            </>
          ) : (
            <>
              <ClipboardDocumentIcon /> Copiar
            </>
          )}
        </S.CopyButton>
      </S.Header>
      <S.CodeWrapper>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          wrapLines={true}
          wrapLongLines={true}
        >
          {value}
        </SyntaxHighlighter>
      </S.CodeWrapper>
    </S.Container>
  );
}