import { Component, OnInit, PipeTransform } from '@angular/core';
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
export class ModulosComponent implements OnInit {
  treinamentoSelecionado?: Treinamentos;
  moduloSelecionado?: Modulos;
  moduloForm: FormGroup;
  moduloAtual = 0;
  videoUrl?: SafeResourceUrl;
  
  constructor(
    private route: ActivatedRoute,
    private treinamentoService: TreinamentosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer
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
  
        // Verifica se há uma URL de vídeo e sanitiza a URL do vídeo
        if (this.moduloSelecionado.video) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(this.moduloSelecionado.video));
        } else {
          this.videoUrl = undefined; // Limpa a URL do vídeo se não houver
        }
      }
  
    }, error => {
      console.error('Erro ao buscar o módulo:', error);
    });
  }
  
  selecionarModulo(index: number): void {
    this.moduloAtual = index;
    this.moduloSelecionado = this.treinamentoSelecionado?.modulos[index];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { moduloId: this.moduloSelecionado?.moduloId },
      queryParamsHandling: 'merge',
    });
  
    // Atualiza a URL do vídeo ao selecionar um novo módulo
    if (this.moduloSelecionado && this.moduloSelecionado.video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(this.moduloSelecionado.video));
    } else {
      this.videoUrl = undefined;
    }
  }
  
  proximoModulo(): void {
    if (this.treinamentoSelecionado && this.moduloAtual < this.treinamentoSelecionado.modulos.length - 1) {
      this.selecionarModulo(this.moduloAtual + 1);
    }
  }
  
  voltarPagina(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  
  private getYouTubeEmbedUrl(videoUrl: string): string {
    // Extrair o ID do vídeo da URL
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
