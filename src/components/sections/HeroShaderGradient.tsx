'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

export default function HeroShaderGradient() {
  return (
    <ShaderGradientCanvas
      fov={45}
      lazyLoad={false}
      pixelDensity={1}
      pointerEvents="none"
      powerPreference="low-power"
      style={{ height: '100%', pointerEvents: 'none', width: '100%' }}
    >
      <ShaderGradient
        animate="on"
        brightness={1.1}
        cAzimuthAngle={170}
        cDistance={4.4}
        cPolarAngle={70}
        cameraZoom={1}
        color1="#5591f5"
        color2="#4e2c70"
        color3="#16072b"
        control="props"
        enableCameraUpdate={false}
        enableTransition={false}
        envPreset="city"
        grain="off"
        lightType="3d"
        positionX={0}
        positionY={0.9}
        positionZ={-0.3}
        range="disabled"
        rangeEnd={40}
        rangeStart={0}
        reflection={0.1}
        rotationX={45}
        rotationY={0}
        rotationZ={0}
        shader="defaults"
        toggleAxis={false}
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.2}
        uFrequency={0}
        uSpeed={0.2}
        uStrength={3.4}
        uTime={0}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  );
}
