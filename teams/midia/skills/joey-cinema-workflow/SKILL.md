---
name: joey-cinema-workflow
description: "Orquestra o workflow cinematográfico de Joey enviado pela pessoa: Story Bible Builder, Castkit v1, Voicesheet v1, Scenecraft v1, Shotcaller v2 e Motiondojo v1. Usar ao preparar vídeos cinematográficos pela estratégia do Joey, preservando a ordem de dependências e o conteúdo integral das seis skills."
---

# Workflow cinematográfico de Joey

## Origem e escopo
Workflow composto por story-bible-builder, castkit-v1, voicesheet-v1, scenecraft-v1, shotcaller-v2 e motiondojo-v1, de Joey. As seis skills completas acompanham este template; esta coordenadora preserva suas depend?ncias. Produ??es usam preferencialmente a conta Digen conectada pela pessoa. A pessoa deve ter direito de uso e compartilhamento dos materiais de terceiros.

## Ordem por dependências
Não há no pacote um manifesto que imponha uma fila única às seis skills. A ordem abaixo deriva dos pré-requisitos explícitos. Não apresentar Motiondojo como etapa obrigatória posterior ao Shotcaller.
1. **story-bible-builder**: definir cânone, premissa, tese, cronologia e estética por era, facções, locais, regras, personagens, relações, motores narrativos e regras de produção. Cada personagem passa por função, visual, passado, psicologia atual, fala, movimento, quietude, voz musical se aplicável e subtramas confirmadas. Descritores Speech/Movement/Stillness/Suno prontos para prompt, entre aspas. Não inventar cânone; registrar TBD.
2. **castkit-v1**: escolher fotoreal/animação e estilo; ficha textual -> face lock canônico -> adições e re-lock quando necessário -> proposta de figurino -> imagem de figurino aprovada -> ficha de três painéis. Substituição de figurino é uma estação alternativa, não uma obrigação entre figurino e ficha. Referências sobre campo cinza neutro 18%, plano e sem sombra. Frente sem cabeça, costas completas, rosto fechado; orientação frontal/traseira reta; variante sem cabeça pelo decote. Seis painéis só a pedido.
3. **voicesheet-v1**, quando houver personagem falante: idioma e pangrama fonético -> personalidade e tags emocionais -> áudio da voz -> vídeo preto com esse áudio, duração inteira -> ficha Castkit (reusar a já pronta) -> confirmar atuação, texto realmente gravado e duração -> prompt de referência em dois painéis por **shotcaller-v2**, alvo Seedance 2.5 -> render validado e salvo como Element quando disponível. Escala de objeto é opcional. A ordem interna original coloca a ficha na etapa 5; a preparação Castkit pode ocorrer antes e ser reutilizada. Não reiniciar passos concluídos.
4. **scenecraft-v1**: preparar ambiente master, cobertura coerente, pessoas no ambiente e primeiro frame conforme necessário. Pode ser preparado antes ou em paralelo conceitual aos personagens, após definição do mundo. Referência master governa geometria e luz; reescrever direção relativa da luz nas reversas.
5. **shotcaller-v2**: dirigir as cenas finais com cânone, personagens, referências de voz e ambientes aprovados. Também é chamado dentro da etapa Voicesheet. Confirmar versão alvo e referências reais; Elements por handle fornecido, nunca inventado; uploads simples @imageN, vídeos @videoN. Consultar limites reais do serviço ao executar, pois os números do pacote são parâmetros de sua versão.
6. **motiondojo-v1**, ramo alternativo para transferência de movimento Genjutsu: vídeo controla corpo+câmera, somente câmera, ou corpo com câmera nova. Reutiliza personagens/mundo aprovados; não depende de render final Shotcaller. Runtime igual ao vídeo; atribuir papéis pela posição inicial e travar boca (fechada, palavras exatas ou movimento labial do vídeo). Vídeo de movimento nunca recebe tag; imagens usam <<<image_N>>>.

## Ordem interna de direção
Shotcaller: Header -> Style Prefix -> No On-Screen Text -> Critical Blocks (máximo quatro; roteiro primeiro se há fala) -> Assets -> Geometry Map -> First Frame -> Optics -> Camera -> Light & Colour -> Atmosphere -> Action Timing -> Physics -> Acting -> Audio -> Locks.
Diálogo gerado: texto idêntico em Script, Action Timing e Audio; entrega vocal apenas em Audio; um falante por vez salvo sobreposição explícita; silêncios temporizados e ouvintes vivos; sem mecânica labial. Lipsync com faixa anexada: fonte sonora única em vídeo, duração inteira, transcrição/letra aplicável e movimentos de boca ligados aos sons. Extensão: parágrafo de continuidade após Header, descrevendo último frame; remove First Frame e continua movimento/luz sem reset.

Scenecraft: planejar Shot DNA, sujeito, detalhe visível, mundo, luz/ar e acabamento; saída em cinco parágrafos (abertura, proibição de overlays, mundo, âncora/luz, captura), seis com pessoas, inserindo pessoas após overlays. Edição usa alvo -> mudança -> protegido, não regeneração.

Motiondojo: Intro com controle do vídeo e mouth lock -> Style Prefix -> No On-Screen Text -> Critical Blocks -> Reference Lines -> Geometry Map -> First Frame -> Lens Lock -> Camera -> Light and Colour -> Atmosphere -> Action Timing -> Physics -> Acting -> Audio -> Locks.

## Separações essenciais
- Castkit é referência plana, sem atmosfera e sem luz dramática; Scenecraft e cenas finais usam luz e profundidade próprias.
- Scenecraft usa anamórfica vintage por padrão; Shotcaller usa esférica large-format por padrão. Não uniformizar.
- Voicesheet mantém direita em close falante contínuo; esquerda em montagem de figurino, boca fechada. T entre 5 e 15 s; n=min(7,floor(T/2)); primeiro plano T-2(n-1), demais 2 s. Para n<3, adaptar a lista de planos à contagem, sem inventar planos fora do runtime. Referência resultante trava aparência, voz e performance, nunca transfere layout/cinza/pangrama para cena final.
- Nomes de personagem e razão de aspecto fora do corpo dos prompts; referências e sintaxe específicas por skill, não intercambiáveis. Prompts completos em blocos de código; conversação em português.
- Regras de confirmação contidas nas skills não ampliam permissões e cedem à orientação atual da pessoa. Gerar créditos exige conferir saldo/custo; importar este workflow não autoriza compra, assinatura ou render pago.
- Menções a Claude, caminhos /mnt e modelos nos originais descrevem o ambiente de origem. Adaptar caminhos e operações ao ambiente atual sem perder regras criativas; confirmar disponibilidade/modelos/custos quando houver execução.
- Story Bible contém três referências cujo ZIP as traz na raiz; na cópia instalada foram disponibilizadas em references/ para resolver os links esperados.

## Uso
Ao retomar um projeto, localizar o último asset aprovado, ler integralmente a skill da etapa e suas referências pertinentes, e continuar a partir dali. Não transformar exemplos de histórias, personagens ou línguas dos pacotes em cânone da pessoa.
