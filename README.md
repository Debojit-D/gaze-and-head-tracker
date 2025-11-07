
# gaze-and-head-tracker

Minimal starter scripts for head-controlled and eye-gaze-controlled mouse input using MediaPipe.

## Requirements

- Python 3.8+
- Webcam
- Recommended OS: Linux / Windows (X11 on Linux works best for `pyautogui`)

## Installation

### 1. Create and activate a virtual environment (recommended)

**venv (built-in)**

```bash
python3 -m venv .venv
source .venv/bin/activate      # Linux/macOS
# .venv\Scripts\activate       # Windows
````

**or Conda**

```bash
conda create -n gaze-head python=3.10 -y
conda activate gaze-head
```

### 2. Install dependencies

```bash
pip install opencv-python mediapipe pyautogui numpy
```

## Usage

```bash
python head_tracking.py    # Head-controlled cursor
python gaze_tracking.py    # Eye-gaze-controlled cursor
```

Press `ESC` or `Q` to quit.

```
::contentReference[oaicite:0]{index=0}
```
