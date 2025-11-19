# pipelines

Pipelines provide a high-level, easy to use, API for running machine learning models.

**Example:** Instantiate pipeline using the `pipeline` function.

```javascript
import { pipeline } from "@huggingface/transformers";

const classifier = await pipeline("sentiment-analysis");
const output = await classifier("I love transformers!");
// [{'label': 'POSITIVE', 'score': 0.999817686}]
```

- [pipelines](#pipelines)
  - [pipelines.Pipeline](#pipelinespipeline)
    - [`new Pipeline(options)`](#new-pipelineoptions)
    - [`pipeline.dispose()` : DisposeType](#pipelinedispose--disposetype)
  - [pipelines.TextClassificationPipeline](#pipelinestextclassificationpipeline)
    - [`new TextClassificationPipeline(options)`](#new-textclassificationpipelineoptions)
    - [`textClassificationPipeline._call()` : TextClassificationPipelineCallback](#textclassificationpipeline_call--textclassificationpipelinecallback)
  - [pipelines.TokenClassificationPipeline](#pipelinestokenclassificationpipeline)
    - [`new TokenClassificationPipeline(options)`](#new-tokenclassificationpipelineoptions)
    - [`tokenClassificationPipeline._call()` : TokenClassificationPipelineCallback](#tokenclassificationpipeline_call--tokenclassificationpipelinecallback)
  - [pipelines.QuestionAnsweringPipeline](#pipelinesquestionansweringpipeline)
    - [`new QuestionAnsweringPipeline(options)`](#new-questionansweringpipelineoptions)
    - [`questionAnsweringPipeline._call()` : QuestionAnsweringPipelineCallback](#questionansweringpipeline_call--questionansweringpipelinecallback)
  - [pipelines.FillMaskPipeline](#pipelinesfillmaskpipeline)
    - [`new FillMaskPipeline(options)`](#new-fillmaskpipelineoptions)
    - [`fillMaskPipeline._call()` : FillMaskPipelineCallback](#fillmaskpipeline_call--fillmaskpipelinecallback)
  - [pipelines.Text2TextGenerationPipeline](#pipelinestext2textgenerationpipeline)
    - [`new Text2TextGenerationPipeline(options)`](#new-text2textgenerationpipelineoptions)
    - [`text2TextGenerationPipeline._key` : 'generated\_text'](#text2textgenerationpipeline_key--generated_text)
    - [`text2TextGenerationPipeline._call()` : Text2TextGenerationPipelineCallback](#text2textgenerationpipeline_call--text2textgenerationpipelinecallback)
  - [pipelines.SummarizationPipeline](#pipelinessummarizationpipeline)
    - [`new SummarizationPipeline(options)`](#new-summarizationpipelineoptions)
    - [`summarizationPipeline._key` : 'summary\_text'](#summarizationpipeline_key--summary_text)
  - [pipelines.TranslationPipeline](#pipelinestranslationpipeline)
    - [`new TranslationPipeline(options)`](#new-translationpipelineoptions)
    - [`translationPipeline._key` : 'translation\_text'](#translationpipeline_key--translation_text)
  - [pipelines.TextGenerationPipeline](#pipelinestextgenerationpipeline)
    - [`new TextGenerationPipeline(options)`](#new-textgenerationpipelineoptions)
    - [`textGenerationPipeline._call()` : TextGenerationPipelineCallback](#textgenerationpipeline_call--textgenerationpipelinecallback)
  - [pipelines.ZeroShotClassificationPipeline](#pipelineszeroshotclassificationpipeline)
    - [`new ZeroShotClassificationPipeline(options)`](#new-zeroshotclassificationpipelineoptions)
    - [`zeroShotClassificationPipeline.model` : any](#zeroshotclassificationpipelinemodel--any)
    - [`zeroShotClassificationPipeline._call()` : ZeroShotClassificationPipelineCallback](#zeroshotclassificationpipeline_call--zeroshotclassificationpipelinecallback)
  - [pipelines.FeatureExtractionPipeline](#pipelinesfeatureextractionpipeline)
    - [`new FeatureExtractionPipeline(options)`](#new-featureextractionpipelineoptions)
    - [`featureExtractionPipeline._call()` : FeatureExtractionPipelineCallback](#featureextractionpipeline_call--featureextractionpipelinecallback)
  - [pipelines.ImageFeatureExtractionPipeline](#pipelinesimagefeatureextractionpipeline)
    - [`new ImageFeatureExtractionPipeline(options)`](#new-imagefeatureextractionpipelineoptions)
    - [`imageFeatureExtractionPipeline._call()` : ImageFeatureExtractionPipelineCallback](#imagefeatureextractionpipeline_call--imagefeatureextractionpipelinecallback)
  - [pipelines.AudioClassificationPipeline](#pipelinesaudioclassificationpipeline)
    - [`new AudioClassificationPipeline(options)`](#new-audioclassificationpipelineoptions)
    - [`audioClassificationPipeline._call()` : AudioClassificationPipelineCallback](#audioclassificationpipeline_call--audioclassificationpipelinecallback)
  - [pipelines.ZeroShotAudioClassificationPipeline](#pipelineszeroshotaudioclassificationpipeline)
    - [`new ZeroShotAudioClassificationPipeline(options)`](#new-zeroshotaudioclassificationpipelineoptions)
    - [`zeroShotAudioClassificationPipeline._call()` : ZeroShotAudioClassificationPipelineCallback](#zeroshotaudioclassificationpipeline_call--zeroshotaudioclassificationpipelinecallback)
  - [pipelines.AutomaticSpeechRecognitionPipeline](#pipelinesautomaticspeechrecognitionpipeline)
    - [`new AutomaticSpeechRecognitionPipeline(options)`](#new-automaticspeechrecognitionpipelineoptions)
    - [`automaticSpeechRecognitionPipeline._call()` : AutomaticSpeechRecognitionPipelineCallback](#automaticspeechrecognitionpipeline_call--automaticspeechrecognitionpipelinecallback)
  - [pipelines.ImageToTextPipeline](#pipelinesimagetotextpipeline)
    - [`new ImageToTextPipeline(options)`](#new-imagetotextpipelineoptions)
    - [`imageToTextPipeline._call()` : ImageToTextPipelineCallback](#imagetotextpipeline_call--imagetotextpipelinecallback)
  - [pipelines.ImageClassificationPipeline](#pipelinesimageclassificationpipeline)
    - [`new ImageClassificationPipeline(options)`](#new-imageclassificationpipelineoptions)
    - [`imageClassificationPipeline._call()` : ImageClassificationPipelineCallback](#imageclassificationpipeline_call--imageclassificationpipelinecallback)
  - [pipelines.ImageSegmentationPipeline](#pipelinesimagesegmentationpipeline)
    - [`new ImageSegmentationPipeline(options)`](#new-imagesegmentationpipelineoptions)
    - [`imageSegmentationPipeline._call()` : ImageSegmentationPipelineCallback](#imagesegmentationpipeline_call--imagesegmentationpipelinecallback)
  - [pipelines.BackgroundRemovalPipeline](#pipelinesbackgroundremovalpipeline)
    - [`new BackgroundRemovalPipeline(options)`](#new-backgroundremovalpipelineoptions)
    - [`backgroundRemovalPipeline._call()` : BackgroundRemovalPipelineCallback](#backgroundremovalpipeline_call--backgroundremovalpipelinecallback)
  - [pipelines.ZeroShotImageClassificationPipeline](#pipelineszeroshotimageclassificationpipeline)
    - [`new ZeroShotImageClassificationPipeline(options)`](#new-zeroshotimageclassificationpipelineoptions)
    - [`zeroShotImageClassificationPipeline._call()` : ZeroShotImageClassificationPipelineCallback](#zeroshotimageclassificationpipeline_call--zeroshotimageclassificationpipelinecallback)
  - [pipelines.ObjectDetectionPipeline](#pipelinesobjectdetectionpipeline)
    - [`new ObjectDetectionPipeline(options)`](#new-objectdetectionpipelineoptions)
    - [`objectDetectionPipeline._call()` : ObjectDetectionPipelineCallback](#objectdetectionpipeline_call--objectdetectionpipelinecallback)
  - [pipelines.ZeroShotObjectDetectionPipeline](#pipelineszeroshotobjectdetectionpipeline)
    - [`new ZeroShotObjectDetectionPipeline(options)`](#new-zeroshotobjectdetectionpipelineoptions)
    - [`zeroShotObjectDetectionPipeline._call()` : ZeroShotObjectDetectionPipelineCallback](#zeroshotobjectdetectionpipeline_call--zeroshotobjectdetectionpipelinecallback)
  - [pipelines.DocumentQuestionAnsweringPipeline](#pipelinesdocumentquestionansweringpipeline)
    - [`new DocumentQuestionAnsweringPipeline(options)`](#new-documentquestionansweringpipelineoptions)
    - [`documentQuestionAnsweringPipeline._call()` : DocumentQuestionAnsweringPipelineCallback](#documentquestionansweringpipeline_call--documentquestionansweringpipelinecallback)
  - [pipelines.TextToAudioPipeline](#pipelinestexttoaudiopipeline)
    - [`new TextToAudioPipeline(options)`](#new-texttoaudiopipelineoptions)
    - [`textToAudioPipeline._call()` : TextToAudioPipelineCallback](#texttoaudiopipeline_call--texttoaudiopipelinecallback)
  - [pipelines.ImageToImagePipeline](#pipelinesimagetoimagepipeline)
    - [`new ImageToImagePipeline(options)`](#new-imagetoimagepipelineoptions)
    - [`imageToImagePipeline._call()` : ImageToImagePipelineCallback](#imagetoimagepipeline_call--imagetoimagepipelinecallback)
  - [pipelines.DepthEstimationPipeline](#pipelinesdepthestimationpipeline)
    - [`new DepthEstimationPipeline(options)`](#new-depthestimationpipelineoptions)
    - [`depthEstimationPipeline._call()` : DepthEstimationPipelineCallback](#depthestimationpipeline_call--depthestimationpipelinecallback)
  - [`pipelines.pipeline(task, [model], [options])` ⇒ \*](#pipelinespipelinetask-model-options--)
  - [`pipelines~ImagePipelineInputs` : string | RawImage | URL | Blob | HTMLCanvasElement | OffscreenCanvas](#pipelinesimagepipelineinputs--string--rawimage--url--blob--htmlcanvaselement--offscreencanvas)
  - [`pipelines~AudioPipelineInputs` : string | URL | Float32Array | Float64Array](#pipelinesaudiopipelineinputs--string--url--float32array--float64array)
  - [`pipelines~BoundingBox` : Object](#pipelinesboundingbox--object)
  - [`pipelines~Disposable` ⇒ Promise.\<void\>](#pipelinesdisposable--promisevoid)
  - [`pipelines~TextPipelineConstructorArgs` : Object](#pipelinestextpipelineconstructorargs--object)
  - [`pipelines~ImagePipelineConstructorArgs` : Object](#pipelinesimagepipelineconstructorargs--object)
  - [`pipelines~TextImagePipelineConstructorArgs` : Object](#pipelinestextimagepipelineconstructorargs--object)
  - [`pipelines~TextClassificationPipelineType` ⇒ Promise.\<(TextClassificationOutput|Array\<TextClassificationOutput\>)\>](#pipelinestextclassificationpipelinetype--promisetextclassificationoutputarraytextclassificationoutput)
  - [`pipelines~TokenClassificationPipelineType` ⇒ Promise.\<(TokenClassificationOutput|Array\<TokenClassificationOutput\>)\>](#pipelinestokenclassificationpipelinetype--promisetokenclassificationoutputarraytokenclassificationoutput)
  - [`pipelines~QuestionAnsweringPipelineType` ⇒ Promise.\<(QuestionAnsweringOutput|Array\<QuestionAnsweringOutput\>)\>](#pipelinesquestionansweringpipelinetype--promisequestionansweringoutputarrayquestionansweringoutput)
  - [`pipelines~FillMaskPipelineType` ⇒ Promise.\<(FillMaskOutput|Array\<FillMaskOutput\>)\>](#pipelinesfillmaskpipelinetype--promisefillmaskoutputarrayfillmaskoutput)
  - [`pipelines~Text2TextGenerationPipelineType` ⇒ Promise.\<(Text2TextGenerationOutput|Array\<Text2TextGenerationOutput\>)\>](#pipelinestext2textgenerationpipelinetype--promisetext2textgenerationoutputarraytext2textgenerationoutput)
  - [`pipelines~SummarizationPipelineType` ⇒ Promise.\<(SummarizationOutput|Array\<SummarizationOutput\>)\>](#pipelinessummarizationpipelinetype--promisesummarizationoutputarraysummarizationoutput)
  - [`pipelines~TranslationPipelineType` ⇒ Promise.\<(TranslationOutput|Array\<TranslationOutput\>)\>](#pipelinestranslationpipelinetype--promisetranslationoutputarraytranslationoutput)
  - [`pipelines~TextGenerationPipelineType` ⇒ Promise.\<(TextGenerationOutput|Array\<TextGenerationOutput\>)\>](#pipelinestextgenerationpipelinetype--promisetextgenerationoutputarraytextgenerationoutput)
  - [`pipelines~ZeroShotClassificationPipelineType` ⇒ Promise.\<(ZeroShotClassificationOutput|Array\<ZeroShotClassificationOutput\>)\>](#pipelineszeroshotclassificationpipelinetype--promisezeroshotclassificationoutputarrayzeroshotclassificationoutput)
  - [`pipelines~FeatureExtractionPipelineType` ⇒ Promise.\<Tensor\>](#pipelinesfeatureextractionpipelinetype--promisetensor)
  - [`pipelines~ImageFeatureExtractionPipelineType` ⇒ Promise.\<Tensor\>](#pipelinesimagefeatureextractionpipelinetype--promisetensor)
  - [`pipelines~AudioClassificationPipelineType` ⇒ Promise.\<(AudioClassificationOutput|Array\<AudioClassificationOutput\>)\>](#pipelinesaudioclassificationpipelinetype--promiseaudioclassificationoutputarrayaudioclassificationoutput)
  - [`pipelines~ZeroShotAudioClassificationPipelineType` ⇒ Promise.\<(Array\<ZeroShotAudioClassificationOutput\>|Array\<Array\<ZeroShotAudioClassificationOutput\>\>)\>](#pipelineszeroshotaudioclassificationpipelinetype--promisearrayzeroshotaudioclassificationoutputarrayarrayzeroshotaudioclassificationoutput)
  - [`pipelines~Chunk` : Object](#pipelineschunk--object)
  - [`pipelines~AutomaticSpeechRecognitionPipelineType` ⇒ Promise.\<(AutomaticSpeechRecognitionOutput|Array\<AutomaticSpeechRecognitionOutput\>)\>](#pipelinesautomaticspeechrecognitionpipelinetype--promiseautomaticspeechrecognitionoutputarrayautomaticspeechrecognitionoutput)
  - [`pipelines~ImageToTextPipelineType` ⇒ Promise.\<(ImageToTextOutput|Array\<ImageToTextOutput\>)\>](#pipelinesimagetotextpipelinetype--promiseimagetotextoutputarrayimagetotextoutput)
  - [`pipelines~ImageClassificationPipelineType` ⇒ Promise.\<(ImageClassificationOutput|Array\<ImageClassificationOutput\>)\>](#pipelinesimageclassificationpipelinetype--promiseimageclassificationoutputarrayimageclassificationoutput)
  - [`pipelines~ImageSegmentationPipelineType` ⇒ Promise.\<Array\<ImageSegmentationPipelineOutput\>\>](#pipelinesimagesegmentationpipelinetype--promisearrayimagesegmentationpipelineoutput)
  - [`pipelines~BackgroundRemovalPipelineType` ⇒ Promise.\<Array\<RawImage\>\>](#pipelinesbackgroundremovalpipelinetype--promisearrayrawimage)
  - [`pipelines~ZeroShotImageClassificationPipelineType` ⇒ Promise.\<(Array\<ZeroShotImageClassificationOutput\>|Array\<Array\<ZeroShotImageClassificationOutput\>\>)\>](#pipelineszeroshotimageclassificationpipelinetype--promisearrayzeroshotimageclassificationoutputarrayarrayzeroshotimageclassificationoutput)
  - [`pipelines~ObjectDetectionPipelineType` ⇒ Promise.\<(ObjectDetectionPipelineOutput|Array\<ObjectDetectionPipelineOutput\>)\>](#pipelinesobjectdetectionpipelinetype--promiseobjectdetectionpipelineoutputarrayobjectdetectionpipelineoutput)
  - [`pipelines~ZeroShotObjectDetectionPipelineType` ⇒ Promise.\<(Array\<ZeroShotObjectDetectionOutput\>|Array\<Array\<ZeroShotObjectDetectionOutput\>\>)\>](#pipelineszeroshotobjectdetectionpipelinetype--promisearrayzeroshotobjectdetectionoutputarrayarrayzeroshotobjectdetectionoutput)
  - [`pipelines~DocumentQuestionAnsweringPipelineType` ⇒ Promise.\<(DocumentQuestionAnsweringOutput|Array\<DocumentQuestionAnsweringOutput\>)\>](#pipelinesdocumentquestionansweringpipelinetype--promisedocumentquestionansweringoutputarraydocumentquestionansweringoutput)
  - [`pipelines~TextToAudioPipelineConstructorArgs` : Object](#pipelinestexttoaudiopipelineconstructorargs--object)
  - [`pipelines~TextToAudioPipelineType` ⇒ Promise.\<TextToAudioOutput\>](#pipelinestexttoaudiopipelinetype--promisetexttoaudiooutput)
  - [`pipelines~ImageToImagePipelineType` ⇒ Promise.\<(RawImage|Array\<RawImage\>)\>](#pipelinesimagetoimagepipelinetype--promiserawimagearrayrawimage)
  - [`pipelines~DepthEstimationPipelineType` ⇒ Promise.\<(DepthEstimationPipelineOutput|Array\<DepthEstimationPipelineOutput\>)\>](#pipelinesdepthestimationpipelinetype--promisedepthestimationpipelineoutputarraydepthestimationpipelineoutput)
  - [`pipelines~AllTasks` : \*](#pipelinesalltasks--)

---

## pipelines.Pipeline

The Pipeline class is the class from which all pipelines inherit.
Refer to this class for methods shared across different pipelines.

**Kind**: static class of [pipelines](#module_pipelines)

- [.Pipeline](#module_pipelines.Pipeline)
  - [`new Pipeline(options)`](#new_module_pipelines.Pipeline_new)
  - [`.dispose()`](#module_pipelines.Pipeline+dispose) : DisposeType

---

### `new Pipeline(options)`

Create a new Pipeline.

      ParamTypeDefaultDescription




    optionsObjectAn object containing the following properties:


    [options.task]stringThe task of the pipeline. Useful for specifying subtasks.


    [options.model]PreTrainedModelThe model used by the pipeline.


    [options.tokenizer]PreTrainedTokenizerThe tokenizer used by the pipeline (if any).


    [options.processor]ProcessorThe processor used by the pipeline (if any).



---

### `pipeline.dispose()` : DisposeType

**Kind**: instance method of [Pipeline](#module_pipelines.Pipeline)

---

## pipelines.TextClassificationPipeline

Text classification pipeline using any `ModelForSequenceClassification`.

**Example:** Sentiment-analysis w/ `Xenova/distilbert-base-uncased-finetuned-sst-2-english`.

```javascript
const classifier = await pipeline(
  "sentiment-analysis",
  "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
);
const output = await classifier("I love transformers!");
// [{ label: 'POSITIVE', score: 0.999788761138916 }]
```

**Example:** Multilingual sentiment-analysis w/ `Xenova/bert-base-multilingual-uncased-sentiment` (and return top 5 classes).

```javascript
const classifier = await pipeline(
  "sentiment-analysis",
  "Xenova/bert-base-multilingual-uncased-sentiment"
);
const output = await classifier("Le meilleur film de tous les temps.", {
  top_k: 5,
});
// [
//   { label: '5 stars', score: 0.9610759615898132 },
//   { label: '4 stars', score: 0.03323351591825485 },
//   { label: '3 stars', score: 0.0036155181005597115 },
//   { label: '1 star', score: 0.0011325967498123646 },
//   { label: '2 stars', score: 0.0009423971059732139 }
// ]
```

**Example:** Toxic comment classification w/ `Xenova/toxic-bert` (and return all classes).

```javascript
const classifier = await pipeline("text-classification", "Xenova/toxic-bert");
const output = await classifier("I hate you!", { top_k: null });
// [
//   { label: 'toxic', score: 0.9593140482902527 },
//   { label: 'insult', score: 0.16187334060668945 },
//   { label: 'obscene', score: 0.03452680632472038 },
//   { label: 'identity_hate', score: 0.0223250575363636 },
//   { label: 'threat', score: 0.019197041168808937 },
//   { label: 'severe_toxic', score: 0.005651099607348442 }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.TextClassificationPipeline](#module_pipelines.TextClassificationPipeline)
  - [`new TextClassificationPipeline(options)`](#new_module_pipelines.TextClassificationPipeline_new)
  - [`._call()`](#module_pipelines.TextClassificationPipeline+_call) : TextClassificationPipelineCallback

---

### `new TextClassificationPipeline(options)`

Create a new TextClassificationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `textClassificationPipeline._call()` : TextClassificationPipelineCallback

**Kind**: instance method of [TextClassificationPipeline](#module_pipelines.TextClassificationPipeline)

---

## pipelines.TokenClassificationPipeline

Named Entity Recognition pipeline using any `ModelForTokenClassification`.

**Example:** Perform named entity recognition with `Xenova/bert-base-NER`.

```javascript
const classifier = await pipeline(
  "token-classification",
  "Xenova/bert-base-NER"
);
const output = await classifier("My name is Sarah and I live in London");
// [
//   { entity: 'B-PER', score: 0.9980202913284302, index: 4, word: 'Sarah' },
//   { entity: 'B-LOC', score: 0.9994474053382874, index: 9, word: 'London' }
// ]
```

**Example:** Perform named entity recognition with `Xenova/bert-base-NER` (and return all labels).

```javascript
const classifier = await pipeline(
  "token-classification",
  "Xenova/bert-base-NER"
);
const output = await classifier("Sarah lives in the United States of America", {
  ignore_labels: [],
});
// [
//   { entity: 'B-PER', score: 0.9966587424278259, index: 1, word: 'Sarah' },
//   { entity: 'O', score: 0.9987385869026184, index: 2, word: 'lives' },
//   { entity: 'O', score: 0.9990072846412659, index: 3, word: 'in' },
//   { entity: 'O', score: 0.9988298416137695, index: 4, word: 'the' },
//   { entity: 'B-LOC', score: 0.9995510578155518, index: 5, word: 'United' },
//   { entity: 'I-LOC', score: 0.9990395307540894, index: 6, word: 'States' },
//   { entity: 'I-LOC', score: 0.9986724853515625, index: 7, word: 'of' },
//   { entity: 'I-LOC', score: 0.9975294470787048, index: 8, word: 'America' }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.TokenClassificationPipeline](#module_pipelines.TokenClassificationPipeline)
  - [`new TokenClassificationPipeline(options)`](#new_module_pipelines.TokenClassificationPipeline_new)
  - [`._call()`](#module_pipelines.TokenClassificationPipeline+_call) : TokenClassificationPipelineCallback

---

### `new TokenClassificationPipeline(options)`

Create a new TokenClassificationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `tokenClassificationPipeline._call()` : TokenClassificationPipelineCallback

**Kind**: instance method of [TokenClassificationPipeline](#module_pipelines.TokenClassificationPipeline)

---

## pipelines.QuestionAnsweringPipeline

Question Answering pipeline using any `ModelForQuestionAnswering`.

**Example:** Run question answering with `Xenova/distilbert-base-uncased-distilled-squad`.

```javascript
const answerer = await pipeline(
  "question-answering",
  "Xenova/distilbert-base-uncased-distilled-squad"
);
const question = "Who was Jim Henson?";
const context = "Jim Henson was a nice puppet.";
const output = await answerer(question, context);
// {
//   answer: "a nice puppet",
//   score: 0.5768911502526741
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.QuestionAnsweringPipeline](#module_pipelines.QuestionAnsweringPipeline)
  - [`new QuestionAnsweringPipeline(options)`](#new_module_pipelines.QuestionAnsweringPipeline_new)
  - [`._call()`](#module_pipelines.QuestionAnsweringPipeline+_call) : QuestionAnsweringPipelineCallback

---

### `new QuestionAnsweringPipeline(options)`

Create a new QuestionAnsweringPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `questionAnsweringPipeline._call()` : QuestionAnsweringPipelineCallback

**Kind**: instance method of [QuestionAnsweringPipeline](#module_pipelines.QuestionAnsweringPipeline)

---

## pipelines.FillMaskPipeline

Masked language modeling prediction pipeline using any `ModelWithLMHead`.

**Example:** Perform masked language modelling (a.k.a. "fill-mask") with `Xenova/bert-base-uncased`.

```javascript
const unmasker = await pipeline("fill-mask", "Xenova/bert-base-cased");
const output = await unmasker("The goal of life is [MASK].");
// [
//   { token_str: 'survival', score: 0.06137419492006302, token: 8115, sequence: 'The goal of life is survival.' },
//   { token_str: 'love', score: 0.03902450203895569, token: 1567, sequence: 'The goal of life is love.' },
//   { token_str: 'happiness', score: 0.03253183513879776, token: 9266, sequence: 'The goal of life is happiness.' },
//   { token_str: 'freedom', score: 0.018736306577920914, token: 4438, sequence: 'The goal of life is freedom.' },
//   { token_str: 'life', score: 0.01859794743359089, token: 1297, sequence: 'The goal of life is life.' }
// ]
```

**Example:** Perform masked language modelling (a.k.a. "fill-mask") with `Xenova/bert-base-cased` (and return top result).

```javascript
const unmasker = await pipeline("fill-mask", "Xenova/bert-base-cased");
const output = await unmasker("The Milky Way is a [MASK] galaxy.", {
  top_k: 1,
});
// [{ token_str: 'spiral', score: 0.6299987435340881, token: 14061, sequence: 'The Milky Way is a spiral galaxy.' }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.FillMaskPipeline](#module_pipelines.FillMaskPipeline)
  - [`new FillMaskPipeline(options)`](#new_module_pipelines.FillMaskPipeline_new)
  - [`._call()`](#module_pipelines.FillMaskPipeline+_call) : FillMaskPipelineCallback

---

### `new FillMaskPipeline(options)`

Create a new FillMaskPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `fillMaskPipeline._call()` : FillMaskPipelineCallback

**Kind**: instance method of [FillMaskPipeline](#module_pipelines.FillMaskPipeline)

---

## pipelines.Text2TextGenerationPipeline

Text2TextGenerationPipeline class for generating text using a model that performs text-to-text generation tasks.

**Example:** Text-to-text generation w/ `Xenova/LaMini-Flan-T5-783M`.

```javascript
const generator = await pipeline(
  "text2text-generation",
  "Xenova/LaMini-Flan-T5-783M"
);
const output = await generator("how can I become more healthy?", {
  max_new_tokens: 100,
});
// [{ generated_text: "To become more healthy, you can: 1. Eat a balanced diet with plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. 2. Stay hydrated by drinking plenty of water. 3. Get enough sleep and manage stress levels. 4. Avoid smoking and excessive alcohol consumption. 5. Regularly exercise and maintain a healthy weight. 6. Practice good hygiene and sanitation. 7. Seek medical attention if you experience any health issues." }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.Text2TextGenerationPipeline](#module_pipelines.Text2TextGenerationPipeline)
  - [`new Text2TextGenerationPipeline(options)`](#new_module_pipelines.Text2TextGenerationPipeline_new)
  - [`._key`](#module_pipelines.Text2TextGenerationPipeline+_key) : &#x27;generated_text&#x27;
  - [`._call()`](#module_pipelines.Text2TextGenerationPipeline+_call) : Text2TextGenerationPipelineCallback

---

### `new Text2TextGenerationPipeline(options)`

Create a new Text2TextGenerationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `text2TextGenerationPipeline._key` : &#x27;generated_text&#x27;

**Kind**: instance property of [Text2TextGenerationPipeline](#module_pipelines.Text2TextGenerationPipeline)

---

### `text2TextGenerationPipeline._call()` : Text2TextGenerationPipelineCallback

**Kind**: instance method of [Text2TextGenerationPipeline](#module_pipelines.Text2TextGenerationPipeline)

---

## pipelines.SummarizationPipeline

A pipeline for summarization tasks, inheriting from Text2TextGenerationPipeline.

**Example:** Summarization w/ `Xenova/distilbart-cnn-6-6`.

```javascript
const generator = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");
const text =
  "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, " +
  "and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. " +
  "During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest " +
  "man-made structure in the world, a title it held for 41 years until the Chrysler Building in New " +
  "York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to " +
  "the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the " +
  "Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second " +
  "tallest free-standing structure in France after the Millau Viaduct.";
const output = await generator(text, {
  max_new_tokens: 100,
});
// [{ summary_text: ' The Eiffel Tower is about the same height as an 81-storey building and the tallest structure in Paris. It is the second tallest free-standing structure in France after the Millau Viaduct.' }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.SummarizationPipeline](#module_pipelines.SummarizationPipeline)
  - [`new SummarizationPipeline(options)`](#new_module_pipelines.SummarizationPipeline_new)
  - [`._key`](#module_pipelines.SummarizationPipeline+_key) : &#x27;summary_text&#x27;

---

### `new SummarizationPipeline(options)`

Create a new SummarizationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `summarizationPipeline._key` : &#x27;summary_text&#x27;

**Kind**: instance property of [SummarizationPipeline](#module_pipelines.SummarizationPipeline)

---

## pipelines.TranslationPipeline

Translates text from one language to another.

**Example:** Multilingual translation w/ `Xenova/nllb-200-distilled-600M`.

See [here](https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200)
for the full list of languages and their corresponding codes.

```javascript
const translator = await pipeline(
  "translation",
  "Xenova/nllb-200-distilled-600M"
);
const output = await translator("जीवन एक चॉकलेट बॉक्स की तरह है।", {
  src_lang: "hin_Deva", // Hindi
  tgt_lang: "fra_Latn", // French
});
// [{ translation_text: 'La vie est comme une boîte à chocolat.' }]
```

**Example:** Multilingual translation w/ `Xenova/m2m100_418M`.

See [here](https://huggingface.co/facebook/m2m100_418M#languages-covered)
for the full list of languages and their corresponding codes.

```javascript
const translator = await pipeline("translation", "Xenova/m2m100_418M");
const output = await translator("生活就像一盒巧克力。", {
  src_lang: "zh", // Chinese
  tgt_lang: "en", // English
});
// [{ translation_text: 'Life is like a box of chocolate.' }]
```

**Example:** Multilingual translation w/ `Xenova/mbart-large-50-many-to-many-mmt`.

See [here](https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt#languages-covered)
for the full list of languages and their corresponding codes.

```javascript
const translator = await pipeline(
  "translation",
  "Xenova/mbart-large-50-many-to-many-mmt"
);
const output = await translator(
  "संयुक्त राष्ट्र के प्रमुख का कहना है कि सीरिया में कोई सैन्य समाधान नहीं है",
  {
    src_lang: "hi_IN", // Hindi
    tgt_lang: "fr_XX", // French
  }
);
// [{ translation_text: 'Le chef des Nations affirme qu 'il n 'y a military solution in Syria.' }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.TranslationPipeline](#module_pipelines.TranslationPipeline)
  - [`new TranslationPipeline(options)`](#new_module_pipelines.TranslationPipeline_new)
  - [`._key`](#module_pipelines.TranslationPipeline+_key) : &#x27;translation_text&#x27;

---

### `new TranslationPipeline(options)`

Create a new TranslationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `translationPipeline._key` : &#x27;translation_text&#x27;

**Kind**: instance property of [TranslationPipeline](#module_pipelines.TranslationPipeline)

---

## pipelines.TextGenerationPipeline

Language generation pipeline using any `ModelWithLMHead` or `ModelForCausalLM`.
This pipeline predicts the words that will follow a specified text prompt.
NOTE: For the full list of generation parameters, see [`GenerationConfig`](./utils/generation#module_utils/generation.GenerationConfig).

**Example:** Text generation with `Xenova/distilgpt2` (default settings).

```javascript
const generator = await pipeline("text-generation", "Xenova/distilgpt2");
const text = "I enjoy walking with my cute dog,";
const output = await generator(text);
// [{ generated_text: "I enjoy walking with my cute dog, and I love to play with the other dogs." }]
```

**Example:** Text generation with `Xenova/distilgpt2` (custom settings).

```javascript
const generator = await pipeline("text-generation", "Xenova/distilgpt2");
const text = "Once upon a time, there was";
const output = await generator(text, {
  temperature: 2,
  max_new_tokens: 10,
  repetition_penalty: 1.5,
  no_repeat_ngram_size: 2,
  num_beams: 2,
  num_return_sequences: 2,
});
// [{
//   "generated_text": "Once upon a time, there was an abundance of information about the history and activities that"
// }, {
//   "generated_text": "Once upon a time, there was an abundance of information about the most important and influential"
// }]
```

**Example:** Run code generation with `Xenova/codegen-350M-mono`.

```javascript
const generator = await pipeline("text-generation", "Xenova/codegen-350M-mono");
const text = "def fib(n):";
const output = await generator(text, {
  max_new_tokens: 44,
});
// [{
//   generated_text: 'def fib(n):\n' +
//     '    if n == 0:\n' +
//     '        return 0\n' +
//     '    elif n == 1:\n' +
//     '        return 1\n' +
//     '    else:\n' +
//     '        return fib(n-1) + fib(n-2)\n'
// }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.TextGenerationPipeline](#module_pipelines.TextGenerationPipeline)
  - [`new TextGenerationPipeline(options)`](#new_module_pipelines.TextGenerationPipeline_new)
  - [`._call()`](#module_pipelines.TextGenerationPipeline+_call) : TextGenerationPipelineCallback

---

### `new TextGenerationPipeline(options)`

Create a new TextGenerationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `textGenerationPipeline._call()` : TextGenerationPipelineCallback

**Kind**: instance method of [TextGenerationPipeline](#module_pipelines.TextGenerationPipeline)

---

## pipelines.ZeroShotClassificationPipeline

NLI-based zero-shot classification pipeline using a `ModelForSequenceClassification`
trained on NLI (natural language inference) tasks. Equivalent of `text-classification`
pipelines, but these models don't require a hardcoded number of potential classes, they
can be chosen at runtime. It usually means it's slower but it is **much** more flexible.

**Example:** Zero shot classification with `Xenova/mobilebert-uncased-mnli`.

```javascript
const classifier = await pipeline(
  "zero-shot-classification",
  "Xenova/mobilebert-uncased-mnli"
);
const text =
  "Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.";
const labels = ["mobile", "billing", "website", "account access"];
const output = await classifier(text, labels);
// {
//   sequence: 'Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.',
//   labels: [ 'mobile', 'website', 'billing', 'account access' ],
//   scores: [ 0.5562091040482018, 0.1843621307860853, 0.13942646639336376, 0.12000229877234923 ]
// }
```

**Example:** Zero shot classification with `Xenova/nli-deberta-v3-xsmall` (multi-label).

```javascript
const classifier = await pipeline(
  "zero-shot-classification",
  "Xenova/nli-deberta-v3-xsmall"
);
const text = "I have a problem with my iphone that needs to be resolved asap!";
const labels = ["urgent", "not urgent", "phone", "tablet", "computer"];
const output = await classifier(text, labels, { multi_label: true });
// {
//   sequence: 'I have a problem with my iphone that needs to be resolved asap!',
//   labels: [ 'urgent', 'phone', 'computer', 'tablet', 'not urgent' ],
//   scores: [ 0.9958870956360275, 0.9923963400697035, 0.002333537946160235, 0.0015134138567598765, 0.0010699384208377163 ]
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ZeroShotClassificationPipeline](#module_pipelines.ZeroShotClassificationPipeline)
  - [`new ZeroShotClassificationPipeline(options)`](#new_module_pipelines.ZeroShotClassificationPipeline_new)
  - [`.model`](#module_pipelines.ZeroShotClassificationPipeline+model) : any
  - [`._call()`](#module_pipelines.ZeroShotClassificationPipeline+_call) : ZeroShotClassificationPipelineCallback

---

### `new ZeroShotClassificationPipeline(options)`

Create a new ZeroShotClassificationPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `zeroShotClassificationPipeline.model` : any

**Kind**: instance property of [ZeroShotClassificationPipeline](#module_pipelines.ZeroShotClassificationPipeline)

---

### `zeroShotClassificationPipeline._call()` : ZeroShotClassificationPipelineCallback

**Kind**: instance method of [ZeroShotClassificationPipeline](#module_pipelines.ZeroShotClassificationPipeline)

---

## pipelines.FeatureExtractionPipeline

Feature extraction pipeline using no model head. This pipeline extracts the hidden
states from the base transformer, which can be used as features in downstream tasks.

**Example:** Run feature extraction with `bert-base-uncased` (without pooling/normalization).

```javascript
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/bert-base-uncased",
  { revision: "default" }
);
const output = await extractor("This is a simple test.");
// Tensor {
//   type: 'float32',
//   data: Float32Array [0.05939924716949463, 0.021655935794115067, ...],
//   dims: [1, 8, 768]
// }
```

**Example:** Run feature extraction with `bert-base-uncased` (with pooling/normalization).

```javascript
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/bert-base-uncased",
  { revision: "default" }
);
const output = await extractor("This is a simple test.", {
  pooling: "mean",
  normalize: true,
});
// Tensor {
//   type: 'float32',
//   data: Float32Array [0.03373778983950615, -0.010106077417731285, ...],
//   dims: [1, 768]
// }
```

**Example:** Calculating embeddings with `sentence-transformers` models.

```javascript
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);
const output = await extractor("This is a simple test.", {
  pooling: "mean",
  normalize: true,
});
// Tensor {
//   type: 'float32',
//   data: Float32Array [0.09094982594251633, -0.014774246141314507, ...],
//   dims: [1, 384]
// }
```

**Example:** Calculating binary embeddings with `sentence-transformers` models.

```javascript
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);
const output = await extractor("This is a simple test.", {
  pooling: "mean",
  quantize: true,
  precision: "binary",
});
// Tensor {
//   type: 'int8',
//   data: Int8Array [49, 108, 24, ...],
//   dims: [1, 48]
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.FeatureExtractionPipeline](#module_pipelines.FeatureExtractionPipeline)
  - [`new FeatureExtractionPipeline(options)`](#new_module_pipelines.FeatureExtractionPipeline_new)
  - [`._call()`](#module_pipelines.FeatureExtractionPipeline+_call) : FeatureExtractionPipelineCallback

---

### `new FeatureExtractionPipeline(options)`

Create a new FeatureExtractionPipeline.

      ParamTypeDescription




    optionsTextPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `featureExtractionPipeline._call()` : FeatureExtractionPipelineCallback

**Kind**: instance method of [FeatureExtractionPipeline](#module_pipelines.FeatureExtractionPipeline)

---

## pipelines.ImageFeatureExtractionPipeline

Image feature extraction pipeline using no model head. This pipeline extracts the hidden
states from the base transformer, which can be used as features in downstream tasks.

**Example:** Perform image feature extraction with `Xenova/vit-base-patch16-224-in21k`.

```javascript
const image_feature_extractor = await pipeline(
  "image-feature-extraction",
  "Xenova/vit-base-patch16-224-in21k"
);
const url =
  "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/cats.png";
const features = await image_feature_extractor(url);
// Tensor {
//   dims: [ 1, 197, 768 ],
//   type: 'float32',
//   data: Float32Array(151296) [ ... ],
//   size: 151296
// }
```

**Example:** Compute image embeddings with `Xenova/clip-vit-base-patch32`.

```javascript
const image_feature_extractor = await pipeline(
  "image-feature-extraction",
  "Xenova/clip-vit-base-patch32"
);
const url =
  "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/cats.png";
const features = await image_feature_extractor(url);
// Tensor {
//   dims: [ 1, 512 ],
//   type: 'float32',
//   data: Float32Array(512) [ ... ],
//   size: 512
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ImageFeatureExtractionPipeline](#module_pipelines.ImageFeatureExtractionPipeline)
  - [`new ImageFeatureExtractionPipeline(options)`](#new_module_pipelines.ImageFeatureExtractionPipeline_new)
  - [`._call()`](#module_pipelines.ImageFeatureExtractionPipeline+_call) : ImageFeatureExtractionPipelineCallback

---

### `new ImageFeatureExtractionPipeline(options)`

Create a new ImageFeatureExtractionPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `imageFeatureExtractionPipeline._call()` : ImageFeatureExtractionPipelineCallback

**Kind**: instance method of [ImageFeatureExtractionPipeline](#module_pipelines.ImageFeatureExtractionPipeline)

---

## pipelines.AudioClassificationPipeline

Audio classification pipeline using any `AutoModelForAudioClassification`.
This pipeline predicts the class of a raw waveform or an audio file.

**Example:** Perform audio classification with `Xenova/wav2vec2-large-xlsr-53-gender-recognition-librispeech`.

```javascript
const classifier = await pipeline(
  "audio-classification",
  "Xenova/wav2vec2-large-xlsr-53-gender-recognition-librispeech"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const output = await classifier(url);
// [
//   { label: 'male', score: 0.9981542229652405 },
//   { label: 'female', score: 0.001845747814513743 }
// ]
```

**Example:** Perform audio classification with `Xenova/ast-finetuned-audioset-10-10-0.4593` and return top 4 results.

```javascript
const classifier = await pipeline(
  "audio-classification",
  "Xenova/ast-finetuned-audioset-10-10-0.4593"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cat_meow.wav";
const output = await classifier(url, { top_k: 4 });
// [
//   { label: 'Meow', score: 0.5617874264717102 },
//   { label: 'Cat', score: 0.22365376353263855 },
//   { label: 'Domestic animals, pets', score: 0.1141069084405899 },
//   { label: 'Animal', score: 0.08985692262649536 },
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.AudioClassificationPipeline](#module_pipelines.AudioClassificationPipeline)
  - [`new AudioClassificationPipeline(options)`](#new_module_pipelines.AudioClassificationPipeline_new)
  - [`._call()`](#module_pipelines.AudioClassificationPipeline+_call) : AudioClassificationPipelineCallback

---

### `new AudioClassificationPipeline(options)`

Create a new AudioClassificationPipeline.

      ParamTypeDescription




    optionsAudioPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `audioClassificationPipeline._call()` : AudioClassificationPipelineCallback

**Kind**: instance method of [AudioClassificationPipeline](#module_pipelines.AudioClassificationPipeline)

---

## pipelines.ZeroShotAudioClassificationPipeline

Zero shot audio classification pipeline using `ClapModel`. This pipeline predicts the class of an audio when you
provide an audio and a set of `candidate_labels`.

**Example**: Perform zero-shot audio classification with `Xenova/clap-htsat-unfused`.

```javascript
const classifier = await pipeline(
  "zero-shot-audio-classification",
  "Xenova/clap-htsat-unfused"
);
const audio =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/dog_barking.wav";
const candidate_labels = ["dog", "vaccum cleaner"];
const scores = await classifier(audio, candidate_labels);
// [
//   { score: 0.9993992447853088, label: 'dog' },
//   { score: 0.0006007603369653225, label: 'vaccum cleaner' }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ZeroShotAudioClassificationPipeline](#module_pipelines.ZeroShotAudioClassificationPipeline)
  - [`new ZeroShotAudioClassificationPipeline(options)`](#new_module_pipelines.ZeroShotAudioClassificationPipeline_new)
  - [`._call()`](#module_pipelines.ZeroShotAudioClassificationPipeline+_call) : ZeroShotAudioClassificationPipelineCallback

---

### `new ZeroShotAudioClassificationPipeline(options)`

Create a new ZeroShotAudioClassificationPipeline.

      ParamTypeDescription




    optionsTextAudioPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `zeroShotAudioClassificationPipeline._call()` : ZeroShotAudioClassificationPipelineCallback

**Kind**: instance method of [ZeroShotAudioClassificationPipeline](#module_pipelines.ZeroShotAudioClassificationPipeline)

---

## pipelines.AutomaticSpeechRecognitionPipeline

Pipeline that aims at extracting spoken text contained within some audio.

**Example:** Transcribe English.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const output = await transcriber(url);
// { text: " And so my fellow Americans ask not what your country can do for you, ask what you can do for your country." }
```

**Example:** Transcribe English w/ timestamps.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const output = await transcriber(url, { return_timestamps: true });
// {
//   text: " And so my fellow Americans ask not what your country can do for you, ask what you can do for your country."
//   chunks: [
//     { timestamp: [0, 8],  text: " And so my fellow Americans ask not what your country can do for you" }
//     { timestamp: [8, 11], text: " ask what you can do for your country." }
//   ]
// }
```

**Example:** Transcribe English w/ word-level timestamps.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const output = await transcriber(url, { return_timestamps: "word" });
// {
//   "text": " And so my fellow Americans ask not what your country can do for you ask what you can do for your country.",
//   "chunks": [
//     { "text": " And", "timestamp": [0, 0.78] },
//     { "text": " so", "timestamp": [0.78, 1.06] },
//     { "text": " my", "timestamp": [1.06, 1.46] },
//     ...
//     { "text": " for", "timestamp": [9.72, 9.92] },
//     { "text": " your", "timestamp": [9.92, 10.22] },
//     { "text": " country.", "timestamp": [10.22, 13.5] }
//   ]
// }
```

**Example:** Transcribe French.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-small"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/french-audio.mp3";
const output = await transcriber(url, {
  language: "french",
  task: "transcribe",
});
// { text: " J'adore, j'aime, je n'aime pas, je déteste." }
```

**Example:** Translate French to English.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-small"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/french-audio.mp3";
const output = await transcriber(url, {
  language: "french",
  task: "translate",
});
// { text: " I love, I like, I don't like, I hate." }
```

**Example:** Transcribe/translate audio longer than 30 seconds.

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/ted_60.wav";
const output = await transcriber(url, {
  chunk_length_s: 30,
  stride_length_s: 5,
});
// { text: " So in college, I was a government major, which means [...] So I'd start off light and I'd bump it up" }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.AutomaticSpeechRecognitionPipeline](#module_pipelines.AutomaticSpeechRecognitionPipeline)
  - [`new AutomaticSpeechRecognitionPipeline(options)`](#new_module_pipelines.AutomaticSpeechRecognitionPipeline_new)
  - [`._call()`](#module_pipelines.AutomaticSpeechRecognitionPipeline+_call) : AutomaticSpeechRecognitionPipelineCallback

---

### `new AutomaticSpeechRecognitionPipeline(options)`

Create a new AutomaticSpeechRecognitionPipeline.

      ParamTypeDescription




    optionsTextAudioPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `automaticSpeechRecognitionPipeline._call()` : AutomaticSpeechRecognitionPipelineCallback

**Kind**: instance method of [AutomaticSpeechRecognitionPipeline](#module_pipelines.AutomaticSpeechRecognitionPipeline)

---

## pipelines.ImageToTextPipeline

Image To Text pipeline using a `AutoModelForVision2Seq`. This pipeline predicts a caption for a given image.

**Example:** Generate a caption for an image w/ `Xenova/vit-gpt2-image-captioning`.

```javascript
const captioner = await pipeline(
  "image-to-text",
  "Xenova/vit-gpt2-image-captioning"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg";
const output = await captioner(url);
// [{ generated_text: 'a cat laying on a couch with another cat' }]
```

**Example:** Optical Character Recognition (OCR) w/ `Xenova/trocr-small-handwritten`.

```javascript
const captioner = await pipeline(
  "image-to-text",
  "Xenova/trocr-small-handwritten"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/handwriting.jpg";
const output = await captioner(url);
// [{ generated_text: 'Mr. Brown commented icily.' }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ImageToTextPipeline](#module_pipelines.ImageToTextPipeline)
  - [`new ImageToTextPipeline(options)`](#new_module_pipelines.ImageToTextPipeline_new)
  - [`._call()`](#module_pipelines.ImageToTextPipeline+_call) : ImageToTextPipelineCallback

---

### `new ImageToTextPipeline(options)`

Create a new ImageToTextPipeline.

      ParamTypeDescription




    optionsTextImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `imageToTextPipeline._call()` : ImageToTextPipelineCallback

**Kind**: instance method of [ImageToTextPipeline](#module_pipelines.ImageToTextPipeline)

---

## pipelines.ImageClassificationPipeline

Image classification pipeline using any `AutoModelForImageClassification`.
This pipeline predicts the class of an image.

**Example:** Classify an image.

```javascript
const classifier = await pipeline(
  "image-classification",
  "Xenova/vit-base-patch16-224"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg";
const output = await classifier(url);
// [
//   { label: 'tiger, Panthera tigris', score: 0.632695734500885 },
// ]
```

**Example:** Classify an image and return top `n` classes.

```javascript
const classifier = await pipeline(
  "image-classification",
  "Xenova/vit-base-patch16-224"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg";
const output = await classifier(url, { top_k: 3 });
// [
//   { label: 'tiger, Panthera tigris', score: 0.632695734500885 },
//   { label: 'tiger cat', score: 0.3634825646877289 },
//   { label: 'lion, king of beasts, Panthera leo', score: 0.00045060308184474707 },
// ]
```

**Example:** Classify an image and return all classes.

```javascript
const classifier = await pipeline(
  "image-classification",
  "Xenova/vit-base-patch16-224"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg";
const output = await classifier(url, { top_k: 0 });
// [
//   { label: 'tiger, Panthera tigris', score: 0.632695734500885 },
//   { label: 'tiger cat', score: 0.3634825646877289 },
//   { label: 'lion, king of beasts, Panthera leo', score: 0.00045060308184474707 },
//   { label: 'jaguar, panther, Panthera onca, Felis onca', score: 0.00035465499968267977 },
//   ...
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ImageClassificationPipeline](#module_pipelines.ImageClassificationPipeline)
  - [`new ImageClassificationPipeline(options)`](#new_module_pipelines.ImageClassificationPipeline_new)
  - [`._call()`](#module_pipelines.ImageClassificationPipeline+_call) : ImageClassificationPipelineCallback

---

### `new ImageClassificationPipeline(options)`

Create a new ImageClassificationPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `imageClassificationPipeline._call()` : ImageClassificationPipelineCallback

**Kind**: instance method of [ImageClassificationPipeline](#module_pipelines.ImageClassificationPipeline)

---

## pipelines.ImageSegmentationPipeline

Image segmentation pipeline using any `AutoModelForXXXSegmentation`.
This pipeline predicts masks of objects and their classes.

**Example:** Perform image segmentation with `Xenova/detr-resnet-50-panoptic`.

```javascript
const segmenter = await pipeline(
  "image-segmentation",
  "Xenova/detr-resnet-50-panoptic"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg";
const output = await segmenter(url);
// [
//   { label: 'remote', score: 0.9984649419784546, mask: RawImage { ... } },
//   { label: 'cat', score: 0.9994316101074219, mask: RawImage { ... } }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ImageSegmentationPipeline](#module_pipelines.ImageSegmentationPipeline)
  - [`new ImageSegmentationPipeline(options)`](#new_module_pipelines.ImageSegmentationPipeline_new)
  - [`._call()`](#module_pipelines.ImageSegmentationPipeline+_call) : ImageSegmentationPipelineCallback

---

### `new ImageSegmentationPipeline(options)`

Create a new ImageSegmentationPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `imageSegmentationPipeline._call()` : ImageSegmentationPipelineCallback

**Kind**: instance method of [ImageSegmentationPipeline](#module_pipelines.ImageSegmentationPipeline)

---

## pipelines.BackgroundRemovalPipeline

Background removal pipeline using certain `AutoModelForXXXSegmentation`.
This pipeline removes the backgrounds of images.

**Example:** Perform background removal with `Xenova/modnet`.

```javascript
const segmenter = await pipeline("background-removal", "Xenova/modnet");
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/portrait-of-woman_small.jpg";
const output = await segmenter(url);
// [
//   RawImage { data: Uint8ClampedArray(648000) [ ... ], width: 360, height: 450, channels: 4 }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.BackgroundRemovalPipeline](#module_pipelines.BackgroundRemovalPipeline)
  - [`new BackgroundRemovalPipeline(options)`](#new_module_pipelines.BackgroundRemovalPipeline_new)
  - [`._call()`](#module_pipelines.BackgroundRemovalPipeline+_call) : BackgroundRemovalPipelineCallback

---

### `new BackgroundRemovalPipeline(options)`

Create a new BackgroundRemovalPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `backgroundRemovalPipeline._call()` : BackgroundRemovalPipelineCallback

**Kind**: instance method of [BackgroundRemovalPipeline](#module_pipelines.BackgroundRemovalPipeline)

---

## pipelines.ZeroShotImageClassificationPipeline

Zero shot image classification pipeline. This pipeline predicts the class of
an image when you provide an image and a set of `candidate_labels`.

**Example:** Zero shot image classification w/ `Xenova/clip-vit-base-patch32`.

```javascript
const classifier = await pipeline(
  "zero-shot-image-classification",
  "Xenova/clip-vit-base-patch32"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg";
const output = await classifier(url, ["tiger", "horse", "dog"]);
// [
//   { score: 0.9993917942047119, label: 'tiger' },
//   { score: 0.0003519294841680676, label: 'horse' },
//   { score: 0.0002562698791734874, label: 'dog' }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ZeroShotImageClassificationPipeline](#module_pipelines.ZeroShotImageClassificationPipeline)
  - [`new ZeroShotImageClassificationPipeline(options)`](#new_module_pipelines.ZeroShotImageClassificationPipeline_new)
  - [`._call()`](#module_pipelines.ZeroShotImageClassificationPipeline+_call) : ZeroShotImageClassificationPipelineCallback

---

### `new ZeroShotImageClassificationPipeline(options)`

Create a new ZeroShotImageClassificationPipeline.

      ParamTypeDescription




    optionsTextImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `zeroShotImageClassificationPipeline._call()` : ZeroShotImageClassificationPipelineCallback

**Kind**: instance method of [ZeroShotImageClassificationPipeline](#module_pipelines.ZeroShotImageClassificationPipeline)

---

## pipelines.ObjectDetectionPipeline

Object detection pipeline using any `AutoModelForObjectDetection`.
This pipeline predicts bounding boxes of objects and their classes.

**Example:** Run object-detection with `Xenova/detr-resnet-50`.

```javascript
const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");
const img =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg";
const output = await detector(img, { threshold: 0.9 });
// [{
//   score: 0.9976370930671692,
//   label: "remote",
//   box: { xmin: 31, ymin: 68, xmax: 190, ymax: 118 }
// },
// ...
// {
//   score: 0.9984092116355896,
//   label: "cat",
//   box: { xmin: 331, ymin: 19, xmax: 649, ymax: 371 }
// }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ObjectDetectionPipeline](#module_pipelines.ObjectDetectionPipeline)
  - [`new ObjectDetectionPipeline(options)`](#new_module_pipelines.ObjectDetectionPipeline_new)
  - [`._call()`](#module_pipelines.ObjectDetectionPipeline+_call) : ObjectDetectionPipelineCallback

---

### `new ObjectDetectionPipeline(options)`

Create a new ObjectDetectionPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `objectDetectionPipeline._call()` : ObjectDetectionPipelineCallback

**Kind**: instance method of [ObjectDetectionPipeline](#module_pipelines.ObjectDetectionPipeline)

---

## pipelines.ZeroShotObjectDetectionPipeline

Zero-shot object detection pipeline. This pipeline predicts bounding boxes of
objects when you provide an image and a set of `candidate_labels`.

**Example:** Zero-shot object detection w/ `Xenova/owlvit-base-patch32`.

```javascript
const detector = await pipeline(
  "zero-shot-object-detection",
  "Xenova/owlvit-base-patch32"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/astronaut.png";
const candidate_labels = ["human face", "rocket", "helmet", "american flag"];
const output = await detector(url, candidate_labels);
// [
//   {
//     score: 0.24392342567443848,
//     label: 'human face',
//     box: { xmin: 180, ymin: 67, xmax: 274, ymax: 175 }
//   },
//   {
//     score: 0.15129457414150238,
//     label: 'american flag',
//     box: { xmin: 0, ymin: 4, xmax: 106, ymax: 513 }
//   },
//   {
//     score: 0.13649864494800568,
//     label: 'helmet',
//     box: { xmin: 277, ymin: 337, xmax: 511, ymax: 511 }
//   },
//   {
//     score: 0.10262022167444229,
//     label: 'rocket',
//     box: { xmin: 352, ymin: -1, xmax: 463, ymax: 287 }
//   }
// ]
```

**Example:** Zero-shot object detection w/ `Xenova/owlvit-base-patch32` (returning top 4 matches and setting a threshold).

```javascript
const detector = await pipeline(
  "zero-shot-object-detection",
  "Xenova/owlvit-base-patch32"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/beach.png";
const candidate_labels = ["hat", "book", "sunglasses", "camera"];
const output = await detector(url, candidate_labels, {
  top_k: 4,
  threshold: 0.05,
});
// [
//   {
//     score: 0.1606510728597641,
//     label: 'sunglasses',
//     box: { xmin: 347, ymin: 229, xmax: 429, ymax: 264 }
//   },
//   {
//     score: 0.08935828506946564,
//     label: 'hat',
//     box: { xmin: 38, ymin: 174, xmax: 258, ymax: 364 }
//   },
//   {
//     score: 0.08530698716640472,
//     label: 'camera',
//     box: { xmin: 187, ymin: 350, xmax: 260, ymax: 411 }
//   },
//   {
//     score: 0.08349756896495819,
//     label: 'book',
//     box: { xmin: 261, ymin: 280, xmax: 494, ymax: 425 }
//   }
// ]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ZeroShotObjectDetectionPipeline](#module_pipelines.ZeroShotObjectDetectionPipeline)
  - [`new ZeroShotObjectDetectionPipeline(options)`](#new_module_pipelines.ZeroShotObjectDetectionPipeline_new)
  - [`._call()`](#module_pipelines.ZeroShotObjectDetectionPipeline+_call) : ZeroShotObjectDetectionPipelineCallback

---

### `new ZeroShotObjectDetectionPipeline(options)`

Create a new ZeroShotObjectDetectionPipeline.

      ParamTypeDescription




    optionsTextImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `zeroShotObjectDetectionPipeline._call()` : ZeroShotObjectDetectionPipelineCallback

**Kind**: instance method of [ZeroShotObjectDetectionPipeline](#module_pipelines.ZeroShotObjectDetectionPipeline)

---

## pipelines.DocumentQuestionAnsweringPipeline

Document Question Answering pipeline using any `AutoModelForDocumentQuestionAnswering`.
The inputs/outputs are similar to the (extractive) question answering pipeline; however,
the pipeline takes an image (and optional OCR'd words/boxes) as input instead of text context.

**Example:** Answer questions about a document with `Xenova/donut-base-finetuned-docvqa`.

```javascript
const qa_pipeline = await pipeline(
  "document-question-answering",
  "Xenova/donut-base-finetuned-docvqa"
);
const image =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/invoice.png";
const question = "What is the invoice number?";
const output = await qa_pipeline(image, question);
// [{ answer: 'us-001' }]
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.DocumentQuestionAnsweringPipeline](#module_pipelines.DocumentQuestionAnsweringPipeline)
  - [`new DocumentQuestionAnsweringPipeline(options)`](#new_module_pipelines.DocumentQuestionAnsweringPipeline_new)
  - [`._call()`](#module_pipelines.DocumentQuestionAnsweringPipeline+_call) : DocumentQuestionAnsweringPipelineCallback

---

### `new DocumentQuestionAnsweringPipeline(options)`

Create a new DocumentQuestionAnsweringPipeline.

      ParamTypeDescription




    optionsTextImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `documentQuestionAnsweringPipeline._call()` : DocumentQuestionAnsweringPipelineCallback

**Kind**: instance method of [DocumentQuestionAnsweringPipeline](#module_pipelines.DocumentQuestionAnsweringPipeline)

---

## pipelines.TextToAudioPipeline

Text-to-audio generation pipeline using any `AutoModelForTextToWaveform` or `AutoModelForTextToSpectrogram`.
This pipeline generates an audio file from an input text and optional other conditional inputs.

**Example:** Generate audio from text with `Xenova/speecht5_tts`.

```javascript
const synthesizer = await pipeline("text-to-speech", "Xenova/speecht5_tts", {
  quantized: false,
});
const speaker_embeddings =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin";
const out = await synthesizer("Hello, my dog is cute", { speaker_embeddings });
// RawAudio {
//   audio: Float32Array(26112) [-0.00005657337896991521, 0.00020583874720614403, ...],
//   sampling_rate: 16000
// }
```

You can then save the audio to a .wav file with the `wavefile` package:

```javascript
import wavefile from "wavefile";
import fs from "fs";

const wav = new wavefile.WaveFile();
wav.fromScratch(1, out.sampling_rate, "32f", out.audio);
fs.writeFileSync("out.wav", wav.toBuffer());
```

**Example:** Multilingual speech generation with `Xenova/mms-tts-fra`. See [here](https://huggingface.co/models?pipeline_tag=text-to-speech&other=vits&sort=trending) for the full list of available languages (1107).

```javascript
const synthesizer = await pipeline("text-to-speech", "Xenova/mms-tts-fra");
const out = await synthesizer("Bonjour");
// RawAudio {
//   audio: Float32Array(23808) [-0.00037693005288019776, 0.0003325853613205254, ...],
//   sampling_rate: 16000
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.TextToAudioPipeline](#module_pipelines.TextToAudioPipeline)
  - [`new TextToAudioPipeline(options)`](#new_module_pipelines.TextToAudioPipeline_new)
  - [`._call()`](#module_pipelines.TextToAudioPipeline+_call) : TextToAudioPipelineCallback

---

### `new TextToAudioPipeline(options)`

Create a new TextToAudioPipeline.

      ParamTypeDescription




    optionsTextToAudioPipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `textToAudioPipeline._call()` : TextToAudioPipelineCallback

**Kind**: instance method of [TextToAudioPipeline](#module_pipelines.TextToAudioPipeline)

---

## pipelines.ImageToImagePipeline

Image to Image pipeline using any `AutoModelForImageToImage`. This pipeline generates an image based on a previous image input.

**Example:** Super-resolution w/ `Xenova/swin2SR-classical-sr-x2-64`

```javascript
const upscaler = await pipeline(
  "image-to-image",
  "Xenova/swin2SR-classical-sr-x2-64"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/butterfly.jpg";
const output = await upscaler(url);
// RawImage {
//   data: Uint8Array(786432) [ 41, 31, 24,  43, ... ],
//   width: 512,
//   height: 512,
//   channels: 3
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.ImageToImagePipeline](#module_pipelines.ImageToImagePipeline)
  - [`new ImageToImagePipeline(options)`](#new_module_pipelines.ImageToImagePipeline_new)
  - [`._call()`](#module_pipelines.ImageToImagePipeline+_call) : ImageToImagePipelineCallback

---

### `new ImageToImagePipeline(options)`

Create a new ImageToImagePipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `imageToImagePipeline._call()` : ImageToImagePipelineCallback

**Kind**: instance method of [ImageToImagePipeline](#module_pipelines.ImageToImagePipeline)

---

## pipelines.DepthEstimationPipeline

Depth estimation pipeline using any `AutoModelForDepthEstimation`. This pipeline predicts the depth of an image.

**Example:** Depth estimation w/ `Xenova/dpt-hybrid-midas`

```javascript
const depth_estimator = await pipeline(
  "depth-estimation",
  "Xenova/dpt-hybrid-midas"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg";
const out = await depth_estimator(url);
// {
//   predicted_depth: Tensor {
//     dims: [ 384, 384 ],
//     type: 'float32',
//     data: Float32Array(147456) [ 542.859130859375, 545.2833862304688, 546.1649169921875, ... ],
//     size: 147456
//   },
//   depth: RawImage {
//     data: Uint8Array(307200) [ 86, 86, 86, ... ],
//     width: 640,
//     height: 480,
//     channels: 1
//   }
// }
```

**Kind**: static class of [pipelines](#module_pipelines)

- [.DepthEstimationPipeline](#module_pipelines.DepthEstimationPipeline)
  - [`new DepthEstimationPipeline(options)`](#new_module_pipelines.DepthEstimationPipeline_new)
  - [`._call()`](#module_pipelines.DepthEstimationPipeline+_call) : DepthEstimationPipelineCallback

---

### `new DepthEstimationPipeline(options)`

Create a new DepthEstimationPipeline.

      ParamTypeDescription




    optionsImagePipelineConstructorArgsAn object used to instantiate the pipeline.



---

### `depthEstimationPipeline._call()` : DepthEstimationPipelineCallback

**Kind**: instance method of [DepthEstimationPipeline](#module_pipelines.DepthEstimationPipeline)

---

## `pipelines.pipeline(task, [model], [options])` ⇒ \*

Utility factory method to build a `Pipeline` object.

**Kind**: static method of [pipelines](#module_pipelines)  
**Returns**: \* - A Pipeline object for the specified task.  
**Throws**:

- Error If an unsupported pipeline is requested.

      ParamTypeDefaultDescription

  taskTThe task defining which pipeline will be returned. Currently accepted tasks are:

&quot;audio-classification&quot;: will return a AudioClassificationPipeline.
&quot;automatic-speech-recognition&quot;: will return a AutomaticSpeechRecognitionPipeline.
&quot;depth-estimation&quot;: will return a DepthEstimationPipeline.
&quot;document-question-answering&quot;: will return a DocumentQuestionAnsweringPipeline.
&quot;feature-extraction&quot;: will return a FeatureExtractionPipeline.
&quot;fill-mask&quot;: will return a FillMaskPipeline.
&quot;image-classification&quot;: will return a ImageClassificationPipeline.
&quot;image-segmentation&quot;: will return a ImageSegmentationPipeline.
&quot;image-to-text&quot;: will return a ImageToTextPipeline.
&quot;object-detection&quot;: will return a ObjectDetectionPipeline.
&quot;question-answering&quot;: will return a QuestionAnsweringPipeline.
&quot;summarization&quot;: will return a SummarizationPipeline.
&quot;text2text-generation&quot;: will return a Text2TextGenerationPipeline.
&quot;text-classification&quot; (alias &quot;sentiment-analysis&quot; available): will return a TextClassificationPipeline.
&quot;text-generation&quot;: will return a TextGenerationPipeline.
&quot;token-classification&quot; (alias &quot;ner&quot; available): will return a TokenClassificationPipeline.
&quot;translation&quot;: will return a TranslationPipeline.
&quot;translation_xx_to_yy&quot;: will return a TranslationPipeline.
&quot;zero-shot-classification&quot;: will return a ZeroShotClassificationPipeline.
&quot;zero-shot-audio-classification&quot;: will return a ZeroShotAudioClassificationPipeline.
&quot;zero-shot-image-classification&quot;: will return a ZeroShotImageClassificationPipeline.
&quot;zero-shot-object-detection&quot;: will return a ZeroShotObjectDetectionPipeline.

    [model]stringnullThe name of the pre-trained model to use. If not specified, the default model for the task will be used.


    [options]*Optional parameters for the pipeline.



---

## `pipelines~ImagePipelineInputs` : string | [RawImage](#RawImage) | URL | Blob | HTMLCanvasElement | OffscreenCanvas

**Kind**: inner typedef of [pipelines](#module_pipelines)

---

## `pipelines~AudioPipelineInputs` : string | URL | Float32Array | Float64Array

**Kind**: inner typedef of [pipelines](#module_pipelines)

---

## `pipelines~BoundingBox` : Object

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    xminnumberThe minimum x coordinate of the bounding box.


    yminnumberThe minimum y coordinate of the bounding box.


    xmaxnumberThe maximum x coordinate of the bounding box.


    ymaxnumberThe maximum y coordinate of the bounding box.



---

## `pipelines~Disposable` ⇒ Promise.&lt;void&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;void&gt; - A promise that resolves when the item has been disposed.  
**Properties**

      NameTypeDescription




    disposeDisposeTypeA promise that resolves when the pipeline has been disposed.



---

## `pipelines~TextPipelineConstructorArgs` : Object

An object used to instantiate a text-based pipeline.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    taskstringThe task of the pipeline. Useful for specifying subtasks.


    modelPreTrainedModelThe model used by the pipeline.


    tokenizerPreTrainedTokenizerThe tokenizer used by the pipeline.



---

## `pipelines~ImagePipelineConstructorArgs` : Object

An object used to instantiate an audio-based pipeline.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    taskstringThe task of the pipeline. Useful for specifying subtasks.


    modelPreTrainedModelThe model used by the pipeline.


    processorProcessorThe processor used by the pipeline.



---

## `pipelines~TextImagePipelineConstructorArgs` : Object

An object used to instantiate a text- and audio-based pipeline.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    taskstringThe task of the pipeline. Useful for specifying subtasks.


    modelPreTrainedModelThe model used by the pipeline.


    tokenizerPreTrainedTokenizerThe tokenizer used by the pipeline.


    processorProcessorThe processor used by the pipeline.



---

## `pipelines~TextClassificationPipelineType` ⇒ Promise.&lt;(TextClassificationOutput|Array&lt;TextClassificationOutput&gt;)&gt;

Parameters specific to text classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(TextClassificationOutput|Array&lt;TextClassificationOutput&gt;)&gt; - An array or object containing the predicted labels and scores.

      ParamTypeDescription




    textsstring | Array&lt;string&gt;The input text(s) to be classified.


    [options]TextClassificationPipelineOptionsThe options to use for text classification.



**Properties**

      NameTypeDefaultDescription




    labelstringThe label predicted.


    scorenumberThe corresponding probability.


    [top_k]number1The number of top predictions to be returned.



---

## `pipelines~TokenClassificationPipelineType` ⇒ Promise.&lt;(TokenClassificationOutput|Array&lt;TokenClassificationOutput&gt;)&gt;

Parameters specific to token classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(TokenClassificationOutput|Array&lt;TokenClassificationOutput&gt;)&gt; - The result.

      ParamTypeDescription




    textsstring | Array&lt;string&gt;One or several texts (or one list of texts) for token classification.


    [options]TokenClassificationPipelineOptionsThe options to use for token classification.



**Properties**

      NameTypeDescription




    wordstringThe token/word classified. This is obtained by decoding the selected tokens.


    scorenumberThe corresponding probability for entity.


    entitystringThe entity predicted for that token/word.


    indexnumberThe index of the corresponding token in the sentence.


    [start]numberThe index of the start of the corresponding entity in the sentence.


    [end]numberThe index of the end of the corresponding entity in the sentence.


    [ignore_labels]Array.&lt;string&gt;A list of labels to ignore.



---

## `pipelines~QuestionAnsweringPipelineType` ⇒ Promise.&lt;(QuestionAnsweringOutput|Array&lt;QuestionAnsweringOutput&gt;)&gt;

Parameters specific to question answering pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(QuestionAnsweringOutput|Array&lt;QuestionAnsweringOutput&gt;)&gt; - An array or object containing the predicted answers and scores.

      ParamTypeDescription




    questionstring | Array&lt;string&gt;One or several question(s) (must be used in conjunction with the context argument).


    contextstring | Array&lt;string&gt;One or several context(s) associated with the question(s) (must be used in conjunction with the question argument).


    [options]QuestionAnsweringPipelineOptionsThe options to use for question answering.



**Properties**

      NameTypeDefaultDescription




    scorenumberThe probability associated to the answer.


    [start]numberThe character start index of the answer (in the tokenized version of the input).


    [end]numberThe character end index of the answer (in the tokenized version of the input).


    answerstringThe answer to the question.


    [top_k]number1The number of top answer predictions to be returned.



---

## `pipelines~FillMaskPipelineType` ⇒ Promise.&lt;(FillMaskOutput|Array&lt;FillMaskOutput&gt;)&gt;

Parameters specific to fill mask pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(FillMaskOutput|Array&lt;FillMaskOutput&gt;)&gt; - An array of objects containing the score, predicted token, predicted token string,
and the sequence with the predicted token filled in, or an array of such arrays (one for each input text).
If only one input text is given, the output will be an array of objects.  
**Throws**:

- Error When the mask token is not found in the input text.

      ParamTypeDescription

  textsstring | Array&lt;string&gt;One or several texts (or one list of prompts) with masked tokens.

  [options]FillMaskPipelineOptionsThe options to use for masked language modelling.

**Properties**

      NameTypeDefaultDescription




    sequencestringThe corresponding input with the mask token prediction.


    scorenumberThe corresponding probability.


    tokennumberThe predicted token id (to replace the masked one).


    token_strstringThe predicted token (to replace the masked one).


    [top_k]number5When passed, overrides the number of predictions to return.



---

## `pipelines~Text2TextGenerationPipelineType` ⇒ Promise.&lt;(Text2TextGenerationOutput|Array&lt;Text2TextGenerationOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)

      ParamTypeDescription




    textsstring | Array&lt;string&gt;Input text for the encoder.


    [options]*Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    generated_textstringThe generated text.



---

## `pipelines~SummarizationPipelineType` ⇒ Promise.&lt;(SummarizationOutput|Array&lt;SummarizationOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)

      ParamTypeDescription




    textsstring | Array&lt;string&gt;One or several articles (or one list of articles) to summarize.


    [options]*Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    summary_textstringThe summary text.



---

## `pipelines~TranslationPipelineType` ⇒ Promise.&lt;(TranslationOutput|Array&lt;TranslationOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)

      ParamTypeDescription




    textsstring | Array&lt;string&gt;Texts to be translated.


    [options]*Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    translation_textstringThe translated text.



---

## `pipelines~TextGenerationPipelineType` ⇒ Promise.&lt;(TextGenerationOutput|Array&lt;TextGenerationOutput&gt;)&gt;

Parameters specific to text-generation pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(TextGenerationOutput|Array&lt;TextGenerationOutput&gt;)&gt; - An array or object containing the generated texts.

      ParamTypeDescription




    textsstring | Array&lt;string&gt; | Chat | Array&lt;Chat&gt;One or several prompts (or one list of prompts) to complete.


    [options]Partial.&lt;TextGenerationConfig&gt;Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDefaultDescription




    generated_textstring | ChatThe generated text.


    [add_special_tokens]booleanWhether or not to add special tokens when tokenizing the sequences.


    [return_full_text]booleantrueIf set to false only added text is returned, otherwise the full text is returned.



---

## `pipelines~ZeroShotClassificationPipelineType` ⇒ Promise.&lt;(ZeroShotClassificationOutput|Array&lt;ZeroShotClassificationOutput&gt;)&gt;

Parameters specific to zero-shot classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(ZeroShotClassificationOutput|Array&lt;ZeroShotClassificationOutput&gt;)&gt; - An array or object containing the predicted labels and scores.

      ParamTypeDescription




    textsstring | Array&lt;string&gt;The sequence(s) to classify, will be truncated if the model input is too large.


    candidate_labelsstring | Array&lt;string&gt;The set of possible class labels to classify each sequence into.

Can be a single label, a string of comma-separated labels, or a list of labels.

    [options]ZeroShotClassificationPipelineOptionsThe options to use for zero-shot classification.



**Properties**

      NameTypeDefaultDescription




    sequencestringThe sequence for which this is the output.


    labelsArray.&lt;string&gt;The labels sorted by order of likelihood.


    scoresArray.&lt;number&gt;The probabilities for each of the labels.


    [hypothesis_template]string&quot;&quot;This example is {}.&quot;&quot;The template used to turn each

candidate label into an NLI-style hypothesis. The candidate label will replace the {} placeholder.

    [multi_label]booleanfalseWhether or not multiple candidate labels can be true.

If false, the scores are normalized such that the sum of the label likelihoods for each sequence
is 1. If true, the labels are considered independent and probabilities are normalized for each
candidate by doing a softmax of the entailment score vs. the contradiction score.

---

## `pipelines~FeatureExtractionPipelineType` ⇒ [Promise.&lt;Tensor&gt;](#Tensor)

Parameters specific to feature extraction pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: [Promise.&lt;Tensor&gt;](#Tensor) - The features computed by the model.

      ParamTypeDescription




    textsstring | Array&lt;string&gt;One or several texts (or one list of texts) to get the features of.


    [options]FeatureExtractionPipelineOptionsThe options to use for feature extraction.



**Properties**

      NameTypeDefaultDescription




    [pooling]&#x27;none&#x27; | &#x27;mean&#x27; | &#x27;cls&#x27; | &#x27;first_token&#x27; | &#x27;eos&#x27; | &#x27;last_token&#x27;&quot;none&quot;The pooling method to use.


    [normalize]booleanfalseWhether or not to normalize the embeddings in the last dimension.


    [quantize]booleanfalseWhether or not to quantize the embeddings.


    [precision]&#x27;binary&#x27; | &#x27;ubinary&#x27;&#x27;binary&#x27;The precision to use for quantization.



---

## `pipelines~ImageFeatureExtractionPipelineType` ⇒ [Promise.&lt;Tensor&gt;](#Tensor)

Parameters specific to image feature extraction pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: [Promise.&lt;Tensor&gt;](#Tensor) - The image features computed by the model.

      ParamTypeDescription




    imagesImagePipelineInputsOne or several images (or one list of images) to get the features of.


    [options]ImageFeatureExtractionPipelineOptionsThe options to use for image feature extraction.



**Properties**

      NameTypeDefaultDescription




    [pool]booleanWhether or not to return the pooled output. If set to false, the model will return the raw hidden states.



---

## `pipelines~AudioClassificationPipelineType` ⇒ Promise.&lt;(AudioClassificationOutput|Array&lt;AudioClassificationOutput&gt;)&gt;

Parameters specific to audio classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(AudioClassificationOutput|Array&lt;AudioClassificationOutput&gt;)&gt; - An array or object containing the predicted labels and scores.

      ParamTypeDescription




    audioAudioPipelineInputsThe input audio file(s) to be classified. The input is either:

string or URL that is the filename/URL of the audio file, the file will be read at the processor&#39;s sampling rate
to get the waveform using the AudioContext API.
If AudioContext is not available, you should pass the raw waveform in as a Float32Array of shape (n, ).
Float32Array or Float64Array of shape (n, ), representing the raw audio at the correct sampling rate (no further check will be done).

    [options]AudioClassificationPipelineOptionsThe options to use for audio classification.



**Properties**

      NameTypeDefaultDescription




    labelstringThe label predicted.


    scorenumberThe corresponding probability.


    [top_k]number5The number of top labels that will be returned by the pipeline.

If the provided number is null or higher than the number of labels available in the model configuration,
it will default to the number of labels.

---

## `pipelines~ZeroShotAudioClassificationPipelineType` ⇒ Promise.&lt;(Array&lt;ZeroShotAudioClassificationOutput&gt;|Array&lt;Array&lt;ZeroShotAudioClassificationOutput&gt;&gt;)&gt;

Parameters specific to zero-shot audio classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(Array&lt;ZeroShotAudioClassificationOutput&gt;|Array&lt;Array&lt;ZeroShotAudioClassificationOutput&gt;&gt;)&gt; - An array of objects containing the predicted labels and scores.

      ParamTypeDescription




    audioAudioPipelineInputsThe input audio file(s) to be classified. The input is either:

string or URL that is the filename/URL of the audio file, the file will be read at the processor&#39;s sampling rate
to get the waveform using the AudioContext API.
If AudioContext is not available, you should pass the raw waveform in as a Float32Array of shape (n, ).
Float32Array or Float64Array of shape (n, ), representing the raw audio at the correct sampling rate (no further check will be done).

    candidate_labelsArray.&lt;string&gt;The candidate labels for this audio.


    [options]ZeroShotAudioClassificationPipelineOptionsThe options to use for zero-shot audio classification.



**Properties**

      NameTypeDefaultDescription




    labelstringThe label identified by the model. It is one of the suggested candidate_label.


    scorenumberThe score attributed by the model for that label (between 0 and 1).


    [hypothesis_template]string&quot;&quot;This is a sound of {}.&quot;&quot;The sentence used in conjunction with candidate_labels

to attempt the audio classification by replacing the placeholder with the candidate_labels.
Then likelihood is estimated by using logits_per_audio.

---

## `pipelines~Chunk` : Object

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    timestamp*The start and end timestamp of the chunk in seconds.


    textstringThe recognized text.



---

## `pipelines~AutomaticSpeechRecognitionPipelineType` ⇒ Promise.&lt;(AutomaticSpeechRecognitionOutput|Array&lt;AutomaticSpeechRecognitionOutput&gt;)&gt;

Parameters specific to automatic-speech-recognition pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(AutomaticSpeechRecognitionOutput|Array&lt;AutomaticSpeechRecognitionOutput&gt;)&gt; - An object containing the transcription text and optionally timestamps if `return_timestamps` is `true`.

      ParamTypeDescription




    audioAudioPipelineInputsThe input audio file(s) to be transcribed. The input is either:

string or URL that is the filename/URL of the audio file, the file will be read at the processor&#39;s sampling rate
to get the waveform using the AudioContext API.
If AudioContext is not available, you should pass the raw waveform in as a Float32Array of shape (n, ).
Float32Array or Float64Array of shape (n, ), representing the raw audio at the correct sampling rate (no further check will be done).

    [options]Partial.&lt;AutomaticSpeechRecognitionConfig&gt;Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    textstringThe recognized text.


    [chunks]Array.&lt;Chunk&gt;When using return_timestamps, the chunks will become a list

containing all the various text chunks identified by the model.

    [return_timestamps]boolean | &#x27;word&#x27;Whether to return timestamps or not. Default is false.


    [chunk_length_s]numberThe length of audio chunks to process in seconds. Default is 0 (no chunking).


    [stride_length_s]numberThe length of overlap between consecutive audio chunks in seconds. If not provided, defaults to chunk_length_s / 6.


    [force_full_sequences]booleanWhether to force outputting full sequences or not. Default is false.


    [language]stringThe source language. Default is null, meaning it should be auto-detected. Use this to potentially improve performance if the source language is known.


    [task]stringThe task to perform. Default is null, meaning it should be auto-detected.


    [num_frames]numberThe number of frames in the input audio.



---

## `pipelines~ImageToTextPipelineType` ⇒ Promise.&lt;(ImageToTextOutput|Array&lt;ImageToTextOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(ImageToTextOutput|Array&lt;ImageToTextOutput&gt;)&gt; - An object (or array of objects) containing the generated text(s).

      ParamTypeDescription




    textsImagePipelineInputsThe images to be captioned.


    [options]*Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    generated_textstringThe generated text.



---

## `pipelines~ImageClassificationPipelineType` ⇒ Promise.&lt;(ImageClassificationOutput|Array&lt;ImageClassificationOutput&gt;)&gt;

Parameters specific to image classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(ImageClassificationOutput|Array&lt;ImageClassificationOutput&gt;)&gt; - An array or object containing the predicted labels and scores.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images(s) to be classified.


    [options]ImageClassificationPipelineOptionsThe options to use for image classification.



**Properties**

      NameTypeDefaultDescription




    labelstringThe label identified by the model.


    scorenumberThe score attributed by the model for that label.


    [top_k]number1The number of top labels that will be returned by the pipeline.



---

## `pipelines~ImageSegmentationPipelineType` ⇒ Promise.&lt;Array&lt;ImageSegmentationPipelineOutput&gt;&gt;

Parameters specific to image segmentation pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;Array&lt;ImageSegmentationPipelineOutput&gt;&gt; - The annotated segments.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images.


    [options]ImageSegmentationPipelineOptionsThe options to use for image segmentation.



**Properties**

      NameTypeDefaultDescription




    labelstring | nullThe label of the segment.


    scorenumber | nullThe score of the segment.


    maskRawImageThe mask of the segment.


    [threshold]number0.5Probability threshold to filter out predicted masks.


    [mask_threshold]number0.5Threshold to use when turning the predicted masks into binary values.


    [overlap_mask_area_threshold]number0.8Mask overlap threshold to eliminate small, disconnected segments.


    [subtask]null | stringSegmentation task to be performed. One of [panoptic, instance, and semantic],

depending on model capabilities. If not set, the pipeline will attempt to resolve (in that order).

    [label_ids_to_fuse]Array.&lt;number&gt;List of label ids to fuse. If not set, do not fuse any labels.


    [target_sizes]Array.&lt;Array&lt;number&gt;&gt;List of target sizes for the input images. If not set, use the original image sizes.



---

## `pipelines~BackgroundRemovalPipelineType` ⇒ Promise.&lt;Array&lt;RawImage&gt;&gt;

Parameters specific to image segmentation pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;Array&lt;RawImage&gt;&gt; - The images with the background removed.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images.


    [options]BackgroundRemovalPipelineOptionsThe options to use for image segmentation.



---

## `pipelines~ZeroShotImageClassificationPipelineType` ⇒ Promise.&lt;(Array&lt;ZeroShotImageClassificationOutput&gt;|Array&lt;Array&lt;ZeroShotImageClassificationOutput&gt;&gt;)&gt;

Parameters specific to zero-shot image classification pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(Array&lt;ZeroShotImageClassificationOutput&gt;|Array&lt;Array&lt;ZeroShotImageClassificationOutput&gt;&gt;)&gt; - An array of objects containing the predicted labels and scores.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images.


    candidate_labelsArray.&lt;string&gt;The candidate labels for this image.


    [options]ZeroShotImageClassificationPipelineOptionsThe options to use for zero-shot image classification.



**Properties**

      NameTypeDefaultDescription




    labelstringThe label identified by the model. It is one of the suggested candidate_label.


    scorenumberThe score attributed by the model for that label (between 0 and 1).


    [hypothesis_template]string&quot;&quot;This is a photo of {}&quot;&quot;The sentence used in conjunction with candidate_labels

to attempt the image classification by replacing the placeholder with the candidate_labels.
Then likelihood is estimated by using logits_per_image.

---

## `pipelines~ObjectDetectionPipelineType` ⇒ Promise.&lt;(ObjectDetectionPipelineOutput|Array&lt;ObjectDetectionPipelineOutput&gt;)&gt;

Parameters specific to object detection pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(ObjectDetectionPipelineOutput|Array&lt;ObjectDetectionPipelineOutput&gt;)&gt; - A list of objects or a list of list of objects.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images.


    [options]ObjectDetectionPipelineOptionsThe options to use for object detection.



**Properties**

      NameTypeDefaultDescription




    labelstringThe class label identified by the model.


    scorenumberThe score attributed by the model for that label.


    boxBoundingBoxThe bounding box of detected object in image&#39;s original size, or as a percentage if percentage is set to true.


    [threshold]number0.9The threshold used to filter boxes by score.


    [percentage]booleanfalseWhether to return the boxes coordinates in percentage (true) or in pixels (false).



---

## `pipelines~ZeroShotObjectDetectionPipelineType` ⇒ Promise.&lt;(Array&lt;ZeroShotObjectDetectionOutput&gt;|Array&lt;Array&lt;ZeroShotObjectDetectionOutput&gt;&gt;)&gt;

Parameters specific to zero-shot object detection pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(Array&lt;ZeroShotObjectDetectionOutput&gt;|Array&lt;Array&lt;ZeroShotObjectDetectionOutput&gt;&gt;)&gt; - An array of objects containing the predicted labels, scores, and bounding boxes.

      ParamTypeDescription




    imagesImagePipelineInputsThe input images.


    candidate_labelsArray.&lt;string&gt;What the model should recognize in the image.


    [options]ZeroShotObjectDetectionPipelineOptionsThe options to use for zero-shot object detection.



**Properties**

      NameTypeDefaultDescription




    labelstringText query corresponding to the found object.


    scorenumberScore corresponding to the object (between 0 and 1).


    boxBoundingBoxBounding box of the detected object in image&#39;s original size, or as a percentage if percentage is set to true.


    [threshold]number0.1The probability necessary to make a prediction.


    [top_k]numberThe number of top predictions that will be returned by the pipeline.

If the provided number is null or higher than the number of predictions available, it will default
to the number of predictions.

    [percentage]booleanfalseWhether to return the boxes coordinates in percentage (true) or in pixels (false).



---

## `pipelines~DocumentQuestionAnsweringPipelineType` ⇒ Promise.&lt;(DocumentQuestionAnsweringOutput|Array&lt;DocumentQuestionAnsweringOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(DocumentQuestionAnsweringOutput|Array&lt;DocumentQuestionAnsweringOutput&gt;)&gt; - An object (or array of objects) containing the answer(s).

      ParamTypeDescription




    imageImageInputThe image of the document to use.


    questionstringA question to ask of the document.


    [options]*Additional keyword arguments to pass along to the generate method of the model.



**Properties**

      NameTypeDescription




    answerstringThe generated text.



---

## `pipelines~TextToAudioPipelineConstructorArgs` : Object

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Properties**

      NameTypeDescription




    [vocoder]PreTrainedModelThe vocoder used by the pipeline (if the model uses one). If not provided, use the default HifiGan vocoder.



---

## `pipelines~TextToAudioPipelineType` ⇒ Promise.&lt;TextToAudioOutput&gt;

Parameters specific to text-to-audio pipelines.

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;TextToAudioOutput&gt; - An object containing the generated audio and sampling rate.

      ParamTypeDescription




    textsstring | Array&lt;string&gt;The text(s) to generate.


    optionsTextToAudioPipelineOptionsParameters passed to the model generation/forward method.



**Properties**

      NameTypeDefaultDescription




    audioFloat32ArrayThe generated audio waveform.


    sampling_ratenumberThe sampling rate of the generated audio waveform.


    [speaker_embeddings]Tensor | Float32Array | string | URLThe speaker embeddings (if the model requires it).



---

## `pipelines~ImageToImagePipelineType` ⇒ Promise.&lt;(RawImage|Array&lt;RawImage&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(RawImage|Array&lt;RawImage&gt;)&gt; - The transformed image or list of images.

      ParamTypeDescription




    imagesImagePipelineInputsThe images to transform.



---

## `pipelines~DepthEstimationPipelineType` ⇒ Promise.&lt;(DepthEstimationPipelineOutput|Array&lt;DepthEstimationPipelineOutput&gt;)&gt;

**Kind**: inner typedef of [pipelines](#module_pipelines)  
**Returns**: Promise.&lt;(DepthEstimationPipelineOutput|Array&lt;DepthEstimationPipelineOutput&gt;)&gt; - An image or a list of images containing result(s).

      ParamTypeDescription




    imagesImagePipelineInputsThe images to compute depth for.



**Properties**

      NameTypeDescription




    predicted_depthTensorThe raw depth map predicted by the model.


    depthRawImageThe processed depth map as an image (with the same size as the input image).



---

## `pipelines~AllTasks` : \*

All possible pipeline types.

**Kind**: inner typedef of [pipelines](#module_pipelines)

---
