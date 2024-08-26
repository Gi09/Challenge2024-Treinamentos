import { Component} from '@angular/core';
import { Treinamentos } from '../interfaces/treinamentos';
import { TreinamentosService } from '../services/treinamentos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  treinamentos:Treinamentos[] = [];
  treinamentoForm: FormGroup = new FormGroup({})

  constructor(private treinamentoService:TreinamentosService, private formbuilder: FormBuilder) {
  this.treinamentoForm = this.formbuilder.group({
  })

 }

 listar():void{
    this.treinamentoService.listarTre().subscribe((listarTreinamento) => (this.treinamentos = listarTreinamento))
 }

 ngOnInit():void{
   this.listar();
 }
}
