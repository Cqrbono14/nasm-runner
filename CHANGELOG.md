# Change Log

Todas las modificaciones notables de esta extensión se documentarán en este archivo.    

## [1.1.0] - 2024-01-20

### Added
- **Soporte para win64**: Ahora puedes compilar para arquitectura de 64 bits
- **Configuración de arquitectura**: Opción para elegir entre win32 y win64
- **Conservar archivos .obj**: Configuración para mantener o eliminar archivos objeto
- **Panel de configuración**: Interfaz en settings.json para personalizar el comportamiento

### Features
- Detección automática de configuración del usuario
- Mensajes informativos sobre la configuración usada
- Flexibilidad en el manejo de archivos temporales

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