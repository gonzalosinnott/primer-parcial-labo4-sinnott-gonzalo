import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayStylePreparar = "none";
  displayStyleModificar = "none";
  displayStyleBorrar = "none";


  constructor() { }

  ngOnInit(): void {
  }

  openPopupPreparar() {
    this.displayStylePreparar = "block";
  }
  closePopupPreparar() {
    this.displayStylePreparar = "none";
  }

  openPopupModificar() {
    this.displayStyleModificar = "block";
  }
  closePopupModificar() {
    this.displayStyleModificar = "none";
  }

  openPopupBorrar() {
    this.displayStyleBorrar = "block";
  }
  closePopupBorrar() {
    this.displayStyleBorrar = "none";
  }

}
