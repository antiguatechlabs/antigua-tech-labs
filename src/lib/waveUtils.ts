/* eslint-disable max-len */
import { waveShapes, WaveShape } from './waveShapes';

/**
 * Get a random wave shape from the available collection
 * @returns A randomly selected wave shape
 */
export const getRandomWave = (): WaveShape => {
  const randomIndex = Math.floor(Math.random() * waveShapes.length);
  return waveShapes[randomIndex];
};

/**
 * Get a specific wave shape by its ID
 * @param id - The ID of the wave shape to retrieve
 * @returns The wave shape if found, undefined otherwise
 */
export const getWaveById = (id: string): WaveShape | undefined => waveShapes.find(wave => wave.id === id);

/**
 * Get all available wave shapes
 * @returns Array of all wave shapes
 */
export const getAllWaves = (): WaveShape[] => waveShapes;

/**
 * Get wave shape names for debugging or selection UI
 * @returns Array of wave shape names
 */
export const getWaveNames = (): string[] => waveShapes.map(wave => wave.name);
