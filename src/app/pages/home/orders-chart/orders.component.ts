import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import * as d3 from 'd3';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @Input() public data: { value: number, date: string }[];
  private width = 700;
  private height = 500;
  private margin = 50;
  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  themeSubscription: any;
  private colors: any;

  constructor(public chartElem: ElementRef,private theme: NbThemeService) {

   }

  ngAfterViewInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
    });
  }

  ngOnInit(): void {
 
  }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data) {
      // console.log("OrdersComponent", this.data)
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }

  public initializeChart(): void {
    this.svg = d3
      // .select(this.chartElem.nativeElement)
      .select("figure#linechart")
      // .select('.linechart')
      .append('svg')
      
      .attr('height', this.height);
    this.svgInner = this.svg
      .append('g')
      // .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.data, d => d.value) + 1, d3.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.date)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'area')
      .attr("class", "line-color").attr("fill",NbColorHelper.hexToRgbA(this.colors.primary, 0.3))
      .attr('stroke', 'blue')
      // .style('stroke-width', '2px')

  }

  public drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    var xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m / %Y'));

    this.xAxis.call(xAxis);

    var yAxis = d3
      .axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    var line = d3
      .area()
      .x(d => d[0])
      .y0(this.height -100)
      .y1(d => d[1])
      .curve(d3.curveMonotoneX);

    var points: [number, number][] = this.data.map(d => [
      this.xScale(new Date(d.date)),
      this.yScale(d.value),
    ]);
    this.lineGroup.attr('d', line(points));
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
