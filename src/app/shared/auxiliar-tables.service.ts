import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// Models
import { SelectOption } from '../models/select_options.model';

// Services

@Injectable()
export class AuxiliarTablesService {

  constructor(
    private http: HttpClient
  ) { }

  // Leer un archivo y devolverlo a quien lo pidió
  public getTableFromJson(tableName: string): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`/assets/files/${tableName}`);
  }

  // Establecer las Opciones (SELECT) de un campo de un form a través de un archivo Json
  public getOptionsFromJsonFile(fileName: string){
    return this.getTableFromJson(fileName);
  }

}
