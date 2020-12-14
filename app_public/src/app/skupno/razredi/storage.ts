import { InjectionToken } from '@angular/core';

export const Storage_Browser = new InjectionToken<Storage>(
    'Storage browser',
    {
        providedIn: 'root',
        factory: () => localStorage
    }
);