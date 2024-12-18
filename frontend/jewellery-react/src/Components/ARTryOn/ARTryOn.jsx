import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ARTryOn = () => {
  const arContainerRef = useRef(null);


  useEffect(() => {
    // Ensure that THREEx is loaded
    if (typeof THREEx === 'undefined') {
      console.error('THREEx is not defined. Ensure it is included in your project.');
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    arContainerRef.current.appendChild(renderer.domElement);

    const arToolkitSource = new THREEx.ArToolkitSource({ sourceType: 'webcam' });

    arToolkitSource.init(() => {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
    });

    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/three.js/data/camera_para.dat',
      detectionMode: 'mono'
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerRoot = new THREE.Group();
    scene.add(markerRoot);

    const arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
      type: 'pattern',
      patternUrl: 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/three.js/data/patt.hiro'
    });

    const render = () => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();

    // Adding a 3D model (e.g., an earring)
    const loader = new GLTFLoader();
    loader.load('path_to_your_earring_model.gltf', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.05, 0.05, 0.05);
      markerRoot.add(model);
    });

    return () => {
      renderer.dispose();
      scene.dispose();
      arToolkitSource.domElement.srcObject.getTracks().forEach(track => track.stop());
    };
  }, []);

  return <div ref={arContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ARTryOn;
