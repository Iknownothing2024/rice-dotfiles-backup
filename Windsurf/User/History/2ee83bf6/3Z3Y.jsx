import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getPost } from '../data/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <Sidebar />
        
        {/* Main Content */}
        <main className="ml-96 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
              <p className="text-gray-300">
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
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
            </header>
            
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
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
