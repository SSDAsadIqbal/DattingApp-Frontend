import { NgIf } from '@angular/common';
import { Component, input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  standalone:true,
  imports:[BsDatepickerModule,NgIf,ReactiveFormsModule]
})
export class DatePickerComponent implements ControlValueAccessor {
  label = input<string>('')
  maxDate = input<Date>();
  bsConfig?:Partial<BsDatepickerConfig>

  constructor(@Self() public ngcontrol:NgControl) {
    this.ngcontrol.valueAccessor = this;
    this.bsConfig ={
      containerClass :'theme-red',
      dateInputFormat:'DD MMMM YYYY',
    }
  }

  writeValue(obj: any): void { 
  }
  registerOnChange(fn: any): void { 
  }
  registerOnTouched(fn: any): void { 
  } 

  get control():FormControl{
    return this.ngcontrol.control as FormControl;
  }

}
