import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing audio player functionality with playlist support
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
  const [userPaused, setUserPaused] = useState(false);

  const currentTrack = tracks[currentIndex];

  /** -------------------------
   * Playback Controls
   * ------------------------ */

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIndex = (currentIndex + 1) % tracks.length; // 循环播放
    setCurrentIndex(nextIndex);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
    setUserPaused(false); // 自动切歌不算用户暂停
  }, [currentIndex, isPlaying, tracks.length]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
    setUserPaused(false);
  }, [currentIndex, isPlaying, tracks.length]);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setUserPaused(true);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setUserPaused(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleProgressClick = useCallback(
    (e) => {
      if (!progressBarRef.current || !audioRef.current || !duration) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickPercentage = clickX / rect.width;
      const newTime = clickPercentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration]
  );

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }, []);

  const handleTrackSelect = useCallback(
    (index) => {
      if (index >= 0 && index < tracks.length) {
        setCurrentIndex(index);
        setCurrentTime(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          if (isPlaying) audioRef.current.play().catch(() => {});
        }
      }
    },
    [isPlaying, tracks.length]
  );

  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  /** -------------------------
   * Audio Event Listeners
   * ------------------------ */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext(); // 用我们重写的 handleNext

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleNext]);

  /** -------------------------
   * Auto-play on track change
   * ------------------------ */
  useEffect(() => {
    if (currentTrack && audioRef.current && autoPlay && !userPaused) {
      const attemptPlay = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      };
      const timeoutId = setTimeout(() => {
        if (audioRef.current.readyState >= 2) attemptPlay();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [currentTrack?.src, autoPlay, userPaused]);

  /** -------------------------
   * Return values
   * ------------------------ */
  return {
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
    totalTracks: tracks.length,
    togglePlayPause,
    handleProgressClick,
    handleVolumeChange,
    handleNext,
    handlePrev,
    handleTrackSelect,
    formatTime,
  };
};