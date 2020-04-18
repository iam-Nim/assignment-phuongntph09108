import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SchoolService } from "../school.service";
import { ClassService } from "../class.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-class-edit",
  templateUrl: "./class-edit.component.html",
  styleUrls: ["./class-edit.component.css"]
})
export class ClassEditComponent implements OnInit {
  schoolid;

  classForm = new FormGroup({
    id: new FormControl(null),
    schoolId: new FormControl(""),
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    room_number: new FormControl("", [Validators.required]),
    total_student: new FormControl("", [Validators.required]),
    main_teacher: new FormControl("", [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ])
  });

  get name() {
    return this.classForm.get("name");
  }
  get room_number() {
    return this.classForm.get("room_number");
  }
  get total_student() {
    return this.classForm.get("total_student");
  }
  get main_teacher() {
    return this.classForm.get("main_teacher");
  }

  constructor(
    private schoolService: SchoolService,
    private route: Router,
    private ActiveRoute: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit() {
    //lay id cua lop roi set data vao classForm
    this.ActiveRoute.paramMap.subscribe(params => {
      let school = params.get("id");
      this.schoolid = school;
      let classId = params.get("classid");
      this.classService.getDetailClassBySchoolId(classId).subscribe(data => {
        this.classForm.setValue(data);
      });
    });
  }
  saveClass() {
    if (this.classForm.valid) {
      if (this.classForm.value.id != null) {
        this.classService.editClass(this.classForm.value).subscribe(data => {
          this.route.navigate(["manager/detail-school", this.schoolid]);
        });
      } else {
        this.classService.addNewClass(this.classForm.value).subscribe(data => {
          this.route.navigate(["manager/detail-school", this.schoolid]);
        });
      }
    } else {
      alert("Dữ liệu nhập chưa đúnng không thể lưu !!!");
    }
  }
}
