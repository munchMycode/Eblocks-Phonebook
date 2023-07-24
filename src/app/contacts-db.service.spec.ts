import { TestBed } from '@angular/core/testing';

import { ContactsDbService } from './contacts-db.service';

describe('ContactsDbService', () => {
  let service: ContactsDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
