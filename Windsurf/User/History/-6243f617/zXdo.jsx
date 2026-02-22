import React, { memo } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

// Sample track data - replace with your actual tracks
const sampleTracks = [
  {
    id: 1,
    title: 'L\'ange a contre jour (逆光天使)',
    artist: 'さよならを教えて',
    src: '/music/L\'ange a contre jour (逆光天使) ⧸ さよならを教えて BGM02 [QfBxtD_ycXQ].f140.m4a', // Replace with actual music file
  },
  {
    id: 2,
    title: 'До восхода',
    artist: '宠物蜥蜴娘',
    src: '/music/До восхода [ASrsmUII5-4].f140.m4a', // Replace with actual music file
  },
  {
    id: 3,
    title: 'Kimi no Na wa. OST - Kataware Doki 【Orchestral Cover】',
    artist: '君の名は',
    src: '/music/Kimi no Na wa. OST - Kataware Doki 【Orchestral Cover】 [rcwgyTRIvwQ].f140.m4a', // Replace with actual music file
  },
];

const MusicPlayer = memo(() => {
  // Use first track as default - you can implement track switching logic
  const currentTrack = sampleTracks[0];
  
  const {
    audioRef,
    progressBarRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    progressPercentage,
    togglePlayPause,
    handleProgressClick,
    handleVolumeChange,
    formatTime,
  } = useAudioPlayer(currentTrack);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      {/* Glassmorphism Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-4">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
        
        {/* Track Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">
              {currentTrack.title}
            </h3>
            <p className="text-white/70 text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="ml-3 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 disabled:opacity-50"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
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
          <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          
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
