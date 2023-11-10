import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SharedService } from '../shared.service'; 
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  players: any[] = [];
  constructor(private sharedService: SharedService) { }

  datesWithData: Date[] = [];

  ngOnInit() {
    this.sharedService.getDatesWithData().subscribe(dates => {
      this.datesWithData = dates.map(date => new Date(date));
      console.log('datesWithData', this.datesWithData);
    });
  }

  dateClass: any = (cellDate: Date, view: string) => { //!TODO: cambia any por MatCalendarCellClassFunction
    // Check if the view is 'month', otherwise we ignore
    console.warn('cellDate fuera', cellDate);
    if (view === 'month') {
      console.log('cellDate dentro', cellDate);
      // Check if the current date matches a date with data
      const matchingDates = this.datesWithData.find(date => {
        return date.getDate() === cellDate.getDate() &&
          date.getMonth() === cellDate.getMonth() &&
          date.getFullYear() === cellDate.getFullYear();
      });
      const hasData = matchingDates ? 'special-date' : undefined;
      console.log(cellDate, hasData);
      return matchingDates ? 'special-date' : undefined;
    }
  
    return undefined;
  }

  getMatchedPlayers(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    console.log('date getMatchedPlayers player.compo..', date);

    if (date) {
      const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
      this.sharedService.getMatchedPlayers(dateString).subscribe((data: any) => {
        this.players = data.filter((player: any) => player.array1.length > 0 && player.array2.length > 0);
      });
    } else {
      console.error('Date is null');
    }
  }
}