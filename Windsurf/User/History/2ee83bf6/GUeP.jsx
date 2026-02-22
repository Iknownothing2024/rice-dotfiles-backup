import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getPost } from "../data/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (code, codeId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <Sidebar />

        {/* Main Content */}
        <main className="ml-96 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">
                Post Not Found
              </h1>
              <p className="text-gray-200">
                The post with slug "{slug}" was not found.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-200">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
            </header>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                  // Custom styling for code blocks
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
                    const codeText = Array.isArray(children)
                      ? children.join("")
                      : children;

                    return !inline && match ? (
                      <div className="relative group">
                        <pre className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto">
                          <button
                            onClick={() => copyToClipboard(codeText, codeId)}
                            className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700/60 hover:bg-gray-600/80 text-gray-300 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
                          >
                            {copiedCode === codeId ? "Copied!" : "Copy"}
                          </button>
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code
                        className="bg-gray-700/40 px-1 py-0.5 rounded text-sm text-gray-200"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  // Custom styling for blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="bg-white/5 p-4 rounded-r-lg my-6 border-l-4 border-primary-500/60 pl-4 italic text-gray-200 break-words max-w-full overflow-hidden box-border">
                      {children}
                    </blockquote>
                  ),
                  // Custom styling for links
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary-400 hover:text-primary-300 underline"
                      target={href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  ),
                  // Custom styling for paragraphs
                  p: ({ children }) => (
                    <p className="text-gray-200 leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  // Custom styling for headings
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-white mt-10 mb-4">
                      {children}
                    </h3>
                  ),
                  // Custom styling for lists
                  ul: ({ children }) => (
                    <ul className="text-gray-200 space-y-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-gray-200 space-y-2">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-200">{children}</li>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostPage;
