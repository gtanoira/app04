import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Services
import { AuxiliarTablesService } from './shared/auxiliar-tables.service';
import { PaisesService } from './shared/paises.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Título del componente
  title = 'Accediendo a API\'s';

  // Definir variables
  monedasOpciones = [];
  paisesOpciones = [];
  datos: FormGroup;

  constructor(
    private auxiliarTablesService: AuxiliarTablesService,
    private fb: FormBuilder,
    private paisesService: PaisesService
  ) {
    // Definir los datos del FORM utilizando FormBuilder
    this.datos = this.fb.group({
      moneda: ['ARS', Validators.required],
      pais: ['AR', Validators.required]
    })
  }

  ngOnInit() {

    // Leer las opciones de monedas
    this.auxiliarTablesService.getOptionsFromJsonFile('currencies.json').subscribe(
      data => {
        this.monedasOpciones = data;
        console.log('*** MONEDAS:', this.monedasOpciones);
      },
      err => {
        console.log('Error al abrir el archivo currencies.json');
        this.monedasOpciones = [];
      }
    )

    // Leer las opciones de paises
    this.paisesService.getAllPaises().subscribe(
      data => {
        this.paisesOpciones = data;
        console.log('*** PAISES:', this.paisesOpciones);
      },
      err => {
        console.log('Error al abrir el archivo currencies.json');
        this.monedasOpciones = [];
      }
    )
  }

  // GETTERS
  get moneda() { return this.datos.get('moneda'); }
  get pais()   { return this.datos.get('pais'); }

}
