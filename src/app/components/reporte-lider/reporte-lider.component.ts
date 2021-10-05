import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { TutorService } from 'src/app/services/tutor.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reporte-lider',
  templateUrl: './reporte-lider.component.html',
  styleUrls: ['./reporte-lider.component.css']
})
export class ReporteLiderComponent implements OnInit {

  frmReporte: FormGroup;
  listaCurso: any;
  listaTutor: any;
  myChart: any;
  datos: any;
  ctx: any;

  constructor(private tutorservice: TutorService, private cursoservice: CursoService, private archivoservice:ArchivoService) {
    this.frmReporte = new FormGroup({
      'mes': new FormControl('2021-10'),
      'semana': new FormControl('2021-W40'),
      'dia': new FormControl(21),
      'reporte': new FormControl('semana'),
      'idtutor': new FormControl('1')
    })

    this.tutorservice.obtenerTutores().subscribe((res: any) => {
      this.listaTutor = res;
    })
  }

  ngOnInit(): void {
    this.ctx = document.getElementById('myChart');
    this.cargarReporte();
  }


  exportAsXLSX(): void {
    this.archivoservice.exportAsExcelFile(this.listaCurso,'ReporteLider');
  }

  exportPDF(): void {
    this.archivoservice.exportPDF('ReporteLider');
  }

  cargarReporte(): void {
    if (this.frmReporte.value.reporte == 'mes') {
      this.reporteMes();
    }

    if (this.frmReporte.value.reporte == 'semana') {
      this.reporteSemana();
    }

    if (this.frmReporte.value.reporte == 'dia') {
      this.reporteDia();
    }
  }

  reporteMes(): void {
    this.cursoservice.reporteMes(this.frmReporte.value)
      .subscribe((res: any) => {
        this.listaCurso = res.resultado;
        this.datos = res.datos;
        this.cargarChart('mes');
      })
  }

  reporteSemana(): void {
    this.cursoservice.reporteSemana(this.frmReporte.value)
      .subscribe((res: any) => {

        res.datos.forEach( (element:any )=> {
          element.semana = element.semana+"";
        });

        console.log(res);
        this.listaCurso = res.resultado;
        this.datos = res.datos;
        this.cargarChart('semana');
      });

  }

  reporteDia(): void {
    this.cursoservice.reporteDia(this.frmReporte.value)
      .subscribe((res: any) => {
        this.listaCurso = res.resultado;
        this.datos = res.datos;
        this.cargarChart('fecha');
      });
  }

  cargarChart(reporte: string): void {
    const data = {
      label: 'Asistencia',
      data: this.datos,
      backgroundColor: '#686de0',
      borderColor: '#130f40',
      borderWidth: 1
    }

    if (this.myChart) {
      this.myChart.data = {
        datasets: [data]
      }
      this.myChart.options = {
        parsing: {
          xAxisKey: reporte,
          yAxisKey: 'asistencia'
        }
      }
      console.log(this.myChart);
      this.myChart.update();
      return;
    }

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: [data]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        parsing: {
          xAxisKey: reporte,
          yAxisKey: 'asistencia'
        }
      }
    });
  }
}
