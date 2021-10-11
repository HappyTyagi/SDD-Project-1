import { Component, OnInit } from '@angular/core';
import { CoreHttpService } from '../core/services/coreHttpServices/core-http.service';
import { State, Districts, BlockDataModel, Roles, registerModel, FilterModel, PatientModel, VisitModel, UserListModel } from '../models/common.model';
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
  public blockList: BlockDataModel[] = [];
  public roleList: Roles[] = [];
  public userList: UserListModel[]  = [];
  public userAllDetails: UserListModel[] = [];
  public facilityData: any = [];
  public facilityDataFilter: any = [];
  public facilityTypeData: any = [];
  public subfacilityData: any = [];
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
      this.userAllDetails = res.response;
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
    this.getDistrictList(this.registerPayload.stateId);
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
    this.getBlockList(this.registerPayload.districtCode, this.registerPayload.stateId);
  }

  /** get Block List from API */
  getBlockList(districtCode, stateId) {
    this.coreHttp.get(`blocks/${districtCode}/${stateId}`).subscribe(response => {
      this.blockList = response.response;
    }, error=> {
      if(error.exception.status === 401){
        this.notifyService.showError(error.message);
        this.route.navigate(['/login']);
      } else {
        this.notifyService.showError(error.message);
      }
    })
  }

  /** getSelectedBlock List filter */
  getSelectedBlockListFilter(event) {
    this.getFacilityTypeList(this.filterData.blockCode, this.filterData.districtCode, this.filterData.stateId);
      this.userList = this.userAllDetails.filter(ele => {
          if(Number(ele.blockResponse)){
            Number(ele.blockResponse.healthBlockCode) === Number(this.filterData.blockCode)
          }
      });
 debugger
  }

  /** Method to get block list */
  getSelectedBlockList() {
    this.getFacilityTypeList(this.registerPayload.blockCode, this.registerPayload.districtCode, this.registerPayload.stateId);
  }

  /** Method to get facility type data */
  getFacilityTypeList(blockCode, districtCode, stateId) {
    this.coreHttp.get(`facilityTypes/${blockCode}/${districtCode}/${stateId}`).subscribe(response => {
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

  getSelectedFacilityTypeListFilter() {
    this.userList = this.userAllDetails.filter(ele =>{
      if(ele.healthFacilityTypeResponse)
       Number(ele.healthFacilityTypeResponse.facilityTypeId) === Number(this.filterData.facilityTypeId)});
    this.getFacilityDataList(this.filterData.blockCode, this.filterData.stateId, this.filterData.facilityTypeId)
   }

   getSelectedFacilityListFilter() {
    this.userList = this.userAllDetails.filter(ele => {
      if(ele.healthFacilityResponse)
      Number(ele.healthFacilityResponse.healthFacilityCode) === Number(this.filterData.facilityCode)});
   }

  getSelectedFacilityTypeList() {
    this.getFacilityDataList(this.registerPayload.blockCode, this.registerPayload.stateId, this.registerPayload.facilityTypeId)
  }

  /** Method to get facility data */
  getFacilityDataList(blockCode, stateId, facilityTypeId) {
    this.coreHttp.get(`facilities/${blockCode}/${stateId}/${facilityTypeId}`).subscribe(response => {
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
    this.userList = this.userAllDetails.filter(ele => Number(ele.stateResponse.stateId) === Number(this.filterData.stateId));
    this.getDistrictList(this.filterData.stateId);
  }

  /** Method to get district list from API */
  getDistrictList(stateId) {
    this.coreHttp.get(`districts/${stateId}`).subscribe(response => {
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

    /** Method to get select district */
    getSelecteddistrictListFilter() {
      this.userList = this.userAllDetails.filter(ele => (ele.stateResponse.stateId === this.filterData.stateId));
      this.getBlockList(this.filterData.districtCode, this.filterData.stateId);

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
          this.JSONToCSVConvertor("Patient Report", this.patientList);
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
        this.JSONToCSVConvertor("Visit Report", this.visitList);
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
  JSONToCSVConvertor(filename, arrayOfJson) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map(row => header.map(fieldName =>
    JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    // Create link and download
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
        let link = document.createElement("a");
        link.href = uri;
        link.download = filename + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  }


}
