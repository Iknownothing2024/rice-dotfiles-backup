import React, { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// 1. 导入外部音乐数据
import musicList from '../data/musicList';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

/**
 * 子组件：播放控制按钮组
 */
const PlaybackControls = memo(({ isPlaying, isLoading, onToggle, onPrev, onNext, canSkip }) => (
  <div className="flex items-center gap-2 ml-3">
    <button
      onClick={onPrev}
      disabled={!canSkip}
      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-20 disabled:cursor-not-allowed"
      aria-label="Previous track"
    >
      <SkipBack size={14} className="text-white" />
    </button>
    <button
      onClick={onToggle}
      disabled={isLoading}
      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 disabled:opacity-50"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isLoading ? (
        <Loader2 size={18} className="text-white animate-spin" />
      ) : isPlaying ? (
        <Pause size={18} className="text-white" />
      ) : (
        <Play size={18} className="text-white translate-x-0.5" />
      )}
    </button>
    <button
      onClick={onNext}
      disabled={!canSkip}
      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-20 disabled:cursor-not-allowed"
      aria-label="Next track"
    >
      <SkipForward size={14} className="text-white" />
    </button>
  </div>
));

/**
 * 子组件：进度条
 */
const ProgressBar = memo(({ progressBarRef, progressPercentage, onProgressClick, currentTime, duration, formatTime }) => (
  <div className="mb-4">
    <div
      ref={progressBarRef}
      onClick={onProgressClick}
      className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
    >
      {/* 缓冲/背景条 */}
      <div
        className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      />
      {/* 拖动滑块提示 */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
    <div className="flex justify-between mt-1.5">
      <span className="text-white/40 text-[10px] font-mono">{formatTime(currentTime)}</span>
      <span className="text-white/40 text-[10px] font-mono">{formatTime(duration)}</span>
    </div>
  </div>
));

/**
 * 子组件：音量控制
 */
const VolumeControl = memo(({ volume, onVolumeChange }) => (
  <div className="flex items-center gap-3 px-1">
    <Volume2 size={14} className="text-white/40 flex-shrink-0" />
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
      style={{
        background: `linear-gradient(to right, rgba(255,255,255,0.5) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
      }}
    />
    <span className="text-white/40 text-[10px] w-6 text-right font-mono">
      {Math.round(volume * 100)}%
    </span>
  </div>
));

/**
 * 主组件：MusicPlayer
 */
const MusicPlayer = memo(({ tracks = musicList, initialIndex = 0, autoPlay = false }) => {
  const containerRef = useRef(null);

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
  } = useAudioPlayer(tracks, initialIndex, autoPlay);

  // 防御性编程：如果没有轨道数据，显示空状态
  if (!tracks || tracks.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 w-80 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white/50 border border-white/10">
        No tracks available.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 w-80 z-50 pointer-events-none">
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        className="pointer-events-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 select-none touch-none"
        onPointerDown={(e) => {
          // 只有点击背景或曲目信息时触发拖拽，避免干扰按钮操作
          const target = e.target;
          if (target.closest('button') || target.closest('input')) {
            e.stopPropagation();
          }
        }}
      >
        <audio ref={audioRef} />

        {/* 顶部：曲目信息与控制 */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-white font-semibold text-sm truncate leading-tight">
                {currentTrack?.title || 'Unknown Title'}
              </h3>
              <span className="text-white/30 text-[10px] px-1.5 py-0.5 bg-white/5 rounded">
                {currentIndex + 1}/{totalTracks}
              </span>
            </div>
            <p className="text-white/50 text-xs truncate">
              {currentTrack?.artist || 'Unknown Artist'}
            </p>
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

        {/* 中部：进度条 */}
        <ProgressBar
          progressBarRef={progressBarRef}
          progressPercentage={progressPercentage}
          onProgressClick={handleProgressClick}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
        />

        {/* 底部：音量 */}
        <VolumeControl 
          volume={volume} 
          onVolumeChange={handleVolumeChange} 
        />
      </motion.div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;