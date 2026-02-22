import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing audio player functionality with playlist support
 */
export const useAudioPlayer = (tracks, initialIndex = 0, autoPlay = false) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [userPaused, setUserPaused] = useState(false);

  const currentTrack = tracks[currentIndex];
  const totalTracks = tracks.length;

  /** 播放下一首 */
  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setCurrentTime(0);
    setIsLoading(true);

    if (audioRef.current) {
      audioRef.current.src = tracks[nextIndex].src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {}).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    setUserPaused(false);
  }, [currentIndex, isPlaying, tracks]);

  /** 播放上一首 */
  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTime(0);
    setIsLoading(true);

    if (audioRef.current) {
      audioRef.current.src = tracks[prevIndex].src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {}).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    setUserPaused(false);
  }, [currentIndex, isPlaying, tracks]);

  /** 播放/暂停切换 */
  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) return;
    setIsLoading(true);

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
    } catch (err) {
      console.error('Error playing audio:', err);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying]);

  /** 跳转进度条 */
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

  /** 音量 */
  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }, []);

  /** 选中某首歌 */
  const handleTrackSelect = useCallback(
    (index) => {
      if (index >= 0 && index < tracks.length) {
        setCurrentIndex(index);
        setCurrentTime(0);
        setIsLoading(true);

        if (audioRef.current) {
          audioRef.current.src = tracks[index].src;
          audioRef.current.load();
          if (isPlaying) audioRef.current.play().catch(() => {}).finally(() => setIsLoading(false));
          else setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    },
    [isPlaying, tracks]
  );

  /** 格式化时间 */
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  /** 进度百分比 */
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  /** 音频事件监听 */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleNext]);

  /** 自动播放 track 切换 */
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;
    if (autoPlay && !userPaused) {
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
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [currentTrack?.src, autoPlay, userPaused]);

  /** 返回 */
  return {
    audioRef,
    progressBarRef,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    progressPercentage,
    currentIndex,
    currentTrack,
    totalTracks,
    togglePlayPause,
    handleNext,
    handlePrev,
    handleProgressClick,
    handleVolumeChange,
    handleTrackSelect,
    formatTime
  };
};