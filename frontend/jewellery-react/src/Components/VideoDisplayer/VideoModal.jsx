import React, { useEffect, useRef, useState } from 'react';
import './VideoModal.css';

const VideoModal = ({ videoStream, handleClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.translate(canvas.width, 0); // Flip horizontally
      context.scale(-1, 1); // Flip horizontally
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
    }
  };

  const handleRecapture = () => {
    setCapturedImage(null);
  };

  return (
    <div className="video-modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {videoStream ? (
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              style={{
                display: capturedImage ? 'none' : 'block',
                width: '100%',
                transform: 'scaleX(-1)' // Flip the video horizontally
              }}
            />
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
              />
            )}
            <div className="buttons">
              {!capturedImage ? (
                <button onClick={handleCapture}>Capture</button>
              ) : (
                <button onClick={handleRecapture}>Re-capture</button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default VideoModal;

