const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function readFileContent(file) {
    return new Promise((resolve,  reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({url: reader.result, name: file.name});
        };
        reader.onerror = () => {
            reject(`Erro ao ler o arquivo ${file.name}`);
        }
        reader.readAsDataURL(file);
    });
}

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        await readFileContent(file);
    }
});

// document.getElementById('imageInput').addEventListener('change', function(event) {
//     const file = event.target.files[0]; // Pegando o arquivo selecionado pelo usuário
//     if (file) {
//         const reader = new FileReader(); // Criando uma instância do FileReader
//         reader.onload = function(e) {
//             const preview = document.getElementById('preview');
//             preview.src = e.target.result; // Atribuindo o resultado da leitura como fonte da imagem de pré-visualização
//             preview.style.display = 'block'; // Tornando a pré-visualização visível
//         };
//         reader.readAsDataURL(file); // Lendo o arquivo como um Data URL
//     }
// });