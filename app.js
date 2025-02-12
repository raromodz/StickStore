const API_URL = '109.71.252.191:25611/produtos';

let produtos = [];

async function carregarProdutos() {
    const resposta = await fetch(API_URL);
    produtos = await resposta.json();
    exibirProdutos();
}

function exibirProdutos() {
    const produtoList = document.getElementById('produto-list');
    produtoList.innerHTML = '';

    produtos.forEach((produto, index) => {
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('product-card');
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h4>${produto.nome}</h4>
            <p>${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco}</p>
            <button class="button" onclick="editarProduto(${index})">Editar</button>
            <button class="button" onclick="excluirProduto(${index})">Excluir</button>
        `;
        produtoList.appendChild(produtoCard);
    });
}

async function adicionarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value;

    const novoProduto = { nome, descricao, preco: Number(preco), imagem };

    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto)
    });

    if (resposta.ok) {
        carregarProdutos();
    }
}

async function editarProduto(index) {
    const produto = produtos[index];
    const nome = prompt('Nome:', produto.nome);
    const descricao = prompt('Descrição:', produto.descricao);
    const preco = prompt('Preço:', produto.preco);
    const imagem = prompt('URL da Imagem:', produto.imagem);

    if (nome && descricao && preco && imagem) {
        await fetch(`${API_URL}/${produto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, descricao, preco: Number(preco), imagem })
        });
        carregarProdutos();
    }
}

async function excluirProduto(index) {
    const produto = produtos[index];

    if (confirm(`Tem certeza que deseja excluir ${produto.nome}?`)) {
        await fetch(`${API_URL}/${produto.id}`, { method: 'DELETE' });
        carregarProdutos();
    }
}

document.getElementById('adicionar-form').addEventListener('submit', adicionarProduto);

carregarProdutos();
