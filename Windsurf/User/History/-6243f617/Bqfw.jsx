import React, { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// 提取子组件：播放控制按钮组
const PlaybackControls = memo(({ isPlaying, isLoading, onToggle, onPrev, onNext, canSkip }) => (
  <div className="flex items-center gap-2 ml-3">
    <button
      onClick={onPrev}
      disabled={!canSkip}
      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label="Previous track"
    >
      <SkipBack size={16} className="text-white" />
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
        <Play size={18} className="text-white ml-0.5" />
      )}
    </button>
    <button
      onClick={onNext}
      disabled={!canSkip}
      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label="Next track"
    >
      <SkipForward size={16} className="text-white" />
    </button>
  </div>
));

// 提取子组件：进度条
const ProgressBar = memo(({ progressBarRef, progressPercentage, onProgressClick, currentTime, duration, formatTime }) => (
  <div className="mb-3">
    <div
      ref={progressBarRef}
      onClick={onProgressClick}
      className="relative h-1 bg-white/20 rounded-full cursor-pointer group"
    >
      <div
        className="absolute top-0 left-0 h-full bg-white/60 rounded-full transition-all duration-100"
        style={{ width: `${progressPercentage}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
    <div className="flex justify-between mt-1">
      <span className="text-white/60 text-xs">{formatTime(currentTime)}</span>
      <span className="text-white/60 text-xs">{formatTime(duration)}</span>
    </div>
  </div>
));

// 提取子组件：音量控制
const VolumeControl = memo(({ volume, onVolumeChange }) => (
  <div className="flex items-center gap-2">
    <Volume2 size={16} className="text-white/60 flex-shrink-0" />
    <div className="flex-1 relative">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
        }}
      />
    </div>
    <span className="text-white/60 text-xs w-8 text-right">{Math.round(volume * 100)}%</span>
  </div>
));

// 主组件
const MusicPlayer = memo(({ tracks = defaultTracks, initialIndex = 0, autoPlay = true }) => {
  const constraintsRef = useRef(null);

  // 音频错误状态（示例：可在 useAudioPlayer 中加入 error 状态）
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
    // 假设 hook 返回 error 状态（需自行扩展）
    // error
  } = useAudioPlayer(tracks, initialIndex, autoPlay);

  // 若出现错误，可显示提示（此处简化为控制台输出）
  // if (error) console.error('Audio error:', error);

  const canSkip = totalTracks > 1;

  return (
    <div ref={constraintsRef} className="fixed bottom-4 right-4 w-80 z-50">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-4 cursor-grab active:cursor-grabbing select-none"
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        whileDrag={{ scale: 1.02 }}
        // 防止拖拽时内部按钮事件被吞
        onPointerDown={(e) => {
          // 如果点击的是按钮或输入框，停止拖拽传播
          if (e.target.closest('button') || e.target.closest('input')) {
            e.stopPropagation();
          }
        }}
      >
        {/* 隐藏的音频元素 */}
        <audio ref={audioRef} preload="metadata" />

        {/* 曲目信息及控制按钮 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-medium text-sm truncate">
                {currentTrack?.title || 'No Track'}
              </h3>
              <span className="text-white/50 text-xs font-medium">
                {currentIndex + 1}/{totalTracks}
              </span>
            </div>
            <p className="text-white/70 text-xs truncate">
              {currentTrack?.artist || 'Unknown Artist'}
            </p>
          </div>

          <PlaybackControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            onToggle={togglePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
            canSkip={canSkip}
          />
        </div>

        {/* 进度条 */}
        <ProgressBar
          progressBarRef={progressBarRef}
          progressPercentage={progressPercentage}
          onProgressClick={handleProgressClick}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
        />

        {/* 音量控制 */}
        <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
      </motion.div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;