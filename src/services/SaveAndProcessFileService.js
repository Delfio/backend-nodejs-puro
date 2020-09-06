const nodePath = require('path');
const fs = require('fs');

class SaveAndProcessFileService {
    constructor() {
        this.pathTemp = nodePath.resolve(__dirname, '..', '..', 'temp');
        this.subfix = new Date().getTime();
    } 
    async Executar({path, name}) {
        if(!fs.existsSync(path)) {
            throw new Error("Erro ao processar a imagem!")
        }

        const novoNome = `${this.subfix}.png`;
        const newPath = nodePath.resolve(this.pathTemp, novoNome);

        fs.copyFileSync(path, newPath);

        return newPath;
    }
}

module.exports = new SaveAndProcessFileService();