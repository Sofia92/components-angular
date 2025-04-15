// 空消息体
export const Temp_Conversation_Message = {
  "response_mode": "streaming",
  "conversation_id": "",
  "files": [],
  "query": "hh ",
  "inputs": {},
  "model_config": {
    "pre_prompt": "你是一chatbot客服专家，根据用户输入的内容进回答",
    "prompt_type": "simple",
    "chat_prompt_config": {},
    "completion_prompt_config": {},
    "user_input_form": [],
    "dataset_query_variable": "",
    "opening_statement": "",
    "more_like_this": {
      "enabled": false
    },
    "suggested_questions": [],
    "suggested_questions_after_answer": {
      "enabled": false
    },
    "text_to_speech": {
      "enabled": false,
      "voice": "",
      "language": ""
    },
    "speech_to_text": {
      "enabled": false
    },
    "retriever_resource": {
      "enabled": true
    },
    "sensitive_word_avoidance": {
      "enabled": false,
      "type": "",
      "configs": []
    },
    "agent_mode": {
      "enabled": false,
      "max_iteration": 5,
      "strategy": "react",
      "tools": []
    },
    "dataset_configs": {
      "retrieval_model": "multiple",
      "top_k": 4,
      "reranking_enable": false,
      "datasets": {
        "datasets": []
      }
    },
    "file_upload": {
      "image": {
        "detail": "high",
        "enabled": false,
        "number_limits": 3,
        "transfer_methods": [
          "remote_url",
          "local_file"
        ]
      },
      "enabled": false,
      "allowed_file_types": [],
      "allowed_file_extensions": [
        ".JPG",
        ".JPEG",
        ".PNG",
        ".GIF",
        ".WEBP",
        ".SVG",
        ".MP4",
        ".MOV",
        ".MPEG",
        ".MPGA"
      ],
      "allowed_file_upload_methods": [
        "remote_url",
        "local_file"
      ],
      "number_limits": 3,
      "fileUploadConfig": {
        "file_size_limit": 15,
        "batch_count_limit": 5,
        "image_file_size_limit": 10,
        "video_file_size_limit": 100,
        "audio_file_size_limit": 50,
        "workflow_file_upload_limit": 10
      }
    },
    "annotation_reply": {
      "enabled": false
    },
    "supportAnnotation": true,
    "appId": "bb500ea0-50ae-4008-9ebb-868d008dc9c3",
    "supportCitationHitInfo": true,
    "model": {
      "provider": "langgenius/siliconflow/siliconflow",
      "name": "Qwen/Qwen2.5-7B-Instruct",
      "mode": "chat",
      "completion_params": {
        "stop": []
      }
    }
  },
  "parent_message_id": null
};
// Agent 空消息体
export const Temp_Agent_Conversation_Message = {
  id: '',
  conversation_id: '',
  parent_message_id: null,
  inputs: {},
  query: '',
  answer: '',
  feedback: null,
  retriever_resources: [],
  created_at: '',
  agent_thoughts: [],
  message_files: [],
  status: null,
  error: null,
  task_id: '',
};