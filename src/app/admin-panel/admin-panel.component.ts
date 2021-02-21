import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"],
})
export class AdminPanelComponent implements OnInit {
  configUrl = "https://jsonplaceholder.typicode.com/todos/";
  customerId = "";
  productId = "";
  copyData = [];

  columns = [
    { field: "userId" },
    { field: "id" },
    { field: "title" },
    { field: "completed" },
  ];
  rows = [];
  constructor(private http: HttpClient) {
    this.http.get(this.configUrl).subscribe((data: any) => {
      this.rows = data;
      this.copyData = data;
    });
  }
  config: any;
  ngOnInit(): void {}
  fetchRecord() {
    if (this.customerId || this.productId) {
      if (this.customerId) {
        this.rows = this.copyData.filter((x) => x.userId == this.customerId);
      }
      if (this.productId) {
        this.rows = this.rows.filter((x) => x.id == this.productId);
      }
    } else {
      this.rows = this.copyData;
    }
  }

  fetchNextRecord() {
    if (this.customerId || this.productId) {
      if (this.customerId && this.productId) {
        var index = this.copyData.findIndex(
          (x) => x.userId == this.customerId && x.id == this.productId
        );
        this.rows = [this.copyData[index + 1]];
        return;
      }
      if (this.customerId) {
        var index = this.copyData.findIndex((x) => x.userId == this.customerId);
        this.rows = this.copyData[index + 1];
      }
      if (this.productId) {
        var index = this.rows.findIndex((x) => x.id == this.productId);
        this.rows = this.copyData[index + 1];
      }
    } else {
      this.rows = this.copyData;
    }
  }
}
