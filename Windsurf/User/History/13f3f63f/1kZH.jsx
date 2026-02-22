import React, { memo } from 'react';
import Sidebar from './Sidebar';

const ShitHitomiSays = memo(() => {
  // Mock diary entries data
  const entries = [
    {
      date: '2026-2-04 Wednesday',
      content: '今天又是无所事事的一天，在房间里发呆，看着窗外的天空发呆。想要做点什么，但是又什么都不想做。这种无力感让人窒息。'
    },
    {
      date: '2026-2-03 Tuesday', 
      content: '凌晨三点还在刷手机，看到了很多有趣的东西，但是第二天醒来什么都不记得了。记忆像是被偷走了一样，只剩下模糊的印象。'
    },
    {
      date: '2026-2-02 Monday',
      content: '想要改变，想要重新开始，但是每天都重复着同样的生活。明天真的会不一样吗？还是只是自我安慰的谎言？'
    },
    {
      date: '2026-2-01 Sunday',
      content: '听了一整天的音乐，耳机成为了我与这个世界唯一的连接。有时候觉得音乐比人类更懂我。'
    },
    {
      date: '2026-1-31 Saturday',
      content: '又做了一个奇怪的梦，梦见自己在一个陌生的地方，但是感觉比现实更真实。也许现实才是梦境？'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-96 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">shitHitomiSays</h1>
            <p className="text-gray-300/80 text-lg">一些胡言乱语，一些无意义的思考</p>
          </div>

          {/* Entries List */}
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <article key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                <header className="mb-4">
                  <h2 className="text-lg font-semibold mb-3 text-primary-400">
                    {entry.date}
                  </h2>
                </header>
                <div className="text-gray-200/90 leading-relaxed">
                  <p className="whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
          
          {entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400/80 text-lg">暂无日记</p>
              <p className="text-gray-300/80 text-lg">还没有写下任何东西</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

ShitHitomiSays.displayName = 'ShitHitomiSays';

export default ShitHitomiSays;
