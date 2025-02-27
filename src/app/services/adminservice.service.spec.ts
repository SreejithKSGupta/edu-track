import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminserviceService } from './adminservice.service';

describe('AdminserviceService', () => {
  let service: AdminserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
            providers: [AdminserviceService]
    });
    service = TestBed.inject(AdminserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should have getData function', () => {
      const service: AdminserviceService = TestBed.get(AdminserviceService);
      expect(service.addUser).toBeTruthy();
     });
    it('should have getData function', () => {
      const service: AdminserviceService = TestBed.get(AdminserviceService);
      expect(service.checksignin).toBeTruthy();
     });
});
