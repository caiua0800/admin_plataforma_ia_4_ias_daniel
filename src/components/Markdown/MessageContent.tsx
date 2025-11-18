// src/components/Markdown/MessageContent.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 1. Importar o plugin de tabelas
import { CodeBlock } from './CodeBlock';
import { TableBlock } from './TableBlock'; // 2. Importar nosso bloco de tabela
import styled from 'styled-components';

// ... (StyledMarkdown permanece igual)
const StyledMarkdown = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e2e8f0;

  p {
    margin-bottom: 12px;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 12px;
  }

  li {
    margin-bottom: 4px;
  }

  a {
    color: #818cf8;
    text-decoration: underline;
  }

  strong {
    font-weight: 700;
    color: #fff;
  }
  
  code:not(pre code) {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85em;
    color: #fb7185;
  }
`;

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  return (
    <StyledMarkdown>
      <ReactMarkdown
        // 3. Adicionar o plugin aqui para habilitar tabelas, autolinks, strikethrough, etc.
        remarkPlugins={[remarkGfm]} 
        
        components={{
          // 4. Mapear a tag 'table' para nosso componente TableBlock
          table: ({ children }) => (
            <TableBlock>{children}</TableBlock>
          ),
          // Como o TableBlock já renderiza o <table> dentro dele como 'StyledTable',
          // precisamos garantir que 'thead', 'tbody', etc. sejam passados corretamente.
          // O react-markdown faz isso automaticamente através do children.

          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, '')}
                />
              );
            }
            if (!inline) {
                return (
                    <CodeBlock
                      language="text"
                      value={String(children).replace(/\n$/, '')}
                    />
                  );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </StyledMarkdown>
  );
}