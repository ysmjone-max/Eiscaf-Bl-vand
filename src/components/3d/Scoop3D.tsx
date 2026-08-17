"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

type Props = {
  flavourName: string;
  color: string;
  secondaryColor?: string;
  size?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  className?: string;
};

// Flavour visual textures & lighting specs
const flavourSpecs: Record<
  string,
  {
    baseColor: number;
    roughness: number;
    metalness: number;
    bumpScale: number;
    hasSpecks?: boolean;
    speckColor?: number;
  }
> = {
  Vanille: { baseColor: 0xfff6db, roughness: 0.55, metalness: 0.05, bumpScale: 0.12, hasSpecks: true, speckColor: 0x3d2817 },
  Vanilla: { baseColor: 0xfff6db, roughness: 0.55, metalness: 0.05, bumpScale: 0.12, hasSpecks: true, speckColor: 0x3d2817 },
  Schokolade: { baseColor: 0x3e2316, roughness: 0.35, metalness: 0.15, bumpScale: 0.14 },
  Chocolate: { baseColor: 0x3e2316, roughness: 0.35, metalness: 0.15, bumpScale: 0.14 },
  Stracciatella: { baseColor: 0xfdfaf5, roughness: 0.45, metalness: 0.05, bumpScale: 0.12, hasSpecks: true, speckColor: 0x221209 },
  Pistazie: { baseColor: 0x9cb58b, roughness: 0.48, metalness: 0.08, bumpScale: 0.15, hasSpecks: true, speckColor: 0x5a7348 },
  Pistachio: { baseColor: 0x9cb58b, roughness: 0.48, metalness: 0.08, bumpScale: 0.15, hasSpecks: true, speckColor: 0x5a7348 },
  Erdbeere: { baseColor: 0xf27685, roughness: 0.3, metalness: 0.12, bumpScale: 0.16, hasSpecks: true, speckColor: 0xffe6a3 },
  Strawberry: { baseColor: 0xf27685, roughness: 0.3, metalness: 0.12, bumpScale: 0.16, hasSpecks: true, speckColor: 0xffe6a3 },
  Himbeere: { baseColor: 0xd93856, roughness: 0.28, metalness: 0.15, bumpScale: 0.16 },
  Raspberry: { baseColor: 0xd93856, roughness: 0.28, metalness: 0.15, bumpScale: 0.16 },
  Zitrone: { baseColor: 0xfce46d, roughness: 0.32, metalness: 0.1, bumpScale: 0.14 },
  Lemon: { baseColor: 0xfce46d, roughness: 0.32, metalness: 0.1, bumpScale: 0.14 },
  Mango: { baseColor: 0xf69c28, roughness: 0.35, metalness: 0.12, bumpScale: 0.15 },
  Haselnuss: { baseColor: 0xc89d6e, roughness: 0.5, metalness: 0.08, bumpScale: 0.14, hasSpecks: true, speckColor: 0x6e4624 },
  Hazelnut: { baseColor: 0xc89d6e, roughness: 0.5, metalness: 0.08, bumpScale: 0.14, hasSpecks: true, speckColor: 0x6e4624 },
  "Salted Caramel": { baseColor: 0xc88232, roughness: 0.25, metalness: 0.2, bumpScale: 0.13 },
  Cookies: { baseColor: 0xf2ece4, roughness: 0.5, metalness: 0.05, bumpScale: 0.15, hasSpecks: true, speckColor: 0x3b2416 },
  "Cookies & Cream": { baseColor: 0xf2ece4, roughness: 0.5, metalness: 0.05, bumpScale: 0.15, hasSpecks: true, speckColor: 0x3b2416 },
  "Dänischer Zimt-Traum": { baseColor: 0xd4a572, roughness: 0.45, metalness: 0.1, bumpScale: 0.13, hasSpecks: true, speckColor: 0x7a3d16 },
  "Danish Cinnamon Dream": { baseColor: 0xd4a572, roughness: 0.45, metalness: 0.1, bumpScale: 0.13, hasSpecks: true, speckColor: 0x7a3d16 },
  "Amarena-Kirsch": { baseColor: 0xfcf5ec, roughness: 0.4, metalness: 0.08, bumpScale: 0.14, hasSpecks: true, speckColor: 0x8a182c },
  "Amarena Cherry": { baseColor: 0xfcf5ec, roughness: 0.4, metalness: 0.08, bumpScale: 0.14, hasSpecks: true, speckColor: 0x8a182c },
  Kaffee: { baseColor: 0x6b4832, roughness: 0.4, metalness: 0.12, bumpScale: 0.13 },
  "Coffee Gelato": { baseColor: 0x6b4832, roughness: 0.4, metalness: 0.12, bumpScale: 0.13 },
  Kokosnuss: { baseColor: 0xf5f8f5, roughness: 0.55, metalness: 0.05, bumpScale: 0.18 },
  Coconut: { baseColor: 0xf5f8f5, roughness: 0.55, metalness: 0.05, bumpScale: 0.18 },
};

export default function Scoop3D({
  flavourName,
  color,
  size = 140,
  autoRotate = true,
  interactive = true,
  className = "",
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.2, y: 0 });
  const currentRotation = useRef({ x: 0.2, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Group to hold the scoop and particles
    const scoopGroup = new THREE.Group();
    scene.add(scoopGroup);

    // Gelato Geometry: Sculpted Sphere with displacement waves
    const geometry = new THREE.SphereGeometry(0.92, 48, 48);
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    // Sculpt realistic ripples and organic gelato fold bumps
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const angle = Math.atan2(vertex.z, vertex.x);
      const height = vertex.y;

      // Soft swirls + micro-noise for authentic artisanal surface
      const swirl = Math.sin(angle * 3 + height * 4) * 0.06;
      const ripple = Math.cos(height * 8 + angle * 2) * 0.04;
      const microNoise = (Math.sin(vertex.x * 12) * Math.cos(vertex.y * 12) * Math.sin(vertex.z * 12)) * 0.025;

      // Flatten the bottom slightly like a scooped base
      const baseFlatten = height < -0.6 ? 1 - (-0.6 - height) * 0.4 : 1;

      vertex.multiplyScalar((1 + swirl + ripple + microNoise) * baseFlatten);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();

    // Flavour styling
    const spec = flavourSpecs[flavourName] || {
      baseColor: new THREE.Color(color).getHex(),
      roughness: 0.45,
      metalness: 0.1,
      bumpScale: 0.12,
    };

    // Material with specular sheen
    const material = new THREE.MeshStandardMaterial({
      color: spec.baseColor,
      roughness: spec.roughness,
      metalness: spec.metalness,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    scoopGroup.add(mesh);

    // Optional topping specks (pistachio chunks, chocolate flakes, etc.)
    if (spec.hasSpecks && spec.speckColor) {
      const speckGeo = new THREE.BufferGeometry();
      const speckCount = 85;
      const speckPositions = new Float32Array(speckCount * 3);

      for (let i = 0; i < speckCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.94 + Math.random() * 0.03;

        speckPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        speckPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        speckPositions[i * 3 + 2] = r * Math.cos(phi);
      }

      speckGeo.setAttribute("position", new THREE.BufferAttribute(speckPositions, 3));
      const speckMat = new THREE.PointsMaterial({
        color: spec.speckColor,
        size: 0.035,
        transparent: true,
        opacity: 0.85,
      });

      const specks = new THREE.Points(speckGeo, speckMat);
      scoopGroup.add(specks);
    }

    // Three-point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xddeeff, 1.2);
    fillLight.position.set(-3, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe2b8, 1.8);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging.current) {
        targetRotation.current.y += 0.008;
      }

      // Smooth inertia interpolation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.1;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.1;

      scoopGroup.rotation.x = currentRotation.current.x;
      scoopGroup.rotation.y = currentRotation.current.y;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse & Touch Drag Controls
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive || !isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.015;
      targetRotation.current.x += deltaY * 0.015;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging.current = true;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!interactive || !isDragging.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.02;
      targetRotation.current.x += deltaY * 0.02;

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [flavourName, color, size, autoRotate, interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative inline-flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ width: size, height: size }}
      title="Rotate 3D Gelato Scoop"
    />
  );
}
