import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  id:number=0;
  account:Account=new Account();

  constructor(private accountService:AccountService,private rout:ActivatedRoute,private router:Router){}

     ngOnInit(){

      this.id=this.rout.snapshot.params['id'];
      this.accountService.getAccountById(this.id).subscribe(data=>{

        this.account=data;
    
      })
     }
     
      successMessage="";
      errorMessage="";

  onSubmit(){

    if(this.isValidAmount(this.account.balance)){
    this.accountService.deposit(this.id,this.account.balance).subscribe(data=>{

      this.account=data;
      this.successMessage="Deposited Successfully....!"

      setTimeout(() => {
        this.router.navigate(['/accounts'])
      }, 1000);


    })

  }else{

    this.errorMessage="Invalid amount ... please Enter Valid Amount.."

    setTimeout(() =>{
      this.errorMessage=""
      
    },1000);
  }
}

  isValidAmount(amount:number):boolean{

    return amount>0 && amount<10000000
  }
}
