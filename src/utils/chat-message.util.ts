import { Temp_Agent_Conversation_Message, Temp_Conversation_Message } from "./chat-message.schema";

export function getModelChatMessage(appId, prompt: string, query: string, modelConfig) {
  return {
    ...Temp_Conversation_Message,
    answer: '',
    answerLoading: true,
    query: query,
    model_config: {
      ...Temp_Conversation_Message.model_config,
      pre_prompt: prompt,
      appId,
      model: modelConfig
    }
  };
}
export function getAgentChatMessage(conversation_id: string, query: string, inputs) {
  return {
    ...Temp_Agent_Conversation_Message,
    answer: '',
    answerLoading: true,
    query: query,
    inputs: inputs,
    conversation_id: conversation_id,
    response_mode: 'streaming',
    files: [],
    parent_message_id: null
  };
}
