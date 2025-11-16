// import React, { useEffect, useMemo, useRef, useState } from "react";
// import "./EyeGazeFlow.css";
// import EyeIcon from "../icons/eye-care.png";
// import KeyboardWithInputEye from "./KeyboardWithInputEye";
// import popSound from "../sounds/ui-pop-sound-316482.mp3";

// // 8 calibration points (no center): corners + mids
// const CALIB_POINTS = [
//   { x: 12, y: 16 }, // top-left
//   { x: 88, y: 16 }, // top-right
//   { x: 12, y: 84 }, // bottom-left
//   { x: 88, y: 84 }, // bottom-right
//   { x: 50, y: 16 }, // top-center
//   { x: 50, y: 84 }, // bottom-center
//   { x: 12, y: 50 }, // mid-left
//   { x: 88, y: 50 }, // mid-right
// ];

// export default function EyeGazeFlow({ onBack, audioEnabled }) {
//   const [step, setStep] = useState("intro"); // 'intro' | 'calibrate' | 'success' | 'done'
//   const [index, setIndex] = useState(0);
//   const [hoveredElement, setHoveredElement] = useState(null);
//   const dwellTimerRef = useRef(null);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const stageRef = useRef(null);
//   const rafRef = useRef(0);
//   const hoverSoundRef = useRef(null);

//   const DWELL_TIME = 1000; // 1 second

//   // Initialize audio
//   useEffect(() => {
//     hoverSoundRef.current = new Audio(popSound);
//     hoverSoundRef.current.volume = 0.5;

//     return () => {
//       if (hoverSoundRef.current) hoverSoundRef.current = null;
//     };
//   }, []);

//   // Convert percent positions to style
//   const targetStyle = useMemo(() => {
//     const p = CALIB_POINTS[index];
//     return {
//       left: `${p.x}%`,
//       top: `${p.y}%`,
//     };
//   }, [index]);

//   // Start calibration after intro
//   const startCalibration = () => {
//     setStep("calibrate");
//     setIndex(0);
//   };

//   // Track mouse position (only when NOT in done step)
//   useEffect(() => {
//     if (step === "done") return; // Don't track mouse when keyboard is shown

//     const setVars = (x, y) => {
//       mouseRef.current = { x, y };
//       document.body.style.setProperty("--mouse-x", `${x}px`);
//       document.body.style.setProperty("--mouse-y", `${y}px`);
//     };

//     const onMove = (e) => {
//       setVars(e.clientX, e.clientY);
//     };
//     const onTouch = (e) => {
//       if (e.touches && e.touches[0]) {
//         setVars(e.touches[0].clientX, e.touches[0].clientY);
//       }
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("touchmove", onTouch, { passive: true });

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("touchmove", onTouch);
//     };
//   }, [step]);

//   // Dwell detection for buttons and calibration targets (only when NOT in done step)
//   useEffect(() => {
//     if (step === "done") return; // Don't run dwell detection when keyboard is shown

//     const checkHover = () => {
//       const { x, y } = mouseRef.current;
//       let found = null;

//       // Check buttons (start button)
//       const buttons = document.querySelectorAll(".primary");
//       buttons.forEach((btn) => {
//         const rect = btn.getBoundingClientRect();
//         if (
//           x >= rect.left &&
//           x <= rect.right &&
//           y >= rect.top &&
//           y <= rect.bottom
//         ) {
//           found = btn.className;
//         }
//       });

//       // Check calibration target if in calibrate step
//       if (step === "calibrate" && !found) {
//         const target = document.querySelector(".target");
//         if (target) {
//           const rect = target.getBoundingClientRect();
//           const THRESHOLD = 80;
//           const centerX = rect.left + rect.width / 2;
//           const centerY = rect.top + rect.height / 2;
//           const dx = x - centerX;
//           const dy = y - centerY;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist <= THRESHOLD) {
//             found = "target";
//           }
//         }
//       }

//       if (found !== hoveredElement) {
//         setHoveredElement(found);
//         // Play sound when starting to hover
//         if (found && hoverSoundRef.current) {
//           hoverSoundRef.current.currentTime = 0;
//           hoverSoundRef.current.play().catch(() => {});
//         }
//       }

//       rafRef.current = requestAnimationFrame(checkHover);
//     };

//     rafRef.current = requestAnimationFrame(checkHover);

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [hoveredElement, step]);

//   // Handle dwell timer and actions (only when NOT in done step)
//   useEffect(() => {
//     if (step === "done") return; // Don't handle dwell when keyboard is shown

//     if (dwellTimerRef.current) {
//       clearTimeout(dwellTimerRef.current);
//       dwellTimerRef.current = null;
//     }

//     if (hoveredElement) {
//       dwellTimerRef.current = setTimeout(() => {
//         if (hoveredElement === "primary" && step === "intro") {
//           startCalibration();
//         } else if (hoveredElement === "target" && step === "calibrate") {
//           setIndex((i) => {
//             if (i + 1 >= CALIB_POINTS.length) {
//               setStep("success");
//               return i;
//             }
//             return i + 1;
//           });
//         }
//       }, DWELL_TIME);
//     }

//     return () => {
//       if (dwellTimerRef.current) {
//         clearTimeout(dwellTimerRef.current);
//         dwellTimerRef.current = null;
//       }
//     };
//   }, [hoveredElement, step]);

//   // Update cursor fill state (only when NOT in done step)
//   useEffect(() => {
//     if (step === "done") {
//       // Reset cursor when keyboard is shown
//       document.body.style.setProperty("--dwell-duration", "0s");
//       document.body.style.setProperty(
//         "--cursor-fill",
//         "inset(100% 0 0 0 round 50%)"
//       );
//       return;
//     }

//     if (hoveredElement) {
//       document.body.style.setProperty("--dwell-duration", `${DWELL_TIME}ms`);
//       requestAnimationFrame(() => {
//         document.body.style.setProperty(
//           "--cursor-fill",
//           "inset(0 0 0 0 round 50%)"
//         );
//       });
//     } else {
//       document.body.style.setProperty("--dwell-duration", "0s");
//       requestAnimationFrame(() => {
//         document.body.style.setProperty(
//           "--cursor-fill",
//           "inset(100% 0 0 0 round 50%)"
//         );
//       });
//     }
//   }, [hoveredElement, step]);

//   // Auto-transition from success to done after 2 seconds
//   useEffect(() => {
//     if (step === "success") {
//       const timer = setTimeout(() => {
//         setStep("done");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [step]);

//   // Handle 'B' key press to go back to home
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "b" || e.key === "B") {
//         onBack && onBack();
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [onBack]);

//   return (
//     <div className="eye-wrapper">
//       {step === "intro" && (
//         <div className="panel intro">
//           <div className="panel-header">
//             <img src={EyeIcon} alt="Eye" />
//             <div className="panel-title">Eye-Gaze Setup</div>
//           </div>

//           <div className="panel-body">
//             <button className="primary">Follow and hold the pointer</button>
//           </div>
//         </div>
//       )}

//       {step === "calibrate" && (
//         <div className="calib-stage" aria-live="polite" ref={stageRef}>
//           {/* current target only */}
//           <div className="target" style={targetStyle} />
//           <div className="hint">
//             Look at the dot and hold ({index + 1}/{CALIB_POINTS.length})
//           </div>
//         </div>
//       )}

//       {step === "success" && (
//         <div className="success-screen">
//           <div className="success-card">
//             <div className="success-title">Eye-Gaze Setup Complete</div>
//             <div className="success-check">✓</div>
//           </div>
//         </div>
//       )}

//       {step === "done" && (
//         <KeyboardWithInputEye onClose={onBack} audioEnabled={audioEnabled} />
//       )}
//     </div>
//   );
// }

import React, { useEffect } from "react";
import "./HeadTrackingFlow.css";
import KeyboardWithInputLLM from "./KeyboardWithInputLLM";

export default function LLM({ onBack, audioEnabled }) {
  // Handle 'B' key press to go back to home
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "b" || e.key === "B") {
        onBack && onBack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onBack]);

  const handleModalityChange = (modality) => {
    if (modality === "home" || !modality) {
      onBack();
    } else {
      // Navigate to different modality
      onBack(modality);
    }
  };

  return (
    <div className="head-wrapper">
      <KeyboardWithInputLLM
        onClose={handleModalityChange}
        audioEnabled={audioEnabled}
      />
    </div>
  );
}
