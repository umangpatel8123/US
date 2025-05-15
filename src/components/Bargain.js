import React, { useEffect, useRef, useState } from 'react';
import './Bargain.css';

const Bargain = () => {
  const videoRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [initialStart, setInitialStart] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleEnded = () => setShowOptions(true);
      video.addEventListener('ended', handleEnded);

      if (initialStart) {
        video.currentTime = 16;
        video.play();
        setInitialStart(false);
      }

      return () => video.removeEventListener('ended', handleEnded);
    }
  }, [initialStart]);

  const handleDecline = () => {
    const video = videoRef.current;
    setShowOptions(false);
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleAccept = () => {
    alert("I Love youuu 1618033988749894848207210029 ❤️");
  };

  return (
    <div className="bargain-container">
      <video
        className="bargain-video"
        ref={videoRef}
        src="https://res.cloudinary.com/dui4hd8gi/video/upload/v1745653606/videos/loop_j6lhce.mp4"
        type="video/mp4"
        controls={false}  // You can remove this if you don't want native controls
        muted={false}     // Set this to false to enable audio
        playsInline
      />

      {showOptions && (
        <div className="bargain-options">
          <button className="bargain-btn accept" onClick={handleAccept}>Let’s Bargain</button>
          <button className="bargain-btn decline" onClick={handleDecline}>No</button>
        </div>
      )}
    </div>
  );
};

export default Bargain;
