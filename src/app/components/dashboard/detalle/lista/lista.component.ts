import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  employees:any;

  @Output() selectedEmployeeEvent = new EventEmitter<string>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.authService.getAllEmployees().then((res) => {
      this.employees = res;
    });
  }

  selectEmployee(e) {
    this.selectedEmployeeEvent.emit(e.target.value);
  }

}
