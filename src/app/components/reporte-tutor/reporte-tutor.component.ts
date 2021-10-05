import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reporte-tutor',
  templateUrl: './reporte-tutor.component.html',
  styleUrls: ['./reporte-tutor.component.css']
})

export class ReporteTutorComponent implements OnInit {

  listaCurso: any=[];
  datos: any;
  ctx: any;
  year: any;
  frmReporte: FormGroup;
  myChart: any;

  constructor(private cursoservice: CursoService, private archivoservice: ArchivoService) {
    this.frmReporte = new FormGroup({
      'año': new FormControl(2021, [Validators.minLength(4), Validators.min(2000), Validators.max(2100)])
    })
  }

  ngOnInit(): void {
    this.ctx = document.getElementById('myChart');
    this.cargarReporte();
  }

  cargarReporte(): void {

    if (this.frmReporte.value.año > 2100 || this.frmReporte.value.año == null || this.frmReporte.value.año < 2000) {
      this.frmReporte.patchValue({ año: 2021 });
      return;
    }

    this.year = this.frmReporte.value.año;

    this.cursoservice.obtenerReporte(this.frmReporte.value).subscribe((res: any) => {
      console.log(res);
      this.listaCurso = res.resultado;
      this.datos = res.datos;
      this.cargarChart();
    })
  }

  cargarChart(): void {
    const data = {
        label: 'Asistencia',
        data: this.datos,
        backgroundColor: '#686de0',
        borderColor: '#130f40',
        borderWidth: 1
    }

    if (this.myChart) {
      this.myChart.data =  {
        datasets:[data]
      }
      this.myChart.update();
      return;
    }

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets:[data]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        parsing: {
          xAxisKey: 'mes',
          yAxisKey: 'asistencia'
        }
      }
    });
  }

  exportAsXLSX(): void {
    this.archivoservice.exportAsExcelFile(this.listaCurso, 'ReporteTutor');
  }


  exportPDF(): void {
    this.archivoservice.exportPDF('reporteTutor');
  }
}
