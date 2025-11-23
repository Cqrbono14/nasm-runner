# NASM Runner para Windows

Compila y ejecuta archivos de ensamblador NASM directamente desde VS Code con un solo clic en Windows.

## Características

- **Ejecución con un clic**: Compila y ejecuta desde el menú contextual
- **Formatos soportados**: `.asm`, `.nasm`, `.s`, `.txt`
- **Limpieza automática**: Elimina archivos temporales (.obj) después de ejecutar
- **Integración nativa**: Funciona directamente con NASM y GCC

## Uso

1. **Clic derecho** en cualquier archivo `.asm`, `.nasm`, `.s` o `.txt`
2. Selecciona **"Compilar y Ejecutar NASM"**
3. Observa el resultado en la terminal integrada

## Requisitos

- **NASM** instalado y disponible en el PATH
- **GCC** (MinGW) instalado y disponible en el PATH

## Comandos ejecutados automáticamente

```bash
nasm -f win32 archivo.asm -o archivo.obj
gcc archivo.obj -o archivo.exe
.\archivo.exe
del archivo.obj
```

## Instalación

1. Instala desde Visual Studio Marketplace
2. Recarga VS Code
3. ¡Listo para usar!

## Soporte

Si encuentras problemas:

- Verifica que NASM y GCC estén correctamente instalados y en PATH
- Asegúrate de que tu código NASM sea compatible con Windows

**Repositorio**: [github.com/Cqrbono14/nasm-runner](github.com/Cqrbono14/nasm-runner)