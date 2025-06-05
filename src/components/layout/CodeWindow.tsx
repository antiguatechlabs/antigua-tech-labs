'use client';
import { Box } from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect } from 'react';
import '@/styles/custom-highlight.css';

type CodeBlockProps = {
  language: 'html' | 'css' | 'javascript'
  code: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        p: 2,
        overflowX: 'hidden',
        fontFamily: 'monospace',
        fontSize: '1rem',
      }}
    >
      <code className={`language-${language}`}>{code}</code>
    </Box>
  );
};

type CodeWindowProps = {
  code: string
}

const CodeWindow: React.FC<CodeWindowProps> = ({
  code,
}) => (
  <Box
    sx={{
      border: '1px solid #e6e6e6',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: '"Noto Sans", sans-serif',
      mb: 4,
    }}
  >
    {/* Header with Mac buttons */}
    <Box
      sx={{
        borderBottom: '1px solid #e6e6e6',
        height: '2rem',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.25rem', position: 'absolute', left: '0.5rem' }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
      </Box>
    </Box>

    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: '1px solid #e6e6e6' }}>
        <CodeBlock
          language="html"
          code={code}
        />
      </Box>
    </Box>
  </Box>
);

export default CodeWindow;
