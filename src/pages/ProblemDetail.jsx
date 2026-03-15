import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiChevronDown, 
  HiPlay, 
  HiCloudUpload, 
  HiRefresh, 
  HiClipboardCopy, 
  HiTerminal,
  HiChevronRight,
  HiCode
} from 'react-icons/hi';

const ProblemDetailPage = ({ 
  problemData = {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficultyLevel: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    visibleTestCases: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' }
    ],
    startCode: [
      { language: 'javascript', code: '/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};' }
    ],
    referenceSolution: [
      { language: 'javascript', code: 'var lengthOfLongestSubstring = function(s) {\n    let set = new Set();\n    let left = 0;\n    let maxSize = 0;\n    for (let i = 0; i < s.length; i++) {\n        while (set.has(s[i])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[i]);\n        maxSize = Math.max(maxSize, i - left + 1);\n    }\n    return maxSize;\n};' }
    ]
  } 
}) => {

  const { title, description, difficultyLevel, tags, visibleTestCases, startCode, referenceSolution } = problemData;

  const [selectedLang, setSelectedLang] = useState(startCode[0].language);
  const [editorCode, setEditorCode] = useState(startCode[0].code);
  const [activeTab, setActiveTab] = useState('testcase');
  const [showRefSolution, setShowRefSolution] = useState(false);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const runCode = () => {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    console.log("Running Code:\n", code);
  };

  useEffect(() => {
    const langData = startCode.find(c => c.language === selectedLang);
    if (langData && editorRef.current) {
      editorRef.current.setValue(langData.code);
    }
  }, [selectedLang, startCode]);

  const difficultyStyles = {
    Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20'
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      
      <div className="w-full lg:w-[45%] h-full lg:h-screen overflow-y-auto border-r border-slate-800 custom-scrollbar">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8"
        >

          <section className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyStyles[difficultyLevel]}`}>
                {difficultyLevel}
              </span>
              {tags.map((tag, idx) => (
                <motion.span 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-slate-800 text-slate-400 text-xs rounded-full border border-slate-700"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
          >
            <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-slate-300">
              {description}
            </div>
          </motion.section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HiTerminal className="text-blue-400" /> Visible Test Cases
            </h3>
            <div className="space-y-4">
              {visibleTestCases.map((tc, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Case {index + 1}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded transition-all">
                      <HiClipboardCopy className="text-slate-400" />
                    </button>
                  </div>

                  <div className="space-y-3 font-mono text-sm">
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Input:</p>
                      <pre className="bg-slate-950 p-2 rounded border border-slate-800 text-blue-300">{tc.input}</pre>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Output:</p>
                      <pre className="bg-slate-950 p-2 rounded border border-slate-800 text-emerald-400">{tc.output}</pre>
                    </div>

                    {tc.explanation && (
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Explanation:</p>
                        <p className="text-slate-400 italic text-xs">{tc.explanation}</p>
                      </div>
                    )}

                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="pb-10">
            <button 
              onClick={() => setShowRefSolution(!showRefSolution)}
              className="flex items-center gap-2 w-full p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 hover:bg-indigo-500/20 transition-all"
            >
              <HiCode className="text-xl" />
              <span className="font-semibold">View Reference Solution</span>

              <motion.div animate={{ rotate: showRefSolution ? 180 : 0 }} className="ml-auto">
                <HiChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {showRefSolution && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4 rounded-xl border border-slate-800"
                >
                  <Editor
                    height="300px"
                    theme="vs-dark"
                    language={referenceSolution[0].language}
                    value={referenceSolution[0].code}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      padding: { top: 16 }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </section>
        </motion.div>
      </div>

      <div className="w-full lg:w-[55%] flex flex-col h-screen bg-[#0e1525]">

        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0f172a]">

          <div className="flex items-center gap-4">

            <div className="relative group">
              <select 
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 text-sm rounded-md px-4 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {startCode.map(lang => (
                  <option key={lang.language} value={lang.language}>
                    {lang.language.charAt(0).toUpperCase() + lang.language.slice(1)}
                  </option>
                ))}
              </select>
              <HiChevronDown className="absolute right-2 top-2.5 pointer-events-none text-slate-400" />
            </div>

            <button 
              onClick={() => {
                const original = startCode.find(c => c.language === selectedLang);
                if (editorRef.current) editorRef.current.setValue(original.code);
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-all"
            >
              <HiRefresh />
            </button>

          </div>
        </div>

        <div className="flex-grow relative">
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedLang}
            defaultValue={editorCode}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 20 },
              fontFamily: 'Fira Code, monospace',
              cursorSmoothCaretAnimation: "on",
            }}
          />
        </div>

        <div className="h-1/3 border-t border-slate-800 flex flex-col bg-[#0f172a]">

          <div className="flex items-center gap-6 px-6 py-2 border-b border-slate-800 text-sm">
            <button 
              onClick={() => setActiveTab('testcase')}
              className={`pb-2 transition-colors ${activeTab === 'testcase' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}
            >
              Testcase
            </button>

            <button 
              onClick={() => setActiveTab('result')}
              className={`pb-2 transition-colors ${activeTab === 'result' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}
            >
              Result
            </button>
          </div>

          <div className="flex-grow p-4 font-mono text-sm overflow-y-auto bg-[#0a0f1d]">
            {activeTab === 'testcase' ? (
              <div className="space-y-4">

                <div className="flex flex-wrap gap-2">
                  {visibleTestCases.map((_, i) => (
                    <button key={i} className="px-3 py-1 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors">
                      Case {i+1}
                    </button>
                  ))}
                </div>

                <div className="text-slate-400">
                  <p className="mb-2 text-xs uppercase">Input</p>
                  <pre className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    {visibleTestCases[0].input}
                  </pre>
                </div>

              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-600 italic">
                You must run your code first
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-[#0f172a] flex justify-end gap-3">

            <motion.button 
              onClick={runCode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700"
            >
              <HiPlay /> Run Code
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg"
            >
              <HiCloudUpload /> Submit
            </motion.button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
