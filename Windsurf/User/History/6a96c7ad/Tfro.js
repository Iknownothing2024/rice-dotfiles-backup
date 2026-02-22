import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing audio player functionality
 * @param {Object} track - Current track object with title, artist, and src properties
 * @returns {Object} Audio player state and controls
 */
export const useAudioPlayer = (track) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track]);

  // Handle track change
  useEffect(() => {
    if (track && audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = track.src;
      audioRef.current.load();
      setIsLoading(false);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [track]);

  // Handle audio end event
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Optional: Auto-play next track or loop
    // audioRef.current.play();
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !track) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, track]);

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
    
    // Actions
    togglePlayPause,
    handleProgressClick,
    handleVolumeChange,
    formatTime,
  };
};
