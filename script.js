const URL = "http://localhost:3000/jogos";
const form = document.getElementById("form-jogo");
const lista = document.getElementById("lista-jogos");

document.addEventListener("DOMContentLoaded", carregarJogos);

function carregarJogos() {
    fetch(URL)
        .then(res => res.json())
        .then(dados => {
            lista.innerHTML = "";
            dados.forEach(j => {
                lista.innerHTML += `
                    <div class="card">
                        <h3>${j.titulo} (${j.nota})</h3>
                        <p>${j.genero} - ${j.plataforma} [${j.status}]</p>
                        <button onclick="excluir('${j.id}')">Excluir</button>
                    </div>
                `;
            });
        });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const jogo = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        plataforma: document.getElementById("plataforma").value,
        nota: Number(document.getElementById("nota").value),
        status: document.getElementById("status").value
    };

    fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jogo)
    }).then(() => {
        form.reset();
        carregarJogos();
    });
});

function excluir(id) {
    fetch(`${URL}/${id}`, { method: "DELETE" })
        .then(() => carregarJogos());
}