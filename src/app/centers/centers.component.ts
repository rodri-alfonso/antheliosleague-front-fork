import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { Router } from '@angular/router';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { AutocompleteComponent } from 'app/components/ui/autocomplete/autocomplete.component';
import { CentersService } from './centers.service';
import { Center } from 'types';
import { InputComponent } from '../components/ui/input/input.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-centers',
  standalone: true,
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.scss',
  imports: [
    AppLayoutComponent,
    ButtonsComponent,
    AutocompleteComponent,
    InputComponent,
    AccordionModule,
  ],
})
export class CentersComponent implements OnInit {
  constructor(private router: Router, private centersService: CentersService) {}

  originalCenters: Center[] = [];
  filteredCenters: Center[] = [];

  ngOnInit(): void {
    this.centersService.getCenters().then((centers) => {
      if (centers) {
        this.originalCenters = centers;
        this.filteredCenters = centers;
      }
    });
  }

  handleClick(index: number) {
    document.getElementById('center-' + index)?.classList.toggle('active');
  }

  onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.filteredCenters =
      this.filtrarObjetosPorNombre(newValue).length > 0
        ? this.filtrarObjetosPorNombre(newValue)
        : [
            {
              id: 0,
              name: 'No hay resultados del centro buscado',
              teams: [],
            },
          ];
  }

  filtrarObjetosPorNombre(filtro: string) {
    filtro = filtro.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const resultadosFiltrados = this.originalCenters.filter((objeto) => {
      const nombreNormalizado = objeto.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return nombreNormalizado.toLowerCase().includes(filtro.toLowerCase());
    });

    return resultadosFiltrados;
  }

  handleClickBack() {
    this.router.navigate(['/home']);
  }
}
