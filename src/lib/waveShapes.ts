export interface WaveShape {
    id: string;
    name: string;
    path: string;
    viewBox?: string;
    description?: string;
}

export const waveShapes: WaveShape[] = [
  {
    id: 'gentle-curve',
    name: 'Gentle Curve',
    path: 'M-0.27,80 C149.99,200.00 349.82,-80.00 500.00,60 L500.00,150.00 L-0.27,150.00 Z',
    description: 'Enhanced wave with bigger amplitude',
  },
  {
    id: 'smooth-hills',
    name: 'Smooth Hills',
    path: 'M0,120 C100,20 150,20 250,90 C350,140 400,10 500,70 L500,150 L0,150 Z',
    description: 'Dramatic rolling hills with larger peaks',
  },
  {
    id: 'dramatic-curve',
    name: 'Dramatic Curve',
    path: 'M0,140 C200,-20 300,160 500,30 L500,150 L0,150 Z',
    description: 'Bold dramatic curve with extreme amplitude',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    path: 'M0,100 C80,20 120,20 200,80 C280,140 320,40 400,90 C450,120 480,60 500,80 L500,150 L0,150 Z',
    description: 'Multiple ocean-like waves with varying heights',
  },
  {
    id: 'mountain-peaks',
    name: 'Mountain Peaks',
    path: 'M0,130 C100,10 150,160 250,30 C350,180 400,5 500,90 L500,150 L0,150 Z',
    description: 'Sharp mountain-like peaks with dramatic variations',
  },
  {
    id: 'flowing-river',
    name: 'Flowing River',
    path: 'M0,90 C60,40 100,120 160,70 C220,20 260,110 320,60 C380,10 420,100 480,50 C490,45 495,40 500,35 L500,150 L0,150 Z',
    description: 'Serpentine flowing pattern with multiple curves',
  },
];
