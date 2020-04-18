import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { SchoolService } from "../school.service";
import { ClassService } from "../class.service";

@Component({
  selector: 'app-schools-show',
  templateUrl: './schools-show.component.html',
  styleUrls: ['./schools-show.component.css']
})
export class SchoolsShowComponent implements OnInit {

  SchoolId = null;
  SchoolDetail = null;
  classs = [];

  constructor(
    private schoolService: SchoolService,
    private classService: ClassService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.SchoolId = this.activateRoute.paramMap.subscribe(params => {
      this.SchoolId = Number(params.get("id"));

      // lay thong tin chi tiet cua School
      this.schoolService.getschoolById(this.SchoolId).subscribe(data => {
        this.SchoolDetail = data;
      });

      // lay danh sach phong hoc
      this.classService.getClassBySchoolId(this.SchoolId).subscribe(data => {
        this.classs = data;
      })
    });
  }
}