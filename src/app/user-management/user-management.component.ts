import { Component, OnInit } from '@angular/core';
import { CoreHttpService } from '../core/services/coreHttpServices/core-http.service';
import { State, Districts, BlockDataModel, Roles, registerModel, FilterModel, PatientModel, VisitModel } from '../models/common.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public patientList: PatientModel[] = [];
  public visitList: VisitModel[] = [];
  public registerPayload: registerModel = new registerModel();
  public filterData: FilterModel = new FilterModel();
public stateList: State[] = [];
  public districtList: any[] = [];
  public districtListFilter: any[] = [];
  public blockList: any[] = [];
  public blockListFilter: BlockDataModel[] = [];
  public roleList: Roles[] = [];
  public userList: any  = [];
  public facilityData: any = [];
  public facilityDataFilter: any = [];
  public facilityTypeData: any = [];
  public subfacilityData: any = [];
  public facilityTypeDataFilter: any = [];
  public isHideFacility: boolean = false;
  public facility: string = '';
  public subfacility: string = '';

  constructor(private coreHttp: CoreHttpService,  private route:Router, private notifyService : NotificationService ) {


   }

   ngAfterViewInit(){
    this.getUserListDetails();
   }

  ngOnInit(): void {
    this.getRoleList();
    this.getStateList();
  }

  /** Method to get user list */
  getUserListDetails() {
    this.coreHttp.get('user/getAllUsers').subscribe(res => {
      this.userList = res.response;
      $('#userTable').DataTable();
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** Method to get state list */
  getStateList() {
    this.coreHttp.get('states').subscribe(response => {
      this.stateList = response.response;
    }, error => {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** Method to get selected state */
  getSelectedStateId() {
    this.coreHttp.get(`districts/${this.registerPayload.stateId}`).subscribe(response => {
      this.districtList = response.response.districts;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** Method to get selected role */
  getSelectedRole() {
    if(Number(this.registerPayload.roleId) != 1) {
      this.isHideFacility = false;
    } else {
      this.isHideFacility = true;
    }
  }

  /** Method to get select district */
  getSelecteddistrictList() {
    this.coreHttp.get(`blocks/${this.registerPayload.districtCode}/${this.registerPayload.stateId}`).subscribe(response => {
      this.blockList = response.response;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
    // let data = this.districtList.find(ele => ele.districtId === Number(this.registerPayload.districtId));
    // if(data.hasOwnProperty('blockData')) {
    //   this.blockList = data.blockData;
    // } else {
    //   this.blockList = [];
    // }

    // if(data.hasOwnProperty('facilityData')) {
    //     this.facilityData = data.facilityData;
    // } else {
    //   this.facilityData = [];
    // }

    // if(data.hasOwnProperty('healthFacilityTypeData')) {
    //   this.facilityTypeData = data.healthFacilityTypeData;
    // } else {
    //   this.facilityTypeData = [];
    // }
  }

  getSelectedBlockList() {
  //  let blockCode = this.blockList.find(ele => Number(ele.healthBlockId) === Number(this.registerPayload.blockId)).healthBlockCode
    this.coreHttp.get(`facilityTypes/${this.registerPayload.blockCode}/${this.registerPayload.districtCode}/${this.registerPayload.stateId}`).subscribe(response => {
      this.facilityTypeData = response.response;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  getSelectedFacilityTypeList() {
   // let blockCode = this.blockList.find(ele => Number(ele.healthBlockId) === Number(this.registerPayload.blockId)).healthBlockCode
    this.coreHttp.get(`facilities/${this.registerPayload.blockCode}/${this.registerPayload.stateId}/${this.registerPayload.facilityTypeId}`).subscribe(response => {
      this.facilityData = response.response;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  getSelectedFacilityList() {
    this.coreHttp.get(`subFacilities/${this.registerPayload.facilityCode}`).subscribe(response => {
      this.subfacilityData = response.response;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** Method to get role list */
  getRoleList(){
    this.coreHttp.get('roles').subscribe(res => {
      debugger
      if(res.status == 200){
        this.roleList = res.response;
      }
    }, error => {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** Method to open register popup */
  openRegisterModel() {
    this.registerPayload = new registerModel();
    $('#registerModal').modal('toggle');
  }

  /** Method for register User */
  onSubmit(ngForm: NgForm) {
    this.coreHttp.post('user/create', this.registerPayload).subscribe(res => {
      if(res.status == 200) {
        ngForm.reset();
        this.getUserListDetails();
         $('#registerModal').modal('toggle');
      } else {
        this.notifyService.showInfo(res.message);
      }

    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

   /** Method to get selected state filter */
   getSelectedStateIdFilter() {
    this.coreHttp.get(`district/${this.filterData.stateId}`).subscribe(response => {
      this.districtListFilter = response.response.districts;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

    /** Method to get select district */
    getSelecteddistrictListFilter() {
      let data = this.districtListFilter.find(ele => ele.districtId === Number(this.filterData.districtId));
      if(data.hasOwnProperty('blockData')) {
        this.blockListFilter = data.blockData;
      } else {
        this.blockListFilter = [];
      }

      if(data.hasOwnProperty('facilityData')) {
          this.facilityDataFilter = data.facilityData;
      } else {
        this.facilityDataFilter = [];
      }

      if(data.hasOwnProperty('healthFacilityTypeData')) {
        this.facilityTypeDataFilter = data.healthFacilityTypeData;
      } else {
        this.facilityTypeDataFilter = [];
      }
    }

    /** Method to logout user */
    logOut() {
      localStorage.clear();
      this.route.navigate(['/login']);
    }

    /** Method to get All Patient to Excel file */
    getAllPatientExcel() {
        this.coreHttp.get('patient/getAllPatient').subscribe(res => {
          this.patientList = res.response;
          this.JSONToCSVConvertor(this.patientList, "Patient Report", true);
        }, error => {
          if(error.exception.status === 401){
            this.notifyService.showError(error.message);
            this.route.navigate(['/login']);
          } else {
            this.notifyService.showError(error.message);
          }
        })
    }

    /** Method to get all visit to download excel file */
    getAllVisitExcel() {
      this.coreHttp.get('patient/getAllVisit').subscribe(res => {
        this.visitList = res.response;
        this.JSONToCSVConvertor(this.visitList, "Visit Report", true);
      }, error => {
        if(error.exception.status === 401){
          this.notifyService.showError(error.message);
          this.route.navigate(['/login']);
        } else {
          this.notifyService.showError(error.message);
        }
      })
    }

    /** generic method to download excel file */
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

      var CSV = '';
      //Set Report title in first row or line

      CSV += ReportTitle + '\r\n\n';

      //This condition will generate the Label/Header
      if (ShowLabel) {
          var row = "";

          //This loop will extract the label from 1st index of on array
          for (var index in arrData[0]) {

              //Now convert each value to string and comma-seprated
              row += index + ',';
          }

          row = row.slice(0, -1);

          //append Label row with line break
          CSV += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
          var row = "";

          //2nd loop will extract each column and convert it in string comma-seprated
          for (var index in arrData[i]) {
              row += '"' + arrData[i][index] + '",';
          }

          row.slice(0, row.length - 1);

          //add a line break after each row
          CSV += row + '\r\n';
      }

      if (CSV == '') {
          alert("Invalid data");
          return;
      }

      //Generate a file name
      var fileName = "MyReport_";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += ReportTitle.replace(/ /g,"_");

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension

      //this trick will generate a temp <a /> tag
      let link = document.createElement("a");
      link.href = uri;

      //set the visibility hidden so it will not effect on your web-layout
     // link.style = "visibility:hidden";
      link.download = fileName + ".csv";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
}
