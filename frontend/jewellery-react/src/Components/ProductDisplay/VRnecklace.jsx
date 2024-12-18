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
  const [necklaceMesh, setNecklaceMesh] = useState(null);
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

          const geometry = new THREE.PlaneGeometry(2.75, 2.75);  
          const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
          const necklace = new THREE.Mesh(geometry, material);
          scene.add(necklace);
          setNecklaceMesh(necklace);
        });
      } catch (error) {
        console.error("Initialization error:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, [arImage]);

  useEffect(() => {
    const detectAndPositionNecklace = async () => {
      if (!webcamRef.current || !model || !necklaceMesh) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      const faceEstimates = await model.estimateFaces({ input: video });
      if (faceEstimates.length > 0) {
        setIsLoading(false);
        const keypoints = faceEstimates[0].scaledMesh;

        const chinPoint = keypoints[152]; 
        const nosePoint = keypoints[1];   

        const faceHeight = Math.abs(nosePoint[1] - chinPoint[1]);
        const scaleMultiplier = faceHeight / 140;

      
        necklaceMesh.position.x = (chinPoint[0] - video.videoWidth / 2) * -0.01;
        necklaceMesh.position.y = (chinPoint[1] - video.videoHeight / 2) * -0.01 - 0.8;
        necklaceMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        necklaceMesh.position.z = 1;
      }
    };

    const intervalId = setInterval(() => {
      detectAndPositionNecklace();
    }, 120);

    return () => clearInterval(intervalId);
  }, [model, necklaceMesh]);

  return (
    <>
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ textAlign: 'center' }}>Virtual Try-On - Necklace</h1>
      </div>
      <div style={{ position: 'relative', margin: '0 auto', width: '800px', height: '800px' }}>
        {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <h3>Loading...</h3>
          </div>
        )}
        <Webcam ref={webcamRef} videoConstraints={{ width: 800, height: 800, facingMode: "user" }} style={{ width: '800px', height: '800px' }} mirrored={true} />
        <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
      </div>
    </>
  );
};

export default VirtualTryOn;
