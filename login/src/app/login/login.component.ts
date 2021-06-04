import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showCreateForm = false;
  public userCreationForm: any;
  public validateUserForm: any;
  public usersList = [];
  public successMessage = false;
  public errorMessage = false;
  public savedUserList: any = [];

  constructor(private fb: FormBuilder, private validateService: ValidateService) { }
  
  ngOnInit(): void {
    this.userCreationForm = this.fb.group({
      gender: ['gender' , Validators.required],
      name: ['' , Validators.required],
      email: ['' , Validators.required],
      userName: ['' , Validators.required],
      password: ['' , Validators.required],
      dateOfBirth: ['' , Validators.required],
      phone: ['' , Validators.required]
    })
    this.validateUserForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
    localStorage.clear()
    this.validateService.emitSearchDetails.subscribe((searchValue: string)=>{
      const savedUserData: any = localStorage.getItem('user');
      const filteredUser: any = JSON.parse(savedUserData).filter((savedUser: any)=>{
        return savedUser.name === searchValue
      })
      this.savedUserList = filteredUser
    });
  }

  public toggleCreateUserForm(): void{
    this.showCreateForm = !this.showCreateForm
  }
  
  public cancelSubmit(): void{
    this.showCreateForm = false
  }

  public submitUser(formData: FormGroup):void{
    this.usersList = formData.value
    this.addUser(this.usersList)
  }

  public addUser(userData: any): void{
    if (localStorage) {
      var user;
      if (!localStorage['user']) user = [];
      else user = JSON.parse(localStorage['user']);            
      if (!(user instanceof Array)) user = [];
      user.push(userData);
      localStorage.setItem('user', JSON.stringify(user));
  } 
  this.userCreationForm.reset()
  }

  public validateUser(formData: FormGroup): void{
    this.successMessage = false;
    this.errorMessage = false;
    this.validateService.getNewUsersData().subscribe((data: any)=>{
      if(data.userName === formData.value.userName && data.passWord === formData.value.password){
        this.successMessage = true
      } else{
        this.errorMessage = true;
      }
    })
  }

  public selectUser(selectedData:any): void{
    this.validateUserForm.patchValue({
      userName: selectedData.userName,
      password: selectedData.password
    })
    this.savedUserList.length = 0;
    this.showCreateForm = false;
  }

}
