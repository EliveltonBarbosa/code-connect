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

tagList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-tag')) {
        const toRemove = event.target.parentElement;
        tagList.removeChild(toRemove);
    }
});

const tagsDisponiveis = ['Front-end', 'Back-end', 'Programação', 'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Node', 'Express', 'MongoDB', 'SQL', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Flutter', 'Dart', 'Mobile', 'Web', 'Desktop', 'API', 'REST', 'GraphQL', 'Firebase', 'AWS', 'Azure', 'Heroku', 'Netlify', 'Vercel', 'Spring', 'Laravel', 'Django', 'Flask', 'Express', 'Nest', 'TypeORM', 'Sequelize', 'Mongoose', 'ORM', 'TypeScript', 'Sass', 'Less'];

async function checaTagsDisponiveis(tag) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(getTag(tag))
    }, 1000)
    });
}

function getTag(busca){
    var tagF = null
    tagsDisponiveis.forEach(tag => {
        if (tag.toLowerCase() === busca.trim().toLowerCase()) {
            tagF = tag;
        }
    });
    return tagF;
}

inputTags.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tag = inputTags.value.trim();
        if (tag) {
            try {
                const tagExiste = await checaTagsDisponiveis(tag);
                if (!tagExiste) {
                    alert('Tag não encontrada');
                } else {
                    const tagElement = document.createElement('li');
                    tagElement.innerHTML = `<p>${tagExiste}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    tagList.appendChild(tagElement);
                    inputTags.value = '';
                }
            } catch (error) {
                console.error(`Erro ao verificar tag:${error}`);
                alert('Tag inválida');
                inputTags.value = '';
                return;
            }
        }
    }
});


async function publicarProjeto(nome, descricao, tags) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve('Projeto publicado com sucesso!');
            } else {
                alert('Erro ao publicar projeto');
            }
        }, 1000);
    });
}

const botaoPublicar = document.querySelector('.botao-publicar');

botaoPublicar.addEventListener('click', async (event) => {
    event.preventDefault();
    const nomeProjeto = document.getElementById('nome').value.trim();
    const descricaoProjeto = document.getElementById('descricao').value;
    const tags = Array.from(tagList.querySelectorAll('p')).map(tag => tag.
    textContent);

    try {
        const response = await publicarProjeto(nomeProjeto, descricaoProjeto, tags);
        console.log(response)
        alert(response);
    } catch (error) {
        console.log(`Erro: ${error}`)
        alert('Deu tudo errado')
    }
    
});

const botaoDescartar = document.querySelector('.botao-descartar');

botaoDescartar.addEventListener('click', (event) => {
    event.preventDefault();
    
    const form = document.querySelector('form');
    form.reset();
    mainImagem.src = './img/imagem1.png';
    nomeImagem.textContent = 'imagem_projeto.png';
    tagList.innerHTML = '';
});