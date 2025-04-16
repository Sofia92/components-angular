/**
 * Intersection Observer Directive
 * 
 * This directive monitors when an element enters or exits the viewport.
 * It uses the Intersection Observer API to efficiently detect element visibility.
 * readMore https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 * Usage:
 * ```html
 * <div appIntersectionObserver (visible)="onElementVisible()">
 *   Content to be observed
 * </div>
 * ```
 * 
 * @example
 * ```typescript
 * // In component
 * onElementVisible() {
 *   // Handle visibility change
 *   this.loadMoreData();
 * }
 * ```
 */
import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
    selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements AfterViewInit, OnDestroy {
    @Output() public visible = new EventEmitter<void>();
    private intersectionObserver: IntersectionObserver; // Intersection Observer instance

    constructor(private elementRef: ElementRef) {
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(({ intersectionRatio }) => {
                // Only emit when element is actually visible (intersectionRatio > 0)
                if (intersectionRatio > 0) {
                    this.visible.emit();
                }
            });
        };
        this.intersectionObserver = new IntersectionObserver(callback, { threshold: 0.1 });
    }

    /**
     * Start observing the element after view initialization
     */
    public ngAfterViewInit(): void {
        this.intersectionObserver.observe(this.elementRef.nativeElement);
    }

    /**
     * Clean up by disconnecting the observer when directive is destroyed
     */
    public ngOnDestroy(): void {
        this.intersectionObserver.disconnect();
    }
}