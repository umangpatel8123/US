import React, { useEffect, useRef, useState } from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const videoRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [videoStatus, setVideoStatus] = useState("loading"); // loading, error, or playing
  const navigate = useNavigate();

  // Messages to type out
  const messages = [
    "I made this for you...",
    "Sometimes words aren't enough...",
    "But memories tell our story..."
  ];

  // Video URLs to try - we'll try a backup if the main one fails
  const videoUrls = [
    "https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653571/videos/strange_wtf71s.mp4",
    // Backup URL - replace with a valid backup if you have one
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
  ];
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loadingComplete && videoRef.current) {
      // Force attempt to load video when loading completes
      videoRef.current.load();
      
      console.log("Video element properties:");
      console.log("- videoWidth:", videoRef.current.videoWidth);
      console.log("- videoHeight:", videoRef.current.videoHeight);
      console.log("- readyState:", videoRef.current.readyState);
      console.log("- networkState:", videoRef.current.networkState);
      
      // Try to play immediately to check for errors
      videoRef.current.play()
        .then(() => {
          console.log("Auto-play attempt succeeded");
          if (!hasInteracted) {
            videoRef.current.muted = true; // Keep it muted until interaction
          }
        })
        .catch(err => {
          console.log("Auto-play attempt failed:", err);
          // This is expected if autoplay policy blocks it
        });
    }
  }, [loadingComplete, currentVideoIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && hasInteracted) {
      video.muted = false;
      
      // Debug video element
      console.log("Starting video with sound, current status:", {
        readyState: video.readyState,
        paused: video.paused,
        ended: video.ended,
        error: video.error,
        currentSrc: video.currentSrc,
        networkState: video.networkState
      });
      
      video.play()
        .then(() => {
          console.log('Video playing with sound');
          setShowMessage(true);
          setVideoStatus("playing");
          typeMessage(0, 0);
        })
        .catch(err => {
          console.error('Video playback failed:', err);
          setVideoStatus("error");
          
          // Try the next video URL if available
          if (currentVideoIndex < videoUrls.length - 1) {
            console.log("Trying next video URL");
            setCurrentVideoIndex(currentVideoIndex + 1);
          }
        });

      const navigateTimer = setTimeout(() => {
        navigate('/feelings');
      }, 20000);

      return () => clearTimeout(navigateTimer);
    }
  }, [hasInteracted, navigate, currentVideoIndex, videoUrls.length]);

  // Debug event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const onCanPlay = () => {
      console.log("Video can now play");
      console.log("- Duration:", video.duration);
      console.log("- Dimensions:", video.videoWidth, "x", video.videoHeight);
    };
    
    const onPlaying = () => {
      console.log("Video is now playing");
      setVideoStatus("playing");
    };
    
    const onError = (e) => {
      console.error("Video error:", video.error);
      setVideoStatus("error");
      
      // Try the next video URL if available
      if (currentVideoIndex < videoUrls.length - 1) {
        console.log("Error occurred - trying next video URL");
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    };
    
    const onStalled = () => console.log("Video playback has stalled");
    const onWaiting = () => console.log("Video is waiting for more data");
    
    // Add event listeners
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    video.addEventListener('stalled', onStalled);
    video.addEventListener('waiting', onWaiting);
    
    return () => {
      // Remove event listeners on cleanup
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
      video.removeEventListener('stalled', onStalled);
      video.removeEventListener('waiting', onWaiting);
    };
  }, [currentVideoIndex, videoUrls.length]);

  const typeMessage = (messageIndex, charIndex) => {
    if (messageIndex >= messages.length) {
      return;
    }

    const currentMessage = messages[messageIndex];

    if (charIndex <= currentMessage.length) {
      setMessage(currentMessage.substring(0, charIndex));
      setTimeout(() => {
        typeMessage(messageIndex, charIndex + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setMessage("");
        typeMessage(messageIndex + 1, 0);
      }, 2000);
    }
  };

  const handleStartVideo = () => {
    setHasInteracted(true);
  };

  const skipIntro = () => {
    navigate('/feelings');
  };
  
  // Force video to display properly
  const forceVideoDisplay = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Try reloading the video
      video.load();
      
      // Try playing again
      video.play().catch(err => console.log("Force play error:", err));
      
      console.log("Forcing video display attempt");
    }
  };

  return (
    <div className="landing-container">
      {!loadingComplete ? (
        <div className="loading-screen">
          <div className="heart-loader"></div>
          <p className="loading-text">Loading our memories...</p>
        </div>
      ) : (
        <>
          {videoStatus === "error" && (
            <div className="video-error">
              <p>Video could not be loaded</p>
              <button onClick={forceVideoDisplay}>Try Again</button>
            </div>
          )}
          
          {/* Add a fallback image to show if video fails */}
          {videoStatus === "error" && (
            <div className="fallback-image"></div>
          )}
          
          <video
            className={`background-video ${videoStatus === "playing" ? "visible" : ""}`}
            ref={videoRef}
            playsInline
            muted={!hasInteracted}
            autoPlay
            loop
            crossOrigin="anonymous"
            controls={false}
            poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
          >
            <source src={videoUrls[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            {!hasInteracted ? (
              <div className="intro-content">
                <h1 className="intro-title">For You</h1>
                <p className="intro-subtitle">A journey through our moments together</p>
                <button className="enter-btn pulse-effect" onClick={handleStartVideo}>
                  Start Journey
                </button>
              </div>
            ) : (
              <div className="video-playing-overlay">
                {showMessage && (
                  <div className="typing-message">
                    <p>{message}</p>
                  </div>
                )}
                <button className="skip-btn" onClick={skipIntro}>
                  Skip →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;