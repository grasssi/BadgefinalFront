import { Component, OnInit } from '@angular/core';
import { read, utils, writeFile } from 'xlsx';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { EfccmService, TableData, } from '../../../app/core/services/efccm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  efccmForm = new FormGroup({
    efccm: new FormControl(''),
    table: new FormControl('')
  })


  tables: any[] = [];
  // res: any
  // public res: TableData = [];
  res:any[]=[]
  constructor(
    private efccmservice: EfccmService,
  ) { }



  handleImport($event: any) {

    const files = $event.target.files;
    if (files.length) {

      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.tables = rows;
          // console.log('table type', this.tables[1].table);

          this.res = []
          for (let i = 0; i < this.tables.length; i++) {
            this.efccmForm.value.efccm = this.tables[i].table;
            // console.log('table type', this.efccmForm.value);
            this.efccmservice.found(this.efccmForm.value).subscribe((response: any) => {
              // console.log(response);
              
              // console.log('reponse',response);
              if (response == 'not found' || response.length == 0) {
                // this.tables[i].Badge = 'not found';
                // this.tables[i].Emetteur = 'not found';
                // this.res.push('not found')

              } else {
                for (let index = 0; index < response.length; index++) {

                  this.res.push(response[index])
                  // this.data = [...response[index]];
                  // console.log('reponse', this.res.length);
                  // console.log('reponse', this.res);

                  //   this.newArr[index].Emetteur =this.res[index]["0"].emt;
                  //   this.newArr[index].Badge = this.res[index]["0"].modele;

                  //   // console.log('es1',this.res[index]["0"].modele);
                  //   this.tables[i].Emetteur =this.res[index]["0"].emt;
                  //   this.tables[i].Badge = this.res[index]["0"].modele;

                  //   console.log('es2',Object.getOwnPropertyNames(this.tables));
                  // this.tables[i+index].Emetteur = response[index]["0"].emt;
                  // this.tables[i+index].Badge = response[index]["0"].modele;
                  // console.log(this.res[index]["0"].emt)
                  // console.log(response[index])

                  // console.log(response[index]["0"].emt)

                  
                }

                // console.log('tables', this.tables);
                
                // console.log('reponse',  Object.values(this.res));
                // console.log('reponse',  this.res[0].emt);
                // for (const [key, value] of Object.entries(this.res)) {
                  //   console.log(`${key}: ${value}`);
                  // }
                  
                  // console.log('reponse',response);
                }
                
              },
              (error) => {
                console.log(error);
              }
              );
              
            }
            
          }
          console.log('res',this.res);
          // console.log('tables', this.tables);
      }
      reader.readAsArrayBuffer(file);
    }

  }

  handleExport() {
    const headings = [[
      'table',
      'Badges',
      'Emetteur',
      // 'Director',
      // 'Rating'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.tables, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Badges Report.xlsx');
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  ngOnInit(): void {
  }
}


