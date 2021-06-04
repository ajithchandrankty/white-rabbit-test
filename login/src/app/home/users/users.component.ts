import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/validate.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersData: any = []
  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {
    this.validateService.getUsersData().subscribe((data: any)=>{
      this.usersData = data.results
    })
    this.validateService.emitSearchDetails.subscribe((searchValue: string)=>{
      if(searchValue){
        this.usersData = this.usersData.filter((data: any)=>{
          return data.user.name.first === searchValue
        })
        this.usersData = this.usersData.slice()
      } else{
        this.validateService.getUsersData().subscribe((data: any)=>{
          this.usersData = data.results
        })
      }
      
    })
  }

}
