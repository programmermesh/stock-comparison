import { Component, Input, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { mergeMap } from 'rxjs/operators';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
})
export class StockItemComponent implements OnInit {
  symbol: any;
  regularMarketPrice: any;
  regularMarketDayHigh: any;
  regularMarketDayLow: any;
  fiftyTwoWeekHigh: any;
  fiftyTwoWeekLow: any;
  result: any[] = [];
  toggle = true;
  status = 'ON';
  mobile = false;
  stockSubscription: Subscription;
  @Input() region: string;
  @Input() symbols: string;

  constructor(
    private _sharedService: SharedService,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpoint.observe([Breakpoints.Handset]).subscribe((res) => {
      if (res.matches) this.mobile = false;
      else this.mobile = true;
    });
    this.subscribetoService();
  }

  subscribetoService() {
    this.stockSubscription = interval(1000)
      .pipe(
        mergeMap(() =>
          this._sharedService.fetchStock(this.region, this.symbols)
        )
      )
      .subscribe((data) => this.fetchStocks(data));
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'ON' : 'OFF';
    if (this.status === 'ON') {
      this.subscribetoService();
    } else {
      this.stockSubscription.unsubscribe();
      console.log('unsubscription successful');
    }
  }

  fetchStocks(data: any) {
    this.result = data.quoteResponse.result[0];
    this.symbol = data.quoteResponse.result[0].symbol;
    this.regularMarketPrice = data.quoteResponse.result[0].regularMarketPrice;
    this.regularMarketDayHigh =
      data.quoteResponse.result[0].regularMarketDayHigh;
    this.regularMarketDayLow = data.quoteResponse.result[0].regularMarketDayLow;
    this.fiftyTwoWeekHigh = data.quoteResponse.result[0].fiftyTwoWeekHigh;
    this.fiftyTwoWeekLow = data.quoteResponse.result[0].fiftyTwoWeekLow;
  }
}
