import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import flowersCover from "./assets/Books/Covers/FlowerForAlgernonCover.jpeg";
import flowers from "./assets/Books/献给阿尔吉侬的花束.epub";
import billyCover from "./assets/Books/Covers/BiliCover.jpg";
import billy from "./assets/Books/24个比利+比利战争.epub";
import juegeCover from "./assets/Books/Covers/Juege.png";
import juege from "./assets/Books/絶歌 (元少年Ａ) (Z-Library).epub";
import crimeAndPunishmentCover from "./assets/Books/Covers/Crime-and-Punishment.jpg";
import crimeAndPunishment from "./assets/Books/罪与罚 (陀思妥耶夫斯基) (Z-Library).epub";
import "./App.css";

interface Book {
  id: string;
  title: string;
  coverUrl: string;
  author: string;
  description: string;
  downloadUrl: string;
}

const MOCK_BOOKS: Book[] = [
  {
    id: "Flowers-for-Algernon-CN",
    title: "献给阿尔吉侬的花束",
    coverUrl: flowersCover,
    author: "丹尼尔·凯斯",
    description:
      "《献给阿尔吉侬的花束》是美国作家丹尼尔·凯斯创作的科幻小说，讲述了智力低下的查理·高登通过实验获得高智商后，最终回归原点的故事。",
    downloadUrl: flowers,
  },
  {
    id: "24-Billy",
    title: "24个比利+比利战争",
    coverUrl: billyCover,
    author: "丹尼尔·凯斯と罗伯特·路易斯·史蒂文森",
    description:
      "《24个比利》是美国作家丹尼尔·凯斯创作的心理学小说，讲述了患有解离性身份障碍的比利·米利根的故事。《比利战争》是该书的续作，探讨了比利的治疗过程。",
    downloadUrl: billy,
  },
  {
    id: "Juege",
    title: "绝歌 日本神户地区连续儿童杀伤事件",
    coverUrl: juegeCover,
    author: "元少年A（东慎太郎）",
    description: "《絶歌》是一部由1997年震惊日本的“神户连续幼儿伤杀事件”（又称“酒鬼蔷薇圣斗事件”）的凶手少年A所著的自传，“绝歌”二字寓意“绝命之歌”。作者在序言中表示，这本书是他作为“少年A”的最后告白，通过这种方式将曾经那个扭曲的自我埋葬，从而以一个“人”的身份重新站立。",
    downloadUrl: juege,
  },
  {
    id: "Crime-and-Punishment",
    title: "罪与罚",
    coverUrl: crimeAndPunishmentCover,
    author: "陀思妥耶夫斯基",
    description: "《罪与罚》是俄国作家陀思妥耶夫斯基创作的长篇小说，讲述了穷大学生拉斯柯尔尼科夫因贫困和理想主义而犯下杀人罪，最终在索尼娅的帮助下获得救赎的故事。",
    downloadUrl: crimeAndPunishment,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  function BookCard({ book }: { book: Book }) {
    return (
      <button
        type="button"
        className="book-card flex flex-col items-center gap-2 text-left"
        onClick={() => setSelectedBook(book)}
      >
        <div className="w-24 max-w-full aspect-[2/3] overflow-hidden rounded-lg gap-4">
          <img
            className="h-full w-full object-cover"
            src={book.coverUrl}
            alt={`${book.title} cover`}
            loading="lazy"
          />
        </div>
        <div className="book-card-body w-24 max-w-full">
          <div className="book-title line-clamp-2 text-sm">{book.title}</div>
        </div>
      </button>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredBooks = normalizedQuery
    ? MOCK_BOOKS.filter((book) =>
        [book.title, book.author, book.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      )
    : MOCK_BOOKS;

  async function searchBooks(query: string) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // const results = await invoke<Book[]>("search_books", { query });
    // return results;
    void invoke;

    const q = query.trim().toLowerCase();
    if (!q) return;

    const firstMatch = filteredBooks[0];
    if (firstMatch) setSelectedBook(firstMatch);
  }

  return (
    <main className="container">
      <h1 className="text-8xl font-extrabold tracking-tighter sm:text-7xl mb-12">
      书库
    </h1>

      <form
        className="row search-bar mb-16"
        onSubmit={(e) => {
          e.preventDefault();
          void searchBooks(searchQuery);
        }}
      >
        <input
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          placeholder="书名...作者...关键字词..."
        />
        <button className="search-button" type="submit">
          搜索
        </button>
      </form>

      {selectedBook === null ? (
        <section className="book-list" aria-label="Book List">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : (
        <section className="book-detail" aria-label="Book Detail" >
          <button
            type="button"
            className="back-button mb-10"
            onClick={() => setSelectedBook(null)}
          >
            Back to List
          </button>

          <div className="book-detail-layout flex flex-col items-center gap-4  ">
            <div className="w-64 max-w-full aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={selectedBook.coverUrl}
                alt={selectedBook.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="book-detail-body text-left space-y-4">
              <h2 className="book-detail-title">{selectedBook.title}</h2>
              <div className="book-detail-author">作者：{selectedBook.author}</div>
              <p className="book-detail-description">{selectedBook.description}</p>
              <a 
                href={selectedBook.downloadUrl} 
                download={`${selectedBook.title}.epub`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                下载书籍 (EPUB)
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
