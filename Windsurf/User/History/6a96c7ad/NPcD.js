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

  // Auto-play logic (only for initial mount)
  useEffect(() => {
    if (currentTrack && audioRef.current && autoPlay && currentIndex === 0) {
      const attemptAutoPlay = async () => {
        try {
          setIsLoading(true);
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay was blocked, fail gracefully
          console.log('Autoplay blocked:', error.message);
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      };

      // Try to auto-play immediately
      attemptAutoPlay();

      // Also try to auto-play after user interaction if initially blocked
      if (!hasInteracted) {
        const tryPlayAfterInteraction = () => {
          if (audioRef.current && !isPlaying && hasInteracted) {
            attemptAutoPlay();
          }
        };

        // Set up a one-time check after user interaction
        const interactionTimer = setTimeout(() => {
          if (hasInteracted && !isPlaying) {
            tryPlayAfterInteraction();
          }
        }, 100);

        return () => clearTimeout(interactionTimer);
      }
    }
  }, [currentTrack, autoPlay, hasInteracted, isPlaying, currentIndex]); // Add currentIndex to prevent conflicts

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

  // Handle track change with seamless auto-playback
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      setIsLoading(true);
      
      // Stop current playback immediately
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      
      // Reset current time
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      
      // Update source and load new track
      audioRef.current.src = currentTrack.src;
      
      // Set up event listeners for the new track
      const handleCanPlay = () => {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        
        // Auto-play if autoPlay is enabled and user hasn't explicitly paused
        if (autoPlay && !userPaused) {
          attemptPlayback();
        } else {
          setIsLoading(false);
        }
      };

      const handleError = (error) => {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        console.error('Error loading audio:', error);
        setIsLoading(false);
        setIsPlaying(false);
      };

      const attemptPlayback = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play blocked or interrupted:', error.message);
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      };

      // Add event listeners for the new track
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('error', handleError);
      
      // Load the new track
      audioRef.current.load();
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, [currentTrack, autoPlay, userPaused]); // Include userPaused to respect user pause state

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
  }, [isPlaying, currentTrack]);

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
  }, [currentIndex, tracks.length]);

  // Handle previous track
  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setUserPaused(false); // Reset user pause when navigating
  }, [currentIndex, tracks.length]);

  // Handle track selection by index
  const handleTrackSelect = useCallback((index) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentIndex(index);
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
