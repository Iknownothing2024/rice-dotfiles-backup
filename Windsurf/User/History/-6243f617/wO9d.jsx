import React, { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import defaultTracks from '../data/musicList.js';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

/**
 * 子组件：播放控制
 * 增加了 StopPropagation 确保点击按钮时不会触发播放器拖拽
 */
const PlaybackControls = memo(({ isPlaying, isLoading, onToggle, onPrev, onNext, canSkip }) => (
  <div 
    className="flex items-center gap-2 ml-3"
    onPointerDown={(e) => e.stopPropagation()} // 阻止按钮区域触发拖拽
  >
    <button onClick={onPrev} disabled={!canSkip} className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20">
      <SkipBack size={16} className="text-white" />
    </button>
    <button onClick={onToggle} disabled={isLoading} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all border border-white/30">
      {isLoading ? <Loader2 size={18} className="text-white animate-spin" /> : isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white translate-x-0.5" />}
    </button>
    <button onClick={onNext} disabled={!canSkip} className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20">
      <SkipForward size={16} className="text-white" />
    </button>
  </div>
));

/**
 * 子组件：进度条
 * 关键点：添加了 onPointerDown 阻止冒泡，防止拖动进度条时整个播放器跟着跑
 */
const ProgressBar = memo(({ progressBarRef, progressPercentage, onProgressClick, currentTime, duration, formatTime }) => (
  <div 
    className="mb-4 relative z-20"
    onPointerDown={(e) => e.stopPropagation()} // 核心：阻止进度条区域触发父级拖拽
  >
    <div
      ref={progressBarRef}
      onClick={onProgressClick}
      className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
    <div className="flex justify-between mt-1.5 font-mono text-[10px] text-white/40">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  </div>
));

/**
 * 主组件：MusicPlayer
 */
const MusicPlayer = memo(({ initialPlaylist = 'life', autoPlay = true }) => {
  const [playlistType, setPlaylistType] = useState(initialPlaylist);
  const constraintsRef = useRef(null);

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

  // 1. 自动循环逻辑：监听 audio 结束事件
  // 注意：useAudioPlayer 内部通常已有 handleNext 逻辑，
  // 这里确保其在切换时能保持播放状态。
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const autoLoop = () => {
      handleNext(); // 列表播放完后 handleNext 会通过 % 运算符回到第一首
    };

    audio.addEventListener('ended', autoLoop);
    return () => audio.removeEventListener('ended', autoLoop);
  }, [handleNext, audioRef]);

  // 2. 切换列表逻辑：切换时暂停
  const handlePlaylistToggle = () => {
    if (isPlaying) {
      togglePlayPause(); // 如果正在播放，先暂停
    }
    setPlaylistType(prev => prev === 'life' ? 'incel' : 'life');
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        className="absolute bottom-8 right-8 w-80 pointer-events-auto bg-zinc-900/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-5 select-none touch-none overflow-hidden"
      >
        {/* 背景光晕 */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[70px] rounded-full transition-colors duration-1000 ${playlistType === 'incel' ? 'bg-red-600/20' : 'bg-cyan-500/20'}`} />

        <audio ref={audioRef} />

        {/* 头部信息 */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] uppercase tracking-[0.2em] font-black px-2 py-0.5 rounded-md ${playlistType === 'incel' ? 'bg-red-500/20 text-red-500' : 'bg-cyan-500/20 text-cyan-500'}`}>
                {playlistType}
              </span>
              <span className="text-white/20 text-[10px] font-mono tabular-nums">{currentIndex + 1} / {totalTracks}</span>
            </div>
            <h3 className="text-white font-bold text-sm truncate leading-tight mb-1">{currentTrack?.title}</h3>
            <p className="text-white/40 text-xs truncate">{currentTrack?.artist}</p>
          </div>
          
          <button 
            onClick={handlePlaylistToggle}
            onPointerDown={(e) => e.stopPropagation()} // 阻止拖拽冒泡
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
          >
            <ListMusic size={18} className="text-white/60" />
          </button>
        </div>

        {/* 交互区 */}
        <div className="relative z-10 flex flex-col">
          <ProgressBar
            progressBarRef={progressBarRef}
            progressPercentage={progressPercentage}
            onProgressClick={handleProgressClick}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
          />

          <div className="flex items-center justify-between">
            {/* 音量控制 - 同样需要阻止冒泡 */}
            <div 
              className="flex items-center gap-2 flex-1 group"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Volume2 size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
              <input
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
              />
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
        </div>
      </motion.div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;