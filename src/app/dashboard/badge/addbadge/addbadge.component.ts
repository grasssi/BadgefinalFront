import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BadgeService } from 'src/app/core/services/badge.service';

@Component({
  selector: 'app-addbadge',
  templateUrl: './addbadge.component.html',
  styleUrls: ['./addbadge.component.scss']
})
export class AddbadgeComponent implements OnInit {
  pageType!: string;


  badgeForm = new FormGroup({
    emt: new FormControl(''),
    modele: new FormControl(''),
    code_fab: new FormControl(''),
    classe_equipement: new FormControl('')
  })
  constructor(
    private router: Router,
    private badgeservice: BadgeService,
  ) { }

  ngOnInit(): void {
  }

  addBadge() {

    this.badgeservice.addbadge(this.badgeForm.value).subscribe((response: any) => {
      // this.toasterService.pop('success', 'Success Login', response.message);
     this.router.navigate(['/efccm']);
    },
      (error: any) => {
        // this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );


  }

}
