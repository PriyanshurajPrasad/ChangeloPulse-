import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText } from 'lucide-react';

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <FileText className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Detailed Release Notes
        </h3>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-6 mb-3" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 border-b pb-2 border-slate-100 dark:border-slate-800" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside space-y-1.5 pl-2 my-3 text-slate-600 dark:text-slate-300" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside space-y-1.5 pl-2 my-3 text-slate-600 dark:text-slate-300" {...props} />
            ),
            code: ({ node, inline, ...props }) => (
              inline ? (
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold" {...props} />
              ) : (
                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 overflow-x-auto font-mono text-xs my-4 border border-slate-800">
                  <code {...props} />
                </pre>
              )
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="pl-4 border-l-4 border-indigo-500 italic text-slate-600 dark:text-slate-400 my-4" {...props} />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
}
