import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-declaration-fill',
  templateUrl: './declaration-fill.component.html',
  styleUrls: ['./declaration-fill.component.scss'],
})
export class DeclarationFillComponent implements AfterViewInit {
  private isDrawing = false;
  private startX!: number;
  private startY!: number;
  private currentX!: number;
  private currentY!: number;

  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    this.renderer.listen(canvas, 'mousedown', (event) => {
      this.isDrawing = true;
      this.startX = event.clientX - canvas.offsetLeft;
      this.startY = event.clientY - canvas.offsetTop;
    });

    this.renderer.listen(canvas, 'mousemove', (event) => {
      if (this.isDrawing) {
        this.currentX = event.clientX - canvas.offsetLeft;
        this.currentY = event.clientY - canvas.offsetTop;

        ctx?.beginPath();
        ctx?.moveTo(this.startX, this.startY);
        ctx?.lineTo(this.currentX, this.currentY);
        ctx?.stroke();

        this.startX = this.currentX;
        this.startY = this.currentY;
      }
    });

    this.renderer.listen(canvas, 'mouseup', (event) => {
      this.isDrawing = false;
    });
  }

  saveAsPdf() {
    const drawAreaEl = this.elRef.nativeElement.querySelector('#draw-area');
    const canvasEl = this.elRef.nativeElement.querySelector('canvas');
    const ctx = canvasEl.getContext('2d');

    // Create a new PDF document
    const doc = new jsPDF();

    console.log(doc);

    // Add an image of the canvas to the PDF document
    setTimeout(() => {
      const imageData = canvasEl.toDataURL('image/png');
      doc.addImage(
        imageData,
        'PNG',
        0,
        0,
        drawAreaEl.clientWidth,
        drawAreaEl.clientHeight
      );

      // Save the PDF document with a delay of 500ms
      setTimeout(() => {
        doc.save('drawing.pdf');
      }, 500);
    }, 100);
  }
}
