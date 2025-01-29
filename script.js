let receitas = [];

document.getElementById('receitaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nomeReceita = document.getElementById('nomeReceita').value;
    const ingredientesReceita = document.getElementById('ingredientesReceita').value;
    const metodoPreparo = document.getElementById('metodoPreparo').value;
    const categoriaReceita = document.getElementById('categoriaReceita').value;
    const imagemReceita = document.getElementById('imagemReceita').files[0];

    const formData = new FormData();
    formData.append('imagemReceita', imagemReceita);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    const imagemURL = data.imagePath;

    const ingredientesLista = ingredientesReceita
        .split('\n')
        .filter(line => line.trim() !== '')
        .map((line, index) => `${index + 1}. ${line.trim()}`)
        .join('<br>');

    const novaReceita = {
        nome: nomeReceita,
        ingredientes: ingredientesLista,
        metodoPreparo: metodoPreparo,
        categoria: categoriaReceita,
        imagem: imagemURL,
    };
    receitas.push(novaReceita);

    atualizarListaReceitas();
    document.getElementById('receitaForm').reset();
});

function atualizarListaReceitas() {
    const listaReceitas = document.getElementById('listaReceitas');
    listaReceitas.innerHTML = '';

    receitas.forEach((receita, index) => {
        const novaReceita = document.createElement('div');
        novaReceita.classList.add('receita');
        novaReceita.dataset.id = index;

        novaReceita.innerHTML = `
            <img src="${receita.imagem}" alt="${receita.nome}">
            <h3>${receita.nome}</h3>
            <p><strong>Categoria:</strong> ${receita.categoria}</p>
        `;

        novaReceita.addEventListener('click', () => mostrarDetalhesReceita(index));
        listaReceitas.appendChild(novaReceita);
    });
}

function mostrarDetalhesReceita(id) {
    const receita = receitas[id];
    document.getElementById('detalhesReceita').innerHTML = `
        <img src="${receita.imagem}" alt="${receita.nome}">
        <h2>${receita.nome}</h2>
        <p><strong>Ingredientes:</strong><br>${receita.ingredientes}</p>
        <p><strong>Método de Preparação:</strong><br>${receita.metodoPreparo}</p>
        <p><strong>Categoria:</strong> ${receita.categoria}</p>
    `;

    document.getElementById('paginaInicial').style.display = 'none';
    document.getElementById('paginaDetalhes').style.display = 'block';
}

document.getElementById('voltarBtn').addEventListener('click', () => {
    document.getElementById('paginaInicial').style.display = 'block';
    document.getElementById('paginaDetalhes').style.display = 'none';
});

document.getElementById('year').textContent = new Date().getFullYear();