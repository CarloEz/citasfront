import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';


@Pipe({
    name: 'fechaActual'
})
export class FechaActualPipe implements PipeTransform {
    transform(fecha: string): any {
        let fechahoy= new Date();
        
        let hoy= new DatePipe('en-US').transform(fechahoy,'yyyy-MM-dd');

        if(fecha === hoy){
            return 'text-light bg-success';
        }
    }
}