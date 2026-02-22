import React, { memo, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from 'lucide-react';

// 1. 导入两组曲目列表
import { LifeTracks, IncelLifeTracks } from '../data/musicList';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

/**
 * 子组件：播放控制
 */
const PlaybackControls = memo(({ isPlaying, isLoading, onToggle, onPrev, onNext, canSkip }) => (
  <div className="flex items-center gap-2 ml-3">
    <button onClick={onPrev} disabled={!canSkip} className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20" aria-label="Previous">
      <SkipBack size={16} className="text-white" />
    </button>
    <button onClick={onToggle} disabled={isLoading} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all border border-white/30" aria-label="Play/Pause">
      {isLoading ? <Loader2 size={18} className="text-white animate-spin" /> : isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white translate-x-0.5" />}
    </button>
    <button onClick={onNext} disabled={!canSkip} className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20" aria-label="Next">
      <SkipForward size={16} className="text-white" />
    </button>
  </div>
));

/**
 * 主组件：MusicPlayer
 */
const MusicPlayer = memo(({ initialPlaylist = 'life', autoPlay = false }) => {
  const [playlistType, setPlaylistType] = useState(initialPlaylist); // 'life' | 'incel'
  const constraintsRef = useRef(null);

  // 根据当前选择切换数据源
  const currentTracks = useMemo(() => {
    return playlistType === 'incel' ? IncelLifeTracks : LifeTracks;
  }, [playlistType]);

  const {
    audioRef,
    progressBarRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    progressPercentage,
    currentIndex,
    currentTrack,
    totalTracks,
    togglePlayPause,
    handleProgressClick,
    handleVolumeChange,
    handleNext,
    handlePrev,
    formatTime,
  } = useAudioPlayer(currentTracks, 0, autoPlay);

  // 切换播放列表的逻辑
  const togglePlaylist = () => {
    setPlaylistType(prev => prev === 'life' ? 'incel' : 'life');
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 right-8 w-80 pointer-events-auto bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-5 select-none touch-none overflow-hidden"
        onPointerDown={(e) => e.target.closest('button, input') && e.stopPropagation()}
      >
        {/* 装饰性背景：根据列表类型变换颜色 */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full transition-colors duration-700 ${playlistType === 'incel' ? 'bg-red-500/20' : 'bg-blue-500/20'}`} />

        <audio ref={audioRef} />

        {/* 顶部：列表切换与信息 */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${playlistType === 'incel' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {playlistType} vibe
              </span>
              <span className="text-white/20 text-[10px] font-mono">{currentIndex + 1}/{totalTracks}</span>
            </div>
            <h3 className="text-white font-medium text-sm truncate pr-2" title={currentTrack?.title}>
              {currentTrack?.title}
            </h3>
            <p className="text-white/40 text-xs truncate mt-0.5">{currentTrack?.artist}</p>
          </div>
          
          <button 
            onClick={togglePlaylist}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors group"
            title="Switch Playlist"
          >
            <ListMusic size={18} className="text-white/40 group-hover:text-white" />
          </button>
        </div>

        {/* 控制组 */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex-1">
             {/* 进度条 */}
            <div ref={progressBarRef} onClick={handleProgressClick} className="relative h-1 bg-white/10 rounded-full cursor-pointer group">
              <motion.div 
                className="absolute h-full bg-white/60 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="flex justify-between mt-2 font-mono text-[9px] text-white/30 tracking-tighter">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          
          <PlaybackControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            onToggle={togglePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
            canSkip={totalTracks > 1}
          />
        </div>

        {/* 音量控制 */}
        <div className="flex items-center gap-3 px-1 opacity-60 hover:opacity-100 transition-opacity">
          <Volume2 size={12} className="text-white/40" />
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
          />
        </div>
      </motion.div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;