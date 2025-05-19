import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export interface ITraceHighLightConf {
  isShadowDom?: boolean;
  shadowDomElement?: HTMLElement;
  isDisabled?: boolean;
  onHighlight$: BehaviorSubject<any>;
}
export interface ITraceSourceItemFrontend {
  keyword?: string;
  fieldName?: string;
}

@Directive({
  selector: '[traceHighlight]',
  // standalone: true,
})
export class TraceHighlightDirective implements OnChanges, OnInit, OnDestroy {
  @Input('traceHighlight') highlightConf: ITraceHighLightConf;
  @Input() highlightId: string;
  @Output() hightTraceIdSetChange = new EventEmitter<Set<string>>();

  @HostBinding('style.position') public wrapperPos = 'relative';
  public hightTraceIdSet = new Set<string>();
  public destroy$: Subject<void> = new Subject<void>();
  
  // 添加样式常量
  private readonly HIGHLIGHT_STYLES = {
    normal: {
      background: 'rgba(255, 242, 123, 0.3)',
      border: '1.5px dashed #FD8701'
    },
    active: {
      background: 'rgba(7, 181, 249, 0.3)',
      border: 'none'
    }
  } as const;

  constructor(
    private elRef: ElementRef,
    private render: Renderer2
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlightId'] && this.highlightId) {
      const element = document.getElementById(this.highlightId);
      if (!element) return;

      this.activeAndScrollToCurPoint(element as HTMLElement);
    }
  }

  public ngOnInit(): void {
    if (this.highlightConf?.isDisabled) return;
    this.highlightConf.onHighlight$.pipe(
      takeUntil(this.destroy$),
      filter(value => value !== false)
    ).subscribe((value: any) => {
      // 清除所有高亮
      this.clearAllHighlights();
      value.forEach((point: ITraceSourceItemFrontend) => this.handleTracePoint(point));
      this.hightTraceIdSetChange.emit(this.hightTraceIdSet)
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * 根据单个溯源点信息进行DOM查找
   * @param tracePoint 单个溯源点信息
   */
  private handleTracePoint(tracePoint: ITraceSourceItemFrontend): void {
    // 兼容一些页面的样式偏移及shadowDom等的生成晚 在视图更新好后再进行高亮等的操作
    setTimeout(() => {
      const { isShadowDom, shadowDomElement } = this.highlightConf;
      // 兼容shadowDom元素的获取
      const walkerWrapper = isShadowDom ? shadowDomElement : this.elRef.nativeElement;
      if (!walkerWrapper) {
        return;
      }
      const { keyword, fieldName } = tracePoint;
      // 处理*等在正则中有特殊含义的字符转义
      // tslint:disable-next-line: newline-per-chained-call
      const regxStr = keyword?.replace(/([*+?$^.|\\\)\(])/g, '\\$1');
      const matchRegx = new RegExp(`${regxStr}`, 'g');

      // 对于关键字匹配方式直接查找匹配的Text节点
      this.searchMatchTextNode(walkerWrapper, matchRegx);
    });
  }

  /**
   * 搜索指定元素下的匹配文本正则的文本节点，并循环进行相应处理
   * @param elementNode 要查找的HTML元素
   * @param matchRegx 需要匹配的文本正则
   */
  private searchMatchTextNode(elementNode: Node, matchRegx: RegExp): void {
    const textNodeFilterFn = (node: Node) => {
      return node.nodeValue?.match(matchRegx) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    };
    const textNodeWalker = document.createTreeWalker(elementNode, NodeFilter.SHOW_TEXT, textNodeFilterFn as any);
    // 元素节点下匹配的文本节点
    let curMatchTextNode = textNodeWalker.nextNode();

    while (!!curMatchTextNode) {

      this.searchMatchTextStr(curMatchTextNode, matchRegx);

      curMatchTextNode = textNodeWalker.nextNode();
    }
  }

  /**
   * 对匹配到的文本节点，需要通过正则查找到当前文本节点匹配的文本有哪些，并得出文本的具体位置
   * 然后才能对每个文本进行高亮的定位
   * @param textNode 匹配到的文本Node节点
   * @param matchRegx 需要匹配的文本正则
   */
  private searchMatchTextStr(textNode: Node, matchRegx: RegExp): void {
    const textNodeStr = textNode.textContent;
    let matchResult = matchRegx.exec(textNodeStr || '');

    while (!!matchResult) {
      const startIndex = matchResult?.index;
      const endIndex = matchRegx?.lastIndex;
      // 根据需要高亮的文本节点以及正则查找获得的文本起始高亮位置进行高亮操作
      this.highlightTextRange(textNode, startIndex, endIndex);

      matchResult = matchRegx.exec(textNodeStr || '');
    }
  }

  /**
   * 高亮匹配到的溯源文本
   * @param textNode 需要高亮的文本节点
   * @param startIndex 高亮文本节点开始下标
   * @param endIndex 高亮文本节点结束下标
   */
  private highlightTextRange(textNode: Node, startIndex: number, endIndex: number): void {
    try {
      const range = this.createRange(textNode, startIndex, endIndex);
      const rects = this.getHighlightRects(range, textNode);
      const highlightElement = this.createHighlightElement(rects);
      this.elRef.nativeElement.appendChild(highlightElement);
    } catch (err) {
      console.error(`${textNode}, 溯源文本高亮失败，错误信息：${err}`);
    }
  }

  /**
   * 创建文本范围
   */
  private createRange(textNode: Node, startIndex: number, endIndex: number): Range {
    const range = document.createRange();
    range.setStart(textNode, startIndex);
    range.setEnd(textNode, endIndex);
    return range;
  }

  /**
   * 获取高亮区域的位置信息
   */
  private getHighlightRects(range: Range, textNode: Node): {
    clientRect: DOMRect;
    elementClientRect: DOMRect;
    wrapperClientRect: DOMRect;
  } {
    const clientRect = range.getBoundingClientRect();
    const elementClientRect = textNode.parentElement?.getBoundingClientRect() || clientRect;
    const wrapperClientRect = this.elRef.nativeElement.getBoundingClientRect();
    return { clientRect, elementClientRect, wrapperClientRect };
  }

  /**
   * 创建高亮元素
   */
  private createHighlightElement(rects: {
    clientRect: DOMRect;
    elementClientRect: DOMRect;
    wrapperClientRect: DOMRect;
  }): HTMLElement {
    // 使用 DocumentFragment 减少 DOM 操作
    const fragment = document.createDocumentFragment();
    const highLightElement = this.render.createElement('div');
    fragment.appendChild(highLightElement);

    // 使用 requestAnimationFrame 优化样式计算和渲染
    requestAnimationFrame(() => {
      const { clientRect, elementClientRect, wrapperClientRect } = rects;
      const highLightStyle = highLightElement.style;

      // 设置高亮元素ID和样式
      highLightElement.id = this.generateHighlightId();
      this.hightTraceIdSet.add(highLightElement.id);
      highLightElement.className = 'highlight-mask';

      // 计算位置和尺寸
      const { left, top, width, height } = clientRect;
      const { width: parentWidth, left: parentLeft, right: parentRight } = elementClientRect;
      const { left: wrapperLeft, top: wrapperTop } = wrapperClientRect;

      // 处理溢出情况
      const isOverflow = left > parentRight;
      const highLightLeft = isOverflow ? parentLeft - wrapperLeft : left - wrapperLeft;
      const highLightWidth = isOverflow ? parentWidth : width;
      const highLightTop = top - wrapperTop;

      // 批量设置样式
      Object.assign(highLightStyle, {
        position: 'absolute',
        left: `${highLightLeft}px`,
        top: `${highLightTop}px`,
        width: `${highLightWidth}px`,
        height: `${height}px`,
        maxWidth: `${parentWidth - (highLightLeft - (parentLeft - wrapperLeft))}px`,
        pointerEvents: 'none',
        lineHeight: `${height}px`,
        ...this.HIGHLIGHT_STYLES.normal
      });

      // 将元素添加到 DOM
      this.elRef.nativeElement.appendChild(fragment);
    });

    return highLightElement;
  }

  /**
   * 生成唯一的高亮ID
   */
  private generateHighlightId(): string {
    // 使用更高效的 ID 生成方式
    return `hl-${performance.now().toString(36)}`;
  }

  /**
   * 高亮并定位至当前指向的溯源点
   * @param curActiveElement 当前定位的溯源点遮罩层元素
   */
  private activeAndScrollToCurPoint(curActiveElement?: HTMLElement): void {
    if (!curActiveElement) return;

    // 使用 requestAnimationFrame 优化滚动和高亮
    requestAnimationFrame(() => {
      // 重置其它溯源点样式状态
      const highlightElements: HTMLElement[] = Array.from(document.querySelectorAll('.highlight-mask'));
      highlightElements.forEach(element => {
        Object.assign(element.style, this.HIGHLIGHT_STYLES.normal);
      });

      // 滚动并高亮当前溯源点
      curActiveElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      Object.assign(curActiveElement.style, this.HIGHLIGHT_STYLES.active);
    });
  }

  /**
   * 清除所有高亮元素
   */
  private clearAllHighlights(): void {
    // 使用 requestAnimationFrame 优化清除操作
    requestAnimationFrame(() => {
      const wrapperElement = this.elRef.nativeElement;
      const highlightElements = wrapperElement.querySelectorAll('.highlight-mask');
      
      // 使用 DocumentFragment 批量移除元素
      const fragment = document.createDocumentFragment();
      highlightElements.forEach((element: Element) => {
        fragment.appendChild(element);
      });
      
      // 清空 Set
      this.hightTraceIdSet.clear();
    });
  }
}

