import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing audio player functionality with playlist support
 * @param {Array} tracks - 曲目列表 [{title, artist, src}]
 * @param {number} initialIndex - 初始播放索引
 * @param {boolean} autoPlay - 是否自动播放
 */
export const useAudioPlayer = (tracks, initialIndex = 0, autoPlay = false) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // ---------------- 状态 ----------------
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentTrack, setCurrentTrack] = useState(tracks[initialIndex] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [userPaused, setUserPaused] = useState(false); // 用户主动暂停标记

  // ---------------- Helper ----------------
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // ---------------- 核心方法 ----------------
  const loadTrack = useCallback((track) => {
    if (!track || !audioRef.current) return;
    audioRef.current.src = track.src;
    audioRef.current.load();
    setIsLoading(true);
  }, []);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
    setUserPaused(false);
  }, [currentIndex, tracks]);

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return;
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
    setUserPaused(false);
  }, [currentIndex, tracks]);

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
    } catch (e) {
      console.error('播放失败', e);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleProgressClick = useCallback((e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleVolumeChange = useCallback((v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  // ---------------- 初始化加载第一首 ----------------
  useEffect(() => {
    if (tracks.length === 0) return;

    // 确保 currentTrack 与 currentIndex 对应
    setCurrentTrack(tracks[currentIndex]);
    if (audioRef.current) {
      loadTrack(tracks[currentIndex]);
    }
  }, [tracks, currentIndex, loadTrack]);

  // ---------------- 绑定 audio 事件 ----------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onEnded = () => handleNext();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [handleNext]);

  // ---------------- 自动播放 ----------------
  useEffect(() => {
    if (autoPlay && !userPaused && audioRef.current && currentTrack) {
      const attemptPlay = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      };
      // 延迟确保 src 已经 load
      const timer = setTimeout(() => {
        if (audioRef.current.readyState >= 2) attemptPlay();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentTrack, autoPlay, userPaused]);

  // ---------------- 返回值 ----------------
  return {
    audioRef,
    progressBarRef,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    currentIndex,
    currentTrack,
    totalTracks: tracks.length,
    progressPercentage,
    togglePlayPause,
    handleNext,
    handlePrev,
    handleProgressClick,
    handleVolumeChange,
    formatTime
  };
};