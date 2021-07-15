import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { SharedService } from './service/shared.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StockItemComponent } from './stocks/stock-item/stock-item.component';

@NgModule({
  declarations: [AppComponent, StocksComponent, StockItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
