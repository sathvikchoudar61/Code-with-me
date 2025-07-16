import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const DEFAULT_CODE = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);

        System.out.println("Hello, World!");
    }
}`;

export default function CompilerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput('');
    setError(false);
    try {
      const res = await fetch('/api/compiler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input }),
      });
      const data = await res.json();
      setOutput(data.output);
      setError(data.error);
    } catch (e) {
      setOutput('Error connecting to server.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl px-2 sm:px-10 py-10 mt-8 shadow-lg flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-8 text-center w-full">Java Online Compiler</h1>
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left: Code Editor */}
        <div className="md:w-7/12 w-full flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-lg text-gray-900">Code Editor</span>
          </div>
          <div className="w-full min-h-[400px] h-[450px] border border-gray-300 rounded-lg overflow-hidden">
            <MonacoEditor
              height="100%"
              defaultLanguage="java"
              language="java"
              value={code}
              onChange={value => setCode(value)}
              theme="vs-dark"
              options={{ fontSize: 16, minimap: { enabled: false } }}
            />
          </div>
        </div>
        {/* Right: Input & Output */}
        <div className="flex flex-col gap-8 md:w-5/12 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-lg text-gray-900">Input</span>
              <span className="text-gray-400 text-xs">(optional)</span>
            </div>
            <textarea
              className="w-full min-h-[80px] font-mono text-base border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Input for your program (if any)"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-lg text-gray-900">Output</span>
            </div>
            <pre className={`w-full min-h-[180px] bg-gray-900 text-green-200 rounded-lg p-4 font-mono text-base overflow-x-auto border ${error ? 'border-red-500' : 'border-gray-700'}`}>{output || (loading ? 'Running...' : 'Output will appear here')}</pre>
            <div className="mt-6 flex w-full md:justify-end">
              <button
                className="bg-indigo-600 text-white font-bold py-2 px-10 rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-60 text-lg w-full md:w-auto"
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 