import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEventBlocker]'
})
export class EventBlockerDirective {

  /**
   * 
   * HostListner decorator is used to listen events of host it is applied on
   */

  @HostListener('drop',['$event'])
  @HostListener('dragover',['$event'])
  public preventDefaultEvent(event:Event) {
    event.preventDefault();
  }

}
