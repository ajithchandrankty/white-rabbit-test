import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private fb: FormBuilder, private validateService: ValidateService) { }
  public searchFormGroup: any;

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      search: ['', Validators.required]
    })
  }

  public searchUser(searchValue: any): void{
    this.validateService.searchDetails(searchValue.value.search)
  }

}
