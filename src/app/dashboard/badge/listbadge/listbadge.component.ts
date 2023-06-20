import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBackdropService } from '../../../core/services/loading-backdrop.service';
import { Movie } from '../../movie/movie.model';

import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { EfccmService } from 'src/app/core/services/efccm.service';




@Component({
  selector: 'app-listbadge',
  templateUrl: './listbadge.component.html',
  styleUrls: ['./listbadge.component.scss']
})
export class ListbadgeComponent implements OnInit {

  public data: any;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Movie>();
  displayedColumns: string[] = [
    'modele',
    'emt',
    // 'code_payes',
    // 'toc',
    // 'vcontext',
    // 'code_efccm',
    // 'code_toc',
  ];

  constructor(
    private loadingBackdropService: LoadingBackdropService,
    private efccmservice: EfccmService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadMovies();
  }

  loadMovies(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    this.loadingBackdropService.show();

    this.efccmservice
      .listbadge(pageIndex)
      .pipe(finalize(() => this.loadingBackdropService.hide()))
      .subscribe((data: any) => {
        // this.dataSource.data = data.results;
        // console.log('hello',data);
        // console.log('dataSource',this.dataSource.data);
        setTimeout(() => {
          this.data = [...data];
          console.log('res', data);
          if (this.dataSource.paginator) {
            this.dataSource.paginator.length = data.total_results;
            this.dataSource.paginator.pageIndex = data.page;
            this.dataSource.paginator.pageSize = 20;
          }
        });
      });
  }

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onMovieDetailNavigate(customer: Movie) {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

  // allEfccm()

}
