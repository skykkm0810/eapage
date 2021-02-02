import { TestBed } from '@angular/core/testing';

import { PhxChannelService } from './phx-channel.service';

describe('PhxChannelService', () => {
  let service: PhxChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhxChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
