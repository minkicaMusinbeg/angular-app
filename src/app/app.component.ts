import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Route{
  id:number,
  route:string,
  color:string,
  name:string,
  icon:string,
  clicked: boolean
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  coloredRoute:any;
  routes: Route[] = [{id:1,route:'/home',color:'black',name:'Dashboard',icon:'home',clicked:true},
  {id:2,route:'/list',color:'black',name:'List of users',icon:'view_list', clicked:false}]
  constructor(private observer: BreakpointObserver, private router: Router) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  clickColorChange(id:number){
    this.coloredRoute = this.routes.find(x=>x.id === id);
    this.coloredRoute.clicked = true;
   this.routes.filter(x=>x.id!=id).forEach(element => {
      element.clicked = false;
    });

  }
}
