export const StreamStatusIconMap = {
  'default': ['loading', 'status-icon loading'],
  'failed': ['question-circle', 'status-icon error'],
  'succeeded': ['check-circle', 'status-icon success'],
  'start': ['icons:node-start', 'node-icon start'],
  'llm': ['icons:node-llm', 'node-icon llm'],
  'if-else': ['icons:node-branch', 'node-icon if-else'],
  'http-request': ['icons:node-http', 'node-icon http-request'],
  'code': ['icons:script', 'node-icon code'],
  'tool': ['icons:node-iteration', 'node-icon iteration'],
  'iteration': ['icons:node-iteration', 'node-icon iteration'],
  'answer': ['icons:node-answer', 'node-icon answer']
}
export function formatSreamMeta(stream: any) {
  stream.status = stream.status || 'default';
  const [icon, className] = StreamStatusIconMap[stream.status as keyof typeof StreamStatusIconMap];
  stream.status_icon = icon;
  stream.status_className = className;


  if (stream.node_type) {
    const [node_icon, node_className] = StreamStatusIconMap[stream.node_type as keyof typeof StreamStatusIconMap] || ['', ''];
    stream.node_icon = node_icon;
    stream.node_className = node_className;
  }
}


export interface IAppConversation {
  id: string,
  name?: string,
  inputs?: any,
  status?: string,
  introduction?: string,
  created_at?: number,
  updated_at?: number
}


export enum StreamEvent {
  PING = 'ping',
  ERROR = 'error',
  MESSAGE = 'message',
  MESSAGE_END = 'message_end',
  TTS_MESSAGE = 'tts_message',
  TTS_MESSAGE_END = 'tts_message_end',
  MESSAGE_FILE = 'message_file',
  MESSAGE_REPLACE = 'message_replace',
  AGENT_THOUGHT = 'agent_thought',
  AGENT_MESSAGE = 'agent_message',
  WORKFLOW_STARTED = 'workflow_started',
  WORKFLOW_FINISHED = 'workflow_finished',
  NODE_STARTED = 'node_started',
  NODE_FINISHED = 'node_finished',
  NODE_RETRY = 'node_retry',
  PARALLEL_BRANCH_STARTED = 'parallel_branch_started',
  PARALLEL_BRANCH_FINISHED = 'parallel_branch_finished',
  ITERATION_STARTED = 'iteration_started',
  ITERATION_NEXT = 'iteration_next',
  ITERATION_COMPLETED = 'iteration_completed',
  LOOP_STARTED = 'loop_started',
  LOOP_NEXT = 'loop_next',
  LOOP_COMPLETED = 'loop_completed',
  TEXT_CHUNK = 'text_chunk',
  TEXT_REPLACE = 'text_replace',
  AGENT_LOG = 'agent_log'
}
