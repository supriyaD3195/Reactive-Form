import { ViewComponent } from './../view/view.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { timer } from 'rxjs';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  otpResend = 0;
  otp:'';
  count=0;
  OtpSend: boolean = false;
  form: FormGroup;
  data: Observable<any>;
  time: any;
  url: 'http://lab.thinkoverit.com/api/getOTP.php';
  request = {
    panNumber: '',
    city: '',
    fullname: '',
    email: '',
    mobile: '',
  };
  response: any;
  requestVerifyOTP = { mobile: '', otp: '' };
  responseVerifyOTP: any;
  constructor(
    private Http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      panNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'),
        ])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(140),
          Validators.pattern('[a-zA-Z ]+'),
        ])
      ),
      Email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          Validators.maxLength(255),
        ])
      ),

      mobile: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('[0-9 -()+]+$'),
        ])
      ),
    });
  }
  onSubmit() {}
  SendOTP(form) {
    // debugger;
    if (form.valid) {
      this.Http.post('http://lab.thinkoverit.com/api/getOTP.php', this.request)
      .subscribe((data) => {
        this.response = data;
        console.log(this.response);
        this.OtpSend = true;

        this.otpResend = 0;
        let num = '1234567890';
this.otp='';
        for (let i = 0; i < 4; i++) {
          this.otp += num[Math.floor(Math.random() * 10)];
        }
        console.log(this.otp);


        setTimeout(() => {
          this.otpResend = 1;
        }, 180000);
      });
    } else {
      alert('All Fields Are Required');
    }
  }

  verifyOTP() {
    // debugger;
    if (this.requestVerifyOTP.otp == this.otp) {
      this.requestVerifyOTP.mobile = this.request.mobile;
      this.Http.post(
        ' http://lab.thinkoverit.com/api/verifyOTP.php',
        this.requestVerifyOTP
      ).subscribe((data) => {
        this.responseVerifyOTP = data;
        console.log(this.responseVerifyOTP);

        let datasend: any[] = this.form.value;
        this.router.navigate(['/view.component'], {
          queryParams: {
            datasend: JSON.stringify(datasend),
          },
        });
      });
    } else {
alert("please check OTP")
     }
  }

  ReSendOTP(form){
    // debugger
this.count++;
console.log(this.count);
if(this.count<=3)
{
  this.SendOTP(form);
}
else{
  alert("Please try Again After One Hour")
}

  }
}
