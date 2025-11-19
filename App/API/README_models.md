# models

Definitions of all models available in Transformers.js.

**Example:** Load and run an `AutoModel`.

```javascript
import { AutoModel, AutoTokenizer } from "@huggingface/transformers";

let tokenizer = await AutoTokenizer.from_pretrained("Xenova/bert-base-uncased");
let model = await AutoModel.from_pretrained("Xenova/bert-base-uncased");

let inputs = await tokenizer("I love transformers!");
let { logits } = await model(inputs);
// Tensor {
//     data: Float32Array(183132) [-7.117443084716797, -7.107812881469727, -7.092104911804199, ...]
//     dims: (3) [1, 6, 30522],
//     type: "float32",
//     size: 183132,
// }
```

We also provide other `AutoModel`s (listed below), which you can use in the same way as the Python library. For example:

**Example:** Load and run an `AutoModelForSeq2SeqLM`.

```javascript
import {
  AutoModelForSeq2SeqLM,
  AutoTokenizer,
} from "@huggingface/transformers";

let tokenizer = await AutoTokenizer.from_pretrained("Xenova/t5-small");
let model = await AutoModelForSeq2SeqLM.from_pretrained("Xenova/t5-small");

let { input_ids } = await tokenizer(
  "translate English to German: I love transformers!"
);
let outputs = await model.generate(input_ids);
let decoded = tokenizer.decode(outputs[0], { skip_special_tokens: true });
// 'Ich liebe Transformatoren!'
```

- [models](#models)
  - [models.PreTrainedModel](#modelspretrainedmodel)
    - [`new PreTrainedModel(config, sessions, configs)`](#new-pretrainedmodelconfig-sessions-configs)
    - [`preTrainedModel.custom_config` : \*](#pretrainedmodelcustom_config--)
    - [`preTrainedModel.generation_config` ⇒ GenerationConfig | null](#pretrainedmodelgeneration_config--generationconfig--null)
    - [`preTrainedModel.dispose()` ⇒ Promise.\<Array\<unknown\>\>](#pretrainedmodeldispose--promisearrayunknown)
    - [`preTrainedModel._call(model_inputs)` ⇒ Promise.\<Object\>](#pretrainedmodel_callmodel_inputs--promiseobject)
    - [`preTrainedModel.forward(model_inputs)` ⇒ Promise.\<Object\>](#pretrainedmodelforwardmodel_inputs--promiseobject)
    - [`preTrainedModel._prepare_generation_config(generation_config, kwargs)` ⇒ GenerationConfig](#pretrainedmodel_prepare_generation_configgeneration_config-kwargs--generationconfig)
    - [`preTrainedModel._get_stopping_criteria(generation_config, [stopping_criteria])`](#pretrainedmodel_get_stopping_criteriageneration_config-stopping_criteria)
    - [`preTrainedModel._validate_model_class()`](#pretrainedmodel_validate_model_class)
    - [`preTrainedModel._update_model_kwargs_for_generation(inputs)` ⇒ Object](#pretrainedmodel_update_model_kwargs_for_generationinputs--object)
    - [`preTrainedModel._prepare_model_inputs(params)` ⇒ Object](#pretrainedmodel_prepare_model_inputsparams--object)
    - [`preTrainedModel._prepare_decoder_input_ids_for_generation(param0)`](#pretrainedmodel_prepare_decoder_input_ids_for_generationparam0)
    - [`preTrainedModel.generate(options)` ⇒ Promise.\<(ModelOutput|Tensor)\>](#pretrainedmodelgenerateoptions--promisemodeloutputtensor)
    - [`preTrainedModel.getPastKeyValues(decoderResults, pastKeyValues)` ⇒ Object](#pretrainedmodelgetpastkeyvaluesdecoderresults-pastkeyvalues--object)
    - [`preTrainedModel.getAttentions(model_output)` ⇒ \*](#pretrainedmodelgetattentionsmodel_output--)
    - [`preTrainedModel.addPastKeyValues(decoderFeeds, pastKeyValues)`](#pretrainedmodeladdpastkeyvaluesdecoderfeeds-pastkeyvalues)
    - [`PreTrainedModel.from_pretrained(pretrained_model_name_or_path, options)` ⇒ Promise.\<PreTrainedModel\>](#pretrainedmodelfrom_pretrainedpretrained_model_name_or_path-options--promisepretrainedmodel)
  - [models.BaseModelOutput](#modelsbasemodeloutput)
    - [`new BaseModelOutput(output)`](#new-basemodeloutputoutput)
  - [models.BertForMaskedLM](#modelsbertformaskedlm)
    - [`bertForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#bertformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.BertForSequenceClassification](#modelsbertforsequenceclassification)
    - [`bertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#bertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.BertForTokenClassification](#modelsbertfortokenclassification)
    - [`bertForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#bertfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.BertForQuestionAnswering](#modelsbertforquestionanswering)
    - [`bertForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#bertforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.RoFormerModel](#modelsroformermodel)
  - [models.RoFormerForMaskedLM](#modelsroformerformaskedlm)
    - [`roFormerForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#roformerformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.RoFormerForSequenceClassification](#modelsroformerforsequenceclassification)
    - [`roFormerForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#roformerforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.RoFormerForTokenClassification](#modelsroformerfortokenclassification)
    - [`roFormerForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#roformerfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.RoFormerForQuestionAnswering](#modelsroformerforquestionanswering)
    - [`roFormerForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#roformerforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.ConvBertModel](#modelsconvbertmodel)
  - [models.ConvBertForMaskedLM](#modelsconvbertformaskedlm)
    - [`convBertForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#convbertformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.ConvBertForSequenceClassification](#modelsconvbertforsequenceclassification)
    - [`convBertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#convbertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.ConvBertForTokenClassification](#modelsconvbertfortokenclassification)
    - [`convBertForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#convbertfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.ConvBertForQuestionAnswering](#modelsconvbertforquestionanswering)
    - [`convBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#convbertforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.ElectraModel](#modelselectramodel)
  - [models.ElectraForMaskedLM](#modelselectraformaskedlm)
    - [`electraForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#electraformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.ElectraForSequenceClassification](#modelselectraforsequenceclassification)
    - [`electraForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#electraforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.ElectraForTokenClassification](#modelselectrafortokenclassification)
    - [`electraForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#electrafortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.ElectraForQuestionAnswering](#modelselectraforquestionanswering)
    - [`electraForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#electraforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.CamembertModel](#modelscamembertmodel)
  - [models.CamembertForMaskedLM](#modelscamembertformaskedlm)
    - [`camembertForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#camembertformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.CamembertForSequenceClassification](#modelscamembertforsequenceclassification)
    - [`camembertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#camembertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.CamembertForTokenClassification](#modelscamembertfortokenclassification)
    - [`camembertForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#camembertfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.CamembertForQuestionAnswering](#modelscamembertforquestionanswering)
    - [`camembertForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#camembertforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.DebertaModel](#modelsdebertamodel)
  - [models.DebertaForMaskedLM](#modelsdebertaformaskedlm)
    - [`debertaForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#debertaformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.DebertaForSequenceClassification](#modelsdebertaforsequenceclassification)
    - [`debertaForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#debertaforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.DebertaForTokenClassification](#modelsdebertafortokenclassification)
    - [`debertaForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#debertafortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.DebertaForQuestionAnswering](#modelsdebertaforquestionanswering)
    - [`debertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#debertaforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.DebertaV2Model](#modelsdebertav2model)
  - [models.DebertaV2ForMaskedLM](#modelsdebertav2formaskedlm)
    - [`debertaV2ForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#debertav2formaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.DebertaV2ForSequenceClassification](#modelsdebertav2forsequenceclassification)
    - [`debertaV2ForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#debertav2forsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.DebertaV2ForTokenClassification](#modelsdebertav2fortokenclassification)
    - [`debertaV2ForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#debertav2fortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.DebertaV2ForQuestionAnswering](#modelsdebertav2forquestionanswering)
    - [`debertaV2ForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#debertav2forquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.DistilBertForSequenceClassification](#modelsdistilbertforsequenceclassification)
    - [`distilBertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#distilbertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.DistilBertForTokenClassification](#modelsdistilbertfortokenclassification)
    - [`distilBertForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#distilbertfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.DistilBertForQuestionAnswering](#modelsdistilbertforquestionanswering)
    - [`distilBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#distilbertforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.DistilBertForMaskedLM](#modelsdistilbertformaskedlm)
    - [`distilBertForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#distilbertformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.EsmModel](#modelsesmmodel)
  - [models.EsmForMaskedLM](#modelsesmformaskedlm)
    - [`esmForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#esmformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.EsmForSequenceClassification](#modelsesmforsequenceclassification)
    - [`esmForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#esmforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.EsmForTokenClassification](#modelsesmfortokenclassification)
    - [`esmForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#esmfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.MobileBertForMaskedLM](#modelsmobilebertformaskedlm)
    - [`mobileBertForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#mobilebertformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.MobileBertForSequenceClassification](#modelsmobilebertforsequenceclassification)
    - [`mobileBertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#mobilebertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.MobileBertForQuestionAnswering](#modelsmobilebertforquestionanswering)
    - [`mobileBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#mobilebertforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.MPNetModel](#modelsmpnetmodel)
  - [models.MPNetForMaskedLM](#modelsmpnetformaskedlm)
    - [`mpNetForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#mpnetformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.MPNetForSequenceClassification](#modelsmpnetforsequenceclassification)
    - [`mpNetForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#mpnetforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.MPNetForTokenClassification](#modelsmpnetfortokenclassification)
    - [`mpNetForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#mpnetfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.MPNetForQuestionAnswering](#modelsmpnetforquestionanswering)
    - [`mpNetForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#mpnetforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.T5ForConditionalGeneration](#modelst5forconditionalgeneration)
  - [models.LongT5PreTrainedModel](#modelslongt5pretrainedmodel)
  - [models.LongT5Model](#modelslongt5model)
  - [models.LongT5ForConditionalGeneration](#modelslongt5forconditionalgeneration)
  - [models.MT5ForConditionalGeneration](#modelsmt5forconditionalgeneration)
  - [models.BartModel](#modelsbartmodel)
  - [models.BartForConditionalGeneration](#modelsbartforconditionalgeneration)
  - [models.BartForSequenceClassification](#modelsbartforsequenceclassification)
    - [`bartForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#bartforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.MBartModel](#modelsmbartmodel)
  - [models.MBartForConditionalGeneration](#modelsmbartforconditionalgeneration)
  - [models.MBartForSequenceClassification](#modelsmbartforsequenceclassification)
    - [`mBartForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#mbartforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.BlenderbotModel](#modelsblenderbotmodel)
  - [models.BlenderbotForConditionalGeneration](#modelsblenderbotforconditionalgeneration)
  - [models.BlenderbotSmallModel](#modelsblenderbotsmallmodel)
  - [models.BlenderbotSmallForConditionalGeneration](#modelsblenderbotsmallforconditionalgeneration)
  - [models.RobertaForMaskedLM](#modelsrobertaformaskedlm)
    - [`robertaForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#robertaformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.RobertaForSequenceClassification](#modelsrobertaforsequenceclassification)
    - [`robertaForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#robertaforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.RobertaForTokenClassification](#modelsrobertafortokenclassification)
    - [`robertaForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#robertafortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.RobertaForQuestionAnswering](#modelsrobertaforquestionanswering)
    - [`robertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#robertaforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.XLMPreTrainedModel](#modelsxlmpretrainedmodel)
  - [models.XLMModel](#modelsxlmmodel)
  - [models.XLMWithLMHeadModel](#modelsxlmwithlmheadmodel)
    - [`xlmWithLMHeadModel._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#xlmwithlmheadmodel_callmodel_inputs--promisemaskedlmoutput)
  - [models.XLMForSequenceClassification](#modelsxlmforsequenceclassification)
    - [`xlmForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#xlmforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.XLMForTokenClassification](#modelsxlmfortokenclassification)
    - [`xlmForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#xlmfortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.XLMForQuestionAnswering](#modelsxlmforquestionanswering)
    - [`xlmForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#xlmforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.XLMRobertaForMaskedLM](#modelsxlmrobertaformaskedlm)
    - [`xlmRobertaForMaskedLM._call(model_inputs)` ⇒ Promise.\<MaskedLMOutput\>](#xlmrobertaformaskedlm_callmodel_inputs--promisemaskedlmoutput)
  - [models.XLMRobertaForSequenceClassification](#modelsxlmrobertaforsequenceclassification)
    - [`xlmRobertaForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#xlmrobertaforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.XLMRobertaForTokenClassification](#modelsxlmrobertafortokenclassification)
    - [`xlmRobertaForTokenClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#xlmrobertafortokenclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.XLMRobertaForQuestionAnswering](#modelsxlmrobertaforquestionanswering)
    - [`xlmRobertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.\<QuestionAnsweringModelOutput\>](#xlmrobertaforquestionanswering_callmodel_inputs--promisequestionansweringmodeloutput)
  - [models.ASTModel](#modelsastmodel)
  - [models.ASTForAudioClassification](#modelsastforaudioclassification)
  - [models.WhisperModel](#modelswhispermodel)
  - [models.WhisperForConditionalGeneration](#modelswhisperforconditionalgeneration)
    - [`whisperForConditionalGeneration._retrieve_init_tokens(generation_config)`](#whisperforconditionalgeneration_retrieve_init_tokensgeneration_config)
    - [`whisperForConditionalGeneration.generate(options)` ⇒ Promise.\<(ModelOutput|Tensor)\>](#whisperforconditionalgenerationgenerateoptions--promisemodeloutputtensor)
    - [`whisperForConditionalGeneration._extract_token_timestamps(generate_outputs, alignment_heads, [num_frames], [time_precision])` ⇒ Tensor](#whisperforconditionalgeneration_extract_token_timestampsgenerate_outputs-alignment_heads-num_frames-time_precision--tensor)
  - [models.MoonshineModel](#modelsmoonshinemodel)
  - [models.VisionEncoderDecoderModel](#modelsvisionencoderdecodermodel)
  - [models.LlavaForConditionalGeneration](#modelsllavaforconditionalgeneration)
  - [models.Idefics3ForConditionalGeneration](#modelsidefics3forconditionalgeneration)
  - [models.SmolVLMForConditionalGeneration](#modelssmolvlmforconditionalgeneration)
  - [models.CLIPModel](#modelsclipmodel)
  - [models.CLIPTextModel](#modelscliptextmodel)
    - [`CLIPTextModel.from_pretrained()` : \*](#cliptextmodelfrom_pretrained--)
  - [models.CLIPTextModelWithProjection](#modelscliptextmodelwithprojection)
    - [`CLIPTextModelWithProjection.from_pretrained()` : \*](#cliptextmodelwithprojectionfrom_pretrained--)
  - [models.CLIPVisionModel](#modelsclipvisionmodel)
    - [`CLIPVisionModel.from_pretrained()` : \*](#clipvisionmodelfrom_pretrained--)
  - [models.CLIPVisionModelWithProjection](#modelsclipvisionmodelwithprojection)
    - [`CLIPVisionModelWithProjection.from_pretrained()` : \*](#clipvisionmodelwithprojectionfrom_pretrained--)
  - [models.SiglipModel](#modelssiglipmodel)
  - [models.SiglipTextModel](#modelssigliptextmodel)
    - [`SiglipTextModel.from_pretrained()` : \*](#sigliptextmodelfrom_pretrained--)
  - [models.SiglipVisionModel](#modelssiglipvisionmodel)
    - [`SiglipVisionModel.from_pretrained()` : \*](#siglipvisionmodelfrom_pretrained--)
  - [models.CLIPSegForImageSegmentation](#modelsclipsegforimagesegmentation)
    - [`vitMatteForImageMatting._call(model_inputs)`](#vitmatteforimagematting_callmodel_inputs)
  - [models.DetrObjectDetectionOutput](#modelsdetrobjectdetectionoutput)
    - [`new DetrObjectDetectionOutput(output)`](#new-detrobjectdetectionoutputoutput)
  - [models.DetrSegmentationOutput](#modelsdetrsegmentationoutput)
    - [`new DetrSegmentationOutput(output)`](#new-detrsegmentationoutputoutput)
  - [models.RTDetrObjectDetectionOutput](#modelsrtdetrobjectdetectionoutput)
    - [`new RTDetrObjectDetectionOutput(output)`](#new-rtdetrobjectdetectionoutputoutput)
  - [models.TableTransformerModel](#modelstabletransformermodel)
  - [models.TableTransformerForObjectDetection](#modelstabletransformerforobjectdetection)
    - [`tableTransformerForObjectDetection._call(model_inputs)`](#tabletransformerforobjectdetection_callmodel_inputs)
  - [models.ResNetPreTrainedModel](#modelsresnetpretrainedmodel)
  - [models.ResNetModel](#modelsresnetmodel)
  - [models.ResNetForImageClassification](#modelsresnetforimageclassification)
    - [`resNetForImageClassification._call(model_inputs)`](#resnetforimageclassification_callmodel_inputs)
  - [models.Swin2SRModel](#modelsswin2srmodel)
  - [models.Swin2SRForImageSuperResolution](#modelsswin2srforimagesuperresolution)
  - [models.DPTModel](#modelsdptmodel)
  - [models.DPTForDepthEstimation](#modelsdptfordepthestimation)
  - [models.DepthAnythingForDepthEstimation](#modelsdepthanythingfordepthestimation)
  - [models.GLPNModel](#modelsglpnmodel)
  - [models.GLPNForDepthEstimation](#modelsglpnfordepthestimation)
  - [models.ConvNextModel](#modelsconvnextmodel)
  - [models.ConvNextForImageClassification](#modelsconvnextforimageclassification)
    - [`convNextForImageClassification._call(model_inputs)`](#convnextforimageclassification_callmodel_inputs)
  - [models.ConvNextV2Model](#modelsconvnextv2model)
  - [models.ConvNextV2ForImageClassification](#modelsconvnextv2forimageclassification)
    - [`convNextV2ForImageClassification._call(model_inputs)`](#convnextv2forimageclassification_callmodel_inputs)
  - [models.Dinov2Model](#modelsdinov2model)
  - [models.Dinov2ForImageClassification](#modelsdinov2forimageclassification)
    - [`dinov2ForImageClassification._call(model_inputs)`](#dinov2forimageclassification_callmodel_inputs)
  - [models.Dinov2WithRegistersModel](#modelsdinov2withregistersmodel)
  - [models.Dinov2WithRegistersForImageClassification](#modelsdinov2withregistersforimageclassification)
    - [`dinov2WithRegistersForImageClassification._call(model_inputs)`](#dinov2withregistersforimageclassification_callmodel_inputs)
  - [models.YolosObjectDetectionOutput](#modelsyolosobjectdetectionoutput)
    - [`new YolosObjectDetectionOutput(output)`](#new-yolosobjectdetectionoutputoutput)
  - [models.SamModel](#modelssammodel)
    - [`samModel.get_image_embeddings(model_inputs)` ⇒ Promise.\<{image\_embeddings: Tensor, image\_positional\_embeddings: Tensor}\>](#sammodelget_image_embeddingsmodel_inputs--promiseimage_embeddings-tensor-image_positional_embeddings-tensor)
    - [`samModel.forward(model_inputs)` ⇒ Promise.\<Object\>](#sammodelforwardmodel_inputs--promiseobject)
    - [`samModel._call(model_inputs)` ⇒ Promise.\<SamImageSegmentationOutput\>](#sammodel_callmodel_inputs--promisesamimagesegmentationoutput)
  - [models.SamImageSegmentationOutput](#modelssamimagesegmentationoutput)
    - [`new SamImageSegmentationOutput(output)`](#new-samimagesegmentationoutputoutput)
  - [models.Sam2ImageSegmentationOutput](#modelssam2imagesegmentationoutput)
    - [`new Sam2ImageSegmentationOutput(output)`](#new-sam2imagesegmentationoutputoutput)
  - [models.EdgeTamModel](#modelsedgetammodel)
    - [`edgeTamModel.get_image_embeddings(model_inputs)` ⇒ Promise.\<Record\<String, Tensor\>\>](#edgetammodelget_image_embeddingsmodel_inputs--promiserecordstring-tensor)
    - [`edgeTamModel._call(model_inputs)` ⇒ Promise.\<Sam2ImageSegmentationOutput\>](#edgetammodel_callmodel_inputs--promisesam2imagesegmentationoutput)
  - [models.Wav2Vec2Model](#modelswav2vec2model)
  - [models.Wav2Vec2ForAudioFrameClassification](#modelswav2vec2foraudioframeclassification)
    - [`wav2Vec2ForAudioFrameClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#wav2vec2foraudioframeclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.PyAnnoteModel](#modelspyannotemodel)
  - [models.PyAnnoteForAudioFrameClassification](#modelspyannoteforaudioframeclassification)
    - [`pyAnnoteForAudioFrameClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#pyannoteforaudioframeclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.UniSpeechModel](#modelsunispeechmodel)
  - [models.UniSpeechForCTC](#modelsunispeechforctc)
    - [`uniSpeechForCTC._call(model_inputs)`](#unispeechforctc_callmodel_inputs)
  - [models.UniSpeechForSequenceClassification](#modelsunispeechforsequenceclassification)
    - [`uniSpeechForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#unispeechforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.UniSpeechSatModel](#modelsunispeechsatmodel)
  - [models.UniSpeechSatForCTC](#modelsunispeechsatforctc)
    - [`uniSpeechSatForCTC._call(model_inputs)`](#unispeechsatforctc_callmodel_inputs)
  - [models.UniSpeechSatForSequenceClassification](#modelsunispeechsatforsequenceclassification)
    - [`uniSpeechSatForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#unispeechsatforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.UniSpeechSatForAudioFrameClassification](#modelsunispeechsatforaudioframeclassification)
    - [`uniSpeechSatForAudioFrameClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#unispeechsatforaudioframeclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.Wav2Vec2BertModel](#modelswav2vec2bertmodel)
  - [models.Wav2Vec2BertForCTC](#modelswav2vec2bertforctc)
    - [`wav2Vec2BertForCTC._call(model_inputs)`](#wav2vec2bertforctc_callmodel_inputs)
  - [models.Wav2Vec2BertForSequenceClassification](#modelswav2vec2bertforsequenceclassification)
    - [`wav2Vec2BertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#wav2vec2bertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.HubertModel](#modelshubertmodel)
  - [models.HubertForCTC](#modelshubertforctc)
    - [`hubertForCTC._call(model_inputs)`](#hubertforctc_callmodel_inputs)
  - [models.HubertForSequenceClassification](#modelshubertforsequenceclassification)
    - [`hubertForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#hubertforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.WavLMPreTrainedModel](#modelswavlmpretrainedmodel)
  - [models.WavLMModel](#modelswavlmmodel)
  - [models.WavLMForCTC](#modelswavlmforctc)
    - [`wavLMForCTC._call(model_inputs)`](#wavlmforctc_callmodel_inputs)
  - [models.WavLMForSequenceClassification](#modelswavlmforsequenceclassification)
    - [`wavLMForSequenceClassification._call(model_inputs)` ⇒ Promise.\<SequenceClassifierOutput\>](#wavlmforsequenceclassification_callmodel_inputs--promisesequenceclassifieroutput)
  - [models.WavLMForXVector](#modelswavlmforxvector)
    - [`wavLMForXVector._call(model_inputs)` ⇒ Promise.\<XVectorOutput\>](#wavlmforxvector_callmodel_inputs--promisexvectoroutput)
  - [models.WavLMForAudioFrameClassification](#modelswavlmforaudioframeclassification)
    - [`wavLMForAudioFrameClassification._call(model_inputs)` ⇒ Promise.\<TokenClassifierOutput\>](#wavlmforaudioframeclassification_callmodel_inputs--promisetokenclassifieroutput)
  - [models.SpeechT5PreTrainedModel](#modelsspeecht5pretrainedmodel)
  - [models.SpeechT5Model](#modelsspeecht5model)
  - [models.SpeechT5ForSpeechToText](#modelsspeecht5forspeechtotext)
  - [models.SpeechT5ForTextToSpeech](#modelsspeecht5fortexttospeech)
    - [`speechT5ForTextToSpeech.generate_speech(input_values, speaker_embeddings, options)` ⇒ Promise.\<SpeechOutput\>](#speecht5fortexttospeechgenerate_speechinput_values-speaker_embeddings-options--promisespeechoutput)
  - [models.SpeechT5HifiGan](#modelsspeecht5hifigan)
  - [models.TrOCRForCausalLM](#modelstrocrforcausallm)
  - [models.MistralPreTrainedModel](#modelsmistralpretrainedmodel)
  - [models.Starcoder2PreTrainedModel](#modelsstarcoder2pretrainedmodel)
  - [models.FalconPreTrainedModel](#modelsfalconpretrainedmodel)
  - [models.ClapTextModelWithProjection](#modelsclaptextmodelwithprojection)
    - [`ClapTextModelWithProjection.from_pretrained()` : \*](#claptextmodelwithprojectionfrom_pretrained--)
  - [models.ClapAudioModelWithProjection](#modelsclapaudiomodelwithprojection)
    - [`ClapAudioModelWithProjection.from_pretrained()` : \*](#clapaudiomodelwithprojectionfrom_pretrained--)
  - [models.VitsModel](#modelsvitsmodel)
    - [`vitsModel._call(model_inputs)` ⇒ Promise.\<VitsModelOutput\>](#vitsmodel_callmodel_inputs--promisevitsmodeloutput)
  - [models.SegformerModel](#modelssegformermodel)
  - [models.SegformerForImageClassification](#modelssegformerforimageclassification)
  - [models.SegformerForSemanticSegmentation](#modelssegformerforsemanticsegmentation)
  - [models.StableLmModel](#modelsstablelmmodel)
  - [models.StableLmForCausalLM](#modelsstablelmforcausallm)
  - [models.EfficientNetModel](#modelsefficientnetmodel)
  - [models.EfficientNetForImageClassification](#modelsefficientnetforimageclassification)
    - [`efficientNetForImageClassification._call(model_inputs)`](#efficientnetforimageclassification_callmodel_inputs)
  - [models.MusicgenModel](#modelsmusicgenmodel)
  - [models.MusicgenForCausalLM](#modelsmusicgenforcausallm)
  - [models.MusicgenForConditionalGeneration](#modelsmusicgenforconditionalgeneration)
    - [`musicgenForConditionalGeneration._apply_and_filter_by_delay_pattern_mask(outputs)` ⇒ Tensor](#musicgenforconditionalgeneration_apply_and_filter_by_delay_pattern_maskoutputs--tensor)
    - [`musicgenForConditionalGeneration.generate(options)` ⇒ Promise.\<(ModelOutput|Tensor)\>](#musicgenforconditionalgenerationgenerateoptions--promisemodeloutputtensor)
  - [models.MobileNetV1Model](#modelsmobilenetv1model)
  - [models.MobileNetV1ForImageClassification](#modelsmobilenetv1forimageclassification)
    - [`mobileNetV1ForImageClassification._call(model_inputs)`](#mobilenetv1forimageclassification_callmodel_inputs)
  - [models.MobileNetV2Model](#modelsmobilenetv2model)
  - [models.MobileNetV2ForImageClassification](#modelsmobilenetv2forimageclassification)
    - [`mobileNetV2ForImageClassification._call(model_inputs)`](#mobilenetv2forimageclassification_callmodel_inputs)
  - [models.MobileNetV3Model](#modelsmobilenetv3model)
  - [models.MobileNetV3ForImageClassification](#modelsmobilenetv3forimageclassification)
    - [`mobileNetV3ForImageClassification._call(model_inputs)`](#mobilenetv3forimageclassification_callmodel_inputs)
  - [models.MobileNetV4Model](#modelsmobilenetv4model)
  - [models.MobileNetV4ForImageClassification](#modelsmobilenetv4forimageclassification)
    - [`mobileNetV4ForImageClassification._call(model_inputs)`](#mobilenetv4forimageclassification_callmodel_inputs)
  - [models.DecisionTransformerModel](#modelsdecisiontransformermodel)
  - [models.MultiModalityCausalLM](#modelsmultimodalitycausallm)
    - [`new MultiModalityCausalLM(...args)`](#new-multimodalitycausallmargs)
    - [`multiModalityCausalLM.generate(options)`](#multimodalitycausallmgenerateoptions)
    - [`multiModalityCausalLM.generate_images(options)`](#multimodalitycausallmgenerate_imagesoptions)
  - [models.MgpstrForSceneTextRecognition](#modelsmgpstrforscenetextrecognition)
    - [`mgpstrForSceneTextRecognition._call(model_inputs)`](#mgpstrforscenetextrecognition_callmodel_inputs)
  - [models.PatchTSTModel](#modelspatchtstmodel)
  - [models.PatchTSTForPrediction](#modelspatchtstforprediction)
  - [models.PatchTSMixerModel](#modelspatchtsmixermodel)
  - [models.PatchTSMixerForPrediction](#modelspatchtsmixerforprediction)
  - [models.MimiEncoderOutput](#modelsmimiencoderoutput)
    - [`new MimiEncoderOutput(output)`](#new-mimiencoderoutputoutput)
  - [models.MimiDecoderOutput](#modelsmimidecoderoutput)
    - [`new MimiDecoderOutput(output)`](#new-mimidecoderoutputoutput)
  - [models.MimiModel](#modelsmimimodel)
    - [`mimiModel.encode(inputs)` ⇒ Promise.\<MimiEncoderOutput\>](#mimimodelencodeinputs--promisemimiencoderoutput)
    - [`mimiModel.decode(inputs)` ⇒ Promise.\<MimiDecoderOutput\>](#mimimodeldecodeinputs--promisemimidecoderoutput)
  - [models.DacEncoderOutput](#modelsdacencoderoutput)
    - [`new DacEncoderOutput(output)`](#new-dacencoderoutputoutput)
  - [models.DacDecoderOutput](#modelsdacdecoderoutput)
    - [`new DacDecoderOutput(output)`](#new-dacdecoderoutputoutput)
  - [models.DacModel](#modelsdacmodel)
    - [`dacModel.encode(inputs)` ⇒ Promise.\<DacEncoderOutput\>](#dacmodelencodeinputs--promisedacencoderoutput)
    - [`dacModel.decode(inputs)` ⇒ Promise.\<DacDecoderOutput\>](#dacmodeldecodeinputs--promisedacdecoderoutput)
  - [models.SnacModel](#modelssnacmodel)
    - [`snacModel.encode(inputs)` ⇒ Promise.\<Record\<string, Tensor\>\>](#snacmodelencodeinputs--promiserecordstring-tensor)
    - [`snacModel.decode(inputs)` ⇒ Promise.\<{audio\_values: Tensor}\>](#snacmodeldecodeinputs--promiseaudio_values-tensor)
  - [models.PretrainedMixin](#modelspretrainedmixin)
    - [`pretrainedMixin.MODEL_CLASS_MAPPINGS` : \*](#pretrainedmixinmodel_class_mappings--)
    - [`pretrainedMixin.BASE_IF_FAIL`](#pretrainedmixinbase_if_fail)
    - [`PretrainedMixin.from_pretrained()` : \*](#pretrainedmixinfrom_pretrained--)
  - [models.AutoModel](#modelsautomodel)
    - [`new AutoModel()`](#new-automodel)
    - [`autoModel.MODEL_CLASS_MAPPINGS` : \*](#automodelmodel_class_mappings--)
  - [models.AutoModelForSequenceClassification](#modelsautomodelforsequenceclassification)
    - [`new AutoModelForSequenceClassification()`](#new-automodelforsequenceclassification)
  - [models.AutoModelForTokenClassification](#modelsautomodelfortokenclassification)
    - [`new AutoModelForTokenClassification()`](#new-automodelfortokenclassification)
  - [models.AutoModelForSeq2SeqLM](#modelsautomodelforseq2seqlm)
    - [`new AutoModelForSeq2SeqLM()`](#new-automodelforseq2seqlm)
  - [models.AutoModelForSpeechSeq2Seq](#modelsautomodelforspeechseq2seq)
    - [`new AutoModelForSpeechSeq2Seq()`](#new-automodelforspeechseq2seq)
  - [models.AutoModelForTextToSpectrogram](#modelsautomodelfortexttospectrogram)
    - [`new AutoModelForTextToSpectrogram()`](#new-automodelfortexttospectrogram)
  - [models.AutoModelForTextToWaveform](#modelsautomodelfortexttowaveform)
    - [`new AutoModelForTextToWaveform()`](#new-automodelfortexttowaveform)
  - [models.AutoModelForCausalLM](#modelsautomodelforcausallm)
    - [`new AutoModelForCausalLM()`](#new-automodelforcausallm)
  - [models.AutoModelForMaskedLM](#modelsautomodelformaskedlm)
    - [`new AutoModelForMaskedLM()`](#new-automodelformaskedlm)
  - [models.AutoModelForQuestionAnswering](#modelsautomodelforquestionanswering)
    - [`new AutoModelForQuestionAnswering()`](#new-automodelforquestionanswering)
  - [models.AutoModelForVision2Seq](#modelsautomodelforvision2seq)
    - [`new AutoModelForVision2Seq()`](#new-automodelforvision2seq)
  - [models.AutoModelForImageClassification](#modelsautomodelforimageclassification)
    - [`new AutoModelForImageClassification()`](#new-automodelforimageclassification)
  - [models.AutoModelForImageSegmentation](#modelsautomodelforimagesegmentation)
    - [`new AutoModelForImageSegmentation()`](#new-automodelforimagesegmentation)
  - [models.AutoModelForSemanticSegmentation](#modelsautomodelforsemanticsegmentation)
    - [`new AutoModelForSemanticSegmentation()`](#new-automodelforsemanticsegmentation)
  - [models.AutoModelForUniversalSegmentation](#modelsautomodelforuniversalsegmentation)
    - [`new AutoModelForUniversalSegmentation()`](#new-automodelforuniversalsegmentation)
  - [models.AutoModelForObjectDetection](#modelsautomodelforobjectdetection)
    - [`new AutoModelForObjectDetection()`](#new-automodelforobjectdetection)
  - [models.AutoModelForMaskGeneration](#modelsautomodelformaskgeneration)
    - [`new AutoModelForMaskGeneration()`](#new-automodelformaskgeneration)
  - [models.Seq2SeqLMOutput](#modelsseq2seqlmoutput)
    - [`new Seq2SeqLMOutput(output)`](#new-seq2seqlmoutputoutput)
  - [models.SequenceClassifierOutput](#modelssequenceclassifieroutput)
    - [`new SequenceClassifierOutput(output)`](#new-sequenceclassifieroutputoutput)
  - [models.XVectorOutput](#modelsxvectoroutput)
    - [`new XVectorOutput(output)`](#new-xvectoroutputoutput)
  - [models.TokenClassifierOutput](#modelstokenclassifieroutput)
    - [`new TokenClassifierOutput(output)`](#new-tokenclassifieroutputoutput)
  - [models.MaskedLMOutput](#modelsmaskedlmoutput)
    - [`new MaskedLMOutput(output)`](#new-maskedlmoutputoutput)
  - [models.QuestionAnsweringModelOutput](#modelsquestionansweringmodeloutput)
    - [`new QuestionAnsweringModelOutput(output)`](#new-questionansweringmodeloutputoutput)
  - [models.CausalLMOutput](#modelscausallmoutput)
    - [`new CausalLMOutput(output)`](#new-causallmoutputoutput)
  - [models.CausalLMOutputWithPast](#modelscausallmoutputwithpast)
    - [`new CausalLMOutputWithPast(output)`](#new-causallmoutputwithpastoutput)
  - [models.ImageMattingOutput](#modelsimagemattingoutput)
    - [`new ImageMattingOutput(output)`](#new-imagemattingoutputoutput)
  - [models.VitsModelOutput](#modelsvitsmodeloutput)
    - [`new VitsModelOutput(output)`](#new-vitsmodeloutputoutput)
  - [`models~cumsum_masked_fill(attention_mask)` ⇒ Object](#modelscumsum_masked_fillattention_mask--object)
  - [`models~createPositionIds()`](#modelscreatepositionids)
  - [`models~SamModelInputs` : Object](#modelssammodelinputs--object)
  - [`models~SpeechOutput` : Object](#modelsspeechoutput--object)

---

## models.PreTrainedModel

A base class for pre-trained models that provides the model configuration and an ONNX session.

**Kind**: static class of [models](#module_models)

- [.PreTrainedModel](#module_models.PreTrainedModel)
  - [`new PreTrainedModel(config, sessions, configs)`](#new_module_models.PreTrainedModel_new)
  - _instance_
    - [`.custom_config`](#module_models.PreTrainedModel+custom_config) : \*
    - [`.generation_config`](#module_models.PreTrainedModel+generation_config) ⇒ GenerationConfig | null
    - [`.dispose()`](#module_models.PreTrainedModel+dispose) ⇒ Promise.&lt;Array&lt;unknown&gt;&gt;
    - [`._call(model_inputs)`](#module_models.PreTrainedModel+_call) ⇒ Promise.&lt;Object&gt;
    - [`.forward(model_inputs)`](#module_models.PreTrainedModel+forward) ⇒ Promise.&lt;Object&gt;
    - [`._prepare_generation_config(generation_config, kwargs)`](#module_models.PreTrainedModel+_prepare_generation_config) ⇒ GenerationConfig
    - [`._get_stopping_criteria(generation_config, [stopping_criteria])`](#module_models.PreTrainedModel+_get_stopping_criteria)
    - [`._validate_model_class()`](#module_models.PreTrainedModel+_validate_model_class)
    - [`._update_model_kwargs_for_generation(inputs)`](#module_models.PreTrainedModel+_update_model_kwargs_for_generation) ⇒ Object
    - [`._prepare_model_inputs(params)`](#module_models.PreTrainedModel+_prepare_model_inputs) ⇒ Object
    - [`._prepare_decoder_input_ids_for_generation(param0)`](#module_models.PreTrainedModel+_prepare_decoder_input_ids_for_generation)
    - [`.generate(options)`](#module_models.PreTrainedModel+generate) ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;
    - [`.getPastKeyValues(decoderResults, pastKeyValues)`](#module_models.PreTrainedModel+getPastKeyValues) ⇒ Object
    - [`.getAttentions(model_output)`](#module_models.PreTrainedModel+getAttentions) ⇒ \*
    - [`.addPastKeyValues(decoderFeeds, pastKeyValues)`](#module_models.PreTrainedModel+addPastKeyValues)
  - _static_
    - [`.from_pretrained(pretrained_model_name_or_path, options)`](#module_models.PreTrainedModel.from_pretrained) ⇒ Promise.&lt;PreTrainedModel&gt;

---

### `new PreTrainedModel(config, sessions, configs)`

Creates a new instance of the `PreTrainedModel` class.

      ParamTypeDescription




    config*The model configuration.


    sessionsRecord.&lt;string, any&gt;The inference sessions for the model.


    configsRecord.&lt;string, Object&gt;Additional configuration files (e.g., generation_config.json).



---

### `preTrainedModel.custom_config` : \*

**Kind**: instance property of [PreTrainedModel](#module_models.PreTrainedModel)

---

### `preTrainedModel.generation_config` ⇒ GenerationConfig | null

Get the model's generation config, if it exists.

**Kind**: instance property of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: GenerationConfig | null - The model's generation config if it exists, otherwise `null`.

---

### `preTrainedModel.dispose()` ⇒ Promise.&lt;Array&lt;unknown&gt;&gt;

Disposes of all the ONNX sessions that were created during inference.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Promise.&lt;Array&lt;unknown&gt;&gt; - An array of promises, one for each ONNX session that is being disposed.  
**Todo**

- Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry

---

### `preTrainedModel._call(model_inputs)` ⇒ Promise.&lt;Object&gt;

Runs the model with the provided inputs

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Promise.&lt;Object&gt; - Object containing output tensors

      ParamTypeDescription




    model_inputsObjectObject containing input tensors



---

### `preTrainedModel.forward(model_inputs)` ⇒ Promise.&lt;Object&gt;

Forward method for a pretrained model. If not overridden by a subclass, the correct forward method
will be chosen based on the model type.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Promise.&lt;Object&gt; - The output data from the model in the format specified in the ONNX model.  
**Throws**:

- Error This method must be implemented in subclasses.

      ParamTypeDescription

  model_inputsObjectThe input data to the model in the format specified in the ONNX model.

---

### `preTrainedModel._prepare_generation_config(generation_config, kwargs)` ⇒ GenerationConfig

This function merges multiple generation configs together to form a final generation config to be used by the model for text generation.
It first creates an empty `GenerationConfig` object, then it applies the model's own `generation_config` property to it. Finally, if a `generation_config` object was passed in the arguments, it overwrites the corresponding properties in the final config with those of the passed config object.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: GenerationConfig - The final generation config object to be used by the model for text generation.

      ParamTypeDescription




    generation_configGenerationConfig | nullA GenerationConfig object containing generation parameters.


    kwargsObjectAdditional generation parameters to be used in place of those in the generation_config object.



---

### `preTrainedModel._get_stopping_criteria(generation_config, [stopping_criteria])`

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)

      ParamTypeDefault




    generation_configGenerationConfig

    [stopping_criteria]StoppingCriteriaList


---

### `preTrainedModel._validate_model_class()`

Confirms that the model class is compatible with generation.
If not, raises an exception that points to the right class to use.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)

---

### `preTrainedModel._update_model_kwargs_for_generation(inputs)` ⇒ Object

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Object - The updated model inputs for the next generation iteration.

      ParamType




    inputsObject

    inputs.generated_input_idsArray.&lt;Array&lt;bigint&gt;&gt;

    inputs.outputsObject

    inputs.model_inputsObject

    inputs.is_encoder_decoderboolean


---

### `preTrainedModel._prepare_model_inputs(params)` ⇒ Object

This function extracts the model-specific `inputs` for generation.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Object - The model-specific inputs for generation.

      ParamTypeDefault




    paramsObject

    [params.inputs]Tensor

    [params.bos_token_id]number

    [params.model_kwargs]Record.&lt;string, (Tensor|Array&lt;number&gt;)&gt;


---

### `preTrainedModel._prepare_decoder_input_ids_for_generation(param0)`

Prepares `decoder_input_ids` for generation with encoder-decoder models

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)

      ParamType




    param0*


---

### `preTrainedModel.generate(options)` ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;

Generates sequences of token ids for models with a language modeling head.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Promise.&lt;(ModelOutput|Tensor)&gt; - The output of the model, which can contain the generated token ids, attentions, and scores.

      ParamType




    options*


---

### `preTrainedModel.getPastKeyValues(decoderResults, pastKeyValues)` ⇒ Object

Returns an object containing past key values from the given decoder results object.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Object - An object containing past key values.

      ParamTypeDescription




    decoderResultsObjectThe decoder results object.


    pastKeyValuesObjectThe previous past key values.



---

### `preTrainedModel.getAttentions(model_output)` ⇒ \*

Returns an object containing attentions from the given model output object.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: \* - An object containing attentions.

      ParamTypeDescription




    model_outputObjectThe output of the model.



---

### `preTrainedModel.addPastKeyValues(decoderFeeds, pastKeyValues)`

Adds past key values to the decoder feeds object. If pastKeyValues is null, creates new tensors for past key values.

**Kind**: instance method of [PreTrainedModel](#module_models.PreTrainedModel)

      ParamTypeDescription




    decoderFeedsObjectThe decoder feeds object to add past key values to.


    pastKeyValuesObjectAn object containing past key values.



---

### `PreTrainedModel.from_pretrained(pretrained_model_name_or_path, options)` ⇒ Promise.&lt;PreTrainedModel&gt;

Instantiate one of the model classes of the library from a pretrained model.

The model class to instantiate is selected based on the `model_type` property of the config object
(either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)

**Kind**: static method of [PreTrainedModel](#module_models.PreTrainedModel)  
**Returns**: Promise.&lt;PreTrainedModel&gt; - A new instance of the `PreTrainedModel` class.

      ParamTypeDescription




    pretrained_model_name_or_pathstringThe name or path of the pretrained model. Can be either:

A string, the model id of a pretrained model hosted inside a model repo on huggingface.co.
Valid model ids can be located at the root-level, like bert-base-uncased, or namespaced under a
user or organization name, like dbmdz/bert-base-german-cased.
A path to a directory containing model weights, e.g., ./my_model_directory/.

    options*Additional options for loading the model.



---

## models.BaseModelOutput

Base class for model's outputs, with potential hidden states and attentions.

**Kind**: static class of [models](#module_models)

---

### `new BaseModelOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.last_hidden_stateTensorSequence of hidden-states at the output of the last layer of the model.


    [output.hidden_states]TensorHidden-states of the model at the output of each layer plus the optional initial embedding outputs.


    [output.attentions]TensorAttentions weights after the attention softmax, used to compute the weighted average in the self-attention heads.



---

## models.BertForMaskedLM

BertForMaskedLM is a class representing a BERT model for masked language modeling.

**Kind**: static class of [models](#module_models)

---

### `bertForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [BertForMaskedLM](#module_models.BertForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.BertForSequenceClassification

BertForSequenceClassification is a class representing a BERT model for sequence classification.

**Kind**: static class of [models](#module_models)

---

### `bertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [BertForSequenceClassification](#module_models.BertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.BertForTokenClassification

BertForTokenClassification is a class representing a BERT model for token classification.

**Kind**: static class of [models](#module_models)

---

### `bertForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [BertForTokenClassification](#module_models.BertForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.BertForQuestionAnswering

BertForQuestionAnswering is a class representing a BERT model for question answering.

**Kind**: static class of [models](#module_models)

---

### `bertForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [BertForQuestionAnswering](#module_models.BertForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RoFormerModel

The bare RoFormer Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.RoFormerForMaskedLM

RoFormer Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

### `roFormerForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RoFormerForMaskedLM](#module_models.RoFormerForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RoFormerForSequenceClassification

RoFormer Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `roFormerForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RoFormerForSequenceClassification](#module_models.RoFormerForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RoFormerForTokenClassification

RoFormer Model with a token classification head on top (a linear layer on top of the hidden-states output)
e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `roFormerForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RoFormerForTokenClassification](#module_models.RoFormerForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RoFormerForQuestionAnswering

RoFormer Model with a span classification head on top for extractive question-answering tasks like SQuAD
(a linear layers on top of the hidden-states output to compute `span start logits` and `span end logits`).

**Kind**: static class of [models](#module_models)

---

### `roFormerForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RoFormerForQuestionAnswering](#module_models.RoFormerForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ConvBertModel

The bare ConvBERT Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ConvBertForMaskedLM

ConvBERT Model with a language modeling head on top.

**Kind**: static class of [models](#module_models)

---

### `convBertForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ConvBertForMaskedLM](#module_models.ConvBertForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ConvBertForSequenceClassification

ConvBERT Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `convBertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ConvBertForSequenceClassification](#module_models.ConvBertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ConvBertForTokenClassification

ConvBERT Model with a token classification head on top (a linear layer on top of the hidden-states output)
e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `convBertForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ConvBertForTokenClassification](#module_models.ConvBertForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ConvBertForQuestionAnswering

ConvBERT Model with a span classification head on top for extractive question-answering tasks like SQuAD
(a linear layers on top of the hidden-states output to compute `span start logits` and `span end logits`)

**Kind**: static class of [models](#module_models)

---

### `convBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ConvBertForQuestionAnswering](#module_models.ConvBertForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ElectraModel

The bare Electra Model transformer outputting raw hidden-states without any specific head on top.
Identical to the BERT model except that it uses an additional linear layer between the embedding
layer and the encoder if the hidden size and embedding size are different.

**Kind**: static class of [models](#module_models)

---

## models.ElectraForMaskedLM

Electra model with a language modeling head on top.

**Kind**: static class of [models](#module_models)

---

### `electraForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ElectraForMaskedLM](#module_models.ElectraForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ElectraForSequenceClassification

ELECTRA Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `electraForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ElectraForSequenceClassification](#module_models.ElectraForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ElectraForTokenClassification

Electra model with a token classification head on top.

**Kind**: static class of [models](#module_models)

---

### `electraForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ElectraForTokenClassification](#module_models.ElectraForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ElectraForQuestionAnswering

LECTRA Model with a span classification head on top for extractive question-answering tasks like SQuAD
(a linear layers on top of the hidden-states output to compute `span start logits` and `span end logits`).

**Kind**: static class of [models](#module_models)

---

### `electraForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [ElectraForQuestionAnswering](#module_models.ElectraForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.CamembertModel

The bare CamemBERT Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.CamembertForMaskedLM

CamemBERT Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

### `camembertForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [CamembertForMaskedLM](#module_models.CamembertForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.CamembertForSequenceClassification

CamemBERT Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output) e.g. for GLUE tasks.

**Kind**: static class of [models](#module_models)

---

### `camembertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [CamembertForSequenceClassification](#module_models.CamembertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.CamembertForTokenClassification

CamemBERT Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `camembertForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [CamembertForTokenClassification](#module_models.CamembertForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.CamembertForQuestionAnswering

CamemBERT Model with a span classification head on top for extractive question-answering tasks

**Kind**: static class of [models](#module_models)

---

### `camembertForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [CamembertForQuestionAnswering](#module_models.CamembertForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaModel

The bare DeBERTa Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.DebertaForMaskedLM

DeBERTa Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

### `debertaForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaForMaskedLM](#module_models.DebertaForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaForSequenceClassification

DeBERTa Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `debertaForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaForSequenceClassification](#module_models.DebertaForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaForTokenClassification

DeBERTa Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `debertaForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaForTokenClassification](#module_models.DebertaForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaForQuestionAnswering

DeBERTa Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
layers on top of the hidden-states output to compute `span start logits` and `span end logits`).

**Kind**: static class of [models](#module_models)

---

### `debertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaForQuestionAnswering](#module_models.DebertaForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaV2Model

The bare DeBERTa-V2 Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.DebertaV2ForMaskedLM

DeBERTa-V2 Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

### `debertaV2ForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaV2ForMaskedLM](#module_models.DebertaV2ForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaV2ForSequenceClassification

DeBERTa-V2 Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `debertaV2ForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaV2ForSequenceClassification](#module_models.DebertaV2ForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaV2ForTokenClassification

DeBERTa-V2 Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `debertaV2ForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaV2ForTokenClassification](#module_models.DebertaV2ForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DebertaV2ForQuestionAnswering

DeBERTa-V2 Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
layers on top of the hidden-states output to compute `span start logits` and `span end logits`).

**Kind**: static class of [models](#module_models)

---

### `debertaV2ForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DebertaV2ForQuestionAnswering](#module_models.DebertaV2ForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DistilBertForSequenceClassification

DistilBertForSequenceClassification is a class representing a DistilBERT model for sequence classification.

**Kind**: static class of [models](#module_models)

---

### `distilBertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DistilBertForSequenceClassification](#module_models.DistilBertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DistilBertForTokenClassification

DistilBertForTokenClassification is a class representing a DistilBERT model for token classification.

**Kind**: static class of [models](#module_models)

---

### `distilBertForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DistilBertForTokenClassification](#module_models.DistilBertForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DistilBertForQuestionAnswering

DistilBertForQuestionAnswering is a class representing a DistilBERT model for question answering.

**Kind**: static class of [models](#module_models)

---

### `distilBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DistilBertForQuestionAnswering](#module_models.DistilBertForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.DistilBertForMaskedLM

DistilBertForMaskedLM is a class representing a DistilBERT model for masking task.

**Kind**: static class of [models](#module_models)

---

### `distilBertForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [DistilBertForMaskedLM](#module_models.DistilBertForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.EsmModel

The bare ESM Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.EsmForMaskedLM

ESM Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

### `esmForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [EsmForMaskedLM](#module_models.EsmForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.EsmForSequenceClassification

ESM Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `esmForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [EsmForSequenceClassification](#module_models.EsmForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.EsmForTokenClassification

ESM Model with a token classification head on top (a linear layer on top of the hidden-states output)
e.g. for Named-Entity-Recognition (NER) tasks.

**Kind**: static class of [models](#module_models)

---

### `esmForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [EsmForTokenClassification](#module_models.EsmForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MobileBertForMaskedLM

MobileBertForMaskedLM is a class representing a MobileBERT model for masking task.

**Kind**: static class of [models](#module_models)

---

### `mobileBertForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MobileBertForMaskedLM](#module_models.MobileBertForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MobileBertForSequenceClassification

MobileBert Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `mobileBertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MobileBertForSequenceClassification](#module_models.MobileBertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MobileBertForQuestionAnswering

MobileBert Model with a span classification head on top for extractive question-answering tasks

**Kind**: static class of [models](#module_models)

---

### `mobileBertForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MobileBertForQuestionAnswering](#module_models.MobileBertForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MPNetModel

The bare MPNet Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MPNetForMaskedLM

MPNetForMaskedLM is a class representing a MPNet model for masked language modeling.

**Kind**: static class of [models](#module_models)

---

### `mpNetForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MPNetForMaskedLM](#module_models.MPNetForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - An object containing the model's output logits for masked language modeling.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MPNetForSequenceClassification

MPNetForSequenceClassification is a class representing a MPNet model for sequence classification.

**Kind**: static class of [models](#module_models)

---

### `mpNetForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MPNetForSequenceClassification](#module_models.MPNetForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MPNetForTokenClassification

MPNetForTokenClassification is a class representing a MPNet model for token classification.

**Kind**: static class of [models](#module_models)

---

### `mpNetForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MPNetForTokenClassification](#module_models.MPNetForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MPNetForQuestionAnswering

MPNetForQuestionAnswering is a class representing a MPNet model for question answering.

**Kind**: static class of [models](#module_models)

---

### `mpNetForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MPNetForQuestionAnswering](#module_models.MPNetForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - An object containing the model's output logits for question answering.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.T5ForConditionalGeneration

T5Model is a class representing a T5 model for conditional generation.

**Kind**: static class of [models](#module_models)

---

## models.LongT5PreTrainedModel

An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.LongT5Model

The bare LONGT5 Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.LongT5ForConditionalGeneration

LONGT5 Model with a `language modeling` head on top.

**Kind**: static class of [models](#module_models)

---

## models.MT5ForConditionalGeneration

A class representing a conditional sequence-to-sequence model based on the MT5 architecture.

**Kind**: static class of [models](#module_models)

---

## models.BartModel

The bare BART Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.BartForConditionalGeneration

The BART Model with a language modeling head. Can be used for summarization.

**Kind**: static class of [models](#module_models)

---

## models.BartForSequenceClassification

Bart model with a sequence classification/head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `bartForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [BartForSequenceClassification](#module_models.BartForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.MBartModel

The bare MBART Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MBartForConditionalGeneration

The MBART Model with a language modeling head. Can be used for summarization, after fine-tuning the pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.MBartForSequenceClassification

MBart model with a sequence classification/head on top (a linear layer on top of the pooled output).

**Kind**: static class of [models](#module_models)

---

### `mBartForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [MBartForSequenceClassification](#module_models.MBartForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.BlenderbotModel

The bare Blenderbot Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.BlenderbotForConditionalGeneration

The Blenderbot Model with a language modeling head. Can be used for summarization.

**Kind**: static class of [models](#module_models)

---

## models.BlenderbotSmallModel

The bare BlenderbotSmall Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.BlenderbotSmallForConditionalGeneration

The BlenderbotSmall Model with a language modeling head. Can be used for summarization.

**Kind**: static class of [models](#module_models)

---

## models.RobertaForMaskedLM

RobertaForMaskedLM class for performing masked language modeling on Roberta models.

**Kind**: static class of [models](#module_models)

---

### `robertaForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RobertaForMaskedLM](#module_models.RobertaForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RobertaForSequenceClassification

RobertaForSequenceClassification class for performing sequence classification on Roberta models.

**Kind**: static class of [models](#module_models)

---

### `robertaForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RobertaForSequenceClassification](#module_models.RobertaForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RobertaForTokenClassification

RobertaForTokenClassification class for performing token classification on Roberta models.

**Kind**: static class of [models](#module_models)

---

### `robertaForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RobertaForTokenClassification](#module_models.RobertaForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.RobertaForQuestionAnswering

RobertaForQuestionAnswering class for performing question answering on Roberta models.

**Kind**: static class of [models](#module_models)

---

### `robertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [RobertaForQuestionAnswering](#module_models.RobertaForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMPreTrainedModel

An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.XLMModel

The bare XLM Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.XLMWithLMHeadModel

The XLM Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

---

### `xlmWithLMHeadModel._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMWithLMHeadModel](#module_models.XLMWithLMHeadModel)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMForSequenceClassification

XLM Model with a sequence classification/regression head on top (a linear layer on top of the pooled output)

**Kind**: static class of [models](#module_models)

---

### `xlmForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMForSequenceClassification](#module_models.XLMForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMForTokenClassification

XLM Model with a token classification head on top (a linear layer on top of the hidden-states output)

**Kind**: static class of [models](#module_models)

---

### `xlmForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMForTokenClassification](#module_models.XLMForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMForQuestionAnswering

XLM Model with a span classification head on top for extractive question-answering tasks

**Kind**: static class of [models](#module_models)

---

### `xlmForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMForQuestionAnswering](#module_models.XLMForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMRobertaForMaskedLM

XLMRobertaForMaskedLM class for performing masked language modeling on XLMRoberta models.

**Kind**: static class of [models](#module_models)

---

### `xlmRobertaForMaskedLM._call(model_inputs)` ⇒ Promise.&lt;MaskedLMOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMRobertaForMaskedLM](#module_models.XLMRobertaForMaskedLM)  
**Returns**: Promise.&lt;MaskedLMOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMRobertaForSequenceClassification

XLMRobertaForSequenceClassification class for performing sequence classification on XLMRoberta models.

**Kind**: static class of [models](#module_models)

---

### `xlmRobertaForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMRobertaForSequenceClassification](#module_models.XLMRobertaForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMRobertaForTokenClassification

XLMRobertaForTokenClassification class for performing token classification on XLMRoberta models.

**Kind**: static class of [models](#module_models)

---

### `xlmRobertaForTokenClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMRobertaForTokenClassification](#module_models.XLMRobertaForTokenClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for token classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.XLMRobertaForQuestionAnswering

XLMRobertaForQuestionAnswering class for performing question answering on XLMRoberta models.

**Kind**: static class of [models](#module_models)

---

### `xlmRobertaForQuestionAnswering._call(model_inputs)` ⇒ Promise.&lt;QuestionAnsweringModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [XLMRobertaForQuestionAnswering](#module_models.XLMRobertaForQuestionAnswering)  
**Returns**: Promise.&lt;QuestionAnsweringModelOutput&gt; - returned object

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.ASTModel

The bare AST Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ASTForAudioClassification

Audio Spectrogram Transformer model with an audio classification head on top
(a linear layer on top of the pooled output) e.g. for datasets like AudioSet, Speech Commands v2.

**Kind**: static class of [models](#module_models)

---

## models.WhisperModel

WhisperModel class for training Whisper models without a language model head.

**Kind**: static class of [models](#module_models)

---

## models.WhisperForConditionalGeneration

WhisperForConditionalGeneration class for generating conditional outputs from Whisper models.

**Kind**: static class of [models](#module_models)

- [.WhisperForConditionalGeneration](#module_models.WhisperForConditionalGeneration)
  - [`._retrieve_init_tokens(generation_config)`](#module_models.WhisperForConditionalGeneration+_retrieve_init_tokens)
  - [`.generate(options)`](#module_models.WhisperForConditionalGeneration+generate) ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;
  - [`._extract_token_timestamps(generate_outputs, alignment_heads, [num_frames], [time_precision])`](#module_models.WhisperForConditionalGeneration+_extract_token_timestamps) ⇒ [Tensor](#Tensor)

---

### `whisperForConditionalGeneration._retrieve_init_tokens(generation_config)`

**Kind**: instance method of [WhisperForConditionalGeneration](#module_models.WhisperForConditionalGeneration)

      ParamType




    generation_configWhisperGenerationConfig


---

### `whisperForConditionalGeneration.generate(options)` ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;

Transcribes or translates log-mel input features to a sequence of auto-regressively generated token ids.

**Kind**: instance method of [WhisperForConditionalGeneration](#module_models.WhisperForConditionalGeneration)  
**Returns**: Promise.&lt;(ModelOutput|Tensor)&gt; - The output of the model, which can contain the generated token ids, attentions, and scores.

      ParamType




    options*


---

### `whisperForConditionalGeneration._extract_token_timestamps(generate_outputs, alignment_heads, [num_frames], [time_precision])` ⇒ [Tensor](#Tensor)

Calculates token-level timestamps using the encoder-decoder cross-attentions and
dynamic time-warping (DTW) to map each output token to a position in the input audio.
If `num_frames` is specified, the encoder-decoder cross-attentions will be cropped before applying DTW.

**Kind**: instance method of [WhisperForConditionalGeneration](#module_models.WhisperForConditionalGeneration)  
**Returns**: [Tensor](#Tensor) - tensor containing the timestamps in seconds for each predicted token

      ParamTypeDefaultDescription




    generate_outputsObjectOutputs generated by the model


    generate_outputs.cross_attentionsArray.&lt;Array&lt;Tensor&gt;&gt;The cross attentions output by the model


    generate_outputs.sequencesTensorThe sequences output by the model


    alignment_headsArray.&lt;Array&lt;number&gt;&gt;Alignment heads of the model


    [num_frames]numberNumber of frames in the input audio.


    [time_precision]number0.02Precision of the timestamps in seconds



---

## models.MoonshineModel

MoonshineModel class for training Moonshine models without a language model head.

**Kind**: static class of [models](#module_models)

---

## models.VisionEncoderDecoderModel

Vision Encoder-Decoder model based on OpenAI's GPT architecture for image captioning and other vision tasks

**Kind**: static class of [models](#module_models)

---

## models.LlavaForConditionalGeneration

The LLAVA model which consists of a vision backbone and a language model.

**Kind**: static class of [models](#module_models)

---

## models.Idefics3ForConditionalGeneration

The Idefics3 model which consists of a vision backbone and a language model.

**Kind**: static class of [models](#module_models)

---

## models.SmolVLMForConditionalGeneration

The SmolVLM Model with a language modeling head.
It is made up a SigLIP vision encoder, with a language modeling head on top.

**Kind**: static class of [models](#module_models)

---

## models.CLIPModel

CLIP Text and Vision Model with a projection layers on top

**Example:** Perform zero-shot image classification with a `CLIPModel`.

```javascript
import {
  AutoTokenizer,
  AutoProcessor,
  CLIPModel,
  RawImage,
} from "@huggingface/transformers";

// Load tokenizer, processor, and model
let tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);
let processor = await AutoProcessor.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);
let model = await CLIPModel.from_pretrained("Xenova/clip-vit-base-patch16");

// Run tokenization
let texts = ["a photo of a car", "a photo of a football match"];
let text_inputs = tokenizer(texts, { padding: true, truncation: true });

// Read image and run processor
let image = await RawImage.read(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg"
);
let image_inputs = await processor(image);

// Run model with both text and pixel inputs
let output = await model({ ...text_inputs, ...image_inputs });
// {
//   logits_per_image: Tensor {
//     dims: [ 1, 2 ],
//     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
//   },
//   logits_per_text: Tensor {
//     dims: [ 2, 1 ],
//     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
//   },
//   text_embeds: Tensor {
//     dims: [ 2, 512 ],
//     data: Float32Array(1024) [ ... ],
//   },
//   image_embeds: Tensor {
//     dims: [ 1, 512 ],
//     data: Float32Array(512) [ ... ],
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

## models.CLIPTextModel

The text model from CLIP without any head or projection on top.

**Kind**: static class of [models](#module_models)

---

### `CLIPTextModel.from_pretrained()` : \*

**Kind**: static method of [CLIPTextModel](#module_models.CLIPTextModel)

---

## models.CLIPTextModelWithProjection

CLIP Text Model with a projection layer on top (a linear layer on top of the pooled output)

**Example:** Compute text embeddings with `CLIPTextModelWithProjection`.

```javascript
import {
  AutoTokenizer,
  CLIPTextModelWithProjection,
} from "@huggingface/transformers";

// Load tokenizer and text model
const tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);
const text_model = await CLIPTextModelWithProjection.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);

// Run tokenization
let texts = ["a photo of a car", "a photo of a football match"];
let text_inputs = tokenizer(texts, { padding: true, truncation: true });

// Compute embeddings
const { text_embeds } = await text_model(text_inputs);
// Tensor {
//   dims: [ 2, 512 ],
//   type: 'float32',
//   data: Float32Array(1024) [ ... ],
//   size: 1024
// }
```

**Kind**: static class of [models](#module_models)

---

### `CLIPTextModelWithProjection.from_pretrained()` : \*

**Kind**: static method of [CLIPTextModelWithProjection](#module_models.CLIPTextModelWithProjection)

---

## models.CLIPVisionModel

The vision model from CLIP without any head or projection on top.

**Kind**: static class of [models](#module_models)

---

### `CLIPVisionModel.from_pretrained()` : \*

**Kind**: static method of [CLIPVisionModel](#module_models.CLIPVisionModel)

---

## models.CLIPVisionModelWithProjection

CLIP Vision Model with a projection layer on top (a linear layer on top of the pooled output)

**Example:** Compute vision embeddings with `CLIPVisionModelWithProjection`.

```javascript
import {
  AutoProcessor,
  CLIPVisionModelWithProjection,
  RawImage,
} from "@huggingface/transformers";

// Load processor and vision model
const processor = await AutoProcessor.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);
const vision_model = await CLIPVisionModelWithProjection.from_pretrained(
  "Xenova/clip-vit-base-patch16"
);

// Read image and run processor
let image = await RawImage.read(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg"
);
let image_inputs = await processor(image);

// Compute embeddings
const { image_embeds } = await vision_model(image_inputs);
// Tensor {
//   dims: [ 1, 512 ],
//   type: 'float32',
//   data: Float32Array(512) [ ... ],
//   size: 512
// }
```

**Kind**: static class of [models](#module_models)

---

### `CLIPVisionModelWithProjection.from_pretrained()` : \*

**Kind**: static method of [CLIPVisionModelWithProjection](#module_models.CLIPVisionModelWithProjection)

---

## models.SiglipModel

SigLIP Text and Vision Model with a projection layers on top

**Example:** Perform zero-shot image classification with a `SiglipModel`.

```javascript
import {
  AutoTokenizer,
  AutoProcessor,
  SiglipModel,
  RawImage,
} from "@huggingface/transformers";

// Load tokenizer, processor, and model
const tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);
const processor = await AutoProcessor.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);
const model = await SiglipModel.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);

// Run tokenization
const texts = ["a photo of 2 cats", "a photo of 2 dogs"];
const text_inputs = tokenizer(texts, {
  padding: "max_length",
  truncation: true,
});

// Read image and run processor
const image = await RawImage.read(
  "http://images.cocodataset.org/val2017/000000039769.jpg"
);
const image_inputs = await processor(image);

// Run model with both text and pixel inputs
const output = await model({ ...text_inputs, ...image_inputs });
// {
//   logits_per_image: Tensor {
//     dims: [ 1, 2 ],
//     data: Float32Array(2) [ -1.6019744873046875, -10.720091819763184 ],
//   },
//   logits_per_text: Tensor {
//     dims: [ 2, 1 ],
//     data: Float32Array(2) [ -1.6019744873046875, -10.720091819763184 ],
//   },
//   text_embeds: Tensor {
//     dims: [ 2, 768 ],
//     data: Float32Array(1536) [ ... ],
//   },
//   image_embeds: Tensor {
//     dims: [ 1, 768 ],
//     data: Float32Array(768) [ ... ],
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

## models.SiglipTextModel

The text model from SigLIP without any head or projection on top.

**Example:** Compute text embeddings with `SiglipTextModel`.

```javascript
import { AutoTokenizer, SiglipTextModel } from "@huggingface/transformers";

// Load tokenizer and text model
const tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);
const text_model = await SiglipTextModel.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);

// Run tokenization
const texts = ["a photo of 2 cats", "a photo of 2 dogs"];
const text_inputs = tokenizer(texts, {
  padding: "max_length",
  truncation: true,
});

// Compute embeddings
const { pooler_output } = await text_model(text_inputs);
// Tensor {
//   dims: [ 2, 768 ],
//   type: 'float32',
//   data: Float32Array(1536) [ ... ],
//   size: 1536
// }
```

**Kind**: static class of [models](#module_models)

---

### `SiglipTextModel.from_pretrained()` : \*

**Kind**: static method of [SiglipTextModel](#module_models.SiglipTextModel)

---

## models.SiglipVisionModel

The vision model from SigLIP without any head or projection on top.

**Example:** Compute vision embeddings with `SiglipVisionModel`.

```javascript
import {
  AutoProcessor,
  SiglipVisionModel,
  RawImage,
} from "@huggingface/transformers";

// Load processor and vision model
const processor = await AutoProcessor.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);
const vision_model = await SiglipVisionModel.from_pretrained(
  "Xenova/siglip-base-patch16-224"
);

// Read image and run processor
const image = await RawImage.read(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg"
);
const image_inputs = await processor(image);

// Compute embeddings
const { pooler_output } = await vision_model(image_inputs);
// Tensor {
//   dims: [ 1, 768 ],
//   type: 'float32',
//   data: Float32Array(768) [ ... ],
//   size: 768
// }
```

**Kind**: static class of [models](#module_models)

---

### `SiglipVisionModel.from_pretrained()` : \*

**Kind**: static method of [SiglipVisionModel](#module_models.SiglipVisionModel)

---

## models.CLIPSegForImageSegmentation

CLIPSeg model with a Transformer-based decoder on top for zero-shot and one-shot image segmentation.

**Example:** Perform zero-shot image segmentation with a `CLIPSegForImageSegmentation` model.

```javascript
import {
  AutoTokenizer,
  AutoProcessor,
  CLIPSegForImageSegmentation,
  RawImage,
} from "@huggingface/transformers";

// Load tokenizer, processor, and model
const tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/clipseg-rd64-refined"
);
const processor = await AutoProcessor.from_pretrained(
  "Xenova/clipseg-rd64-refined"
);
const model = await CLIPSegForImageSegmentation.from_pretrained(
  "Xenova/clipseg-rd64-refined"
);

// Run tokenization
const texts = ["a glass", "something to fill", "wood", "a jar"];
const text_inputs = tokenizer(texts, { padding: true, truncation: true });

// Read image and run processor
const image = await RawImage.read(
  "https://github.com/timojl/clipseg/blob/master/example_image.jpg?raw=true"
);
const image_inputs = await processor(image);

// Run model with both text and pixel inputs
const { logits } = await model({ ...text_inputs, ...image_inputs });
// logits: Tensor {
//   dims: [4, 352, 352],
//   type: 'float32',
//   data: Float32Array(495616) [ ... ],
//   size: 495616
// }
```

You can visualize the predictions as follows:

````javascript
const preds = logits
  .unsqueeze_(1)
  .sigmoid_()
  .mul_(255)
  .round_()
  .to('uint8');

for (let i = 0; i models](#module_models)

* * *

## models.GPT2LMHeadModel

GPT-2 language model head on top of the GPT-2 base model. This model is suitable for text generation tasks.

**Kind**: static class of [models](#module_models)

* * *

## models.JAISModel

The bare JAIS Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.JAISLMHeadModel

The JAIS Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

* * *

## models.CodeGenModel

CodeGenModel is a class representing a code generation model without a language model head.

**Kind**: static class of [models](#module_models)

* * *

## models.CodeGenForCausalLM

CodeGenForCausalLM is a class that represents a code generation model based on the GPT-2 architecture. It extends the `CodeGenPreTrainedModel` class.

**Kind**: static class of [models](#module_models)

* * *

## models.LlamaPreTrainedModel

The bare LLama Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.LlamaModel

The bare LLaMA Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.CoherePreTrainedModel

The bare Cohere Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.GemmaPreTrainedModel

The bare Gemma Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.GemmaModel

The bare Gemma Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Gemma2PreTrainedModel

The bare Gemma2 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Gemma2Model

The bare Gemma2 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Gemma3PreTrainedModel

The bare Gemma3 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Gemma3Model

The bare Gemma3 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Qwen2PreTrainedModel

The bare Qwen2 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Qwen2Model

The bare Qwen2 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Qwen3PreTrainedModel

The bare Qwen3 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Qwen3Model

The bare Qwen3 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.PhiModel

The bare Phi Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.Phi3Model

The bare Phi3 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.BloomPreTrainedModel

The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

* * *

## models.BloomModel

The bare Bloom Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.BloomForCausalLM

The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

* * *

## models.MptModel

The bare Mpt Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.MptForCausalLM

The MPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

* * *

## models.OPTModel

The bare OPT Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.OPTForCausalLM

The OPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).

**Kind**: static class of [models](#module_models)

* * *

## models.VitPoseForPoseEstimation

The VitPose model with a pose estimation head on top.

**Kind**: static class of [models](#module_models)

* * *

## models.VitMatteForImageMatting

ViTMatte framework leveraging any vision backbone e.g. for ADE20k, CityScapes.

**Example:** Perform image matting with a `VitMatteForImageMatting` model.
```javascript
import { AutoProcessor, VitMatteForImageMatting, RawImage } from '@huggingface/transformers';

// Load processor and model
const processor = await AutoProcessor.from_pretrained('Xenova/vitmatte-small-distinctions-646');
const model = await VitMatteForImageMatting.from_pretrained('Xenova/vitmatte-small-distinctions-646');

// Load image and trimap
const image = await RawImage.fromURL('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/vitmatte_image.png');
const trimap = await RawImage.fromURL('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/vitmatte_trimap.png');

// Prepare image + trimap for the model
const inputs = await processor(image, trimap);

// Predict alpha matte
const { alphas } = await model(inputs);
// Tensor {
//   dims: [ 1, 1, 640, 960 ],
//   type: 'float32',
//   size: 614400,
//   data: Float32Array(614400) [ 0.9894027709960938, 0.9970508813858032, ... ]
// }
````

You can visualize the alpha matte as follows:

```javascript
import { Tensor, cat } from "@huggingface/transformers";

// Visualize predicted alpha matte
const imageTensor = image.toTensor();

// Convert float (0-1) alpha matte to uint8 (0-255)
const alphaChannel = alphas
  .squeeze(0)
  .mul_(255)
  .clamp_(0, 255)
  .round_()
  .to("uint8");

// Concatenate original image with predicted alpha
const imageData = cat([imageTensor, alphaChannel], 0);

// Save output image
const outputImage = RawImage.fromTensor(imageData);
outputImage.save("output.png");
```

**Kind**: static class of [models](#module_models)

---

### `vitMatteForImageMatting._call(model_inputs)`

**Kind**: instance method of [VitMatteForImageMatting](#module_models.VitMatteForImageMatting)

      ParamType




    model_inputsany


---

## models.DetrObjectDetectionOutput

**Kind**: static class of [models](#module_models)

---

### `new DetrObjectDetectionOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorClassification logits (including no-object) for all queries.


    output.pred_boxesTensorNormalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).

These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).

---

## models.DetrSegmentationOutput

**Kind**: static class of [models](#module_models)

---

### `new DetrSegmentationOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorThe output logits of the model.


    output.pred_boxesTensorPredicted boxes.


    output.pred_masksTensorPredicted masks.



---

## models.RTDetrObjectDetectionOutput

**Kind**: static class of [models](#module_models)

---

### `new RTDetrObjectDetectionOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorClassification logits (including no-object) for all queries.


    output.pred_boxesTensorNormalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).

These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).

---

## models.TableTransformerModel

The bare Table Transformer Model (consisting of a backbone and encoder-decoder Transformer)
outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.TableTransformerForObjectDetection

Table Transformer Model (consisting of a backbone and encoder-decoder Transformer)
with object detection heads on top, for tasks such as COCO detection.

**Kind**: static class of [models](#module_models)

---

### `tableTransformerForObjectDetection._call(model_inputs)`

**Kind**: instance method of [TableTransformerForObjectDetection](#module_models.TableTransformerForObjectDetection)

      ParamType




    model_inputsany


---

## models.ResNetPreTrainedModel

An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.ResNetModel

The bare ResNet model outputting raw features without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ResNetForImageClassification

ResNet Model with an image classification head on top (a linear layer on top of the pooled features), e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `resNetForImageClassification._call(model_inputs)`

**Kind**: instance method of [ResNetForImageClassification](#module_models.ResNetForImageClassification)

      ParamType




    model_inputsany


---

## models.Swin2SRModel

The bare Swin2SR Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.Swin2SRForImageSuperResolution

Swin2SR Model transformer with an upsampler head on top for image super resolution and restoration.

**Example:** Super-resolution w/ `Xenova/swin2SR-classical-sr-x2-64`.

```javascript
import {
  AutoProcessor,
  Swin2SRForImageSuperResolution,
  RawImage,
} from "@huggingface/transformers";

// Load processor and model
const model_id = "Xenova/swin2SR-classical-sr-x2-64";
const processor = await AutoProcessor.from_pretrained(model_id);
const model = await Swin2SRForImageSuperResolution.from_pretrained(model_id);

// Prepare model inputs
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/butterfly.jpg";
const image = await RawImage.fromURL(url);
const inputs = await processor(image);

// Run model
const outputs = await model(inputs);

// Convert Tensor to RawImage
const output = outputs.reconstruction
  .squeeze()
  .clamp_(0, 1)
  .mul_(255)
  .round_()
  .to("uint8");
const outputImage = RawImage.fromTensor(output);
// RawImage {
//   data: Uint8Array(786432) [ 41, 31, 24, ... ],
//   width: 512,
//   height: 512,
//   channels: 3
// }
```

**Kind**: static class of [models](#module_models)

---

## models.DPTModel

The bare DPT Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.DPTForDepthEstimation

DPT Model with a depth estimation head on top (consisting of 3 convolutional layers) e.g. for KITTI, NYUv2.

**Example:** Depth estimation w/ `Xenova/dpt-hybrid-midas`.

```javascript
import {
  DPTForDepthEstimation,
  AutoProcessor,
  RawImage,
  interpolate_4d,
} from "@huggingface/transformers";

// Load model and processor
const model_id = "Xenova/dpt-hybrid-midas";
const model = await DPTForDepthEstimation.from_pretrained(model_id);
const processor = await AutoProcessor.from_pretrained(model_id);

// Load image from URL
const url = "http://images.cocodataset.org/val2017/000000039769.jpg";
const image = await RawImage.read(url);

// Prepare image for the model
const inputs = await processor(image);

// Run model
const { predicted_depth } = await model(inputs);

// Interpolate to original size
const prediction = (
  await interpolate_4d(predicted_depth.unsqueeze(1), {
    size: image.size.reverse(),
    mode: "bilinear",
  })
).squeeze(1);

// Visualize the prediction
const min = prediction.min().item();
const max = prediction.max().item();
const formatted = prediction
  .sub_(min)
  .div_(max - min)
  .mul_(255)
  .to("uint8");
const depth = RawImage.fromTensor(formatted);
// RawImage {
//   data: Uint8Array(307200) [ 85, 85, 84, ... ],
//   width: 640,
//   height: 480,
//   channels: 1
// }
```

**Kind**: static class of [models](#module_models)

---

## models.DepthAnythingForDepthEstimation

Depth Anything Model with a depth estimation head on top (consisting of 3 convolutional layers) e.g. for KITTI, NYUv2.

**Kind**: static class of [models](#module_models)

---

## models.GLPNModel

The bare GLPN encoder (Mix-Transformer) outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.GLPNForDepthEstimation

import { GLPNForDepthEstimation, AutoProcessor, RawImage, interpolate_4d } from '@huggingface/transformers';

// Load model and processor
const model_id = 'Xenova/glpn-kitti';
const model = await GLPNForDepthEstimation.from_pretrained(model_id);
const processor = await AutoProcessor.from_pretrained(model_id);

// Load image from URL
const url = 'http://images.cocodataset.org/val2017/000000039769.jpg';
const image = await RawImage.read(url);

// Prepare image for the model
const inputs = await processor(image);

// Run model
const { predicted_depth } = await model(inputs);

// Interpolate to original size
const prediction = (await interpolate_4d(predicted_depth.unsqueeze(1), {
size: image.size.reverse(),
mode: 'bilinear',
})).squeeze(1);

// Visualize the prediction
const min = prediction.min().item();
const max = prediction.max().item();
const formatted = prediction.sub*(min).div*(max - min).mul\_(255).to('uint8');
const depth = RawImage.fromTensor(formatted);
// RawImage {
// data: Uint8Array(307200) [ 85, 85, 84, ... ],
// width: 640,
// height: 480,
// channels: 1
// }

````

**Kind**: static class of [models](#module_models)

* * *

## models.DonutSwinModel

The bare Donut Swin Model transformer outputting raw hidden-states without any specific head on top.

**Example:** Step-by-step Document Parsing.

```javascript
import { AutoProcessor, AutoTokenizer, AutoModelForVision2Seq, RawImage } from '@huggingface/transformers';

// Choose model to use
const model_id = 'Xenova/donut-base-finetuned-cord-v2';

// Prepare image inputs
const processor = await AutoProcessor.from_pretrained(model_id);
const url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/receipt.png';
const image = await RawImage.read(url);
const image_inputs = await processor(image);

// Prepare decoder inputs
const tokenizer = await AutoTokenizer.from_pretrained(model_id);
const task_prompt = '';
const decoder_input_ids = tokenizer(task_prompt, {
  add_special_tokens: false,
}).input_ids;

// Create the model
const model = await AutoModelForVision2Seq.from_pretrained(model_id);

// Run inference
const output = await model.generate(image_inputs.pixel_values, {
  decoder_input_ids,
  max_length: model.config.decoder.max_position_embeddings,
});

// Decode output
const decoded = tokenizer.batch_decode(output)[0];
//  CINNAMON SUGAR 17,000 1 x 17,000 17,000 17,000 20,000 3,000
````

**Example:** Step-by-step Document Visual Question Answering (DocVQA)

```javascript
import {
  AutoProcessor,
  AutoTokenizer,
  AutoModelForVision2Seq,
  RawImage,
} from "@huggingface/transformers";

// Choose model to use
const model_id = "Xenova/donut-base-finetuned-docvqa";

// Prepare image inputs
const processor = await AutoProcessor.from_pretrained(model_id);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/invoice.png";
const image = await RawImage.read(url);
const image_inputs = await processor(image);

// Prepare decoder inputs
const tokenizer = await AutoTokenizer.from_pretrained(model_id);
const question = "What is the invoice number?";
const task_prompt = `${question}`;
const decoder_input_ids = tokenizer(task_prompt, {
  add_special_tokens: false,
}).input_ids;

// Create the model
const model = await AutoModelForVision2Seq.from_pretrained(model_id);

// Run inference
const output = await model.generate(image_inputs.pixel_values, {
  decoder_input_ids,
  max_length: model.config.decoder.max_position_embeddings,
});

// Decode output
const decoded = tokenizer.batch_decode(output)[0];
//  What is the invoice number? us-001
```

**Kind**: static class of [models](#module_models)

---

## models.ConvNextModel

The bare ConvNext model outputting raw features without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ConvNextForImageClassification

ConvNext Model with an image classification head on top (a linear layer on top of the pooled features), e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `convNextForImageClassification._call(model_inputs)`

**Kind**: instance method of [ConvNextForImageClassification](#module_models.ConvNextForImageClassification)

      ParamType




    model_inputsany


---

## models.ConvNextV2Model

The bare ConvNextV2 model outputting raw features without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ConvNextV2ForImageClassification

ConvNextV2 Model with an image classification head on top (a linear layer on top of the pooled features), e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `convNextV2ForImageClassification._call(model_inputs)`

**Kind**: instance method of [ConvNextV2ForImageClassification](#module_models.ConvNextV2ForImageClassification)

      ParamType




    model_inputsany


---

## models.Dinov2Model

The bare DINOv2 Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.Dinov2ForImageClassification

Dinov2 Model transformer with an image classification head on top (a linear layer on top of the final hidden state of the [CLS] token) e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `dinov2ForImageClassification._call(model_inputs)`

**Kind**: instance method of [Dinov2ForImageClassification](#module_models.Dinov2ForImageClassification)

      ParamType




    model_inputsany


---

## models.Dinov2WithRegistersModel

The bare Dinov2WithRegisters Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.Dinov2WithRegistersForImageClassification

Dinov2WithRegisters Model transformer with an image classification head on top (a linear layer on top of the final hidden state of the [CLS] token) e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `dinov2WithRegistersForImageClassification._call(model_inputs)`

**Kind**: instance method of [Dinov2WithRegistersForImageClassification](#module_models.Dinov2WithRegistersForImageClassification)

      ParamType




    model_inputsany


---

## models.YolosObjectDetectionOutput

**Kind**: static class of [models](#module_models)

---

### `new YolosObjectDetectionOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorClassification logits (including no-object) for all queries.


    output.pred_boxesTensorNormalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).

These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).

---

## models.SamModel

Segment Anything Model (SAM) for generating segmentation masks, given an input image
and optional 2D location and bounding boxes.

**Example:** Perform mask generation w/ `Xenova/sam-vit-base`.

```javascript
import { SamModel, AutoProcessor, RawImage } from "@huggingface/transformers";

const model = await SamModel.from_pretrained("Xenova/sam-vit-base");
const processor = await AutoProcessor.from_pretrained("Xenova/sam-vit-base");

const img_url =
  "https://huggingface.co/ybelkada/segment-anything/resolve/main/assets/car.png";
const raw_image = await RawImage.read(img_url);
const input_points = [[[450, 600]]]; // 2D localization of a window

const inputs = await processor(raw_image, { input_points });
const outputs = await model(inputs);

const masks = await processor.post_process_masks(
  outputs.pred_masks,
  inputs.original_sizes,
  inputs.reshaped_input_sizes
);
// [
//   Tensor {
//     dims: [ 1, 3, 1764, 2646 ],
//     type: 'bool',
//     data: Uint8Array(14002632) [ ... ],
//     size: 14002632
//   }
// ]
const scores = outputs.iou_scores;
// Tensor {
//   dims: [ 1, 1, 3 ],
//   type: 'float32',
//   data: Float32Array(3) [
//     0.8892380595207214,
//     0.9311248064041138,
//     0.983696699142456
//   ],
//   size: 3
// }
```

**Kind**: static class of [models](#module_models)

- [.SamModel](#module_models.SamModel)
  - [`.get_image_embeddings(model_inputs)`](#module_models.SamModel+get_image_embeddings) ⇒ Promise.&lt;{image_embeddings: Tensor, image_positional_embeddings: Tensor}&gt;
  - [`.forward(model_inputs)`](#module_models.SamModel+forward) ⇒ Promise.&lt;Object&gt;
  - [`._call(model_inputs)`](#module_models.SamModel+_call) ⇒ Promise.&lt;SamImageSegmentationOutput&gt;

---

### `samModel.get_image_embeddings(model_inputs)` ⇒ Promise.&lt;{image_embeddings: Tensor, image_positional_embeddings: Tensor}&gt;

Compute image embeddings and positional image embeddings, given the pixel values of an image.

**Kind**: instance method of [SamModel](#module_models.SamModel)  
**Returns**: Promise.&lt;{image_embeddings: Tensor, image_positional_embeddings: Tensor}&gt; - The image embeddings and positional image embeddings.

      ParamTypeDescription




    model_inputsObjectObject containing the model inputs.


    model_inputs.pixel_valuesTensorPixel values obtained using a SamProcessor.



---

### `samModel.forward(model_inputs)` ⇒ Promise.&lt;Object&gt;

**Kind**: instance method of [SamModel](#module_models.SamModel)  
**Returns**: Promise.&lt;Object&gt; - The output of the model.

      ParamTypeDescription




    model_inputsSamModelInputsObject containing the model inputs.



---

### `samModel._call(model_inputs)` ⇒ Promise.&lt;SamImageSegmentationOutput&gt;

Runs the model with the provided inputs

**Kind**: instance method of [SamModel](#module_models.SamModel)  
**Returns**: Promise.&lt;SamImageSegmentationOutput&gt; - Object containing segmentation outputs

      ParamTypeDescription




    model_inputsObjectModel inputs



---

## models.SamImageSegmentationOutput

Base class for Segment-Anything model's output.

**Kind**: static class of [models](#module_models)

---

### `new SamImageSegmentationOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.iou_scoresTensorThe output logits of the model.


    output.pred_masksTensorPredicted boxes.



---

## models.Sam2ImageSegmentationOutput

**Kind**: static class of [models](#module_models)

---

### `new Sam2ImageSegmentationOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.iou_scoresTensorThe output logits of the model.


    output.pred_masksTensorPredicted boxes.


    output.object_score_logitsTensorLogits for the object score, indicating if an object is present.



---

## models.EdgeTamModel

EdgeTAM for generating segmentation masks, given an input image
and optional 2D location and bounding boxes.

**Kind**: static class of [models](#module_models)

- [.EdgeTamModel](#module_models.EdgeTamModel)
  - [`.get_image_embeddings(model_inputs)`](#module_models.EdgeTamModel+get_image_embeddings) ⇒ Promise.&lt;Record&lt;String, Tensor&gt;&gt;
  - [`._call(model_inputs)`](#module_models.EdgeTamModel+_call) ⇒ Promise.&lt;Sam2ImageSegmentationOutput&gt;

---

### `edgeTamModel.get_image_embeddings(model_inputs)` ⇒ Promise.&lt;Record&lt;String, Tensor&gt;&gt;

Compute image embeddings and positional image embeddings, given the pixel values of an image.

**Kind**: instance method of [EdgeTamModel](#module_models.EdgeTamModel)  
**Returns**: Promise.&lt;Record&lt;String, Tensor&gt;&gt; - The image embeddings.

      ParamTypeDescription




    model_inputsObjectObject containing the model inputs.


    model_inputs.pixel_valuesTensorPixel values obtained using a Sam2Processor.



---

### `edgeTamModel._call(model_inputs)` ⇒ Promise.&lt;Sam2ImageSegmentationOutput&gt;

Runs the model with the provided inputs

**Kind**: instance method of [EdgeTamModel](#module_models.EdgeTamModel)  
**Returns**: Promise.&lt;Sam2ImageSegmentationOutput&gt; - Object containing segmentation outputs

      ParamTypeDescription




    model_inputsObjectModel inputs



---

## models.Wav2Vec2Model

The bare Wav2Vec2 Model transformer outputting raw hidden-states without any specific head on top.

**Example:** Load and run a `Wav2Vec2Model` for feature extraction.

```javascript
import {
  AutoProcessor,
  AutoModel,
  read_audio,
} from "@huggingface/transformers";

// Read and preprocess audio
const processor = await AutoProcessor.from_pretrained("Xenova/mms-300m");
const audio = await read_audio(
  "https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/mlk.flac",
  16000
);
const inputs = await processor(audio);

// Run model with inputs
const model = await AutoModel.from_pretrained("Xenova/mms-300m");
const output = await model(inputs);
// {
//   last_hidden_state: Tensor {
//     dims: [ 1, 1144, 1024 ],
//     type: 'float32',
//     data: Float32Array(1171456) [ ... ],
//     size: 1171456
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

## models.Wav2Vec2ForAudioFrameClassification

Wav2Vec2 Model with a frame classification head on top for tasks like Speaker Diarization.

**Kind**: static class of [models](#module_models)

---

### `wav2Vec2ForAudioFrameClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [Wav2Vec2ForAudioFrameClassification](#module_models.Wav2Vec2ForAudioFrameClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.PyAnnoteModel

The bare PyAnnote Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.PyAnnoteForAudioFrameClassification

PyAnnote Model with a frame classification head on top for tasks like Speaker Diarization.

**Example:** Load and run a `PyAnnoteForAudioFrameClassification` for speaker diarization.

```javascript
import {
  AutoProcessor,
  AutoModelForAudioFrameClassification,
  read_audio,
} from "@huggingface/transformers";

// Load model and processor
const model_id = "onnx-community/pyannote-segmentation-3.0";
const model = await AutoModelForAudioFrameClassification.from_pretrained(
  model_id
);
const processor = await AutoProcessor.from_pretrained(model_id);

// Read and preprocess audio
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/mlk.wav";
const audio = await read_audio(
  url,
  processor.feature_extractor.config.sampling_rate
);
const inputs = await processor(audio);

// Run model with inputs
const { logits } = await model(inputs);
// {
//   logits: Tensor {
//     dims: [ 1, 767, 7 ],  // [batch_size, num_frames, num_classes]
//     type: 'float32',
//     data: Float32Array(5369) [ ... ],
//     size: 5369
//   }
// }

const result = processor.post_process_speaker_diarization(logits, audio.length);
// [
//   [
//     { id: 0, start: 0, end: 1.0512535626298245, confidence: 0.8220156481664611 },
//     { id: 2, start: 1.0512535626298245, end: 2.3398869619825127, confidence: 0.9008811707860472 },
//     ...
//   ]
// ]

// Display result
console.table(result[0], ["start", "end", "id", "confidence"]);
// ┌─────────┬────────────────────┬────────────────────┬────┬─────────────────────┐
// │ (index) │ start              │ end                │ id │ confidence          │
// ├─────────┼────────────────────┼────────────────────┼────┼─────────────────────┤
// │ 0       │ 0                  │ 1.0512535626298245 │ 0  │ 0.8220156481664611  │
// │ 1       │ 1.0512535626298245 │ 2.3398869619825127 │ 2  │ 0.9008811707860472  │
// │ 2       │ 2.3398869619825127 │ 3.5946089560890773 │ 0  │ 0.7521651315796233  │
// │ 3       │ 3.5946089560890773 │ 4.578039708226655  │ 2  │ 0.8491978128022479  │
// │ 4       │ 4.578039708226655  │ 4.594995410849717  │ 0  │ 0.2935352600416393  │
// │ 5       │ 4.594995410849717  │ 6.121008646925269  │ 3  │ 0.6788051309866024  │
// │ 6       │ 6.121008646925269  │ 6.256654267909762  │ 0  │ 0.37125512393851134 │
// │ 7       │ 6.256654267909762  │ 8.630452635138397  │ 2  │ 0.7467035186353542  │
// │ 8       │ 8.630452635138397  │ 10.088643060721703 │ 0  │ 0.7689364814666032  │
// │ 9       │ 10.088643060721703 │ 12.58113134631177  │ 2  │ 0.9123324509131324  │
// │ 10      │ 12.58113134631177  │ 13.005023911888312 │ 0  │ 0.4828358177572041  │
// └─────────┴────────────────────┴────────────────────┴────┴─────────────────────┘
```

**Kind**: static class of [models](#module_models)

---

### `pyAnnoteForAudioFrameClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [PyAnnoteForAudioFrameClassification](#module_models.PyAnnoteForAudioFrameClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.UniSpeechModel

The bare UniSpeech Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.UniSpeechForCTC

UniSpeech Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).

**Kind**: static class of [models](#module_models)

---

### `uniSpeechForCTC._call(model_inputs)`

**Kind**: instance method of [UniSpeechForCTC](#module_models.UniSpeechForCTC)

      ParamTypeDescription




    model_inputsObject

    model_inputs.input_valuesTensorFloat values of input raw speech waveform.


    model_inputs.attention_maskTensorMask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]



---

## models.UniSpeechForSequenceClassification

UniSpeech Model with a sequence classification head on top (a linear layer over the pooled output).

**Kind**: static class of [models](#module_models)

---

### `uniSpeechForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [UniSpeechForSequenceClassification](#module_models.UniSpeechForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.UniSpeechSatModel

The bare UniSpeechSat Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.UniSpeechSatForCTC

UniSpeechSat Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).

**Kind**: static class of [models](#module_models)

---

### `uniSpeechSatForCTC._call(model_inputs)`

**Kind**: instance method of [UniSpeechSatForCTC](#module_models.UniSpeechSatForCTC)

      ParamTypeDescription




    model_inputsObject

    model_inputs.input_valuesTensorFloat values of input raw speech waveform.


    model_inputs.attention_maskTensorMask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]



---

## models.UniSpeechSatForSequenceClassification

UniSpeechSat Model with a sequence classification head on top (a linear layer over the pooled output).

**Kind**: static class of [models](#module_models)

---

### `uniSpeechSatForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [UniSpeechSatForSequenceClassification](#module_models.UniSpeechSatForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.UniSpeechSatForAudioFrameClassification

UniSpeechSat Model with a frame classification head on top for tasks like Speaker Diarization.

**Kind**: static class of [models](#module_models)

---

### `uniSpeechSatForAudioFrameClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [UniSpeechSatForAudioFrameClassification](#module_models.UniSpeechSatForAudioFrameClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.Wav2Vec2BertModel

The bare Wav2Vec2Bert Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.Wav2Vec2BertForCTC

Wav2Vec2Bert Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).

**Kind**: static class of [models](#module_models)

---

### `wav2Vec2BertForCTC._call(model_inputs)`

**Kind**: instance method of [Wav2Vec2BertForCTC](#module_models.Wav2Vec2BertForCTC)

      ParamTypeDescription




    model_inputsObject

    model_inputs.input_featuresTensorFloat values of input mel-spectrogram.


    model_inputs.attention_maskTensorMask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]



---

## models.Wav2Vec2BertForSequenceClassification

Wav2Vec2Bert Model with a sequence classification head on top (a linear layer over the pooled output).

**Kind**: static class of [models](#module_models)

---

### `wav2Vec2BertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [Wav2Vec2BertForSequenceClassification](#module_models.Wav2Vec2BertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.HubertModel

The bare Hubert Model transformer outputting raw hidden-states without any specific head on top.

**Example:** Load and run a `HubertModel` for feature extraction.

```javascript
import {
  AutoProcessor,
  AutoModel,
  read_audio,
} from "@huggingface/transformers";

// Read and preprocess audio
const processor = await AutoProcessor.from_pretrained(
  "Xenova/hubert-base-ls960"
);
const audio = await read_audio(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav",
  16000
);
const inputs = await processor(audio);

// Load and run model with inputs
const model = await AutoModel.from_pretrained("Xenova/hubert-base-ls960");
const output = await model(inputs);
// {
//   last_hidden_state: Tensor {
//     dims: [ 1, 549, 768 ],
//     type: 'float32',
//     data: Float32Array(421632) [0.0682469978928566, 0.08104046434164047, -0.4975186586380005, ...],
//     size: 421632
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

## models.HubertForCTC

Hubert Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).

**Kind**: static class of [models](#module_models)

---

### `hubertForCTC._call(model_inputs)`

**Kind**: instance method of [HubertForCTC](#module_models.HubertForCTC)

      ParamTypeDescription




    model_inputsObject

    model_inputs.input_valuesTensorFloat values of input raw speech waveform.


    model_inputs.attention_maskTensorMask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]



---

## models.HubertForSequenceClassification

Hubert Model with a sequence classification head on top (a linear layer over the pooled output) for tasks like SUPERB Keyword Spotting.

**Kind**: static class of [models](#module_models)

---

### `hubertForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [HubertForSequenceClassification](#module_models.HubertForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.WavLMPreTrainedModel

An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.WavLMModel

The bare WavLM Model transformer outputting raw hidden-states without any specific head on top.

**Example:** Load and run a `WavLMModel` for feature extraction.

```javascript
import {
  AutoProcessor,
  AutoModel,
  read_audio,
} from "@huggingface/transformers";

// Read and preprocess audio
const processor = await AutoProcessor.from_pretrained("Xenova/wavlm-base");
const audio = await read_audio(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav",
  16000
);
const inputs = await processor(audio);

// Run model with inputs
const model = await AutoModel.from_pretrained("Xenova/wavlm-base");
const output = await model(inputs);
// {
//   last_hidden_state: Tensor {
//     dims: [ 1, 549, 768 ],
//     type: 'float32',
//     data: Float32Array(421632) [-0.349443256855011, -0.39341306686401367,  0.022836603224277496, ...],
//     size: 421632
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

## models.WavLMForCTC

WavLM Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).

**Kind**: static class of [models](#module_models)

---

### `wavLMForCTC._call(model_inputs)`

**Kind**: instance method of [WavLMForCTC](#module_models.WavLMForCTC)

      ParamTypeDescription




    model_inputsObject

    model_inputs.input_valuesTensorFloat values of input raw speech waveform.


    model_inputs.attention_maskTensorMask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]



---

## models.WavLMForSequenceClassification

WavLM Model with a sequence classification head on top (a linear layer over the pooled output).

**Kind**: static class of [models](#module_models)

---

### `wavLMForSequenceClassification._call(model_inputs)` ⇒ Promise.&lt;SequenceClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [WavLMForSequenceClassification](#module_models.WavLMForSequenceClassification)  
**Returns**: Promise.&lt;SequenceClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.WavLMForXVector

WavLM Model with an XVector feature extraction head on top for tasks like Speaker Verification.

**Example:** Extract speaker embeddings with `WavLMForXVector`.

```javascript
import {
  AutoProcessor,
  AutoModel,
  read_audio,
} from "@huggingface/transformers";

// Read and preprocess audio
const processor = await AutoProcessor.from_pretrained(
  "Xenova/wavlm-base-plus-sv"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const audio = await read_audio(url, 16000);
const inputs = await processor(audio);

// Run model with inputs
const model = await AutoModel.from_pretrained("Xenova/wavlm-base-plus-sv");
const outputs = await model(inputs);
// {
//   logits: Tensor {
//     dims: [ 1, 512 ],
//     type: 'float32',
//     data: Float32Array(512) [0.5847219228744507, ...],
//     size: 512
//   },
//   embeddings: Tensor {
//     dims: [ 1, 512 ],
//     type: 'float32',
//     data: Float32Array(512) [-0.09079201519489288, ...],
//     size: 512
//   }
// }
```

**Kind**: static class of [models](#module_models)

---

### `wavLMForXVector._call(model_inputs)` ⇒ Promise.&lt;XVectorOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [WavLMForXVector](#module_models.WavLMForXVector)  
**Returns**: Promise.&lt;XVectorOutput&gt; - An object containing the model's output logits and speaker embeddings.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.WavLMForAudioFrameClassification

WavLM Model with a frame classification head on top for tasks like Speaker Diarization.

**Example:** Perform speaker diarization with `WavLMForAudioFrameClassification`.

```javascript
import {
  AutoProcessor,
  AutoModelForAudioFrameClassification,
  read_audio,
} from "@huggingface/transformers";

// Read and preprocess audio
const processor = await AutoProcessor.from_pretrained(
  "Xenova/wavlm-base-plus-sd"
);
const url =
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav";
const audio = await read_audio(url, 16000);
const inputs = await processor(audio);

// Run model with inputs
const model = await AutoModelForAudioFrameClassification.from_pretrained(
  "Xenova/wavlm-base-plus-sd"
);
const { logits } = await model(inputs);
// {
//   logits: Tensor {
//     dims: [ 1, 549, 2 ],  // [batch_size, num_frames, num_speakers]
//     type: 'float32',
//     data: Float32Array(1098) [-3.5301010608673096, ...],
//     size: 1098
//   }
// }

const labels = logits[0]
  .sigmoid()
  .tolist()
  .map((frames) => frames.map((speaker) => (speaker > 0.5 ? 1 : 0)));
console.log(labels); // labels is a one-hot array of shape (num_frames, num_speakers)
// [
//     [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
//     [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
//     [0, 0], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
//     ...
// ]
```

**Kind**: static class of [models](#module_models)

---

### `wavLMForAudioFrameClassification._call(model_inputs)` ⇒ Promise.&lt;TokenClassifierOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [WavLMForAudioFrameClassification](#module_models.WavLMForAudioFrameClassification)  
**Returns**: Promise.&lt;TokenClassifierOutput&gt; - An object containing the model's output logits for sequence classification.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.SpeechT5PreTrainedModel

An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.

**Kind**: static class of [models](#module_models)

---

## models.SpeechT5Model

The bare SpeechT5 Encoder-Decoder Model outputting raw hidden-states without any specific pre- or post-nets.

**Kind**: static class of [models](#module_models)

---

## models.SpeechT5ForSpeechToText

SpeechT5 Model with a speech encoder and a text decoder.

**Example:** Generate speech from text with `SpeechT5ForSpeechToText`.

```javascript
import {
  AutoTokenizer,
  AutoProcessor,
  SpeechT5ForTextToSpeech,
  SpeechT5HifiGan,
  Tensor,
} from "@huggingface/transformers";

// Load the tokenizer and processor
const tokenizer = await AutoTokenizer.from_pretrained("Xenova/speecht5_tts");
const processor = await AutoProcessor.from_pretrained("Xenova/speecht5_tts");

// Load the models
// NOTE: We use the full-precision versions as they are more accurate
const model = await SpeechT5ForTextToSpeech.from_pretrained(
  "Xenova/speecht5_tts",
  { dtype: "fp32" }
);
const vocoder = await SpeechT5HifiGan.from_pretrained(
  "Xenova/speecht5_hifigan",
  { dtype: "fp32" }
);

// Load speaker embeddings from URL
const speaker_embeddings_data = new Float32Array(
  await (
    await fetch(
      "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin"
    )
  ).arrayBuffer()
);
const speaker_embeddings = new Tensor("float32", speaker_embeddings_data, [
  1,
  speaker_embeddings_data.length,
]);

// Run tokenization
const { input_ids } = tokenizer("Hello, my dog is cute");

// Generate waveform
const { waveform } = await model.generate_speech(
  input_ids,
  speaker_embeddings,
  { vocoder }
);
console.log(waveform);
// Tensor {
//   dims: [ 26112 ],
//   type: 'float32',
//   size: 26112,
//   data: Float32Array(26112) [ -0.00043630177970044315, -0.00018082228780258447, ... ],
// }
```

**Kind**: static class of [models](#module_models)

---

## models.SpeechT5ForTextToSpeech

SpeechT5 Model with a text encoder and a speech decoder.

**Kind**: static class of [models](#module_models)

---

### `speechT5ForTextToSpeech.generate_speech(input_values, speaker_embeddings, options)` ⇒ Promise.&lt;SpeechOutput&gt;

Converts a sequence of input tokens into a sequence of mel spectrograms, which are subsequently turned into a speech waveform using a vocoder.

**Kind**: instance method of [SpeechT5ForTextToSpeech](#module_models.SpeechT5ForTextToSpeech)  
**Returns**: Promise.&lt;SpeechOutput&gt; - A promise which resolves to an object containing the spectrogram, waveform, and cross-attention tensors.

      ParamTypeDefaultDescription




    input_valuesTensorIndices of input sequence tokens in the vocabulary.


    speaker_embeddingsTensorTensor containing the speaker embeddings.


    optionsObjectOptional parameters for generating speech.


    [options.threshold]number0.5The generated sequence ends when the predicted stop token probability exceeds this value.


    [options.minlenratio]number0.0Used to calculate the minimum required length for the output sequence.


    [options.maxlenratio]number20.0Used to calculate the maximum allowed length for the output sequence.


    [options.vocoder]ObjectThe vocoder that converts the mel spectrogram into a speech waveform. If null, the output is the mel spectrogram.


    [options.output_cross_attentions]booleanfalseWhether or not to return the attentions tensors of the decoder&#39;s cross-attention layers.



---

## models.SpeechT5HifiGan

HiFi-GAN vocoder.

See [SpeechT5ForSpeechToText](./models#module_models.SpeechT5ForSpeechToText) for example usage.

**Kind**: static class of [models](#module_models)

---

## models.TrOCRForCausalLM

The TrOCR Decoder with a language modeling head.

**Kind**: static class of [models](#module_models)

---

## models.MistralPreTrainedModel

The bare Mistral Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.Starcoder2PreTrainedModel

The bare Starcoder2 Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.FalconPreTrainedModel

The bare Falcon Model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.ClapTextModelWithProjection

CLAP Text Model with a projection layer on top (a linear layer on top of the pooled output).

**Example:** Compute text embeddings with `ClapTextModelWithProjection`.

```javascript
import {
  AutoTokenizer,
  ClapTextModelWithProjection,
} from "@huggingface/transformers";

// Load tokenizer and text model
const tokenizer = await AutoTokenizer.from_pretrained(
  "Xenova/clap-htsat-unfused"
);
const text_model = await ClapTextModelWithProjection.from_pretrained(
  "Xenova/clap-htsat-unfused"
);

// Run tokenization
const texts = ["a sound of a cat", "a sound of a dog"];
const text_inputs = tokenizer(texts, { padding: true, truncation: true });

// Compute embeddings
const { text_embeds } = await text_model(text_inputs);
// Tensor {
//   dims: [ 2, 512 ],
//   type: 'float32',
//   data: Float32Array(1024) [ ... ],
//   size: 1024
// }
```

**Kind**: static class of [models](#module_models)

---

### `ClapTextModelWithProjection.from_pretrained()` : \*

**Kind**: static method of [ClapTextModelWithProjection](#module_models.ClapTextModelWithProjection)

---

## models.ClapAudioModelWithProjection

CLAP Audio Model with a projection layer on top (a linear layer on top of the pooled output).

**Example:** Compute audio embeddings with `ClapAudioModelWithProjection`.

```javascript
import {
  AutoProcessor,
  ClapAudioModelWithProjection,
  read_audio,
} from "@huggingface/transformers";

// Load processor and audio model
const processor = await AutoProcessor.from_pretrained(
  "Xenova/clap-htsat-unfused"
);
const audio_model = await ClapAudioModelWithProjection.from_pretrained(
  "Xenova/clap-htsat-unfused"
);

// Read audio and run processor
const audio = await read_audio(
  "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cat_meow.wav"
);
const audio_inputs = await processor(audio);

// Compute embeddings
const { audio_embeds } = await audio_model(audio_inputs);
// Tensor {
//   dims: [ 1, 512 ],
//   type: 'float32',
//   data: Float32Array(512) [ ... ],
//   size: 512
// }
```

**Kind**: static class of [models](#module_models)

---

### `ClapAudioModelWithProjection.from_pretrained()` : \*

**Kind**: static method of [ClapAudioModelWithProjection](#module_models.ClapAudioModelWithProjection)

---

## models.VitsModel

The complete VITS model, for text-to-speech synthesis.

**Example:** Generate speech from text with `VitsModel`.

```javascript
import { AutoTokenizer, VitsModel } from "@huggingface/transformers";

// Load the tokenizer and model
const tokenizer = await AutoTokenizer.from_pretrained("Xenova/mms-tts-eng");
const model = await VitsModel.from_pretrained("Xenova/mms-tts-eng");

// Run tokenization
const inputs = tokenizer("I love transformers");

// Generate waveform
const { waveform } = await model(inputs);
// Tensor {
//   dims: [ 1, 35328 ],
//   type: 'float32',
//   data: Float32Array(35328) [ ... ],
//   size: 35328,
// }
```

**Kind**: static class of [models](#module_models)

---

### `vitsModel._call(model_inputs)` ⇒ Promise.&lt;VitsModelOutput&gt;

Calls the model on new inputs.

**Kind**: instance method of [VitsModel](#module_models.VitsModel)  
**Returns**: Promise.&lt;VitsModelOutput&gt; - The outputs for the VITS model.

      ParamTypeDescription




    model_inputsObjectThe inputs to the model.



---

## models.SegformerModel

The bare SegFormer encoder (Mix-Transformer) outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.SegformerForImageClassification

SegFormer Model transformer with an image classification head on top (a linear layer on top of the final hidden states) e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

## models.SegformerForSemanticSegmentation

SegFormer Model transformer with an all-MLP decode head on top e.g. for ADE20k, CityScapes.

**Kind**: static class of [models](#module_models)

---

## models.StableLmModel

The bare StableLm Model transformer outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.StableLmForCausalLM

StableLm Model with a `language modeling` head on top for Causal Language Modeling (with past).

**Kind**: static class of [models](#module_models)

---

## models.EfficientNetModel

The bare EfficientNet model outputting raw features without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.EfficientNetForImageClassification

EfficientNet Model with an image classification head on top (a linear layer on top of the pooled features).

**Kind**: static class of [models](#module_models)

---

### `efficientNetForImageClassification._call(model_inputs)`

**Kind**: instance method of [EfficientNetForImageClassification](#module_models.EfficientNetForImageClassification)

      ParamType




    model_inputsany


---

## models.MusicgenModel

The bare Musicgen decoder model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MusicgenForCausalLM

The MusicGen decoder model with a language modelling head on top.

**Kind**: static class of [models](#module_models)

---

## models.MusicgenForConditionalGeneration

The composite MusicGen model with a text encoder, audio encoder and Musicgen decoder,
for music generation tasks with one or both of text and audio prompts.

**Example:** Generate music from text with `Xenova/musicgen-small`.

```javascript
import {
  AutoTokenizer,
  MusicgenForConditionalGeneration,
} from "@huggingface/transformers";

// Load tokenizer and model
const tokenizer = await AutoTokenizer.from_pretrained("Xenova/musicgen-small");
const model = await MusicgenForConditionalGeneration.from_pretrained(
  "Xenova/musicgen-small",
  { dtype: "fp32" }
);

// Prepare text input
const prompt = "80s pop track with bassy drums and synth";
const inputs = tokenizer(prompt);

// Generate audio
const audio_values = await model.generate({
  ...inputs,
  max_new_tokens: 512,
  do_sample: true,
  guidance_scale: 3,
});

// (Optional) Write the output to a WAV file
import wavefile from "wavefile";
import fs from "fs";

const wav = new wavefile.WaveFile();
wav.fromScratch(
  1,
  model.config.audio_encoder.sampling_rate,
  "32f",
  audio_values.data
);
fs.writeFileSync("musicgen_out.wav", wav.toBuffer());
```

**Kind**: static class of [models](#module_models)

- [.MusicgenForConditionalGeneration](#module_models.MusicgenForConditionalGeneration)
  - [`._apply_and_filter_by_delay_pattern_mask(outputs)`](#module_models.MusicgenForConditionalGeneration+_apply_and_filter_by_delay_pattern_mask) ⇒ [Tensor](#Tensor)
  - [`.generate(options)`](#module_models.MusicgenForConditionalGeneration+generate) ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;

---

### `musicgenForConditionalGeneration._apply_and_filter_by_delay_pattern_mask(outputs)` ⇒ [Tensor](#Tensor)

Apply the pattern mask to the final ids,
then revert the pattern delay mask by filtering the pad token id in a single step.

**Kind**: instance method of [MusicgenForConditionalGeneration](#module_models.MusicgenForConditionalGeneration)  
**Returns**: [Tensor](#Tensor) - The filtered output tensor.

      ParamTypeDescription




    outputsTensorThe output tensor from the model.



---

### `musicgenForConditionalGeneration.generate(options)` ⇒ Promise.&lt;(ModelOutput|Tensor)&gt;

Generates sequences of token ids for models with a language modeling head.

**Kind**: instance method of [MusicgenForConditionalGeneration](#module_models.MusicgenForConditionalGeneration)  
**Returns**: Promise.&lt;(ModelOutput|Tensor)&gt; - The output of the model, which can contain the generated token ids, attentions, and scores.

      ParamType




    options*


---

## models.MobileNetV1Model

The bare MobileNetV1 model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MobileNetV1ForImageClassification

MobileNetV1 model with an image classification head on top (a linear layer on top of the pooled features),
e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `mobileNetV1ForImageClassification._call(model_inputs)`

**Kind**: instance method of [MobileNetV1ForImageClassification](#module_models.MobileNetV1ForImageClassification)

      ParamType




    model_inputsany


---

## models.MobileNetV2Model

The bare MobileNetV2 model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MobileNetV2ForImageClassification

MobileNetV2 model with an image classification head on top (a linear layer on top of the pooled features),
e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `mobileNetV2ForImageClassification._call(model_inputs)`

**Kind**: instance method of [MobileNetV2ForImageClassification](#module_models.MobileNetV2ForImageClassification)

      ParamType




    model_inputsany


---

## models.MobileNetV3Model

The bare MobileNetV3 model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MobileNetV3ForImageClassification

MobileNetV3 model with an image classification head on top (a linear layer on top of the pooled features),
e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `mobileNetV3ForImageClassification._call(model_inputs)`

**Kind**: instance method of [MobileNetV3ForImageClassification](#module_models.MobileNetV3ForImageClassification)

      ParamType




    model_inputsany


---

## models.MobileNetV4Model

The bare MobileNetV4 model outputting raw hidden-states without any specific head on top.

**Kind**: static class of [models](#module_models)

---

## models.MobileNetV4ForImageClassification

MobileNetV4 model with an image classification head on top (a linear layer on top of the pooled features),
e.g. for ImageNet.

**Kind**: static class of [models](#module_models)

---

### `mobileNetV4ForImageClassification._call(model_inputs)`

**Kind**: instance method of [MobileNetV4ForImageClassification](#module_models.MobileNetV4ForImageClassification)

      ParamType




    model_inputsany


---

## models.DecisionTransformerModel

The model builds upon the GPT2 architecture to perform autoregressive prediction of actions in an offline RL setting.
Refer to the paper for more details: https://huggingface.co/papers/2106.01345

**Kind**: static class of [models](#module_models)

---

## models.MultiModalityCausalLM

**Kind**: static class of [models](#module_models)

- [.MultiModalityCausalLM](#module_models.MultiModalityCausalLM)
  - [`new MultiModalityCausalLM(...args)`](#new_module_models.MultiModalityCausalLM_new)
  - [`.generate(options)`](#module_models.MultiModalityCausalLM+generate)
  - [`.generate_images(options)`](#module_models.MultiModalityCausalLM+generate_images)

---

### `new MultiModalityCausalLM(...args)`

      ParamType




    ...args*


---

### `multiModalityCausalLM.generate(options)`

**Kind**: instance method of [MultiModalityCausalLM](#module_models.MultiModalityCausalLM)

      ParamType




    options*


---

### `multiModalityCausalLM.generate_images(options)`

**Kind**: instance method of [MultiModalityCausalLM](#module_models.MultiModalityCausalLM)

      ParamType




    options*


---

## models.MgpstrForSceneTextRecognition

MGP-STR Model transformer with three classification heads on top
(three A^3 modules and three linear layer on top of the transformer encoder output) for scene text recognition (STR).

**Kind**: static class of [models](#module_models)

---

### `mgpstrForSceneTextRecognition._call(model_inputs)`

**Kind**: instance method of [MgpstrForSceneTextRecognition](#module_models.MgpstrForSceneTextRecognition)

      ParamType




    model_inputsany


---

## models.PatchTSTModel

The bare PatchTST Model outputting raw hidden-states without any specific head.

**Kind**: static class of [models](#module_models)

---

## models.PatchTSTForPrediction

The PatchTST for prediction model.

**Kind**: static class of [models](#module_models)

---

## models.PatchTSMixerModel

The bare PatchTSMixer Model outputting raw hidden-states without any specific head.

**Kind**: static class of [models](#module_models)

---

## models.PatchTSMixerForPrediction

The PatchTSMixer for prediction model.

**Kind**: static class of [models](#module_models)

---

## models.MimiEncoderOutput

**Kind**: static class of [models](#module_models)

---

### `new MimiEncoderOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.audio_codesTensorDiscrete code embeddings, of shape (batch_size, num_quantizers, codes_length).



---

## models.MimiDecoderOutput

**Kind**: static class of [models](#module_models)

---

### `new MimiDecoderOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.audio_valuesTensorDecoded audio values, of shape (batch_size, num_channels, sequence_length).



---

## models.MimiModel

The Mimi neural audio codec model.

**Kind**: static class of [models](#module_models)

- [.MimiModel](#module_models.MimiModel)
  - [`.encode(inputs)`](#module_models.MimiModel+encode) ⇒ Promise.&lt;MimiEncoderOutput&gt;
  - [`.decode(inputs)`](#module_models.MimiModel+decode) ⇒ Promise.&lt;MimiDecoderOutput&gt;

---

### `mimiModel.encode(inputs)` ⇒ Promise.&lt;MimiEncoderOutput&gt;

Encodes the input audio waveform into discrete codes.

**Kind**: instance method of [MimiModel](#module_models.MimiModel)  
**Returns**: Promise.&lt;MimiEncoderOutput&gt; - The output tensor of shape `(batch_size, num_codebooks, sequence_length)`.

      ParamTypeDescription




    inputsObjectModel inputs


    [inputs.input_values]TensorFloat values of the input audio waveform, of shape (batch_size, channels, sequence_length)).



---

### `mimiModel.decode(inputs)` ⇒ Promise.&lt;MimiDecoderOutput&gt;

Decodes the given frames into an output audio waveform.

**Kind**: instance method of [MimiModel](#module_models.MimiModel)  
**Returns**: Promise.&lt;MimiDecoderOutput&gt; - The output tensor of shape `(batch_size, num_channels, sequence_length)`.

      ParamTypeDescription




    inputsMimiEncoderOutputThe encoded audio codes.



---

## models.DacEncoderOutput

**Kind**: static class of [models](#module_models)

---

### `new DacEncoderOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.audio_codesTensorDiscrete code embeddings, of shape (batch_size, num_quantizers, codes_length).



---

## models.DacDecoderOutput

**Kind**: static class of [models](#module_models)

---

### `new DacDecoderOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.audio_valuesTensorDecoded audio values, of shape (batch_size, num_channels, sequence_length).



---

## models.DacModel

The DAC (Descript Audio Codec) model.

**Kind**: static class of [models](#module_models)

- [.DacModel](#module_models.DacModel)
  - [`.encode(inputs)`](#module_models.DacModel+encode) ⇒ Promise.&lt;DacEncoderOutput&gt;
  - [`.decode(inputs)`](#module_models.DacModel+decode) ⇒ Promise.&lt;DacDecoderOutput&gt;

---

### `dacModel.encode(inputs)` ⇒ Promise.&lt;DacEncoderOutput&gt;

Encodes the input audio waveform into discrete codes.

**Kind**: instance method of [DacModel](#module_models.DacModel)  
**Returns**: Promise.&lt;DacEncoderOutput&gt; - The output tensor of shape `(batch_size, num_codebooks, sequence_length)`.

      ParamTypeDescription




    inputsObjectModel inputs


    [inputs.input_values]TensorFloat values of the input audio waveform, of shape (batch_size, channels, sequence_length)).



---

### `dacModel.decode(inputs)` ⇒ Promise.&lt;DacDecoderOutput&gt;

Decodes the given frames into an output audio waveform.

**Kind**: instance method of [DacModel](#module_models.DacModel)  
**Returns**: Promise.&lt;DacDecoderOutput&gt; - The output tensor of shape `(batch_size, num_channels, sequence_length)`.

      ParamTypeDescription




    inputsDacEncoderOutputThe encoded audio codes.



---

## models.SnacModel

The SNAC (Multi-Scale Neural Audio Codec) model.

**Kind**: static class of [models](#module_models)

- [.SnacModel](#module_models.SnacModel)
  - [`.encode(inputs)`](#module_models.SnacModel+encode) ⇒ Promise.&lt;Record&lt;string, Tensor&gt;&gt;
  - [`.decode(inputs)`](#module_models.SnacModel+decode) ⇒ Promise.&lt;{audio_values: Tensor}&gt;

---

### `snacModel.encode(inputs)` ⇒ Promise.&lt;Record&lt;string, Tensor&gt;&gt;

Encodes the input audio waveform into discrete codes.

**Kind**: instance method of [SnacModel](#module_models.SnacModel)  
**Returns**: Promise.&lt;Record&lt;string, Tensor&gt;&gt; - The output tensors of shape `(batch_size, num_codebooks, sequence_length)`.

      ParamTypeDescription




    inputsObjectModel inputs


    [inputs.input_values]TensorFloat values of the input audio waveform, of shape (batch_size, channels, sequence_length)).



---

### `snacModel.decode(inputs)` ⇒ Promise.&lt;{audio_values: Tensor}&gt;

Decodes the given frames into an output audio waveform.

**Kind**: instance method of [SnacModel](#module_models.SnacModel)  
**Returns**: Promise.&lt;{audio_values: Tensor}&gt; - The output tensor of shape `(batch_size, num_channels, sequence_length)`.

      ParamTypeDescription




    inputsRecord.&lt;string, Tensor&gt;The encoded audio codes.



---

## models.PretrainedMixin

Base class of all AutoModels. Contains the `from_pretrained` function
which is used to instantiate pretrained models.

**Kind**: static class of [models](#module_models)

- [.PretrainedMixin](#module_models.PretrainedMixin)
  - _instance_
    - [`.MODEL_CLASS_MAPPINGS`](#module_models.PretrainedMixin+MODEL_CLASS_MAPPINGS) : \*
    - [`.BASE_IF_FAIL`](#module_models.PretrainedMixin+BASE_IF_FAIL)
  - _static_
    - [`.from_pretrained()`](#module_models.PretrainedMixin.from_pretrained) : \*

---

### `pretrainedMixin.MODEL_CLASS_MAPPINGS` : \*

Mapping from model type to model class.

**Kind**: instance property of [PretrainedMixin](#module_models.PretrainedMixin)

---

### `pretrainedMixin.BASE_IF_FAIL`

Whether to attempt to instantiate the base class (`PretrainedModel`) if
the model type is not found in the mapping.

**Kind**: instance property of [PretrainedMixin](#module_models.PretrainedMixin)

---

### `PretrainedMixin.from_pretrained()` : \*

**Kind**: static method of [PretrainedMixin](#module_models.PretrainedMixin)

---

## models.AutoModel

Helper class which is used to instantiate pretrained models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

- [.AutoModel](#module_models.AutoModel)
  - [`new AutoModel()`](#new_module_models.AutoModel_new)
  - [`.MODEL_CLASS_MAPPINGS`](#module_models.AutoModel+MODEL_CLASS_MAPPINGS) : \*

---

### `new AutoModel()`

**Example**

```js
let model = await AutoModel.from_pretrained("Xenova/bert-base-uncased");
```

---

### `autoModel.MODEL_CLASS_MAPPINGS` : \*

**Kind**: instance property of [AutoModel](#module_models.AutoModel)

---

## models.AutoModelForSequenceClassification

Helper class which is used to instantiate pretrained sequence classification models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForSequenceClassification()`

**Example**

```js
let model = await AutoModelForSequenceClassification.from_pretrained(
  "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
);
```

---

## models.AutoModelForTokenClassification

Helper class which is used to instantiate pretrained token classification models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForTokenClassification()`

**Example**

```js
let model = await AutoModelForTokenClassification.from_pretrained(
  "Xenova/distilbert-base-multilingual-cased-ner-hrl"
);
```

---

## models.AutoModelForSeq2SeqLM

Helper class which is used to instantiate pretrained sequence-to-sequence models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForSeq2SeqLM()`

**Example**

```js
let model = await AutoModelForSeq2SeqLM.from_pretrained("Xenova/t5-small");
```

---

## models.AutoModelForSpeechSeq2Seq

Helper class which is used to instantiate pretrained sequence-to-sequence speech-to-text models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForSpeechSeq2Seq()`

**Example**

```js
let model = await AutoModelForSpeechSeq2Seq.from_pretrained(
  "openai/whisper-tiny.en"
);
```

---

## models.AutoModelForTextToSpectrogram

Helper class which is used to instantiate pretrained sequence-to-sequence text-to-spectrogram models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForTextToSpectrogram()`

**Example**

```js
let model = await AutoModelForTextToSpectrogram.from_pretrained(
  "microsoft/speecht5_tts"
);
```

---

## models.AutoModelForTextToWaveform

Helper class which is used to instantiate pretrained text-to-waveform models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForTextToWaveform()`

**Example**

```js
let model = await AutoModelForTextToSpectrogram.from_pretrained(
  "facebook/mms-tts-eng"
);
```

---

## models.AutoModelForCausalLM

Helper class which is used to instantiate pretrained causal language models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForCausalLM()`

**Example**

```js
let model = await AutoModelForCausalLM.from_pretrained("Xenova/gpt2");
```

---

## models.AutoModelForMaskedLM

Helper class which is used to instantiate pretrained masked language models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForMaskedLM()`

**Example**

```js
let model = await AutoModelForMaskedLM.from_pretrained(
  "Xenova/bert-base-uncased"
);
```

---

## models.AutoModelForQuestionAnswering

Helper class which is used to instantiate pretrained question answering models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForQuestionAnswering()`

**Example**

```js
let model = await AutoModelForQuestionAnswering.from_pretrained(
  "Xenova/distilbert-base-cased-distilled-squad"
);
```

---

## models.AutoModelForVision2Seq

Helper class which is used to instantiate pretrained vision-to-sequence models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForVision2Seq()`

**Example**

```js
let model = await AutoModelForVision2Seq.from_pretrained(
  "Xenova/vit-gpt2-image-captioning"
);
```

---

## models.AutoModelForImageClassification

Helper class which is used to instantiate pretrained image classification models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForImageClassification()`

**Example**

```js
let model = await AutoModelForImageClassification.from_pretrained(
  "Xenova/vit-base-patch16-224"
);
```

---

## models.AutoModelForImageSegmentation

Helper class which is used to instantiate pretrained image segmentation models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForImageSegmentation()`

**Example**

```js
let model = await AutoModelForImageSegmentation.from_pretrained(
  "Xenova/detr-resnet-50-panoptic"
);
```

---

## models.AutoModelForSemanticSegmentation

Helper class which is used to instantiate pretrained image segmentation models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForSemanticSegmentation()`

**Example**

```js
let model = await AutoModelForSemanticSegmentation.from_pretrained(
  "nvidia/segformer-b3-finetuned-cityscapes-1024-1024"
);
```

---

## models.AutoModelForUniversalSegmentation

Helper class which is used to instantiate pretrained universal image segmentation models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForUniversalSegmentation()`

**Example**

```js
let model = await AutoModelForUniversalSegmentation.from_pretrained(
  "hf-internal-testing/tiny-random-MaskFormerForInstanceSegmentation"
);
```

---

## models.AutoModelForObjectDetection

Helper class which is used to instantiate pretrained object detection models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForObjectDetection()`

**Example**

```js
let model = await AutoModelForObjectDetection.from_pretrained(
  "Xenova/detr-resnet-50"
);
```

---

## models.AutoModelForMaskGeneration

Helper class which is used to instantiate pretrained mask generation models with the `from_pretrained` function.
The chosen model class is determined by the type specified in the model config.

**Kind**: static class of [models](#module_models)

---

### `new AutoModelForMaskGeneration()`

**Example**

```js
let model = await AutoModelForMaskGeneration.from_pretrained(
  "Xenova/sam-vit-base"
);
```

---

## models.Seq2SeqLMOutput

**Kind**: static class of [models](#module_models)

---

### `new Seq2SeqLMOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorThe output logits of the model.


    output.past_key_valuesTensorAn tensor of key/value pairs that represent the previous state of the model.


    output.encoder_outputsTensorThe output of the encoder in a sequence-to-sequence model.


    [output.decoder_attentions]TensorAttentions weights of the decoder, after the attention softmax, used to compute the weighted average in the self-attention heads.


    [output.cross_attentions]TensorAttentions weights of the decoder&#39;s cross-attention layer, after the attention softmax, used to compute the weighted average in the cross-attention heads.



---

## models.SequenceClassifierOutput

Base class for outputs of sentence classification models.

**Kind**: static class of [models](#module_models)

---

### `new SequenceClassifierOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorclassification (or regression if config.num_labels==1) scores (before SoftMax).


    [output.attentions]Record.&lt;string, Tensor&gt;Object of torch.FloatTensor (one for each layer) of shape (batch_size, num_heads, sequence_length, sequence_length).

Attentions weights after the attention softmax, used to compute the weighted average in the self-attention heads.

---

## models.XVectorOutput

Base class for outputs of XVector models.

**Kind**: static class of [models](#module_models)

---

### `new XVectorOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorClassification hidden states before AMSoftmax, of shape (batch_size, config.xvector_output_dim).


    output.embeddingsTensorUtterance embeddings used for vector similarity-based retrieval, of shape (batch_size, config.xvector_output_dim).



---

## models.TokenClassifierOutput

Base class for outputs of token classification models.

**Kind**: static class of [models](#module_models)

---

### `new TokenClassifierOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorClassification scores (before SoftMax).



---

## models.MaskedLMOutput

Base class for masked language models outputs.

**Kind**: static class of [models](#module_models)

---

### `new MaskedLMOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorPrediction scores of the language modeling head (scores for each vocabulary token before SoftMax).



---

## models.QuestionAnsweringModelOutput

Base class for outputs of question answering models.

**Kind**: static class of [models](#module_models)

---

### `new QuestionAnsweringModelOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.start_logitsTensorSpan-start scores (before SoftMax).


    output.end_logitsTensorSpan-end scores (before SoftMax).



---

## models.CausalLMOutput

Base class for causal language model (or autoregressive) outputs.

**Kind**: static class of [models](#module_models)

---

### `new CausalLMOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorPrediction scores of the language modeling head (scores for each vocabulary token before softmax).



---

## models.CausalLMOutputWithPast

Base class for causal language model (or autoregressive) outputs.

**Kind**: static class of [models](#module_models)

---

### `new CausalLMOutputWithPast(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.logitsTensorPrediction scores of the language modeling head (scores for each vocabulary token before softmax).


    output.past_key_valuesTensorContains pre-computed hidden-states (key and values in the self-attention blocks)

that can be used (see past_key_values input) to speed up sequential decoding.

---

## models.ImageMattingOutput

**Kind**: static class of [models](#module_models)

---

### `new ImageMattingOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.alphasTensorEstimated alpha values, of shape (batch_size, num_channels, height, width).



---

## models.VitsModelOutput

Describes the outputs for the VITS model.

**Kind**: static class of [models](#module_models)

---

### `new VitsModelOutput(output)`

      ParamTypeDescription




    outputObjectThe output of the model.


    output.waveformTensorThe final audio waveform predicted by the model, of shape (batch_size, sequence_length).


    output.spectrogramTensorThe log-mel spectrogram predicted at the output of the flow model.

This spectrogram is passed to the Hi-Fi GAN decoder model to obtain the final audio waveform.

---

## `models~cumsum_masked_fill(attention_mask)` ⇒ Object

Helper function to perform the following:

```python
x = attention_mask.long().cumsum(-1) - 1
x.masked_fill_(attention_mask == 0, 1)
```

**Kind**: inner method of [models](#module_models)

      ParamType




    attention_maskTensor


---

## `models~createPositionIds()`

If the model supports providing position_ids, we create position_ids on the fly for batch generation,
by computing the cumulative sum of the attention mask along the sequence length dimension.

Equivalent to:

```python
position_ids = attention_mask.long().cumsum(-1) - 1
position_ids.masked_fill_(attention_mask == 0, 1)
if past_key_values:
    position_ids = position_ids[:, -input_ids.shape[1] :]
```

**Kind**: inner method of [models](#module_models)

---

## `models~SamModelInputs` : Object

Object containing the model inputs.

**Kind**: inner typedef of [models](#module_models)  
**Properties**

      NameTypeDescription




    pixel_valuesTensorPixel values as a Tensor with shape (batch_size, num_channels, height, width).

These can be obtained using a SamProcessor.

    [input_points]TensorInput 2D spatial points with shape (batch_size, num_points, 2).

This is used by the prompt encoder to encode the prompt.

    [input_labels]TensorInput labels for the points, as a Tensor of shape (batch_size, point_batch_size, num_points).

This is used by the prompt encoder to encode the prompt. There are 4 types of labels:

1: the point is a point that contains the object of interest
0: the point is a point that does not contain the object of interest
-1: the point corresponds to the background
-10: the point is a padding point, thus should be ignored by the prompt encoder

    [input_boxes]TensorInput bounding boxes with shape (batch_size, num_boxes, 4).


    [image_embeddings]TensorImage embeddings used by the mask decoder.


    [image_positional_embeddings]TensorImage positional embeddings used by the mask decoder.



---

## `models~SpeechOutput` : Object

**Kind**: inner typedef of [models](#module_models)  
**Properties**

      NameTypeDescription




    [spectrogram]TensorThe predicted log-mel spectrogram of shape

(output_sequence_length, config.num_mel_bins). Returned when no vocoder is provided

    [waveform]TensorThe predicted waveform of shape (num_frames,). Returned when a vocoder is provided.


    [cross_attentions]TensorThe outputs of the decoder&#39;s cross-attention layers of shape

(config.decoder_layers, config.decoder_attention_heads, output_sequence_length, input_sequence_length). returned when output_cross_attentions is true.

---
