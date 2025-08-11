declare module 'canvas-confetti' {
  type Options = {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    scalar?: number
    ticks?: number
    colors?: string[]
    shapes?: string[]
    origin?: { x?: number; y?: number }
  }
  function confetti(options?: Options): void
  export default confetti
}