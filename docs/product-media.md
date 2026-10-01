# Capturas y composiciones de producto

Las fichas de complementos integran el Markdown del manual correspondiente con `EmbeddedManual.astro`. CMS, Extensión y Companion no son entradas del índice de manuales: sus rutas antiguas redirigen permanentemente a `#manual` en la ficha. La guía general de Complementos aparece dentro del catálogo. Los archivos Markdown y sus campos se conservan para editarlos desde Dome CMS.

`ProductVisual.astro` presenta ilustraciones editoriales con tarjetas legibles sobre el escenario generado. Las composiciones explican los flujos del CMS, de la extensión y de Companion; son ilustraciones, no capturas de la interfaz. El texto se localiza en español e inglés. La galería inferior permite ampliar las capturas originales del producto. La captura de Companion corresponde a **Many remoto en Desktop**, antes del emparejamiento.

## Procedencia

Capturas realizadas el 2026-10-01 con Electron y el renderer real de Dome, commit registrado en `public/product-captures/capture-provenance.json`. Cada ejecución crea perfiles `DOME_PROFILE` distintos y dos instancias sucesivas: CMS y Ajustes. CMS usa tres borradores locales de demostración. No se pulsa Publicar, Sincronizar, Traducir ni Generar código, ni se conecta una cuenta. Los PNG originales de la galería no se regeneran ni se retocan. Las tarjetas de la composición principal se diseñan en HTML/CSS y se identifican como un flujo ilustrado.

Componentes: listado, editor Markdown y propiedades de publicación de Dome CMS; ajustes de Extensión del navegador y de Many remoto. El script conserva los SHA-256 de cada archivo y el commit de Desktop.

El fondo `public/product-captures/editorial-stage.jpg` procede de la herramienta nativa de generación de imágenes. Dirección del prompt: escenario físico editorial panorámico, carbón mate, planos de vidrio y materiales con luz oliva a la izquierda y lavanda tenue a la derecha, espacio para componer una captura; sin texto, dispositivos, marcas ni interfaz. Se convirtió a JPEG al 85 % para reducir el peso; las tarjetas ilustrativas se construyen con los tokens de marca y las capturas originales permanecen en la galería. Las composiciones exportadas se guardan en `public/product-captures/compositions/`.

## Reproducir las capturas

Desde Desktop, inicia un renderer dedicado:

```bash
DOME_VITE_PORT=14573 pnpm run dev
```

Desde esta web:

```bash
DOME_MEDIA_RENDERER_URL=http://localhost:14573 node scripts/capture-dome-media.mjs ../dome
```

Se requieren las dependencias de Electron y Playwright del checkout Desktop. El script usa IPC y stores reales para navegar, espera a que terminen las transiciones y captura los componentes con `locator.screenshot`. Selecciona expresamente el puerto dedicado porque WindowManager todavía carga 5173 por defecto. El bridge IPC usa un puerto efímero. Los perfiles de demostración permanecen aislados del perfil personal.

Para exportar las seis composiciones desde el HTML construido, inicia `pnpm run start` en un puerto local y ejecuta `node scripts/export-product-compositions.mjs http://127.0.0.1:14330`. No modifica las capturas fuente. Las versiones `-en` localizan todos los textos de las tarjetas. Los PNG de la galería conservan el idioma de la instancia capturada. Las fichas usan estas composiciones también como imagen al compartir el enlace.

## Validación

`pnpm run verify`, `pnpm run test:e2e`, `pnpm run test:content-host` y `pnpm run catalog:check`. Las pruebas recorren las doce fichas en ambos idiomas, comprueban el manual integrado, los destinos de sus anclas, IDs únicos, imágenes cargadas, galería ampliable, ausencia de desbordamiento móvil y redirecciones 301 del servidor real. La documentación específica del CMS también describe repositorio, idiomas, colecciones, medios y publicación revisada de esta web.
