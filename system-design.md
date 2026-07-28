# Circuito Gastronomico — System Design

---

## Marca y Estilo

Este sistema de diseño se construye sobre los pilares de autoridad editorial local, calidez organica y escalabilidad digital. Esta pensado para una plataforma de medios gastronomicos que busca consolidar su liderazgo en Cordoba y proyectarse como referente regional, trasladando la riqueza de su contenido hacia una experiencia digital de alto rendimiento. La estetica combina de manera coherente el Periodismo Gastronomico Moderno con el Minimalismo Organico, priorizando la legibilidad, la confianza y la eficiencia visual sin sacrificar calidez ni pertenencia territorial.

La narrativa visual utiliza espacios generosos y el contraste entre el blanco del fondo y el peso tipografico de los titulares para guiar la mirada del usuario, apoyandose en una jerarquia construida integralmente sobre Roboto en sus distintos pesos. La personalidad de la marca es la del "Experto Local": conocedor y con criterio, pero accesible y sin pedanteria, profundamente cordobes. Se evita la decoracion superflua en favor de la precision estructural, el espacio en blanco intencional y el uso medido del rojo vino como firma visual de la marca.

### Colores

La paleta se apoya en una base de blanco puro (`#FFFFFF`) que proporciona un fondo limpio y luminoso, permitiendo que las imagenes gastronomicas y el contenido editorial destaquen con toda su fuerza visual. Las fotografias de alimentos, espacios y experiencias son el producto: el fondo nunca compite con ellas.

- **Rojo Vino — Acento principal (`#9C1E21`):** Color de firma de la marca. Se utiliza para acentos, llamadas a la accion, texto destacado y enlaces. Representa la pasion gastronomica y la identidad territorial. Su impacto depende de la escasez: nunca supera el 15% de la superficie de cualquier pantalla.

- **Slate Azul Oscuro — Estructural (`#334155`):** Utilizado para fondos de componentes de soporte, elementos secundarios y textos de estructura. Aporta solidez y modernidad sin competir con el acento rojo. Es el color que organiza sin protagonizar.

- **Gris Azulado — Secundario (`#69727D`):** Reservado para metadata, nombres de autores, tiempos de lectura y textos de menor jerarquia. Garantiza la legibilidad sin añadir peso visual innecesario.

- **Neutros de superficie:** Escala de blancos y grises calidos (`#F9FAFB`, `#F5F4F0`, `#EEECEA`, `#D8D5D0`) utilizados para generar profundidad y diferenciacion entre el fondo de pagina, las cards, los inputs y los contenedores interactivos. La calidez de estos neutros evita la frialdad de los grises puros y refuerza la identidad organica de la marca.

- **Acentos de jerarquia:** Uso ocasional del rojo vino en su version contenedor (`#F5E6E6`) para definir zonas de atencion, tags de categoria y estados activos, sin recurrir a bordes rigidos ni elementos decorativos invasivos.

---

## Tipografia

Este sistema de diseño utiliza una estrategia de tipografia para garantizar coherencia de marca, legibilidad editorial y eficiencia en la implementacion sobre WordPress.

- **Tipografia principal (Roboto):** Una sola familia tipografica cubre los roles funcionales del sistema: navegacion, etiquetas, cuerpo de texto, descripciones y metadata. Roboto aporta modernidad, neutralidad y excelente legibilidad en interfaces digitales, tanto en pantallas de alta densidad como en dispositivos moviles donde se concentra la mayor parte del trafico gastronomico. Es la fuente declarada en el branding actual del sitio y el eje de consistencia del sistema.

- **Tipografia editorial — propuesta de rediseño (Playfair Display):** Como parte de la propuesta de rediseño, se recomienda incorporar Playfair Display en peso 700 exclusivamente para titulares de articulos, heroes y secciones de alto impacto editorial. Su construccion serif de alto contraste entre trazos finos y gruesos evoca la autoridad del periodismo gastronomico de referencia internacional, diferenciando visualmente el contenido editorial del contenido funcional de la interfaz. Esta decision requiere aprobacion del cliente antes de implementarse: no forma parte del branding actual del sitio.

- **Jerarquia combinada:** Playfair Display en titulares y Roboto en el resto del sistema generan un contraste de personalidad que refuerza la identidad editorial sin perder la claridad funcional. El titular habla con caracter y pasion gastronomica. La interfaz responde con precision y eficiencia. Cada familia tiene un rol exclusivo y no se intercambian.

- **Jerarquia por peso dentro de Roboto:** Para todos los elementos fuera del titular editorial, la diferenciacion se construye a traves del peso. Peso 700 para subtitulos de seccion y nombres de card, peso 600 para navegacion y etiquetas, peso 400 para cuerpo de texto y descripciones.

- **Tratamiento principal:** Los titulares hero en Playfair Display incluyen una palabra o frase clave en rojo vino (`#9C1E21`) para anclar la lectura y reforzar la firma visual de la marca. El resultado es un titular que comunica contenido, personalidad de marca e identidad territorial en una sola lectura.

---

## Layout y Espaciado

La estructura sigue un modelo de grilla fija basado en un sistema de 12 columnas con unidad base de 4px. El diseño enfatiza el ritmo vertical y la respiracion entre bloques, permitiendo que las imagenes gastronomicas y el contenido editorial ocupen el protagonismo que merecen sin competir con la interfaz.

- **Seccionado:** Cada bloque de contenido se presenta dentro de una zona vertical claramente definida, diferenciada mediante cambios sutiles en el tono de superficie dentro de la escala de neutros calidos (`#FFFFFF`, `#F9FAFB`, `#F5F4F0`, `#EEECEA`). No se utilizan lineas rigidas ni bordes decorativos para separar secciones: la diferencia de superficie y el espacio en blanco son suficientes para establecer limites visuales claros. Las imagenes de ancho completo se reservan para heroes y momentos editoriales de alto impacto.

- **Grillas de contenido:** Los articulos y cards editoriales se organizan en grillas de 3 columnas en desktop y 2 en tablet, con gap de 24px entre elementos. Las estadisticas y cifras de impacto se presentan en estructuras simetricas de 2 o 4 columnas para facilitar una lectura rapida y comparativa. La grilla de hero principal utiliza una proporcion 2:1, con la historia protagonista ocupando dos tercios del ancho y las secundarias el tercio restante.

- **Margenes:** Margenes horizontales de minimo 64px en desktop garantizan una experiencia visual enfocada, evitando que el contenido se extienda hasta los bordes de la pantalla. En tablet el margen minimo es 32px y en mobile 20px. El ancho maximo del contenedor es 1280px, centrado en pantalla.

- **Espaciado vertical:** Separacion entre secciones de 96px en desktop. Separacion entre grupos de elementos dentro de una misma seccion de 32 a 64px segun jerarquia. Separacion entre elementos del mismo grupo de 16px. Todo el espaciado es multiplo de la unidad base de 4px.

---

## Elevacion y Profundidad

La jerarquia visual se construye mediante capas tonales dentro de la escala de neutros calidos, evitando sombras pesadas o efectos que distraigan del contenido gastronomico. El sistema de elevacion es sobrio y funcional: cada capa existe para organizar, no para decorar.

- **Niveles de superficie:** El nivel base utiliza el blanco puro (`#FFFFFF`) del fondo de pagina. Las cards y contenedores interactivos emplean blanco sobre fondo de pagina con sombra calida sutil (`0 2px 8px rgba(26,26,26,0.06)`) para generar sensacion de elevacion sin introducir color. Los chips, stats y elementos de menor jerarquia utilizan la superficie `#EEECEA` para diferenciarse del fondo sin competir con las cards.

- **Efectos glass:** Sobre imagenes de fondo — heroes y cards protagonista — se aplican capas semitransparentes con backdrop blur de 12px para garantizar la legibilidad del texto sin perder el contexto visual de la fotografia gastronomica. La opacidad del overlay se gradua de 0% en la parte superior al 92% en la inferior, preservando la imagen donde no hay texto y asegurando contraste donde si lo hay.

- **Gradientes:** Gradientes lineales de negro calido (`rgba(26,26,26,0.92)`) a transparente aplicados como overlay en heroes y cards protagonista. No se utilizan gradientes de color sobre superficies de cards de datos: la profundidad se logra mediante diferencia tonal entre superficies, no mediante efectos.

- **Contornos:** Bordes de `1px solid #D8D5D0` en cards e inputs. Esta tonalidad calida define los limites de los contenedores sin introducir frialdad ni rigidez visual. El borde de foco en inputs activa el rojo vino (`#9C1E21`) con un ring de `0 0 0 3px rgba(156,30,33,0.12)` para reforzar la identidad de marca en el momento de mayor atencion del usuario.

---

## Formas

El lenguaje visual de las formas es calido, moderno y coherente con la identidad organica de la marca.

- **Esquinas:** Radio base de 4px en cards, imagenes y contenedores generales. Este valor es el declarado en el branding actual del sitio y aporta modernidad con estructura, evitando tanto la frialdad de las esquinas rectas como el exceso de redondez que comunica informalidad.

- **Botones:** Los botones primarios utilizan esquinas completamente redondeadas en pill shape (`border-radius: 9999px`) para destacar su importancia dentro de la interfaz y diferenciarlos visualmente de los contenedores de contenido. Los botones secundarios y ghost utilizan `border-radius: 6px` para mantener estructura sin competir con el primario.

- **Inputs:** Radio de 30px en todos los campos de formulario y barras de busqueda, valor declarado en el branding real del sitio. El pill shape en inputs es un sello del sistema que refuerza coherencia visual en todos los puntos de captura de datos.

- **Elementos multimedia:** Las imagenes dentro de cards respetan el mismo radio de 4px que el contenedor que las aloja, garantizando coherencia visual en toda la composicion. Las imagenes en heroes son siempre full-bleed sin radio de borde.

---

## Componentes

### Botones

- **Primario:** Fondo rojo vino (`#9C1E21`) con texto blanco y forma pill. Utilizado para acciones principales: suscripcion, exploracion, CTA de newsletter. En hover oscurece a `#7A1618` y agrega sombra calida `0 4px 16px rgba(156,30,33,0.30)`.

- **Secundario:** Fondo transparente con borde de `1.5px solid #9C1E21` y texto en rojo vino. En hover activa el fondo del primary container (`#F5E6E6`). Puede incluir un indicador de direccion textual para reforzar la accion.

- **Ghost:** Fondo `#F9FAFB` con borde `1px solid #D8D5D0` y texto en gris oscuro. Para acciones de baja prioridad contextual como compartir o filtrar.

- **Terciario:** Enlace de texto con `color: #9C1E21` y subrayado. Para navegaciones y acciones de minima jerarquia dentro del flujo de lectura.

### Cards

- **Cards de estadistica:** Cifras de impacto en `font-size: 64px`, `font-weight: 700`, color rojo vino. Descripcion en Roboto 400 14px en slate (`#334155`). Fondo superficie `#EEECEA`. Sin gradientes de color: la cifra en rojo sobre fondo neutro ya genera el foco visual necesario.

- **Cards protagonista:** Imagen de fondo a pantalla completa de la card con overlay degradado de negro calido. Contenido textual — categoria en label-caps y titulo en Playfair Display (propuesta de rediseño) — alineado en la esquina inferior izquierda. En hover la imagen escala suavemente a `scale(1.04)` con transicion de 300ms.

### Campos de entrada

- **Formularios:** Estilo pill con fondo `#F9FAFB`, sin borde en reposo (valor real del sitio) o con borde `1px solid #D8D5D0` en la variante con borde recomendada para el rediseño. El foco activa borde rojo vino y ring sutil. Sin efectos de brillo o glow: la marca no utiliza efectos luminosos.

- **Etiquetas:** Label caps en Roboto 600, 12px, uppercase, letter-spacing 0.08em, directamente sobre el campo. Color slate (`#334155`) para etiquetas de formulario, rojo vino (`#9C1E21`) para etiquetas de categoria editorial.

### Imagenes

- Fotografia profesional de alta calidad con colores naturales, calidos y apetitosos. Las imagenes de alimentos, espacios y experiencias son el producto principal del sitio: su tratamiento visual debe maximizar su atractivo, no neutralizarlo.

- Evitar filtros desaturados, frios o con dominante azulada sobre alimentos. Un plato fotografiado con tonos calidos y saturados activa el apetito y refuerza la propuesta de valor del sitio.

- Formato WebP como principal, JPEG como fallback. Lazy loading en todas las imagenes fuera del viewport. Heroes a minimo 1440px de ancho con maximo 200KB. Cards a 800px de ancho con maximo 80KB.

---

## Tokens de diseño

```yaml
name: Circuito Gastronomico Design System
colors:

  # Superficies — escala crema calida (light mode)
  surface:                  '#FFFFFF'
  surface-dim:              '#F5F4F0'
  surface-bright:           '#FFFFFF'
  surface-container-lowest: '#FAFAF8'
  surface-container-low:    '#F5F4F0'
  surface-container:        '#F9FAFB'
  surface-container-high:   '#EEECEA'
  surface-container-highest:'#D8D5D0'

  # Texto sobre superficie
  on-surface:               '#1A1A1A'
  on-surface-variant:       '#4A4745'
  inverse-surface:          '#1A1A1A'
  inverse-on-surface:       '#F5F4F0'

  # Bordes
  outline:                  '#B0ABA4'
  outline-variant:          '#D8D5D0'
  surface-tint:             '#9C1E21'

  # Primary — Rojo Vino
  primary:                  '#9C1E21'
  on-primary:               '#FFFFFF'
  primary-container:        '#F5E6E6'
  on-primary-container:     '#6B1215'
  inverse-primary:          '#7A1618'

  # Secondary — Slate azul oscuro
  secondary:                '#334155'
  on-secondary:             '#FFFFFF'
  secondary-container:      '#E8ECF2'
  on-secondary-container:   '#1E2D40'

  # Tertiary — Gris azulado
  tertiary:                 '#69727D'
  on-tertiary:              '#FFFFFF'
  tertiary-container:       '#F0EEE9'
  on-tertiary-container:    '#434140'

  # Error
  error:                    '#B91C1C'
  on-error:                 '#FFFFFF'
  error-container:          '#FEE2E2'
  on-error-container:       '#7F1D1D'

  # Fixed variants — derivados del primary
  primary-fixed:            '#F5E6E6'
  primary-fixed-dim:        '#E8C8C8'
  on-primary-fixed:         '#3D0608'
  on-primary-fixed-variant: '#7A1618'

  # Fixed variants — derivados del secondary
  secondary-fixed:          '#E8ECF2'
  secondary-fixed-dim:      '#C8D0DC'
  on-secondary-fixed:       '#0D1520'
  on-secondary-fixed-variant:'#243448'

  # Fixed variants — derivados del tertiary
  tertiary-fixed:           '#F0EEE9'
  tertiary-fixed-dim:       '#D8D5D0'
  on-tertiary-fixed:        '#1A1917'
  on-tertiary-fixed-variant:'#4A4745'

  # Background
  background:               '#FFFFFF'
  on-background:            '#1A1A1A'
  surface-variant:          '#EEECEA'

typography:

  # Titulares editoriales — Playfair Display
  # PROPUESTA DE REDISENO: requiere aprobacion del cliente
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'

  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'

  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'

  # Cuerpo y UI — Roboto (fuente real del sitio)
  body-lg:
    fontFamily: Roboto
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'

  body-md:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'

  label-caps:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.08em

  # Cifras de impacto — Playfair Display
  # PROPUESTA DE REDISENO: requiere aprobacion del cliente
  stat-lg:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.0'

rounded:
  sm:      0.125rem   # 2px  — detalles minimos
  DEFAULT: 0.25rem    # 4px  — valor real del sitio
  md:      0.375rem   # 6px  — botones secundarios
  lg:      0.5rem     # 8px  — cards con mayor suavidad
  xl:      0.75rem    # 12px — bloques de seccion
  input:   1.875rem   # 30px — inputs pill, valor real del sitio
  full:    9999px     # pill — botones primarios, tags

spacing:
  unit:             4px    # base unit real del sitio
  container-max:    1280px
  gutter:           24px
  section-padding:  96px
  stack-sm:         16px
  stack-md:         32px
  stack-lg:         64px
```

---

*System Design — Circuito Gastronomico v1.0*
*Roboto + Playfair Display (propuesta) · Rojo Vino #9C1E21 · Slate #334155 · Background #FFFFFF · Base unit 4px*
