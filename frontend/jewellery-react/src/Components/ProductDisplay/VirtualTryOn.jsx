import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as THREE from 'three';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useLocation } from 'react-router-dom';  

const VirtualTryOn = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [leftEarringMesh, setLeftEarringMesh] = useState(null);
  const [rightEarringMesh, setRightEarringMesh] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { arImage } = location.state;  

  useEffect(() => {
    const loadResources = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" }
        });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }

        await tf.setBackend('webgl');
        const loadedModel = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          { shouldLoadIrisModel: true, maxFaces: 1 }
        );
        setModel(loadedModel);

        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
          precision: "highp"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setAnimationLoop(() => renderer.render(scene, camera));

       
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(arImage, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          const geometry = new THREE.PlaneGeometry(0.25, 0.5);  
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
          const leftEarring = new THREE.Mesh(geometry, material);
          scene.add(leftEarring);
          setLeftEarringMesh(leftEarring);

          const rightEarring = new THREE.Mesh(geometry, material);
          scene.add(rightEarring);
          setRightEarringMesh(rightEarring);
        });
      } catch (error) {
        console.error("Initialization error:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, [arImage]);

  useEffect(() => {
    const detectAndPositionEarrings = async () => {
      if (!webcamRef.current || !model || !leftEarringMesh || !rightEarringMesh) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      const faceEstimates = await model.estimateFaces({ input: video });
      if (faceEstimates.length > 0) {
        setIsLoading(false);
        const keypoints = faceEstimates[0].scaledMesh;
        const leftEye = keypoints[130];
        const rightEye = keypoints[359];
        const leftEar = keypoints[234]; 
        const rightEar = keypoints[454]; 

        const eyeDistance = Math.sqrt(Math.pow(rightEye[0] - leftEye[0], 2) + Math.pow(rightEye[1] - leftEye[1], 2));
        const scaleMultiplier = eyeDistance / 140;

        
        leftEarringMesh.position.x = (leftEar[0] - video.videoWidth / 2) * -0.01;
        leftEarringMesh.position.y = (leftEar[1] - video.videoHeight / 2.4) * -0.01 + 0.01;
        leftEarringMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        leftEarringMesh.position.z = 1;

        
        rightEarringMesh.position.x = (rightEar[0] - video.videoWidth / 2) * -0.01;
        rightEarringMesh.position.y = (rightEar[1] - video.videoHeight / 2.4) * -0.01 + 0.01;
        rightEarringMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        rightEarringMesh.position.z = 1;

       
        const earVisibilityThreshold = video.videoWidth / 2; 
        leftEarringMesh.visible = rightEar[0] > earVisibilityThreshold; 
        rightEarringMesh.visible = leftEar[0] < earVisibilityThreshold; 

       
        leftEarringMesh.rotation.z = 0;
        rightEarringMesh.rotation.z = 0; 
      }
    };

    const intervalId = setInterval(() => {
      detectAndPositionEarrings();
    }, 120);

    return () => clearInterval(intervalId);
  }, [model, leftEarringMesh, rightEarringMesh]);

  return (
    <>
    <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}>
      <h1 style={{textAlign: 'center'}}>Virtual Try-On - 2D Image</h1>
    </div>
    <div style={{ position: 'relative', margin:'0 auto', width: '800px', height: '800px' }}>
        {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <h3>Loading...</h3>
          </div>
        )}
      <Webcam ref={webcamRef} autoPlay playsInline style={{ width: '800px', height: '800px' }} mirrored={true} />
      <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
    </div>
    </>
  );
};

export default VirtualTryOn;
