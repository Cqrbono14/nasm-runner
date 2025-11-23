const vscode = require('vscode');
const path = require('path');

// Terminal global que se reutiliza
let nasmTerminal = null;

function activate(context) {
    let disposable = vscode.commands.registerCommand('nasm-runner.runFile', function (uri) {
        const filePath = uri ? uri.fsPath : vscode.window.activeTextEditor?.document.fileName;
        
        // Validación de la ruta del archivo
        if (!filePath) {
            vscode.window.showErrorMessage('No se pudo obtener la ruta del archivo');
            return;
        }

        // Validación de la extensión del archivo
        const supportedExtensions = ['.asm', '.nasm', '.s', '.txt'];
        const fileExtension = path.extname(filePath).toLowerCase();

        // Verificar si la extensión es soportada
        if (!supportedExtensions.includes(fileExtension)) {
            vscode.window.showErrorMessage(`Extensión no soportada. Use: ${supportedExtensions.join(', ')}`);
            return;
        }

        // Obtener configuración del usuario
        const config = vscode.workspace.getConfiguration('nasmRunner');
        const architecture = config.get('architecture') || 'win32';
        const keepObjFiles = config.get('keepObjFiles') || false;

        // Obtener directorio y nombre del archivo sin extensión
        const dir = path.dirname(filePath);
        const fileNameWithoutExt = path.basename(filePath, fileExtension);

        // Reutilizar la terminal si existe, sino crear una nueva
        if (!nasmTerminal) {
            nasmTerminal = vscode.window.createTerminal('NASM Runner');
        }
        
        nasmTerminal.show();

        // Comandos según configuración
        nasmTerminal.sendText(`cd "${dir}"`);
        nasmTerminal.sendText(`nasm -f ${architecture} "${path.basename(filePath)}" -o "${fileNameWithoutExt}.obj"`);
        nasmTerminal.sendText(`gcc "${fileNameWithoutExt}.obj" -o "${fileNameWithoutExt}.exe"`);
        nasmTerminal.sendText(`.\\"${fileNameWithoutExt}.exe"`);
        
        // Solo eliminar .obj si el usuario no quiere conservarlos
        if (!keepObjFiles) {
            nasmTerminal.sendText(`del "${fileNameWithoutExt}.obj"`);
        }

        // Mostrar información de la configuración usada
        const archText = architecture === 'win64' ? '64 bits' : '32 bits';
        const keepText = keepObjFiles ? 'SÍ' : 'NO';
        vscode.window.showInformationMessage(`NASM: Arquitectura ${archText} | Conservar .obj: ${keepText}`);
    });

    context.subscriptions.push(disposable);
}

// Limpieza de la terminal al desactivar la extensión
function deactivate() {
    if (nasmTerminal) {
        nasmTerminal.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};