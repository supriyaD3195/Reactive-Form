import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  dataReceive: any;
  fullname: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('hiiii');
    this.route.queryParams.subscribe((params) => {
      console.log(params);
       this.dataReceive = JSON.parse(params.datasend);
    });
  }
}
