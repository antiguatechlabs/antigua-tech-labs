# Guía rápida: ShaderGradient

[ShaderGradient](https://github.com/ruucm/shadergradient) crea gradientes 3D animados para React mediante Three.js y React Three Fiber.

## Instalación

```bash
npm install @shadergradient/react @react-three/fiber@^9 three three-stdlib camera-controls
npm install -D @types/three
```

En Next.js 15 con App Router y React 19 se debe usar React Three Fiber 9. La [matriz de compatibilidad oficial](https://github.com/ruucm/shadergradient?tab=readme-ov-file#installation) no requiere aliases ni `transpilePackages` para esta combinación.

## Ejemplo mínimo

```tsx
'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

export function GradientDemo() {
  return (
    <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }}>
      <ShaderGradient animate="on" color1="#9c43f8" color2="#e56b6f" color3="#f6bd60" />
    </ShaderGradientCanvas>
  );
}
```

## API esencial

- `ShaderGradientCanvas`: crea el canvas y admite, entre otros, `pixelDensity` y `fov`.
- `ShaderGradient`: acepta `type` (`plane`, `sphere` o `waterPlane`), `animate`, `color1`–`color3`, `uSpeed`, `uStrength` y controles de cámara como `cDistance`.
- `control="props"` aplica las props declaradas; `control="query"` permite restaurarlas desde una URL de personalización.

## Next.js y SSR

El canvas necesita WebGL. Carga el componente que importa ShaderGradient mediante `next/dynamic` con `ssr: false` desde un componente cliente. Así el servidor no evalúa la librería ni accede a APIs del navegador. El fondo del hero sigue este patrón y usa `pointerEvents="none"` para impedir interacción o zoom con la rueda.

Consulta la [documentación oficial](https://github.com/ruucm/shadergradient?tab=readme-ov-file#usage) para todas las props y presets.
