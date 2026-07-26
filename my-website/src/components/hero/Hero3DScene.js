'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STATE_THEMES = {
  web: { color: 0x10B981, lightColor: 0x34D399, particleColor: 0x059669, speed: 0.2 },
  react: { color: 0x10B981, lightColor: 0x34D399, particleColor: 0x059669, speed: 0.35 },
  ai: { color: 0x10B981, lightColor: 0x34D399, particleColor: 0x059669, speed: 0.4 },
  cloud: { color: 0x10B981, lightColor: 0x34D399, particleColor: 0x059669, speed: 0.25 },
  saas: { color: 0x34D399, lightColor: 0x10B981, particleColor: 0x059669, speed: 0.3 },
  api: { color: 0x34D399, lightColor: 0x10B981, particleColor: 0x059669, speed: 0.3 },
};

export default function Hero3DScene({ activeCard = 'web' }) {
  const containerRef = useRef(null);
  const activeCardRef = useRef(activeCard);
  const meshGroupRef = useRef(null);
  const pointLightRef = useRef(null);
  const particlesMaterialRef = useRef(null);

  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip heavy WebGL canvas rendering on mobile screens for 60 FPS performance
    if (window.innerWidth < 768) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050807, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    meshGroupRef.current = mainGroup;

    // 1. Central Abstract 3D Shapes
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 120, 32);
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const octahedronGeo = new THREE.OctahedronGeometry(1.6, 2);

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const primaryMesh = new THREE.Mesh(torusKnotGeo, wireframeMat);
    mainGroup.add(primaryMesh);

    // Inner Glowing Nodes
    const nodesMat = new THREE.PointsMaterial({
      color: 0x34D399,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const nodePoints = new THREE.Points(torusKnotGeo, nodesMat);
    mainGroup.add(nodePoints);

    // 2. Ambient Particles System
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 140 : 320;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x059669,
      size: isMobile ? 0.05 : 0.07,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    particlesMaterialRef.current = particlesMat;
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10B981, 4, 18);
    pointLight.position.set(3.5, 3.5, 5);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // Mouse lerp tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 1.8;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 1.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const currentTheme = STATE_THEMES[activeCardRef.current] || STATE_THEMES.web;

      // Smooth color morphing
      wireframeMat.color.lerp(new THREE.Color(currentTheme.color), 0.05);
      nodesMat.color.lerp(new THREE.Color(currentTheme.lightColor), 0.05);
      particlesMat.color.lerp(new THREE.Color(currentTheme.particleColor), 0.05);
      pointLight.color.lerp(new THREE.Color(currentTheme.lightColor), 0.05);

      if (!prefersReducedMotion) {
        // Continuous rotation adjusted by active theme speed
        primaryMesh.rotation.x = elapsed * currentTheme.speed * 0.5;
        primaryMesh.rotation.y = elapsed * currentTheme.speed;
        nodePoints.rotation.x = elapsed * currentTheme.speed * 0.5;
        nodePoints.rotation.y = elapsed * currentTheme.speed;

        particleSystem.rotation.y = elapsed * 0.04;
      }

      // Smooth mouse follow lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      mainGroup.position.x = currentMouseX * 0.9;
      mainGroup.position.y = -currentMouseY * 0.9;

      camera.position.x = currentMouseX * 0.35;
      camera.position.y = -currentMouseY * 0.35;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      torusKnotGeo.dispose();
      icosahedronGeo.dispose();
      octahedronGeo.dispose();
      wireframeMat.dispose();
      nodesMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
