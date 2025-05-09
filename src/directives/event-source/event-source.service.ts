import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventSourceService {
  xs: EventTarget;

  constructor(private zone: NgZone) { }

  connectToServerSentEvents(url: string, options: any): Observable<Event> {
    this.xs = this.XhrSource(url, options);
    return new Observable((subscriber: Subscriber<Event>) => {
      this.xs.addEventListener('error', (error: any) => {
        this.zone.run(() => subscriber.error(JSON.parse(error['reason'])));
      });
      this.xs.addEventListener('message', (e: any) => {
        const message = JSON.parse(e['data']);

        this.zone.run(() => subscriber.next(message));
      });
      this.xs.addEventListener('close', e => {
        // outputEl.textContent += '\nDONE';
        this.zone.run(() => subscriber.complete());
      });
    });
  }

  close(): void {
    if (!this.xs) {
      return;
    }

    (this.xs as any)['close']();
    (this.xs as any) = null;
  }

  private XhrSource(url: string, opts: any): EventTarget {
    const eventTarget = new EventTarget();
    const xhr = new XMLHttpRequest();

    xhr.open(opts.method || 'GET', url, true);
    for (var k in opts.headers) {
      xhr.setRequestHeader(k, opts.headers[k]);
    }

    var ongoing = false, start = 0;
    xhr.onprogress = () => {
      if (!ongoing) {
        // onloadstart is sync with `xhr.send`, listeners don't have a chance
        ongoing = true;
        const option = {
          status: xhr.status,
          headers: xhr.getAllResponseHeaders(),
          url: (xhr as any)['responseUrl'],
        };
        eventTarget.dispatchEvent(new Event('open', (option as any)));
      }

      var i, chunk;
      while ((i = xhr.responseText.indexOf('\n\n', start)) >= 0) {
        chunk = xhr.responseText.slice(start, i);
        start = i + 2;
        if (chunk.length) {
          eventTarget.dispatchEvent(this._sseevent(chunk));
        }
      }
    }

    xhr.onloadend = _ => {
      if (xhr.status == 200) {
        eventTarget.dispatchEvent(new CloseEvent('close'))
      } else {
        eventTarget.dispatchEvent(new CloseEvent('error', { reason: xhr.response }));
      }
    }

    xhr.timeout = opts.timeout;
    xhr.ontimeout = _ => {
      eventTarget.dispatchEvent(new CloseEvent('error', { reason: JSON.stringify({ message: 'Network request timed out' }) }));
    }
    xhr.onerror = _ => {
      eventTarget.dispatchEvent(new CloseEvent('error', { reason: xhr.response }));
    }
    xhr.onabort = _ => {
      eventTarget.dispatchEvent(new CloseEvent('error', { reason: JSON.stringify({ message: 'Network request aborted' }) }));
    }

    (eventTarget as any)['close'] = () => {
      xhr.abort();
    }

    xhr.send(opts.body);
    return eventTarget;
  }

  private _sseevent(message: string) {
    let type = 'message', start = 0;
    if (message.startsWith('event: ')) {
      start = message.indexOf('\n');
      type = message.slice(7, start);
    }
    start = message.indexOf(': ', start) + 2;
    let data = message.slice(start, message.length);

    return new MessageEvent(type, { data: data })
  }
}
