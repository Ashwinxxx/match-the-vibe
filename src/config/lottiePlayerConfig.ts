// Lottie animation configurations for different loading states
export const lottieConfigs = {
  audioAnalyzer: {
    loop: true,
    autoplay: true,
    animationData: {
      // Basic audio wave animation data
      v: "5.7.4",
      fr: 60,
      ip: 0,
      op: 180,
      w: 200,
      h: 200,
      nm: "Audio Wave",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Wave",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: { a: 1, k: [
              { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
              { t: 180, s: [360] }
            ]},
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: { a: 0, k: [100, 100, 100] }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "rc",
                  d: 1,
                  s: { a: 0, k: [60, 60] },
                  p: { a: 0, k: [0, 0] },
                  r: { a: 0, k: 10 }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.67, 0.37, 0.9, 1] },
                  o: { a: 0, k: 100 }
                }
              ]
            }
          ],
          ip: 0,
          op: 180,
          st: 0
        }
      ]
    }
  },
  
  processing: {
    loop: true,
    autoplay: true,
    animationData: {
      // Simple dots loading animation
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: 90,
      w: 120,
      h: 40,
      nm: "Processing",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Dot 1",
          sr: 1,
          ks: {
            o: { a: 1, k: [
              { t: 0, s: [30] },
              { t: 15, s: [100] },
              { t: 30, s: [30] }
            ]},
            p: { a: 0, k: [20, 20, 0] },
            s: { a: 0, k: [100, 100, 100] }
          },
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "el",
                  d: 1,
                  s: { a: 0, k: [8, 8] },
                  p: { a: 0, k: [0, 0] }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0.67, 0.37, 0.9, 1] }
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

// Fallback CSS animations if Lottie fails
export const fallbackAnimations = {
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce"
};