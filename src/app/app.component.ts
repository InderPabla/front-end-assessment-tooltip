import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end-assessment-tooltip';

  constructor(private router: Router) {
    
  }
  xelloToolTipFeature() {
    //If tool tip feature cliked on the sidebar, route back to tooltipfeature
    this.router.navigate(['tooltipfeature']); 
  }

  
}
