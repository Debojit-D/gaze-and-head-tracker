import { pipeline, env } from "@huggingface/transformers";

// Configure environment
env.allowLocalModels = false;
env.useBrowserCache = false;
env.allowRemoteModels = true;

/**
 * Text-to-Speech Service using Transformers.js
 * Uses MMS-TTS model for faster, lighter-weight speech synthesis
 */
class TextToSpeechService {
  constructor() {
    this.synthesizer = null;
    this.initPromise = null;
    this.isReady = false;

    // Using MMS-TTS English model (faster and smaller)
    this.modelId = "Xenova/mms-tts-eng";
  }

  /**
   * Initialize the text-to-speech pipeline
   */
  async initialize() {
    if (this.synthesizer) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        console.log(`Initializing Text-to-Speech with model: ${this.modelId}`);

        this.synthesizer = await pipeline("text-to-speech", this.modelId, {
          quantized: false,
          progress_callback: (progress) => {
            if (progress.status === "downloading") {
              console.log(
                `Downloading: ${progress.name} - ${Math.round(progress.progress)}%`
              );
            }
          },
        });

        this.isReady = true;
        console.log("Text-to-Speech pipeline initialized successfully");
        return true;
      } catch (error) {
        console.error("Failed to initialize Text-to-Speech:", error);
        this.synthesizer = null;
        this.initPromise = null;
        this.isReady = false;
        return false;
      }
    })();

    return this.initPromise;
  }

  /**
   * Convert text to speech and return audio
   * @param {string} text - Text to convert to speech
   * @returns {Promise<Object>} - Audio data with sample rate
   */
  async synthesize(text) {
    if (!this.isReady) {
      await this.initialize();
    }

    if (!text || text.trim() === "") {
      throw new Error("Text cannot be empty");
    }

    try {
      console.log("Synthesizing speech...");

      // MMS-TTS doesn't need speaker embeddings
      const result = await this.synthesizer(text);

      console.log("Speech synthesis complete");
      return result;
    } catch (error) {
      console.error("Speech synthesis error:", error);
      throw error;
    }
  }

  /**
   * Convert text to speech and play it
   * @param {string} text - Text to speak
   * @returns {Promise<void>}
   */
  async speak(text) {
    try {
      const result = await this.synthesize(text);

      console.log("Synthesis result:", result);

      // Extract audio data from result
      let audioData;
      if (result.audio) {
        audioData = result.audio;
      } else if (result.data) {
        audioData = result.data;
      } else if (Array.isArray(result)) {
        audioData = result;
      } else {
        // The result itself might be the audio data
        audioData = result;
      }

      // Get sample rate from result or use default
      const sampleRate = result.sampling_rate || 16000;

      console.log(`Audio data length: ${audioData.length}, Sample rate: ${sampleRate}`);

      // Create audio context and convert to AudioBuffer
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: sampleRate,
      });

      // Create AudioBuffer from Float32Array
      const audioBuffer = audioContext.createBuffer(
        1, // mono
        audioData.length,
        sampleRate
      );

      // Copy audio data to buffer
      audioBuffer.getChannelData(0).set(audioData);

      // Play the audio
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);

      // Return promise that resolves when audio finishes
      return new Promise((resolve) => {
        source.onended = () => {
          audioContext.close();
          resolve();
        };
      });
    } catch (error) {
      console.error("Error playing speech:", error);
      throw error;
    }
  }

  /**
   * Convert text to speech and return as downloadable Blob
   * @param {string} text - Text to convert
   * @returns {Promise<Blob>} - Audio blob (WAV format)
   */
  async synthesizeToBlob(text) {
    const result = await this.synthesize(text);

    // Extract audio data
    let audioData;
    if (result.audio) {
      audioData = result.audio;
    } else if (result.data) {
      audioData = result.data;
    } else if (Array.isArray(result)) {
      audioData = result;
    } else {
      audioData = result;
    }

    const sampleRate = result.sampling_rate || 16000;

    // Convert to WAV Blob
    const wavBlob = this.floatArrayToWav(audioData, sampleRate);
    return wavBlob;
  }

  /**
   * Convert Float32Array audio data to WAV Blob
   * @param {Float32Array} audioData - Audio samples
   * @param {number} sampleRate - Sample rate (Hz)
   * @returns {Blob}
   */
  floatArrayToWav(audioData, sampleRate) {
    const numberOfChannels = 1; // Mono
    const format = 1; // PCM
    const bitDepth = 16;

    const buffer = new ArrayBuffer(44 + audioData.length * 2);
    const view = new DataView(buffer);

    // Write WAV header
    this.writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + audioData.length * 2, true);
    this.writeString(view, 8, "WAVE");
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, format, true); // AudioFormat (PCM)
    view.setUint16(22, numberOfChannels, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * numberOfChannels * (bitDepth / 8), true); // ByteRate
    view.setUint16(32, numberOfChannels * (bitDepth / 8), true); // BlockAlign
    view.setUint16(34, bitDepth, true); // BitsPerSample
    this.writeString(view, 36, "data");
    view.setUint32(40, audioData.length * 2, true); // Subchunk2Size

    // Write audio data
    this.floatTo16BitPCM(view, 44, audioData);

    return new Blob([buffer], { type: "audio/wav" });
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  floatTo16BitPCM(view, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  }

  /**
   * Dispose of the pipeline
   */
  async dispose() {
    if (this.synthesizer) {
      if (typeof this.synthesizer.dispose === "function") {
        await this.synthesizer.dispose();
      }
      this.synthesizer = null;
      this.isReady = false;
      this.initPromise = null;
      console.log("Text-to-Speech pipeline disposed");
    }
  }
}

// Singleton instance
const textToSpeechService = new TextToSpeechService();

export default textToSpeechService;


// import { pipeline, env } from "@huggingface/transformers";

// // Configure environment
// env.allowLocalModels = false;
// env.useBrowserCache = false;
// env.allowRemoteModels = true;

// /**
//  * Text-to-Speech Service using Transformers.js
//  * Converts text to speech audio
//  */
// class TextToSpeechService {
//   constructor() {
//     this.synthesizer = null;
//     this.initPromise = null;
//     this.isReady = false;

//     // Available models:
//     // - Xenova/speecht5_tts (best quality, ~200MB)
//     // - Xenova/mms-tts-eng (smaller, ~150MB, English)

//     this.modelId = "Xenova/speecht5_tts";
//     this.speaker_embeddings = "Xenova/speecht5_tts"; // For voice characteristics
//   }

//   /**
//    * Initialize the text-to-speech pipeline
//    */
//   async initialize() {
//     if (this.synthesizer) return true;
//     if (this.initPromise) return this.initPromise;

//     this.initPromise = (async () => {
//       try {
//         console.log(`Initializing Text-to-Speech with model: ${this.modelId}`);

//         this.synthesizer = await pipeline("text-to-speech", this.modelId, {
//           dtype: "fp32",
//           progress_callback: (progress) => {
//             if (progress.status === "downloading") {
//               console.log(
//                 `Downloading: ${progress.name} - ${Math.round(
//                   progress.progress
//                 )}%`
//               );
//             }
//           },
//         });

//         this.isReady = true;
//         console.log("Text-to-Speech pipeline initialized successfully");
//         return true;
//       } catch (error) {
//         console.error("Failed to initialize Text-to-Speech:", error);
//         this.synthesizer = null;
//         this.initPromise = null;
//         this.isReady = false;
//         return false;
//       }
//     })();

//     return this.initPromise;
//   }

//   /**
//    * Convert text to speech and return audio
//    * @param {string} text - Text to convert to speech
//    * @param {number} speakerId - Speaker voice ID (0-109 for different voices)
//    * @returns {Promise<AudioBuffer>} - Audio buffer that can be played
//    */
//   async synthesize(text, speakerId = 0) {
//     if (!this.isReady) {
//       await this.initialize();
//     }

//     if (!text || text.trim() === "") {
//       throw new Error("Text cannot be empty");
//     }

//     try {
//       console.log("Synthesizing speech...");

//       const result = await this.synthesizer(text, {
//         speaker_embeddings: `https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin`,
//       });

//       console.log("Speech synthesis complete");
//       return result;
//     } catch (error) {
//       console.error("Speech synthesis error:", error);
//       throw error;
//     }
//   }

//   /**
//    * Convert text to speech and play it
//    * @param {string} text - Text to speak
//    * @param {number} speakerId - Voice ID
//    * @returns {Promise<void>}
//    */
//   async speak(text, speakerId = 0) {
//     try {
//       const result = await this.synthesize(text, speakerId);

//       console.log("Synthesis result:", result);

//       // The result contains audio data - extract it properly
//       let audioData;
//       if (result.audio) {
//         audioData = result.audio;
//       } else if (result.data) {
//         audioData = result.data;
//       } else if (Array.isArray(result)) {
//         audioData = result;
//       } else {
//         audioData = result;
//       }

//       // Get sample rate from result or use default
//       const sampleRate = result.sampling_rate || 16000;

//       // Create audio context and convert to AudioBuffer
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)({
//         sampleRate: sampleRate,
//       });

//       // Create AudioBuffer from Float32Array
//       const audioBuffer = audioContext.createBuffer(
//         1, // mono
//         audioData.length,
//         sampleRate
//       );

//       // Copy audio data to buffer
//       audioBuffer.getChannelData(0).set(audioData);

//       // Play the audio
//       const source = audioContext.createBufferSource();
//       source.buffer = audioBuffer;
//       source.connect(audioContext.destination);
//       source.start(0);

//       // Return promise that resolves when audio finishes
//       return new Promise((resolve) => {
//         source.onended = () => {
//           audioContext.close();
//           resolve();
//         };
//       });
//     } catch (error) {
//       console.error("Error playing speech:", error);
//       throw error;
//     }
//   }

//   /**
//    * Convert text to speech and return as downloadable Blob
//    * @param {string} text - Text to convert
//    * @returns {Promise<Blob>} - Audio blob (WAV format)
//    */
//   async synthesizeToBlob(text) {
//     const audioBuffer = await this.synthesize(text);

//     // Convert AudioBuffer to WAV Blob
//     const wavBlob = this.audioBufferToWav(audioBuffer);
//     return wavBlob;
//   }

//   /**
//    * Convert AudioBuffer to WAV Blob
//    * @param {AudioBuffer} audioBuffer
//    * @returns {Blob}
//    */
//   audioBufferToWav(audioBuffer) {
//     const numberOfChannels = audioBuffer.numberOfChannels;
//     const sampleRate = audioBuffer.sampleRate;
//     const format = 1; // PCM
//     const bitDepth = 16;

//     let result;
//     if (numberOfChannels === 2) {
//       result = this.interleave(
//         audioBuffer.getChannelData(0),
//         audioBuffer.getChannelData(1)
//       );
//     } else {
//       result = audioBuffer.getChannelData(0);
//     }

//     const buffer = new ArrayBuffer(44 + result.length * 2);
//     const view = new DataView(buffer);

//     // Write WAV header
//     this.writeString(view, 0, "RIFF");
//     view.setUint32(4, 36 + result.length * 2, true);
//     this.writeString(view, 8, "WAVE");
//     this.writeString(view, 12, "fmt ");
//     view.setUint32(16, 16, true);
//     view.setUint16(20, format, true);
//     view.setUint16(22, numberOfChannels, true);
//     view.setUint32(24, sampleRate, true);
//     view.setUint32(28, sampleRate * numberOfChannels * (bitDepth / 8), true);
//     view.setUint16(32, numberOfChannels * (bitDepth / 8), true);
//     view.setUint16(34, bitDepth, true);
//     this.writeString(view, 36, "data");
//     view.setUint32(40, result.length * 2, true);

//     // Write audio data
//     this.floatTo16BitPCM(view, 44, result);

//     return new Blob([buffer], { type: "audio/wav" });
//   }

//   writeString(view, offset, string) {
//     for (let i = 0; i < string.length; i++) {
//       view.setUint8(offset + i, string.charCodeAt(i));
//     }
//   }

//   floatTo16BitPCM(view, offset, input) {
//     for (let i = 0; i < input.length; i++, offset += 2) {
//       const s = Math.max(-1, Math.min(1, input[i]));
//       view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
//     }
//   }

//   interleave(left, right) {
//     const length = left.length + right.length;
//     const result = new Float32Array(length);

//     let inputIndex = 0;
//     for (let i = 0; i < length; ) {
//       result[i++] = left[inputIndex];
//       result[i++] = right[inputIndex];
//       inputIndex++;
//     }
//     return result;
//   }

//   /**
//    * Dispose of the pipeline
//    */
//   async dispose() {
//     if (this.synthesizer) {
//       if (typeof this.synthesizer.dispose === "function") {
//         await this.synthesizer.dispose();
//       }
//       this.synthesizer = null;
//       this.isReady = false;
//       this.initPromise = null;
//       console.log("Text-to-Speech pipeline disposed");
//     }
//   }
// }

// // Singleton instance
// const textToSpeechService = new TextToSpeechService();

// export default textToSpeechService;
