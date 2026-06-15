import { deltaTime } from "../Engine/engine.js";

export class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.fpsDisplay = this.createFPSDisplay();
    this.frameCount = 0;
    this.fpsAccumulator = 0;
    this.smoothedFps = 0;
  }
  
  createFPSDisplay() {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.left = '10px';
    div.style.color = 'lime';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '14px';
    div.style.backgroundColor = 'rgba(0,0,0,0.5)';
    div.style.padding = '4px 8px';
    div.style.borderRadius = '4px';
    div.style.zIndex = '9999';
    div.style.pointerEvents = 'none';
    document.body.appendChild(div);
    return div;
  }
  
  update(currentTime) {
    this.frameCount++;
    this.fpsAccumulator += 1.0 / deltaTime;
    
    if (this.frameCount >= 30) {
      this.smoothedFps = Math.round(this.fpsAccumulator / this.frameCount);
      this.fpsDisplay.textContent = `FPS: ${this.smoothedFps}`;
      
      if (this.smoothedFps < 55) {
        this.fpsDisplay.style.color = 'red';
      } else {
        this.fpsDisplay.style.color = 'lime';
      }
      
      this.frameCount = 0;
      this.fpsAccumulator = 0;
    }
    
    return this.smoothedFps;
  }
}