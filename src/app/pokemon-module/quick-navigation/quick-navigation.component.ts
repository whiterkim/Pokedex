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
  quickNavElement: HTMLElement;
  indicatorElement: HTMLElement;

  generationBoundary: number[] = [0,151,251,386,493,649,721,809];
  generationPercentage: number[] = [];

  constructor(
      private element: ElementRef
  ) { }

  ngOnInit(): void {
      this.targetElement = document.getElementById(this.targetId);
      this.quickNavElement = this.element.nativeElement.firstChild;
      this.indicatorElement = this.element.nativeElement.querySelector('.scroll-indicator');
      document.addEventListener("scroll", () => {
        this.updateIndicator();
      });

      for (let i = 1; i <= 7; i++) {
        this.generationPercentage.push((this.generationBoundary[i] - this.generationBoundary[i - 1]) / this.generationBoundary[7] * 100);
      }
  }

  updateIndicator() {
    let percentage = window.scrollY / (this.targetElement.clientHeight - screen.height);

    let indicatorHeight = screen.height / this.targetElement.clientHeight * this.quickNavElement.clientHeight;
    let indicatorMarginTop = (this.quickNavElement.clientHeight - indicatorHeight) * percentage;
    this.indicatorElement.style.height = indicatorHeight + "px";
    this.indicatorElement.style.marginTop = indicatorMarginTop + "px";
  }

  onTouchMove($event) {
    // set time out
    let touchHeight = $event.touches[0].clientY - this.quickNavElement.offsetTop;
    let percentage = touchHeight / this.quickNavElement.clientHeight;

    let scrollToHeight = (this.targetElement.clientHeight - screen.height) * percentage;
    window.scrollTo(0, scrollToHeight);

    this.updateIndicator();
  }

  onTouchStart($event) {
    $event.preventDefault();
    this.onTouchMove($event);
  }
}
