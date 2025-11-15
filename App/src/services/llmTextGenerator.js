import { pipeline, env } from "@xenova/transformers";
// import { pipeline, env } from "@huggingface/transformers";

// Configure transformers environment to handle caching better
// Disable browser cache to avoid cache errors
env.allowLocalModels = false;
env.useBrowserCache = false;
env.allowRemoteModels = true;

/**
 * LLM Text Generator Service
 * Provides next-word prediction suggestions using Transformers.js
 * Uses Singleton pattern to ensure only one instance of the pipeline is loaded
 */
class LLMTextGenerator {
  constructor() {
    this.pipeline = null;
    this.initPromise = null;
    this.isReady = false;
    // Using distilgpt2 for faster performance (smaller model, quicker loading)
    this.modelId = "Xenova/distilgpt2";
  }

  /**
   * Initialize the text generation pipeline
   * @returns {Promise<boolean>}
   */
  async initialize() {
    if (this.pipeline) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        console.log(
          `Initializing LLM text generation pipeline with model: ${this.modelId}`
        );

        this.pipeline = await pipeline("text-generation", this.modelId, {
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
        });

        this.isReady = true;
        console.log("LLM pipeline initialized successfully");
        return true;
      } catch (error) {
        console.error("Failed to initialize LLM pipeline:", error);
        this.pipeline = null;
        this.initPromise = null;
        this.isReady = false;
        return false;
      }
    })();

    return this.initPromise;
  }

  /**
   * Generate next word suggestions based on the input text
   * @param {string} inputText - The text to continue from
   * @param {number} numSuggestions - Number of suggestions to return (default: 8)
   * @returns {Promise<string[]>} - Array of suggested next words/phrases
   */
  async getSuggestions(inputText, numSuggestions = 8) {
    if (!this.isReady) {
      console.warn("LLM pipeline not ready, initializing now...");
      await this.initialize();
    }

    if (!inputText || inputText.trim() === "") {
      return [];
    }

    try {
      // Add priming context for better generation when input is short
      const primedText = this.addPrimingContext(inputText);

      // Generate text continuation with improved parameters
      const outputs = await this.pipeline(primedText, {
        max_new_tokens: 25,
        num_return_sequences: numSuggestions * 4,
        temperature: 0.9,
        top_k: 60,
        top_p: 0.95,
        do_sample: true,
        repetition_penalty: 1.3,
      });

      // Extract next words/phrases from generated sequences
      const suggestions = this.extractNextWordsAndPhrases(
        primedText,
        outputs,
        inputText
      );

      // Remove duplicates and filter
      const uniqueSuggestions = [...new Set(suggestions)]
        .filter((item) => item && item.length > 0 && item.length < 40)
        .slice(0, numSuggestions);

      console.log("Generated suggestions:", uniqueSuggestions);
      return uniqueSuggestions;
    } catch (error) {
      console.error("Error generating suggestions:", error);
      return [];
    }
  }

  /**
   * Add priming context to help model generate better suggestions
   * @param {string} inputText - Original user input
   * @returns {string} - Text with priming context
   */
  addPrimingContext(inputText) {
    const text = inputText.trim().toLowerCase();
    const words = text.split(/\s+/);

    // If text is very short (1-2 words), add helpful context
    if (words.length <= 2) {
      // Common sentence starters to help the model understand context
      const contextPhrases = [
        "In a conversation, someone might say: ",
        "A person is thinking: ",
        "They want to express: ",
      ];
      const randomContext =
        contextPhrases[Math.floor(Math.random() * contextPhrases.length)];
      return randomContext + inputText;
    }

    // For longer text, use as-is
    return inputText;
  }

  /**
   * Extract next words AND phrases (1-3 words) from generated text
   * @param {string} primedText - Text with priming context
   * @param {Array} outputs - Generated outputs from the pipeline
   * @param {string} originalInput - Original user input (without priming)
   * @returns {string[]} - Array of next words and phrases
   */
  extractNextWordsAndPhrases(primedText, outputs, originalInput) {
    const suggestions = [];

    for (const output of outputs) {
      const generatedText = output.generated_text;

      // Remove the primed text to get only the new part
      let newText = generatedText.slice(primedText.length).trim();

      // If we used priming, also try to extract from after the original input
      if (
        primedText !== originalInput &&
        generatedText.includes(originalInput)
      ) {
        const afterOriginal = generatedText.split(originalInput)[1];
        if (afterOriginal) {
          newText = afterOriginal.trim();
        }
      }

      if (newText) {
        // Split into words, clean punctuation
        const words = newText
          .split(/\s+/)
          .map((w) => w.replace(/[.,!?;:]+$/, "").trim());

        // Strategy 1: Single word
        if (words[0] && /^[a-zA-Z'-]+$/.test(words[0])) {
          suggestions.push(words[0].toLowerCase());
        }

        // Strategy 2: Two-word phrase
        if (words.length >= 2 && words[0] && words[1]) {
          const twoWords = `${words[0]} ${words[1]}`;
          if (/^[a-zA-Z' -]+$/.test(twoWords) && twoWords.length <= 30) {
            suggestions.push(twoWords.toLowerCase());
          }
        }

        // Strategy 3: Three-word phrase
        if (words.length >= 3 && words[0] && words[1] && words[2]) {
          const threeWords = `${words[0]} ${words[1]} ${words[2]}`;
          if (/^[a-zA-Z' -]+$/.test(threeWords) && threeWords.length <= 40) {
            suggestions.push(threeWords.toLowerCase());
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Legacy method: Extract single words only (kept for backwards compatibility)
   * @param {string} originalText - Original input text
   * @param {Array} outputs - Generated outputs from the pipeline
   * @returns {string[]} - Array of next words
   */
  extractNextWords(originalText, outputs) {
    const suggestions = [];

    for (const output of outputs) {
      const generatedText = output.generated_text;
      const newText = generatedText.slice(originalText.length).trim();

      if (newText) {
        const words = newText.split(/\s+/);
        if (words[0]) {
          let word = words[0].replace(/[.,!?;:]+$/, "").trim();
          if (
            word.length > 0 &&
            word.length < 20 &&
            /^[a-zA-Z'-]+$/.test(word)
          ) {
            suggestions.push(word.toLowerCase());
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Get multiple suggestions including context-aware predictions
   * This method generates more diverse suggestions by trying different approaches
   * @param {string} inputText - The input text
   * @param {number} count - Number of suggestions needed
   * @returns {Promise<string[]>} - Array of suggested words/phrases
   */
  async getMultipleSuggestions(inputText, count = 18) {
    if (!this.isReady) {
      await this.initialize();
    }

    try {
      // Add priming context
      const primedText = this.addPrimingContext(inputText);

      // Get initial suggestions
      const suggestions = await this.getSuggestions(inputText, count);

      // If we don't have enough suggestions, try with different parameters
      if (suggestions.length < count) {
        const additionalOutputs = await this.pipeline(primedText, {
          max_new_tokens: 25,
          num_return_sequences: (count - suggestions.length) * 3,
          temperature: 1.1,
          top_k: 80,
          top_p: 0.98,
          do_sample: true,
          repetition_penalty: 1.4,
        });

        const additionalSuggestions = this.extractNextWordsAndPhrases(
          primedText,
          additionalOutputs,
          inputText
        );
        suggestions.push(...additionalSuggestions);
      }

      // Return unique suggestions
      return [...new Set(suggestions)]
        .filter((item) => item && item.length > 0 && item.length < 40)
        .slice(0, count);
    } catch (error) {
      console.error("Error generating multiple suggestions:", error);
      return [];
    }
  }

  /**
   * Dispose of the pipeline and free up resources
   */
  async dispose() {
    if (this.pipeline) {
      // Note: dispose method may not be available in all versions
      if (typeof this.pipeline.dispose === "function") {
        await this.pipeline.dispose();
      }
      this.pipeline = null;
      this.isReady = false;
      this.initPromise = null;
      console.log("LLM pipeline disposed");
    }
  }
}

// Create and export a singleton instance
const llmTextGenerator = new LLMTextGenerator();

export default llmTextGenerator;
