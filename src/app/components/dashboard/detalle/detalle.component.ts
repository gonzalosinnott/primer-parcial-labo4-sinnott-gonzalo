import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  employeeCode:any;

  constructor() { }

  ngOnInit(): void {
  }

  selectedEmployee(code: string) {  
     
    this.employeeCode = code;
  }  

}
