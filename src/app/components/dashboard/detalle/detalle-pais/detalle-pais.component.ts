import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-detalle-pais',
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.css']
})
export class DetallePaisComponent implements OnInit {

  @Input() employeeCode = '';
  countryName:any;
  data:any;
  
  constructor(private service: CountriesService,
              public auth: AuthService) { }

  ngOnInit(): void {
  }  

  ngOnChanges(changes: SimpleChanges) {
    this.employeeCode = changes['employeeCode'].currentValue;

    this.auth.getEmployeeCountry(this.employeeCode).then((res) => {
      this.countryName = res;
    })
    .then(() => {
      this.service.getCountryByName(this.countryName).subscribe((countries) => {
        this.data = countries[0];
        console.log(this.data);
      });
    });
  }
}
