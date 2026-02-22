import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function blogPlugin() {
  const virtualModuleId = 'virtual:blog-data';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-blog',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const postsDir = path.resolve(__dirname, 'posts');
        
        if (!fs.existsSync(postsDir)) {
          fs.mkdirSync(postsDir, { recursive: true });
        }

        const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
        const posts = [];

        for (const file of files) {
          const filePath = path.join(postsDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          const slug = file.replace('.md', '');
          
          posts.push({
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            author: data.author || 'Anonymous',
            excerpt: data.excerpt || data.summary || content.slice(0, 150) + '...',
            tags: data.tags || [],
            content: content,
            readingTime: Math.ceil(content.split(' ').length / 200),
            ...data
          });
        }

        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        return `export const posts = ${JSON.stringify(posts, null, 2)};
                export const postsBySlug = ${JSON.stringify(
                  posts.reduce((acc, post) => {
                    acc[post.slug] = post;
                    return acc;
                  }, {}), null, 2
                )};
                export const getAllPosts = () => posts;
                export const getPostBySlug = (slug) => postsBySlug[slug];
                export const getPostsByTag = (tag) => posts.filter(post => post.tags.includes(tag));`;
      }
    }
  };
}
