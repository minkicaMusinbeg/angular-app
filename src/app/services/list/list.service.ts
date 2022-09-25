import { Injectable } from '@angular/core';
import { PROFILE } from 'src/app/components/list/list.component';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor() {}
  getUsers(): PROFILE[] {
    const userList : PROFILE[]= [{
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 1
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 2
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 3
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 4
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 5
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 6
    },
    {
      email: "almina@email.com",
      fullName: "Musinbegovic",
      id: 7
    },
    ];
    return userList;
  }
}
