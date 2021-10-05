import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor() { }

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  elemento:any;
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName+ new Date().getTime() + this.EXCEL_EXTENSION);
  }

  public exportPDF(fileName:string): void {
    let CHART = document.getElementById('grafica') as HTMLElement;
    let TABLA= document.getElementById('tablaTutor') as HTMLTableElement;
    
    let PDF = new jsPDF('p', 'mm', 'a4');

    html2canvas(CHART).then(canvas => {
      let fileWidth = 150;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      
      let position = 0;
      PDF.addImage(FILEURI, 'png', 25, position, fileWidth, fileHeight);

      autoTable(PDF,{html:TABLA,startY:fileHeight});

      PDF.save(`${fileName}.pdf`);
    });
  }

}
