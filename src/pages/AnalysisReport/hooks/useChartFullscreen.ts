/**
 * 图表全屏功能 Hook
 * 提供全屏切换和ESC键退出功能
 */
import { useState, useEffect, useCallback } from 'react';

export interface UseChartFullscreenReturn {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

/**
 * 图表全屏 Hook
 */
export const useChartFullscreen = (): UseChartFullscreenReturn => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // 监听 ESC 键退出全屏
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEsc);
      // 防止页面滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, exitFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
};

export default useChartFullscreen;

