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

        // Obtener directorio y nombre del archivo sin extensión
        const dir = path.dirname(filePath);
        const fileNameWithoutExt = path.basename(filePath, fileExtension);

        // Reutilizar la terminal si existe, sino crear una nueva
        if (!nasmTerminal) {
            nasmTerminal = vscode.window.createTerminal('NASM Runner');
        }
        
        nasmTerminal.show();

        // Comandos limpios - se agregan a la terminal existente
        nasmTerminal.sendText(`cd "${dir}"`);
        nasmTerminal.sendText(`nasm -f win32 "${path.basename(filePath)}" -o "${fileNameWithoutExt}.obj"`);
        nasmTerminal.sendText(`gcc "${fileNameWithoutExt}.obj" -o "${fileNameWithoutExt}.exe"`);
        nasmTerminal.sendText(`.\\"${fileNameWithoutExt}.exe"`);
        nasmTerminal.sendText(`del "${fileNameWithoutExt}.obj"`);
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