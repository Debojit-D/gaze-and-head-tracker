import { pipeline, env } from "@huggingface/transformers";

// Configure environment
env.allowLocalModels = false;
env.useBrowserCache = false;
env.allowRemoteModels = true;

/**
 * Speech-to-Text Service using Transformers.js
 * Converts audio input to text using Whisper models
 */
class SpeechToTextService {
  constructor() {
    this.transcriber = null;
    this.initPromise = null;
    this.isReady = false;

    // Recommended models (in order of size/speed):
    // - Xenova/whisper-tiny.en (fastest, English only, ~150MB)
    // - Xenova/whisper-base.en (balanced, English only, ~290MB)
    // - Xenova/whisper-small.en (good quality, English only, ~960MB)
    // - Xenova/whisper-tiny (multilingual, ~150MB)
    // - Xenova/whisper-base (multilingual, ~290MB)

    this.modelId = "Xenova/whisper-tiny.en"; // Fast and good for English
  }

  /**
   * Initialize the speech recognition pipeline
   */
  async initialize() {
    if (this.transcriber) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        console.log(`Initializing Speech-to-Text with model: ${this.modelId}`);

        this.transcriber = await pipeline(
          "automatic-speech-recognition",
          this.modelId,
          {
            dtype: "fp32",
            progress_callback: (progress) => {
              if (progress.status === "downloading") {
                console.log(
                  `Downloading: ${progress.name} - ${Math.round(
                    progress.progress
                  )}%`
                );
              }
            },
          }
        );

        this.isReady = true;
        console.log("Speech-to-Text pipeline initialized successfully");
        return true;
      } catch (error) {
        console.error("Failed to initialize Speech-to-Text:", error);
        this.transcriber = null;
        this.initPromise = null;
        this.isReady = false;
        return false;
      }
    })();

    return this.initPromise;
  }

  /**
   * Convert audio blob to format expected by Whisper
   * @param {Blob} audioBlob - Audio blob from MediaRecorder
   * @returns {Promise<Float32Array>} - Audio samples as Float32Array
   */
  async convertBlobToAudio(audioBlob) {
    // Create an AudioContext to decode the audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)(
      {
        sampleRate: 16000, // Whisper expects 16kHz
      }
    );

    // Convert blob to array buffer
    const arrayBuffer = await audioBlob.arrayBuffer();

    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Get the audio data as Float32Array (mono channel)
    let audioData = audioBuffer.getChannelData(0);

    // If sample rate is not 16kHz, we may need to resample
    // For now, we'll just use the data as-is since we set the context to 16kHz

    await audioContext.close();

    return audioData;
  }

  /**
   * Transcribe audio from a File or Blob
   * @param {File|Blob} audioFile - Audio file (mp3, wav, ogg, etc.)
   * @returns {Promise<string>} - Transcribed text
   */
  async transcribeFile(audioFile) {
    if (!this.isReady) {
      await this.initialize();
    }

    try {
      console.log("Transcribing audio file...");

      // Convert blob to audio data
      const audioData = await this.convertBlobToAudio(audioFile);

      const result = await this.transcriber(audioData, {
        chunk_length_s: 30, // Process in 30-second chunks
        stride_length_s: 5, // Overlap between chunks
        return_timestamps: false, // Set to true if you need word timings
      });

      console.log("Transcription result:", result);
      return result.text;
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }

  /**
   * Transcribe audio from URL
   * @param {string} audioUrl - URL to audio file
   * @returns {Promise<string>} - Transcribed text
   */
  async transcribeUrl(audioUrl) {
    if (!this.isReady) {
      await this.initialize();
    }

    try {
      console.log("Transcribing audio from URL...");

      // Fetch the audio file
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();

      // Convert to audio data
      const audioData = await this.convertBlobToAudio(audioBlob);

      const result = await this.transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
      });

      return result.text;
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }

  /**
   * Transcribe with timestamps (for subtitles, word highlighting, etc.)
   * @param {File|Blob|string} audio - Audio file or URL
   * @returns {Promise<Object>} - Transcription with timestamps
   */
  async transcribeWithTimestamps(audio) {
    if (!this.isReady) {
      await this.initialize();
    }

    try {
      let audioData;

      if (typeof audio === "string") {
        // It's a URL
        const response = await fetch(audio);
        const audioBlob = await response.blob();
        audioData = await this.convertBlobToAudio(audioBlob);
      } else {
        // It's a File or Blob
        audioData = await this.convertBlobToAudio(audio);
      }

      const result = await this.transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: "word", // Can be 'word' or true (for sentence-level)
      });

      console.log("Transcription with timestamps:", result);

      // Result format:
      // {
      //   text: "full transcription",
      //   chunks: [
      //     { text: "word", timestamp: [0.5, 1.2] },
      //     ...
      //   ]
      // }

      return result;
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }

  /**
   * Transcribe from MediaRecorder (live recording)
   * @param {Blob} audioBlob - Audio blob from MediaRecorder
   * @returns {Promise<string>} - Transcribed text
   */
  async transcribeRecording(audioBlob) {
    return this.transcribeFile(audioBlob);
  }

  /**
   * Dispose of the pipeline
   */
  async dispose() {
    if (this.transcriber) {
      if (typeof this.transcriber.dispose === "function") {
        await this.transcriber.dispose();
      }
      this.transcriber = null;
      this.isReady = false;
      this.initPromise = null;
      console.log("Speech-to-Text pipeline disposed");
    }
  }
}

// Singleton instance
const speechToTextService = new SpeechToTextService();

export default speechToTextService;
