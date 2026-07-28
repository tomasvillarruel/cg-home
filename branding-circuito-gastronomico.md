# Sistema de Marca — Circuito Gastronómico

Tokens de diseño extraídos del sitio en vivo (circuitogastronomico.com). Este documento transcribe fielmente los valores del JSON de extracción y separa, al final, las observaciones y recomendaciones de diseño (valores extendidos, no extraídos).

| | |
|---|---|
| Fuente | Extracción automática del sitio en vivo |
| Esquema de color | Light |
| Framework | Custom (sin librería de componentes detectada) |
| Confianza de la extracción | Colores 0.95 · Botones 0.50 · Global 0.725 |

---

## 1. Identidad

- **Tono:** profesional
- **Energía:** media
- **Audiencia objetivo:** entusiastas de la gastronomía y profesionales del sector
- **Esquema de color:** claro (light)

---

## 2. Color (extraído)

| Token | Valor | Uso declarado |
|---|---|---|
| primary | `#334155` | Color primario (azul pizarra) |
| secondary | `#69727D` | Color secundario (gris) |
| accent | `#9C1E21` | Acento (rojo bordó) |
| background | `#FFFFFF` | Fondo |
| link | `#9C1E21` | Enlaces |
| textPrimary | `#9C1E21` | Texto primario (ver observaciones) |

Confianza de la extracción de color: **0.95** (alta).

---

## 3. Tipografía (extraído)

**Familia principal:** Roboto (títulos y cuerpo).

**Stacks de fuente:**

- Títulos: `Roboto, sans-serif`
- Párrafo: `Roboto, sans-serif`
- Cuerpo (cadena de respaldo del sistema): `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`

**Tamaños:**

| Elemento | Tamaño |
|---|---|
| h1 | 24px |
| h2 | 30px |
| body | 16px |

> Nota: las fuentes Segoe UI, Oxygen-Sans, Ubuntu y Cantarell que aparecen en la extracción son la cadena de respaldo del sistema operativo, no tipografías de marca. La tipografía de marca es Roboto. Los pesos tipográficos no figuran en la extracción (ver observaciones).

---

## 4. Espaciado y radios (extraído)

| Token | Valor |
|---|---|
| Unidad base de espaciado | 4px |
| Radio de borde general | 4px |
| Radio de borde de inputs | 30px (pill) |

---

## 5. Componentes (extraído)

### Input

| Propiedad | Valor |
|---|---|
| Fondo | `#F9FAFB` |
| Color de texto | `#515962` |
| Borde | sin borde (`null`) |
| Radio de borde | 30px (pill, las cuatro esquinas) |
| Sombra | ninguna |

### Botones

Sin datos confiables en la extracción (confianza 0.50). A definir en la documentación del sistema.

---

## 6. Activos de marca (extraído)

| Activo | URL / dato |
|---|---|
| Logo | `https://circuitogastronomico.com/wp-content/uploads/2017/03/circuitoLogoAra.png` |
| Favicon | `https://circuitogastronomico.com/wp-content/uploads/2025/01/cropped-CG-Icono-png-fondo-transparente-32x32.png` |
| OG image | `https://circuitogastronomico.com/wp-content/uploads/2026/06/la-zete-premio-2026.jpg` |
| Enlace del logo | `https://circuitogastronomico.com/` |

---

## 7. Bloque de tokens CSS

Variables listas para implementar en la hoja de estilos de un child theme de WordPress. Reflejan los valores extraídos tal cual.

```css
:root {
  /* Color */
  --cg-color-primary: #334155;
  --cg-color-secondary: #69727D;
  --cg-color-accent: #9C1E21;
  --cg-color-background: #FFFFFF;
  --cg-color-link: #9C1E21;
  --cg-color-text-primary: #9C1E21; /* revisar: ver observaciones */

  /* Tipografía */
  --cg-font-heading: "Roboto", sans-serif;
  --cg-font-paragraph: "Roboto", sans-serif;
  --cg-font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif;
  --cg-font-size-h1: 24px;
  --cg-font-size-h2: 30px;
  --cg-font-size-body: 16px;

  /* Espaciado y radios */
  --cg-space-unit: 4px;
  --cg-radius-base: 4px;
  --cg-radius-pill: 30px;

  /* Input */
  --cg-input-bg: #F9FAFB;
  --cg-input-text: #515962;
  --cg-input-radius: 30px;
}
```

---

## 8. Observaciones y recomendaciones (extendido, no extraído)

Lo siguiente no forma parte de la extracción: son hallazgos de diseño a resolver al documentar el sistema.

1. **Inversión de jerarquía tipográfica.** La extracción registra `h1 = 24px` y `h2 = 30px`: el H2 es más grande que el H1. Es un defecto a corregir; el H1 debería encabezar la escala. Conviene definir una escala tipográfica explícita (por ejemplo H1 > H2 > H3 > cuerpo).

2. **Texto primario en rojo.** `textPrimary` figura como `#9C1E21`, el mismo rojo del acento y de los enlaces. El contraste sobre blanco es bueno (≈ 8:1), pero usar el acento como color de cuerpo de texto es atípico: fatiga la lectura en pasajes largos y borra la distinción entre texto y enlace (si ambos son rojos). Recomendación: usar un neutro oscuro para el cuerpo (por ejemplo `#334155`) y reservar `#9C1E21` para acentos, enlaces y, eventualmente, títulos.

3. **Contraste de colores.** Sobre fondo blanco: primary `#334155` ≈ 10:1 y accent `#9C1E21` ≈ 8:1 (ambos cómodos). El secundario `#69727D` queda en ≈ 4.9:1: cumple AA para texto normal por margen estrecho; conviene no usarlo en tamaños pequeños sin verificar.

4. **Pesos tipográficos sin definir.** La extracción no incluye pesos de Roboto. La jerarquía de esta marca se apoya en variación de peso, así que conviene fijar y documentar la escala de pesos (por ejemplo 400 / 600 / 700) como valor extendido.

5. **Botones sin datos.** La confianza de botones es baja (0.50) y no hay tokens de botón. Hay que definirlos (relleno, radio, estados hover/focus/disabled), idealmente alineados al sistema de inputs y al acento.

6. **Logotipo heredado.** El logo del header es un archivo de 2017 (`circuitoLogoAra.png`), mientras que favicon (2025) y OG image (2026) están actualizados. Vale revisar si el logo vigente debería reemplazar al de 2017.

7. **Dos radios conviviendo.** El radio general es 4px y el de inputs 30px (pill). Es una decisión válida, pero conviene documentar cuándo aplica cada uno para mantener consistencia.
