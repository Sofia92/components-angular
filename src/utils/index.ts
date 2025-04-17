
export * from './select.util';
export * from './validators';
export * from './form-validator';
export * from './uuid';
export * from './typings';
export { isAllChecked, isHalfChecked, getListCheckedStatus, type ICheckedStatus} from './list-checked';

export async function racePromises(promises: Promise<any>[]) {
  const results = await Promise.all(promises.map((p) => p.catch((err: Error) => err)));
  return results.includes(false) ? false : true;
}

export function generateUid() {
  return (Number(Math.random().toString().substring(2, 15)) + Date.now()).toString(36)
}

export const fileTypeIconMap = {
  'txt': 'files:text-fill',
  'md': 'files:markdown-fill',
  'mdx': 'files:markdown-fill',
  'pdf': 'files:pdf-fill',
  'html': 'files:html-fill',
  'xlsx': 'files:excel-fill',
  'xls': 'files:excel-fill',
  'docx': 'files:word-fill',
  'csv': 'files:excel-fill',
}


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
// export function formatSreamMeta(stream: any) {
//   stream.status = stream.status || 'default';
//   const [icon, className] = StreamStatusIconMap[stream.status];
//   stream.status_icon = icon;
//   stream.status_className = className;


//   if (stream.node_type) {
//     const [node_icon, node_className] = StreamStatusIconMap[stream.node_type] || ['', ''];
//     stream.node_icon = node_icon;
//     stream.node_className = node_className;
//   }
// }