import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-quick-navigation',
  inputs: ['targetId'],
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css'],
})
export class QuickNavigationComponent implements OnInit {
  @Input()
  targetId: string;
  targetElement: HTMLElement;
  indicatorElement: HTMLElement;

  constructor(
      private element: ElementRef
  ) { }

  ngOnInit(): void {
      this.targetElement = document.getElementById(this.targetId);
      this.indicatorElement = this.element.nativeElement.querySelector('.scroll-indicator');
      document.addEventListener("scroll", () => {
        // TODO event listener is not finished.
        window.scrollY
      });
  }

  onTouchMove($event) {
    // set time out
    let srcElement = this.element.nativeElement.firstChild;
    let totalHeight = srcElement.clientHeight;
    let touchHeight = $event.touches[0].clientY - srcElement.offsetTop;
    let percentage = touchHeight / totalHeight;
    
    let contentHeight = this.targetElement.clientHeight; // 151 * 40
    let screenHeight = screen.height; // 700?
    
    let scrollToHeight = (contentHeight - screenHeight) * percentage;
    window.scrollTo(0, scrollToHeight);
    console.log(this.element);
    console.log(touchHeight, totalHeight, percentage, contentHeight);

    let indicatorHeight = screenHeight / contentHeight * totalHeight;
    let indicatorMarginTop = (totalHeight - indicatorHeight) * percentage;
    this.indicatorElement.style.height = indicatorHeight + "px";
    this.indicatorElement.style.marginTop = indicatorMarginTop + "px";
  }

  onTouchStart($event) {
    $event.preventDefault();
    this.onTouchMove($event);
  }
}
