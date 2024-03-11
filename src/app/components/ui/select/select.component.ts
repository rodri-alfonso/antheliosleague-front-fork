import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() options: any[] = [];
  @Input() initialOption: any = '';

  selectedOption: any = '';

  @Output() onChangeOption = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.selectedOption = this.initialOption;
  }

  onChange(event: any) {
    this.selectedOption = event.value;

    this.onChangeOption.emit(event.value);
  }
}
