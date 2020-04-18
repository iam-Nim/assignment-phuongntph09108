import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SchoolService } from "../school.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-schools-edit",
  templateUrl: "./schools-edit.component.html",
  styleUrls: ["./schools-edit.component.css"]
})
export class SchoolsEditComponent implements OnInit {
  schoolForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    logo: new FormControl("", [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    province: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    president: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    about: new FormControl("", [Validators.required, Validators.minLength(4)])
  });

  get name() {
    return this.schoolForm.get("name");
  }
  get logo() {
    return this.schoolForm.get("logo");
  }
  get address() {
    return this.schoolForm.get("address");
  }
  get province() {
    return this.schoolForm.get("province");
  }
  get president() {
    return this.schoolForm.get("president");
  }
  get about() {
    return this.schoolForm.get("about");
  }

  constructor(
    private schoolSevice: SchoolService,
    private route: Router,
    private ActiveRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ActiveRoute.paramMap.subscribe(params => {
      let schoolID = params.get("id");
      if (schoolID != null) {
        this.schoolSevice.getschoolById(schoolID).subscribe(data => {
          this.schoolForm.setValue(data);
        });
      }
    });
  }
  saveSchool() {
    if (this.schoolForm.valid) {
      //neu da co san id thi se update id do, neu khong thi them moi
      if (this.schoolForm.value.id != null) {
        this.schoolSevice.editSchool(this.schoolForm.value).subscribe(data => {
          this.route.navigate(["manager"]);
        });
      } else {
        this.schoolSevice
          .addNewSchool(this.schoolForm.value)
          .subscribe(data => {
            this.route.navigate(["manager"]);
          });
      }
    } else {
      alert("Dữ liệu nhập chưa đúnng không thể lưu !!!");
    }
  }
}
