const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, name: file.name });
        };
        reader.onerror = () => {
            reject(`Erro ao ler o arquivo ${file.name}`);
        }
        reader.readAsDataURL(file);
    });
}

const mainImagem = document.querySelector('.main-imagem');
const nomeImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImagem.src = fileContent.url;
            nomeImagem.textContent = fileContent.name;
        }
        catch (error) {
            console.error(`container-imagem-nome:${error}`);
            alert("Erro na leitura do arquivo");
        }
    }
});

const inputTags = document.getElementById('input-tags');
const tagList = document.getElementById('lista-tags');

inputTags.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tag = inputTags.value.trim();
        if (tag) {
            const tagElement = document.createElement('li');
            tagElement.innerHTML = `<p>${tag}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            tagList.appendChild(tagElement);
            inputTags.value = '';
        }
    }
});

tagList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-tag')) {
        const toRemove = event.target.parentElement;
        tagList.removeChild(toRemove);
    }
});