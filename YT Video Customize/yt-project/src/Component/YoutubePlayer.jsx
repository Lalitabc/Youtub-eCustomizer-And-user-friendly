// src/App.js
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = () => {
  const playerRef = useRef(null);

  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 0,
      controls: 1,  // Shows controls
      rel: 0,       // Prevents showing related videos at the end
      modestbranding: 1  // Minimizes YouTube branding
    }
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    const savedTime = localStorage.getItem('videoTime');
    if (savedTime) {
      event.target.seekTo(parseFloat(savedTime), true);
    }
 
  };

  const handleStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          localStorage.setItem('videoTime', currentTime);
        }
      }, 1000);

      // Clear interval when video is paused or stopped
      playerRef.current.addEventListener('onStateChange', (event) => {
        if (event.data === YouTube.PlayerState.PAUSED || event.data === YouTube.PlayerState.ENDED) {
          clearInterval(interval);
        }
      });
    }
  };

  return (
    <div className="app-container">
      <h1>YouTube Video Player</h1>
      <div id="player">
        <YouTube
          videoId="eILUmCJhl64"
          opts={opts}
          onReady={handleReady}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};

export default YouTubePlayer;
