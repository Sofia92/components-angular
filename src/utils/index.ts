import { IDocument, IFileUploadResponse, IndexTypeDisplayMap } from '@Api';
import { format } from 'date-fns';

export * from './select.util';
export * from './validators';
export * from './form-validator';
export * from './model.normalize';
export * from './chat-message.util';

export async function racePromises(promises) {
  const results = await Promise.all(promises.map((p) => p.catch((err) => err)));
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

export interface IFile extends IFileUploadResponse {
  created_at_display?: string;
  doc_form_display?: string;
}

export function formatFileMeta(file: IFile) {
  file.icon = fileTypeIconMap[file.extension];

  if ('created_at' in file) {
    file.created_at_display = file.created_at ? format(new Date(file.created_at * 1000), 'yyyy-MM-dd HH:mm:ss') : '';
  }
}

export interface IDocumentMeta extends IDocument {
  doc_form_display?: string;
}

export function formatDocumentMeta(document: IDocumentMeta) {
  if ('doc_form' in document) {
    document.doc_form_display = document.doc_form ? IndexTypeDisplayMap[document.doc_form] : ''
  }
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
export function formatSreamMeta(stream) {
  stream.status = stream.status || 'default';
  const [icon, className] = StreamStatusIconMap[stream.status];
  stream.status_icon = icon;
  stream.status_className = className;


  if (stream.node_type) {
    const [node_icon, node_className] = StreamStatusIconMap[stream.node_type] || ['', ''];
    stream.node_icon = node_icon;
    stream.node_className = node_className;
  }
}