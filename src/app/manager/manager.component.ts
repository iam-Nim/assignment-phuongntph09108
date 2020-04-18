import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../school.service";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.css"]
})

export class ManagerComponent implements OnInit {

  schools = [];

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.schoolService.getListSchool().subscribe(data => {
      console.log(data);
      this.schools = data;
    });
  }
  removeSchool(id){
    if(confirm('Bạn có chắc chắn muốn xóa trường này ?')){
      this.schoolService.removeSchoolById(id).subscribe(response =>{
      this.schools = this.schools.filter(obj => obj.id != response.id);
      })
    }
  }
}