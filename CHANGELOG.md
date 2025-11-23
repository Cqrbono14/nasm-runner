# Change Log

Todas las modificaciones notables de esta extensión se documentarán en este archivo.

## [1.0.0] - 11-20-2025

### Added
- Función principal para compilar y ejecutar archivos NASM desde el menú contextual
- Soporte para múltiples extensiones: `.asm`, `.nasm`, `.s`, `.txt`
- Terminal reutilizable que mantiene el historial entre ejecuciones
- Limpieza automática de archivos objeto (.obj) después de la ejecución
- Icono de la extensión para mejor identificación visual

### Features
- Compilación automática con NASM en formato win32
- Enlace con GCC para generar ejecutables
- Ejecución directa del programa compilado
- Manejo de rutas con espacios y caracteres especiales
- Compatibilidad con PowerShell en Windows