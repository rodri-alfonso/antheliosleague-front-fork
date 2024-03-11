import { AutoCompleteModule } from 'primeng/autocomplete';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { sanatize } from 'utils';
import { RoundService } from 'app/round/round.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Option {
  fullname: string;
  id: number;
  region: string;
  whatsapp: string;
  code: string;
}

@Component({
  standalone: true,
  selector: 'app-delegate-autocomplete',
  imports: [AutoCompleteModule],
  templateUrl: './delegate-autocomplete.component.html',
  styleUrl: './delegate-autocomplete.component.scss',
})
export class DelegateAutocompleteComponent implements OnInit {
  delegates: Option[] = [];

  selectedOption: Option | any = {
    name: '',
    code: '',
  };

  filteredOptions: Option[] = [];
  value = '';
  loading: boolean = false;

  @Output() formEvent: EventEmitter<Option> = new EventEmitter();

  constructor(private roundService: RoundService) {}

  ngOnInit(): void {
    this.roundService.getDelegateList().subscribe((response: any) => {
      this.filteredOptions = response;
      this.delegates = response;
      this.loading = false;
    });
  }

  filterOption(event: AutoCompleteCompleteEvent) {
    let filtered: Option[] = [];
    let query = event.query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const options = this.delegates as Option[];
    let searchWords = query.split(' ').filter(Boolean);
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionNameNormalized = option.fullname
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      if (searchWords.every((word) => optionNameNormalized.includes(word))) {
        filtered.push(option);
      }
    }
    this.filteredOptions = filtered;
  }

  onSelect(event: any) {
    const selectedDelegate: any = this.delegates.find(
      (delegate) =>
        sanatize(delegate.fullname) === sanatize(event.value.fullname)
    );
    this.formEvent.emit(selectedDelegate);
  }

  handleCompleteMethod(event: any) {
    this.value = event.query;
  }
}
