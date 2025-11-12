import cv2
import mediapipe as mp
import pyautogui
import numpy as np

pyautogui.FAILSAFE = False

mp_face_mesh = mp.solutions.face_mesh


class HeadGazeMouseController:
    def __init__(self):
        # ===== TUNABLE CONFIG =====
        # Smoothing: 0 = no smoothing, 1 = super slow
        self.SMOOTHING = 0.35

        # Normalized ROI in camera space that maps to full screen.
        # Smaller range => more sensitive (less head motion -> full screen).
        self.X_MIN = 0.25
        self.X_MAX = 0.75
        self.Y_MIN = 0.25
        self.Y_MAX = 0.95

        # Use a stable landmark near the eyes / nose bridge
        self.LANDMARK_INDEX = 1

        # ==========================
        self.screen_w, self.screen_h = pyautogui.size()
        self.prev_x = self.screen_w // 2
        self.prev_y = self.screen_h // 2

    def map_norm_to_screen(self, x_norm, y_norm):
        """Map normalized landmark coords -> screen coords using ROI."""
        x_clamped = np.clip(x_norm, self.X_MIN, self.X_MAX)
        y_clamped = np.clip(y_norm, self.Y_MIN, self.Y_MAX)

        if self.X_MAX <= self.X_MIN or self.Y_MAX <= self.Y_MIN:
            return self.prev_x, self.prev_y

        # Re-normalize within ROI
        x_rel = (x_clamped - self.X_MIN) / (self.X_MAX - self.X_MIN)
        y_rel = (y_clamped - self.Y_MIN) / (self.Y_MAX - self.Y_MIN)

        target_x = int(x_rel * self.screen_w)
        target_y = int(y_rel * self.screen_h)
        return target_x, target_y

    def smooth(self, target_x, target_y):
        """Exponential smoothing for less jitter."""
        x = int(self.prev_x + self.SMOOTHING * (target_x - self.prev_x))
        y = int(self.prev_y + self.SMOOTHING * (target_y - self.prev_y))
        self.prev_x, self.prev_y = x, y
        return x, y

    def draw_overlay(self, frame, x_norm, y_norm, cursor_x, cursor_y):
        """Nice HUD + ROI + cursor indicator."""
        h, w, _ = frame.shape

        # Top translucent bar
        overlay = frame.copy()
        cv2.rectangle(overlay, (0, 0), (w, 60), (0, 0, 0), -1)
        frame[:] = cv2.addWeighted(overlay, 0.35, frame, 0.65, 0)

        # ROI box: where your head should move
        x1 = int(self.X_MIN * w)
        x2 = int(self.X_MAX * w)
        y1 = int(self.Y_MIN * h)
        y2 = int(self.Y_MAX * h)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (180, 180, 255), 1)

        # Tracked landmark (green dot)
        if x_norm is not None and y_norm is not None:
            cx = int(x_norm * w)
            cy = int(y_norm * h)
            cv2.circle(frame, (cx, cy), 5, (0, 255, 0), -1)

        # Cursor indicator mapped back into camera view (white crosshair)
        fx = int(cursor_x / self.screen_w * w)
        fy = int(cursor_y / self.screen_h * h)
        cv2.circle(frame, (fx, fy), 7, (255, 255, 255), 2)
        cv2.line(frame, (fx - 10, fy), (fx + 10, fy), (255, 255, 255), 1)
        cv2.line(frame, (fx, fy - 10), (fx, fy + 10), (255, 255, 255), 1)

        # Text labels
        cv2.putText(
            frame,
            "HeadGazeFusion - Head-controlled cursor",
            (10, 25),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2,
        )
        cv2.putText(
            frame,
            "ESC / Q: Quit  |  Move head inside box to span full screen",
            (10, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (220, 220, 220),
            1,
        )

        return frame

    def run(self):
        # cap = cv2.VideoCapture(0) was not working for mac, so changed to below line
        cap = cv2.VideoCapture(1)
        if not cap.isOpened():
            print("Error: Could not open webcam.")
            return

        with mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        ) as face_mesh:
            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Error: Failed to read frame from webcam.")
                    break

                # Mirror view for intuitiveness
                frame = cv2.flip(frame, 1)

                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = face_mesh.process(rgb_frame)

                x_norm = y_norm = None

                if results.multi_face_landmarks:
                    lm = results.multi_face_landmarks[0].landmark
                    if len(lm) > self.LANDMARK_INDEX:
                        p = lm[self.LANDMARK_INDEX]
                        x_norm, y_norm = p.x, p.y

                        # Map → smooth → move cursor
                        target_x, target_y = self.map_norm_to_screen(x_norm, y_norm)
                        smooth_x, smooth_y = self.smooth(target_x, target_y)
                        pyautogui.moveTo(smooth_x, smooth_y, duration=0)

                        frame = self.draw_overlay(frame, x_norm, y_norm,
                                                  smooth_x, smooth_y)
                    else:
                        frame = self.draw_overlay(frame, None, None,
                                                  self.prev_x, self.prev_y)
                else:
                    frame = self.draw_overlay(frame, None, None,
                                              self.prev_x, self.prev_y)

                cv2.imshow("HeadGazeFusion - Head-controlled cursor", frame)

                key = cv2.waitKey(1) & 0xFF
                if key == 27 or key in (ord("q"), ord("Q")):
                    break

        cap.release()
        cv2.destroyAllWindows()


def main():
    controller = HeadGazeMouseController()
    controller.run()


if __name__ == "__main__":
    main()
