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
  stateId!: string;
  districtId!: string;
  blockId!: string;
  facilityTypeId!: string;
  facilityId!: string;
}


