import { Injectable } from '@angular/core';
import { StateService, LocalStorageService } from './services/index';

@Injectable()
export class AppStateService extends StateService {

  constructor(storageService: LocalStorageService) {
    super(storageService);
  }


}
