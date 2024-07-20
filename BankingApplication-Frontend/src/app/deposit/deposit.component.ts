import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  id: number = 0;
  account: Account = new Account();
  depositAmount: number = 0;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
    });
  }

  onSubmit() {
    if (this.isValidAmount(this.depositAmount)) {
      this.accountService.deposit(this.id, this.depositAmount).subscribe(data => {
        this.account.balance += this.depositAmount; 
        this.successMessage = "Deposited Successfully....!";
        this.errorMessage = "";

        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 1000);
      });
    } else {
      this.errorMessage = "Invalid amount ... please Enter Valid Amount..";
      this.successMessage = "";

      setTimeout(() => {
        this.errorMessage = "";
      }, 1000);
    }
  }

  isValidAmount(amount: number): boolean {
    return amount > 0 && amount < 10000000;
  }
}
