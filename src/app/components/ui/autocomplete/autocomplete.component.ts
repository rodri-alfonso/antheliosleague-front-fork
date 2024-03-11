import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonsComponent } from '../buttons/buttons.component';
import { SignUpService } from 'app/auth/register/signup.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { sanatize } from 'utils';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Option {
  name: string;
  code: string;
}

@Component({
  standalone: true,
  selector: 'app-autocomplete',
  imports: [AutoCompleteModule, DialogModule, ButtonsComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder: string | undefined;
  @Input() icon: string | undefined = '';
  @Input() firstBold: boolean | undefined = false;

  @Input() options: any[] = [];

  selectedOption: Option | any = {
    name: '',
    code: '',
  };
  filteredOptions: Option[] = [];
  value = '';

  visible: boolean = false;
  @ViewChild('centerModal') template: ElementRef | undefined;
  loading: boolean = false;

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private signUpService: SignUpService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  filterOption(event: AutoCompleteCompleteEvent) {
    let filtered: Option[] = [];
    let query = event.query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const options = this.options as Option[];

    if (this.placeholder === 'Centro *' && query.length > 0) {
      filtered.push({ name: 'Agregar centro', code: 'AN-ADIT' });
    }

    let searchWords = query.split(' ').filter(Boolean); // Divide la consulta en palabras individuales

    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionNameNormalized = option.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      // Verifica si todas las palabras de búsqueda están presentes en alguna parte del nombre de la opción
      if (searchWords.every((word) => optionNameNormalized.includes(word))) {
        filtered.push(option);
      }
    }

    this.filteredOptions = filtered;
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.loading = false;
    this.selectedOption = {
      name: '',
      code: '',
    };
    this.value = '';
    this.elementRef.nativeElement.querySelector('input').value = '';
  }

  acceptDialog() {
    this.loading = true;

    const isAvailableCenter =
      this.options.filter(
        (center) => sanatize(center.name) === sanatize(this.value)
      ).length === 0;

    if (isAvailableCenter) {
      this.signUpService
        .validateFormData({ data: '' })
        .subscribe((response) => {
          const formData = {
            step: 0,
            data: {
              center: {
                name: this.value,
              },
            },
          };
          this.formEvent.emit(formData);
          this.visible = false;
          this.loading = false;
        });
    } else {
      this.hideDialog();
      this.messageService.add({
        severity: 'error',
        summary: 'Error en agregar el centro',
        detail: 'El centro que intentas agregar, ya existe. ',
      });
    }
  }

  onSelect(event: any) {
    if (event.value.code === 'AN-ADIT') {
      this.showDialog();

      this.selectedOption = event.value;
      this.elementRef.nativeElement.querySelector('input').value = this.value;
      return;
    }

    const selectedCenter = this.options.find(
      (center) => sanatize(center.name) === sanatize(event.value.name)
    );

    this.signUpService.validateFormData({ data: '' }).subscribe((response) => {
      const formData = {
        step: 1,
        data: {
          center: {
            id: selectedCenter.id,
            name: selectedCenter.name,
          },
        },
      };
      this.formEvent.emit(formData);
      this.visible = false;
    });
  }

  handleCompleteMethod(event: any) {
    this.value = event.query;
  }
}
