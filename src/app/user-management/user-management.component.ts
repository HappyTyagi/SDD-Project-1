import { Component, OnInit, DebugElement } from '@angular/core';
import { CoreHttpService } from '../core/services/coreHttpServices/core-http.service';
import { State, Districts, BlockDataModel, Roles, registerModel, FilterModel } from '../models/common.model';
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
      this.notifyService.showError(error.message)
    })
  }

  /** Method to get state list */
  getStateList() {
    this.coreHttp.get('states').subscribe(response => {
      this.stateList = response.response;
    }, error => {
      this.notifyService.showError(error.message)
    })
  }

  /** Method to get selected state */
  getSelectedStateId() {
    this.coreHttp.get(`districts/${this.registerPayload.stateId}`).subscribe(response => {
      this.districtList = response.response.districts;
    }, error=> {
      this.notifyService.showError(error.message)
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
      this.notifyService.showError(error.message)
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
      this.notifyService.showError(error.message)
    })
  }

  getSelectedFacilityTypeList() {
   // let blockCode = this.blockList.find(ele => Number(ele.healthBlockId) === Number(this.registerPayload.blockId)).healthBlockCode
    this.coreHttp.get(`facilities/${this.registerPayload.blockCode}/${this.registerPayload.stateId}/${this.registerPayload.facilityTypeId}`).subscribe(response => {
      this.facilityData = response.response;
    }, error=> {
      this.notifyService.showError(error.message)
    })
  }

  getSelectedFacilityList() {
    this.coreHttp.get(`subFacilities/${this.registerPayload.facilityCode}`).subscribe(response => {
      this.subfacilityData = response.response;
    }, error=> {
      this.notifyService.showError(error.message)
    })
  }

  /** Method to get role list */
  getRoleList(){
    this.coreHttp.get('roles').subscribe(res => {
      this.roleList = res.response;
    }, error => {
      this.notifyService.showError(error.message)
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
      this.notifyService.showError(error.message)
    })
  }

   /** Method to get selected state filter */
   getSelectedStateIdFilter() {
    this.coreHttp.get(`district/${this.filterData.stateId}`).subscribe(response => {
      this.districtListFilter = response.response.districts;
    }, error=> {
      this.notifyService.showError(error.message)
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
}
