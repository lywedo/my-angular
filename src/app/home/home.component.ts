import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location.component/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { ChildComponent } from '../child/child.component';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ChildComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          [contentEditable]="isEditable"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList; track $index) {
      <app-housing-location
        [housingLocation]="housingLocation"
      ></app-housing-location>
      }
      <!-- <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location> -->
    </section>
    <section>
      @if (isServerRunning){
      <div>{{ isServerRunning }}</div>
      } @else {
      <div>
        {{ isServerRunning }}
      </div>
      }
    </section>
    <section>
      {{ this.items }}
      <app-child (incrementCountEvent)="addItem($event)"></app-child>
    </section>
    <section>
      @defer(on viewport) {
      <div>defer for comments</div>
      } @placeholder {
      <p>Future comments</p>
      } @loading (minimum 2s) {
      <p>Loading comments...</p>
      }
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  isServerRunning: boolean = true;
  isEditable: boolean = true;
  items: number = -1;
  constructor() {
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // this.filteredLocationList = this.housingLocationList;
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  addItem(item: number) {
    this.items = item;
    console.log(this.items);
  }
}
