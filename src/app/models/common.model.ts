export class State {
  public stateName : string | undefined;
  public stateId!: number;
}

export class Districts {
  districtId!: number;
  districtName: string | undefined;
  districtCode: number | undefined;
  mddsCode: number | undefined;
}

export class BlockDataModel {
  healthBlockId: number | undefined;
  healthBlockCode: number | undefined;
  healthBlockName: string | undefined;
  districtId: number | undefined;
  talukaId: number | undefined;
  mddsCode: number | undefined;
}

export class FacilityDataModel {
  healthFacilityId: number | undefined;
  healthFacilityCode: number | undefined;
  districtId: number | undefined;
  talukaId: number | undefined;
  healthBlockId: number | undefined;
  healthFacilityTypeId: number | undefined;
  healthFacilityTypeData: {
    facilityTypeId: number | undefined;
    facilityTypeName: string | undefined;
  } | undefined
}

export class Roles {
  roleId!: number;
  roleName!: string;
}

export class registerModel {
  name!: string;
  roleId!: number;
  email!: string;
  districtCode!: number;
  facilityTypeId!: number;
  facilityCode!: number;
  subFacilityCode!: number;
  stateId!: number;
  mobileNumber!: string;
  password!: string;
  blockCode!: number;
}

export class Login {
  username: string | undefined;
  password: string | undefined;
}

export class FilterModel {
  stateId: number;
  districtCode: string;
  blockCode: string;
  facilityTypeId: string;
  facilityCode: string;
}

export class PatientModel {
  patientId: number;
  ageType: string;
  caseCloseDate: any;
  centerId: string;
  createdAt: string;
  createdBy: number;
  deathDate: any;
  dob: string;
  fullName: string;
  gender: string;
  heightCm: number;
  isActive: boolean;
  isPregnant: boolean;
  mobile: string;
  mobileId: string;
  mode: string;
  sno: number;
  spouseName: string;
  status: string;
  totalMonths: number;
  totalWeeks: number;
  updatedAt: string;
  villageName: string;
  weeksOfAge: number;
  weightKg: number;
  yearOfAge: number;
}

export class VisitModel {
  ageInDays: number;
  ageInWeeks: number;
  ageInYears: number;
  currentStatus: number;
  dangerSign: string;
  isCompleted: number;
  isVerified: number;
  followUpDate: string;
  id: number;
  mobileId: string;
  patientId: number;
  patientType: string;
  referred: number;
  referredLocation: string;
  selectedVaccines: string;
  sno: number;
  symptoms: string;
  temperature: number;
  timeStamp: number;
  visitDate: string;
  visitNo: number;
}

export class DistrictModel {
  districtName: string;
  districtCode: number;
}

export class StateModel {
  stateId: number;
  stateName: string;
}

export class BlockModel {
  healthBlockId: number;
  healthBlockCode: number;
  healthBlockName: string;
  districtCode: number;
  talukaId: string;
  mddsCode: number;
  stateId: number;
}

export class healthFacilityResponseModel {
  healthFacilityId: number;
  healthFacilityCode: number;
  healthFacilityName: string;
  districtCode: number;
  talukaId: number;
  healthBlockCode: number;
  healthFacilityTypeId: number;
}

export class healthFacilityTypeModel {
  facilityTypeId: number;
  facilityTypeName: string;
}
export class UserListModel {
  name: string;
  gmail: string;
  mobileNumber: string;
  role: Roles;
  districtResponse: DistrictModel;
  stateResponse: StateModel;
  blockResponse: BlockModel;
  healthFacilityResponse: healthFacilityResponseModel;
  healthFacilityTypeResponse: healthFacilityTypeModel;
}

export class DashboardDatamodel {
  totalChild: number;
totalCho: number;
totalMother: number;
mother: ChartModel[];
child: ChartModel[];
cho: ChartModel[];
}

export class ChartModel {
  level: string;
  value: number;
}




