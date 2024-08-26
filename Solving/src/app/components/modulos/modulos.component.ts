import { Component, OnInit } from '@angular/core';
import { Treinamentos } from '../../interfaces/treinamentos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TreinamentosService } from '../../services/treinamentos.service';
import { Location } from '@angular/common';
import { Modulos } from '../../interfaces/modulos';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent implements OnInit {
  treinamentoSelecionado?: Treinamentos;
  moduloSelecionado?: Modulos;
  moduloForm: FormGroup;
  moduloAtual = 0

  constructor(
    private route: ActivatedRoute,
    private treinamentoService: TreinamentosService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.moduloForm = this.formBuilder.group({
      titulo: [''],
      descricao: [''],
      imagem: [''],
      video: [''],
      certificacao: [false],
      preRequisitos: [''],
      publico: [''],
      obrigatorio: [false],
    });
  }

  ngOnInit(): void {
    this.getTreinamentoEModuloById();
  }

  getTreinamentoEModuloById(): void {
    const treinamentoId = this.route.snapshot.paramMap.get('id') ?? '';
    const moduloId = this.route.snapshot.paramMap.get('moduloId') ?? '';
  
    console.log('IDs capturados:', { treinamentoId, moduloId });
  
    this.treinamentoService.getModuloById(treinamentoId, moduloId).subscribe(modulo => {
      if (modulo) {
        console.log('Módulo encontrado:', modulo);
        this.moduloSelecionado = modulo;
        this.moduloForm.patchValue({
          titulo: this.moduloSelecionado.titulo,
          descricao: this.moduloSelecionado.descricao,
          imagem: this.moduloSelecionado.imagem,
          video: this.moduloSelecionado.video,
          certificacao: this.moduloSelecionado.certificacao,
          preRequisitos: this.moduloSelecionado.preRequisitos,
          publico: this.moduloSelecionado.publico,
          obrigatorio: this.moduloSelecionado.obrigatorio,
        });
      } else {
        console.error('Módulo não encontrado');
      }
    }, error => {
      console.error('Erro ao buscar o módulo:', error);
    });
  }

  selecionarModulo(modulo: any): void {
    this.moduloSelecionado = modulo;
  }
  

  voltarPagina(): void {
    this.location.back();
  }
}
