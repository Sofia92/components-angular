import { Directive } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroySubscription } from '../destroy.subscription';
import { EventSourceService } from './event-source.service';
import { last, cloneDeep } from "lodash";
import { formatSreamMeta, IAppConversation, StreamEvent } from './typing';

export interface IChatContext {
  loading: any;
  messages: any[];
  messageMap: Map<string, any>;
  currentConversation?: IAppConversation;
}
@Directive()
export class EventSourceDirective extends DestroySubscription {
  constructor(protected _eventSourceService: EventSourceService) { super() }

  chat(request: { url: string, body: any }, chatContext: IChatContext) {
    chatContext.messages.push(cloneDeep(request.body));
    const currentMessage = last(chatContext.messages);
    currentMessage.answerLoading = true;


    this._eventSourceService.connectToServerSentEvents(
      request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer token` },
      body: JSON.stringify(request.body),
      withCredentials: true
    }
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => this._handleEvent(data, chatContext),
      error: error => this._handleError(error, chatContext)
    })
  }

  private _handleEvent(message: any, chatContext: IChatContext) {
    const currentMessage = last(chatContext.messages);
    const { event, message_id, conversation_id, task_id, workflow_run_id, answer = '', thought, code, data } = message;
    if (chatContext.currentConversation) {
      chatContext.currentConversation.id = conversation_id;
    }
    currentMessage.id = message_id;
    data && formatSreamMeta(data);
    switch (event) {
      case StreamEvent.WORKFLOW_STARTED:
        chatContext.messageMap.set(message_id, { workflow: data, nodeMap: new Map() })
        break;
      case StreamEvent.NODE_STARTED:
      case StreamEvent.NODE_FINISHED:
        chatContext.messageMap.get(message_id).nodeMap.set(data.node_id, data);
        break;
      case StreamEvent.AGENT_THOUGHT:
        currentMessage.thought = thought;
        if (!!thought) {
          currentMessage.answerLoading = false;
        }
        break;
      case StreamEvent.AGENT_MESSAGE:
      case StreamEvent.MESSAGE:
        currentMessage.answer = currentMessage.answer + answer;
        this._replaceInput(currentMessage);
        break;
      case StreamEvent.WORKFLOW_FINISHED:
        currentMessage.answer = data.outputs?.answer || '';
        currentMessage.answerLoading = false;
        break;
      case StreamEvent.MESSAGE_END:
        currentMessage.answerLoading = false;
        break;
      case StreamEvent.ERROR:
        currentMessage.answer += code || '抱歉，服务器异常';
        currentMessage.answerLoading = false;
        break;
      default:
        break;
    }
  }

  private _handleError(error: any, chatContext: IChatContext) {
    const currentMessage = last(chatContext.messages);
    currentMessage.answer = error?.message || '抱歉，服务器异常';
    currentMessage.answerLoading = false;
  }

  private _replaceInput(message: any) {
    if (message?.answer) {
      const inputs = message.inputs || {};
      let answer = message.answer;
      Object.keys(inputs).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        answer = answer.replace(regex, inputs[key]);
      });
      message.answer = answer;
    }
  }
}
