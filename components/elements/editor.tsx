"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ code, onChange, readOnly = false }: CodeEditorProps) {
  return (
    <div className="h-full w-full border-r border-zinc-800 overflow-hidden rounded-md">
      <div className="flex items-center gap-2 bg-[#1e1e1e] px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
        <span className="text-blue-400">🐍</span>
        <span>project_source.py</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          readOnly: readOnly,
          minimap: { enabled: false }, // Saves space
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      />
    </div>
  );
}