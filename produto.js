const API_URL = 'https://stickstoreapi.is-going.live:25611/produtos';
const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get('id');

async function carregarProduto() {
    if (produtoId) {
        const resposta = await fetch(`${API_URL}/${produtoId}`);
        const produto = await resposta.json();

        document.getElementById('nome').value = produto.nome;
        document.getElementById('descricao').value = produto.descricao;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('imagem').value = produto.imagem;
    }
}

async function salvarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value;

    const produto = { nome, descricao, preco: Number(preco), imagem };

    let resposta;

    if (produtoId) {
        resposta = await fetch(`${API_URL}/${produtoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto),
        });
    } else {
        resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto),
        });
    }

    if (resposta.ok) {
        alert('Produto salvo com sucesso!');
        window.location.href = 'index.html'; // Volta para a página principal de produtos
    } else {
        alert('Erro ao salvar o produto.');
    }
}

document.getElementById('formProduto').addEventListener('submit', salvarProduto);

if (produtoId) {
    carregarProduto();
}
