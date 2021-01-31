import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportExcel( tableId : string, fileName: string ) : void {
    let element = document.getElementById( tableId );
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet( element );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( wb, ws, 'Sheet1');
    XLSX.writeFile( wb, fileName+'.csv' );
  }

  exportPDF( divId: string ) : void {
    let data = document.getElementById(divId);
    const temp = data.style.padding;
    data.style.padding = "100px";
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      // let pdf = new jspdf.jsPDF('l', 'px', 'a4'); //Generates PDF in landscape mode
      let pdf = new jspdf.jsPDF('p', 'px', 'a4'); // Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, data.clientWidth/3, data.clientHeight/3);  
      pdf.save('Filename.pdf');   
      data.style.padding = temp;
    }); 
  }
}
