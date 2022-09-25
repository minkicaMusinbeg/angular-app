import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Route{
  id:number,
  route:string,
  color:string,
  name:string,
  icon:string
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  coloredRoute:any;
  routes: Route[] = [{id:1,route:'/home',color:'black',name:'Dashboard',icon:'home'},
  {id:2,route:'/list',color:'black',name:'List of users',icon:'view_list'}]

  constructor(private observer: BreakpointObserver, private router: Router) {
  }


  ngOnInit(){
  }
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
      .subscribe((e:any) => {
        this.routes.forEach(element => {
          if(element.route === e.url){
            element.color = 'white';
          }
        });
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  clickColorChange(id:number){
    this.coloredRoute = this.routes.find(x=>x.id === id);
    this.coloredRoute.color = 'white'
   this.routes.filter(x=>x.id!=id).forEach(element => {
      element.color = 'black'
    });

  }
}
