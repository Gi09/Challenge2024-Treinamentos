import { Component, OnInit } from '@angular/core';
import { Treinamentos } from '../../interfaces/treinamentos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TreinamentosService } from '../../services/treinamentos.service';
import { Location } from '@angular/common';
import { Modulos } from '../../interfaces/modulos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  treinamentoSelecionado?: Treinamentos;
  moduloSelecionado?: Modulos;
  moduloForm: FormGroup;
  moduloAtual = 0

  constructor(
    private route: ActivatedRoute,
    private treinamentoService: TreinamentosService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
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
    const moduloId = this.route.snapshot.queryParamMap.get('moduloId');
  
    this.treinamentoService.getById(treinamentoId).subscribe(treinamentoResponse => {
      this.treinamentoSelecionado = treinamentoResponse;
  
      if (moduloId) {
        const index = this.treinamentoSelecionado.modulos.findIndex(modulo => modulo.moduloId === moduloId);
        if (index !== -1) {
          this.selecionarModulo(index);
        }
      } else {
        this.selecionarModulo(0); // Seleciona o primeiro módulo por padrão
      }
  
     if (this.moduloSelecionado) {
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
        }
    
  
    }, error => {
      console.error('Erro ao buscar o módulo:', error);
    });
  }
  
  

  selecionarModulo(index: number): void {
    this.moduloAtual = index;
    this.moduloSelecionado = this.treinamentoSelecionado?.modulos[index];
  
    // Atualize a URL para refletir o módulo selecionado
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { moduloId: this.moduloSelecionado?.moduloId },
      queryParamsHandling: 'merge', // preserva outros parâmetros na URL
    });
  }

  proximoModulo(): void {
    if (this.treinamentoSelecionado && this.moduloAtual < this.treinamentoSelecionado.modulos.length - 1) {
      this.selecionarModulo(this.moduloAtual + 1);
    }
  }
  
  voltarPagina(): void {
    this.location.back();
  }
  
  
}
