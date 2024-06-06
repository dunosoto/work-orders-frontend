import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-route-section',
  templateUrl: './route-section.component.html',
  styleUrls: ['./route-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteSectionComponent {

  @Input() routes!: string[];
  @Input() showBackButton: boolean = false;
  @Input() showCloseButton: boolean = false;
  @Output() backButtonEmitter: EventEmitter<boolean> = new EventEmitter(true);
  @Output() closeButtonEmitter: EventEmitter<boolean> = new EventEmitter(true);

  constructor() { }

}
