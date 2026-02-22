import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing audio player functionality with playlist support
 * @param {Array} tracks - Array of track objects with title, artist, and src properties
 * @param {number} initialIndex - Initial track index (default: 0)
 * @param {boolean} autoPlay - Whether to auto-play on mount (default: false)
 * @returns {Object} Audio player state and controls
 */
export const useAudioPlayer = (tracks, initialIndex = 0, autoPlay = false) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userPaused, setUserPaused] = useState(false); // Track explicit user pause

  // Get current track
  const currentTrack = tracks[currentIndex];

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle user interaction detection
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true);
    };

    // Add event listeners for user interaction
    const events = ['click', 'keydown', 'touchstart', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Initialize audio element with current track
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // Only set source if it's different or not set
      if (!audioRef.current.src || audioRef.current.src !== currentTrack.src) {
        audioRef.current.src = currentTrack.src;
        audioRef.current.load();
      }
    }
  }, [currentTrack?.id]); // Only trigger when track ID changes

  // Auto-play logic (only for initial mount)
  useEffect(() => {
    if (currentTrack && audioRef.current && autoPlay && currentIndex === 0 && !hasInteracted) {
      const attemptAutoPlay = async () => {
        try {
          setIsLoading(true);
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay was blocked, fail gracefully
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      };

      // Try to auto-play immediately
      attemptAutoPlay();
    }
  }, [currentTrack?.id, autoPlay, hasInteracted, currentIndex]); // Use currentTrack.id instead of isPlaying

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      // Auto-advance to next track
      handleNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex]); // Re-bind when track changes

  // Handle track change auto-play behavior
  useEffect(() => {
    if (currentTrack && audioRef.current && autoPlay && !userPaused) {
      // Only auto-play if track changed and user hasn't paused
      const attemptPlayback = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false);
        }
      };

      // Wait a bit for the audio to be ready
      const timeoutId = setTimeout(() => {
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
          attemptPlayback();
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [currentTrack?.id, autoPlay, userPaused]); // Only trigger when track actually changes

  // Toggle play/pause
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setUserPaused(true); // User explicitly paused
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setUserPaused(false); // User explicitly played
        setHasInteracted(true); // Mark that user has interacted
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, currentTrack?.id]); // Use currentTrack.id to prevent stale closures

  // Handle progress bar click for seeking
  const handleProgressClick = useCallback((e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    const newTime = clickPercentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Handle next track
  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setUserPaused(false); // Reset user pause when navigating
    
    // Reset current time for new track
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentIndex, tracks.length]);

  // Handle previous track
  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setUserPaused(false); // Reset user pause when navigating
    
    // Reset current time for new track
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentIndex, tracks.length]);

  // Handle track selection by index
  const handleTrackSelect = useCallback((index) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentIndex(index);
      
      // Reset current time for new track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    }
  }, [tracks.length]);

  // Format time for display (MM:SS)
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Calculate progress percentage
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return {
    // Refs
    audioRef,
    progressBarRef,
    
    // State
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    progressPercentage,
    currentIndex,
    currentTrack,
    totalTracks: tracks.length,
    hasInteracted,
    
    // Actions
    togglePlayPause,
    handleProgressClick,
    handleVolumeChange,
    handleNext,
    handlePrev,
    handleTrackSelect,
    formatTime,
  };
};
