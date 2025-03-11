import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [DataService]
    });
    // service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service.getUsers).toBeTruthy();
   });

  it('should have addStudent function', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service.addStudent).toBeTruthy();
   });

  it('should have getStudentById function', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service.getStudentById).toBeTruthy();
   });

  it('should have updateStudentById function', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service.updateStudentById).toBeTruthy();
   });
});
