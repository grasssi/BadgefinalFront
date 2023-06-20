import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BadgeService } from 'src/app/core/services/badge.service';
import { EfccmService } from 'src/app/core/services/efccm.service';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-addefccm',
  templateUrl: './addefccm.component.html',
  styleUrls: ['./addefccm.component.scss']
})
export class AddefccmComponent implements OnInit {
  
  form: FormGroup;
  parentOptions = [
    { label: 'TELEPASS', value: 'TELEPASS' },
    { label: 'DKV', value: 'DKV' },
    { label: 'EUROTOLL', value: 'EUROTOLL' },
  ];
  childOptions :any =[];

emt:any
   myRes: any;
  myRes2: any;
  efccmForm = new FormGroup({
    
    code_payes: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    idf_emt: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    toc: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    vcontext: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    badge: new FormControl('', [Validators.required])
  })
  
  constructor(
    private router: Router,
    private badgeservice: BadgeService,
    private efccmservice: EfccmService,
    private formBuilder: FormBuilder
    
    ) {

      this.form = this.formBuilder.group({
        emt: '',
        badge: '',
      });
     }
    
    addEfccm(){
         this.efccmservice.addefccm(this.efccmForm.value).subscribe((response: any) => {
      // this.toasterService.pop('success', 'Success Login', response.message);
      this.router.navigate(['/dashboard/badge/listbadge']);
    },
    (error: any) => {
      // this.toasterService.pop('error', 'Error', error.error.message);
      console.log(error);
    }
    );
    
  }
  allbadges() {
    this.badgeservice.allbadges().subscribe((response: any) => {
      this.myRes = response
    },
    (error: any) => {
      console.log(error);
    }
  );
  }

  allmodele(emt:any) {
    console.log('emt',this.emt);
    
   this.badgeservice.allmodelebyemt(this.emt).subscribe((response: any) => {
     
      this.myRes2 = response;
     
    },
    (error: any) => {
      console.log(error);
    }
  );
  }

  ngOnInit(): void {
   this.allbadges()
  //this.allmodele()
  }





  onParentSelectChange(event: MatSelectChange): void {
    const selectedValue = event.value;
    
    // Update child options based on selected parent value
    this.childOptions = this.getChildOptions(selectedValue);
    
    // Reset child select value
    this.form.get('childSelect')?.setValue('');
  }

  getChildOptions(parentValue: string): any[] {
    // Implement your logic to fetch child options based on the selected parent value
    // You can make an API call or use an existing array of options
    
    // Example logic:
    if (parentValue === 'TELEPASS') {
this.emt = "TELEPASS"
console.log("hello",this.allmodele(this.emt));

      return [this.allmodele(this.emt)];
      // return [
      //   { label: 'Child Option 1', value: 'childOption1' },
      //   { label: 'Child Option 2', value: 'childOption2' },
      // ];
    } else if (parentValue === 'option2') {
      return [
        { label: 'Child Option 3', value: 'childOption3' },
        { label: 'Child Option 4', value: 'childOption4' },
      ];
    } else if (parentValue === 'option3') {
      return [
        { label: 'Child Option 5', value: 'childOption5' },
        { label: 'Child Option 6', value: 'childOption6' },
      ];
    }

    return [];
  }
}

