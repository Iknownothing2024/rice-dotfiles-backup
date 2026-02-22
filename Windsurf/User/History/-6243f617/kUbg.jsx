import React, { memo } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Loader2, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// Sample track data - replace with your actual tracks
const sampleTracks = [
  {
    id: 1,
    title: 'L\'ange a contre jour (逆光天使)',
    artist: 'さよならを教えて',
    src: '/music/L\'ange a contre jour (逆光天使) ⧸ さよならを教えて BGM02 [QfBxtD_ycXQ].f140.m4a',
  },
  {
    id: 2,
    title: 'До восхода',
    artist: '宠物蜥蜴娘',
    src: '/music/До восхода [ASrsmUII5-4].f140.m4a',
  },
  {
    id: 3,
    title: 'Kimi no Na wa. OST - Kataware Doki 【Orchestral Cover】',
    artist: '君の名は',
    src: '/music/Kimi no Na wa. OST - Kataware Doki 【Orchestral Cover】 [rcwgyTRIvwQ].f140.m4a',
  },
  {
    id: 4,
    title: 'Seventeen',
    artist: 'Saint Tomorrow',
    src: '/music/Saint Tomorrow - Seventeen [RtDctzLsO6g].f140.m4a',
  },
  {
    id: 5,
    title: 'Комнатное растение',
    artist: '宠物蜥蜴娘',
    src: '/music/Комнатное растение [EmBlyMdrkgA].f140.m4a',
  },
  {  id: 6,
    title: 'Киберстранник',
    artist: '宠物蜥蜴娘',
    src: '/music/Киберстранник [MRGTm1CKAFg].f140.m4a',
  },
  {
    id: 7,
    title: 'Социально болен',
    artist: '宠物蜥蜴娘',
    src: '/music/Социально болен [2Gs9N0nlCiE].f140.m4a',
  },
  {
    id: 8,
    title: 'I really want to stay at your house',
    artist: 'Cyberpunk2077',
    src: '/music/I really want to stay at your house.m4a',
  }
];

const MusicPlayer = memo(() => {
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
  } = useAudioPlayer(sampleTracks, 0, true); // Enable auto-play

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      {/* Glassmorphism Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-4">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
        
        {/* Track Info with Playlist Indicator */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-medium text-sm truncate">
                {currentTrack?.title || 'No Track'}
              </h3>
              {/* Playlist Indicator */}
              <span className="text-white/50 text-xs font-medium">
                {currentIndex + 1}/{totalTracks}
              </span>
            </div>
            <p className="text-white/70 text-xs truncate">
              {currentTrack?.artist || 'Unknown Artist'}
            </p>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center gap-2 ml-3">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={totalTracks <= 1}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous track"
            >
              <SkipBack size={16} className="text-white" />
            </button>
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              disabled={isLoading || !currentTrack}
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
            
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={totalTracks <= 1}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next track"
            >
              <SkipForward size={16} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-1 bg-white/20 rounded-full cursor-pointer group"
          >
            {/* Progress Fill */}
            <div
              className="absolute top-0 left-0 h-full bg-white/60 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            
            {/* Progress Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ left: `${progressPercentage}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between mt-1">
            <span className="text-white/60 text-xs">
              {formatTime(currentTime)}
            </span>
            <span className="text-white/60 text-xs">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center gap-2">
          {/* Volume Icon */}
          <Volume2 size={16} className="text-white/60 flex-shrink-0" />
          
          {/* Volume Slider */}
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`
              }}
            />
          </div>
          
          {/* Volume Percentage */}
          <span className="text-white/60 text-xs w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
      
      {/* Custom Styles for Range Input */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
