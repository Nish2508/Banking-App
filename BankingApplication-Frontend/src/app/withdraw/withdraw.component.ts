import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  id: number = 0;
  account: Account = new Account();
  withdrawAmount: number = 0;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
    });
  }

  onSubmit() {
    if (this.isValidAmount(this.withdrawAmount)) {
      this.accountService.Withdraw(this.id, this.withdrawAmount).subscribe((data: Account) => {
        this.account.balance -= this.withdrawAmount; // Update the balance locally
        this.successMessage = "Withdraw Successfully...!";
        this.errorMessage = "";

        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 1000);
      });
    } else if (this.withdrawAmount > 1000000) {
      this.errorMessage = "Amount must be less than 10 Lakhs.";
      this.successMessage = "";
    } else {
      this.errorMessage = "Invalid Amount, Please Enter Valid Amount";
      this.successMessage = "";
      setTimeout(() => {
        this.errorMessage = "";
      }, 1000);
    }
  }

  isValidAmount(amount: number): boolean {
    return amount > 0 && amount < 1000000;
  }
}
