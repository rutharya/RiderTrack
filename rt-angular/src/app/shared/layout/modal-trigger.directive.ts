import {Directive, Inject, OnInit, ElementRef, Input} from '@angular/core';
import {JQ_TOKEN} from "../services";


@Directive({
  selector: '[appModalTrigger]'
})
export class ModalTriggerDirective implements OnInit {
  @Input('appModalTrigger') modalId: string;
  private  el: HTMLElement;
  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;

  }

  ngOnInit() {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }

}
