# Multimodal Input App

An accessible input web application featuring multiple modalities - Head-Gaze, Voice Recognition, Switch Control along with LLM-powered keyboard prediction for text entry and interaction. Utilizes Text Generation, Speech-to-Text, and Text-to-Speech services for web applications from [huggingface/transformers.js](https://github.com/huggingface/transformers.js). And utilizes [Tracky-Mouse API](https://github.com/1j01/tracky-mouse) for head tracking based cursor control.

![](./assets/1-open.png)
![](./assets/3-llm.png)

## Setup

```bash
cd App
npm install
npm run dev
```

## Features

### 1. LLM-Based Text Prediction Keyboard

![](./assets/2-llm.png)
_LLM-powered predictions using Xenova/distilgpt2 from [huggingface/transformers.js](https://github.com/huggingface/transformers.js)_

![](./assets/4-llm.png)
![](./assets/5-llm.png)
_Blue keys represent the LLM's next word predictions_

![](./assets/5-llm-settings.png)
![](./assets/5-llm-switch.png)

### 2. Speech Recognition

![](./assets/6-speech.png)
_Speech-to-text using "Xenova/whisper-tiny.en" and text-to-speech using Web Speech API_
![](./assets/7-speech.png)
![](./assets/8-speech.png)
![](./assets/8-speech-switch.png)

### 3. Head Tracking

![](./assets/9-head.png)

![](./assets/11-head.png)

![](./assets/12-head.png)
_Head movement-based cursor control using [Tracky-Mouse API](https://github.com/1j01/tracky-mouse)_

![](./assets/12-head-switch.png)

### 4. Switch Control

Single-switch scanning interface for accessibility. Auto-scanning through keyboard rows with individual key highlighting.
![](./assets/13-switch.png)

![](./assets/1-switch.gif)

![](./assets/1-switch-gif.gif)

![](./assets/14-switch.png)

![](./assets/15-switch.png)

![](./assets/16-switch.png)

![](./assets/17-switch.png)

![](./assets/18-switch.png)

![](./assets/19-switch.png)
