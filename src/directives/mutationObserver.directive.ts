/**
 * Mutation Observer Directive
 * 
 * This directive monitors DOM changes on an element using the Mutation Observer API.
 * It can detect changes to attributes and child elements.
 * 
 * readMore https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 * 
 * Usage:
 * ```html
 * <div appMutationObserver (mutationChange)="onMutationChange($event)">
 *   Content to be observed
 * </div>
 * ```
 * 
 * @example
 * ```typescript
 * // In component
 * onMutationChange(mutation: MutationRecord) {
 *   // Handle DOM changes
 *   console.log('DOM changed:', mutation);
 * }
 * ```
 */
import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
    selector: '[appMutationObserver]'
})
export class MutationObserverDirective implements AfterViewInit, OnDestroy {
    @Output() public mutationChange = new EventEmitter<MutationRecord>();
    private mutationObserver: MutationObserver;
    private readonly config: MutationObserverInit = {
        attributes: true,
        childList: true,
        subtree: false
    };

    constructor(private elementRef: ElementRef) {
        const callback = (mutationList: MutationRecord[]) => {
            for (const mutation of mutationList) {
                if (mutation.type === "attributes" || mutation.type === "childList") {
                    this.mutationChange.emit(mutation);
                }
            }
        };

        this.mutationObserver = new MutationObserver(callback);
    }

    /**
     * Start observing the element after view initialization
     */
    public ngAfterViewInit(): void {
        this.mutationObserver.observe(this.elementRef.nativeElement, this.config);
    }

    /**
     * Clean up by disconnecting the observer when directive is destroyed
     */
    public ngOnDestroy(): void {
        this.mutationObserver.disconnect();
    }
}
