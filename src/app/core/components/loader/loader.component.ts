import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  isLoading: boolean ;

  constructor(private loaderService: LoaderService) {  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((response)=> {
      this.isLoading = response;
    })
  }

}