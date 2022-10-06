import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input() employeeCode = '';
  employee:any;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.employeeCode = changes['employeeCode'].currentValue;

    this.auth.getEmployeeData(this.employeeCode).then((res) => {
      this.employee = res[0];
      console.log(this.employee);
    });
  }  
}
