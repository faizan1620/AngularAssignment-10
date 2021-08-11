import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  signupform!: FormGroup;

  roles=['Admin','SuperAdmin','Subscriber'];

  keys=['Admin','SuperAdmin','Subscriber'];
  id:any;
  private myData:any;
  middle_name:any;

  constructor(private _Activatedroute:ActivatedRoute,private mainService:MainService,private router:Router) { }

   ngOnInit() {

 this.id=this._Activatedroute.snapshot.paramMap.get("id");

  this.mainService.getUserById(this.id).subscribe((res:any) => {
    
  this.myData = res;
  
  this.signupform=new FormGroup(
    {
      
      'fname':new FormControl(this.myData[0]['first_name'],[Validators.required]),
      'mname':new FormControl(this.myData[0]['middle_name'],[Validators.required]),
      'lname':new FormControl(this.myData[0]['last_name'],[Validators.required]),
      'email':new FormControl(this.myData[0]['email'],[Validators.required,Validators.email]),
      'phonenumber':new FormControl(this.myData[0]['phone_number'],[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'role':new FormControl(this.myData[0]['role'],[Validators.required]),
      'address':new FormControl(this.myData[0]['address'],[Validators.required]),
      'cname':new FormControl(this.myData[0]['cname'],[Validators.required]),
      'website':new FormControl(this.myData[0]['website'],[Validators.required]),
      'caddress':new FormControl(this.myData[0]['caddress'],[Validators.required]),
      'rname':new FormControl(this.myData[0]['rname'],[Validators.required]),
      'key':new FormControl(this.myData[0]['key'],[Validators.required]),
      'description':new FormControl(this.myData[0]['description'],[Validators.required])
     
    }
    
    ); 
  });
 }

 

  onSubmit(user:any){
    console.log(user);
  
     this.mainService.updateUser(user,this.id).subscribe((res:any) => {
      alert(`Data with id ${this.id} updated successfully !!`);
      this.router.navigate(['/crudtable']);
     },
     (err:any)=>{
       alert("Something went wrong.Cannot update data !!");
     });
     
         
  }
  

  cancel(){
    this.ngOnInit();
     
  }

}
