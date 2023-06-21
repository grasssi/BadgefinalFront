import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    emt: new FormControl('', Validators.required),
    modele: new FormControl('', Validators.required),
    code_fab: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    classe_equipement: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
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
     this.router.navigate(['/dashboard/badge/listbadge']);
    },
      (error: any) => {
        // this.toasterService.pop('error', 'Error', error.error.message);
        console.log(error);
      }
    );


  }

}
