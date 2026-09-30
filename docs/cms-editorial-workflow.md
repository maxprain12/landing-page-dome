# Gestionar esta web con Dome CMS

Repositorio: `maxprain12/landing-page-dome`. URL pública: `https://dome.dowi.es`. Rama publicada: `main`; para probar usa una rama creada expresamente, por ejemplo `docs/cms-editorial-check`, nunca `main`.

1. Instala Dome CMS desde Complementos y revisa `notes.read`, `notes.write` y `content.publish`.
2. Conecta GitHub con permiso de escritura. En Ajustes → Plugins configura un sitio y una bóveda exclusiva para esta web.
3. Detecta la estructura y verifica las reglas:

| Colección | Idioma | Carpeta |
| --- | --- | --- |
| blog | es | src/content/blog/es |
| blog | en | src/content/blog/en |
| manual | es | src/content/manual/es |
| manual | en | src/content/manual/en |

El primer idioma es `es`, sin prefijo; `en` usa `/en`. Las URLs son `/blog/<slug>` y `/manual/<slug>`; los otros idiomas añaden el prefijo. Campos: `title`, `date`, `description`, `slug`; `cover` es opcional y `tags` admite una lista. El archivo se llama `<slug>.md`. Las imágenes nuevas se publican en `public/media/<slug>/`.

## Prueba editorial sin publicar

Crea la rama de prueba desde la PR actual o desde main una vez fusionada. Configura esa rama en el sitio CMS. Sincroniza posts, abre un manual, modifica un borrador y guarda. Prepara la publicación, revisa las rutas, campos, imágenes y revisión base. Cancela antes de aprobar Publicar. No sincronices nuevamente sobre un borrador que quieras conservar sin revisar el comportamiento de actualización.

La comprobación local usa las pruebas de `cms-sites`, `cms-tools`, sincronización y publicación del repositorio Desktop. Una comprobación real del sitio requiere la conexión GitHub y el perfil Dome del usuario; no se considera realizada por pasar pruebas unitarias.

## Catálogo y páginas de funciones

Se mantienen como datos estructurados en el repositorio, fuera de las colecciones CMS. Para importar el catálogo editorial validado de Desktop:

```bash
pnpm run catalog:import
pnpm run catalog:check
pnpm run verify
```

También puedes proporcionar una ruta al checkout de Desktop: `node scripts/import-complements-catalog.mjs /ruta/a/dome`. El script verifica IDs, versiones y permisos contra los manifiestos, y no importa comandos ejecutables en la web. Commit del snapshot y revisión en PR, nunca actualización silenciosa en producción.

## Comprobación aislada contra una rama real

Con ambos checkouts y `gh` autenticado, ejecuta `pnpm run check:cms-editorial -- ../dome feat/complements-documentation`. El script usa el servicio CMS real para sincronizar los 28 manuales desde esa rama, editar una nota y preparar su publicación. La base SQLite y la bóveda son temporales; las funciones de escritura remota están bloqueadas y se verifica que el SHA remoto no cambie. No modifica el perfil Dome del usuario. Esta prueba cubre Markdown; las imágenes tienen pruebas separadas en Desktop.

Comprobado el 2026-09-30 contra `feat/complements-documentation`: 28 manuales sincronizados, una edición guardada en bóveda temporal y publicación preparada, sin escrituras remotas. No se configuró ni modificó el perfil Dome del usuario.
