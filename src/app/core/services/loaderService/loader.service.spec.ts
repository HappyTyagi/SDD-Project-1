import { TestBed } from "@angular/core/testing";

import { LoaderService } from "./loader.service";
import { Subject } from "rxjs";

describe("LoaderService", () => {
  let service: LoaderService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should show() return true", () => {
    const isLoading = new Subject<boolean>();
    service.show();
    isLoading.next(true);
    expect(isLoading).toBeTruthy();
    return isLoading.asObservable();
  });

  it("should hide() return false", async () => {
    const isLoading = new Subject<boolean>();
    service.hide();
    isLoading.next(false);
    expect(isLoading).toBeTruthy();
    return isLoading.asObservable();
  });
});
