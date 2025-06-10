import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import axios from 'axios';
import 'highlight.js/styles/atom-one-dark.css';

function CodeReview() {
  const [code, setCode] = useState("def sum():\n  return a + b\n");
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review/", { code });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Error fetching review. Please try again.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <div className="text-center text-4xl font-extrabold mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Code Reviewer
        </span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Code Input Section */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
          {/* File Upload */}
          <label className="block text-sm font-medium mb-2 text-gray-400">Upload a Code File</label>
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-sm text-gray-300 cursor-pointer mb-4"
          />

          {/* Code Editor */}
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 15,
              backgroundColor: '#1e1e2f',
              color: '#f8f8f2',
              borderRadius: '0.5rem',
              minHeight: '300px',
              border: '1px solid #3b3b5a'
            }}
          />

          <button
            onClick={reviewCode}
            className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 rounded-xl text-white font-bold text-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            🔍 Review Code
          </button>
        </div>

        {/* Review Output Section */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 overflow-auto max-h-[600px]">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Review Result</h2>
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review || "Your code review result will appear here after submission."}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
