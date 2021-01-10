import { formatCurrency } from '@angular/common';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { passenger } from '../models/passenger.model';
import { userService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcomponent',
  templateUrl: './addcomponent.component.html',
  styleUrls: ['./addcomponent.component.css']
})
export class AddcomponentComponent implements OnInit {
  passenger:passenger;
  result:any;
  msg:any;
  passengers:any;
  number:any;
  index:any;
  constructor(private userService:userService) { 
    this.passenger=new passenger();
  }

  ngOnInit(): void {
    this.userService.getpassengersusingapi(sessionStorage.getItem("username")).subscribe(data=>{this.passengers=data,console.log(this.passengers)})
  }
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  Add(passenger) {
  passenger.username=sessionStorage.getItem("username");
  this.userService.addpassengerusingapi(sessionStorage.getItem("username"),passenger).subscribe(data=>{this.result=data
      alert("passenger added successfully");
      this.passengers.push(passenger)},
      err=>alert(err.error.Message));
 this.reload();
 document.getElementById("myForm").style.display = "none";
  }
  close(){
    document.getElementById("myForm").style.display = "none";
  }

  exit(){
    this.msg=null;
    document.getElementById("err").style.display = "none";
  }
  remove(passenger_id:number){
    var confirmation=confirm("click ok to delete");
    if(confirmation){
      this.userService.deletepassengerusingapi(passenger_id).subscribe(data=>{this.result=data
      alert("passenger removed successfully");
     this.index = this.result.indexOf(passenger_id);
     if (this.index !== -1) {
      this.result.splice(this.index, 1);      
      }
      // this.result = this.result.filter(item => item !== passenger_id);
  });
    }
    this.reload();
    // console.log("after deletion");
    // this.userService.getpassengersusingapi(sessionStorage.getItem("username")).subscribe(data=>{this.passengers=data,console.log(this.passengers)});
  }
  reload(){
    console.log("inside reload");
    this.userService.getpassengersusingapi(sessionStorage.getItem("username")).subscribe(data=>{this.passengers=data});
  }
}
