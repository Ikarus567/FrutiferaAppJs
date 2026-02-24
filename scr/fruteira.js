document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaFruteiras");
    const form = document.getElementById("formFruteira");

    // Carrega fruteiras na tela
    function carregarFruteiras() {
        lista.innerHTML = "";

        listarFruteiras().forEach(fruteira => {
            // Chama as funções já existentes em outro arquivo
            const dataFormatada = formatarData(fruteira.dataPlantio);
            const idade = calcularIdadeEmMeses(fruteira.dataPlantio);
            const idadeFormatada = formatarIdade(idade);

            lista.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow">
                        <div class="card-body">
                            <h5 class="card-title">${fruteira.nomePopular}</h5>
                            <p><strong>ID:</strong> ${fruteira.id}</p>
                            <p><strong>Nome Científico:</strong> ${fruteira.nomeCientifico}</p>
                            <p><strong>Produção:</strong> ${fruteira.producao} Kg</p>
                            <p><strong>Plantio:</strong> ${dataFormatada} (${idadeFormatada})</p>

                            <button class="btn btn-danger btn-sm mt-2"
                                onclick="excluirFruteira(${fruteira.id})">
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Evento de envio do formulário
    form.addEventListener("submit", e => {
        e.preventDefault();

        const fruteira = {
            id: Date.now(),
            nomePopular: document.getElementById("nomePopular").value,
            nomeCientifico: document.getElementById("nomeCientifico").value,
            producao: document.getElementById("producao").value,
            dataPlantio: document.getElementById("dataPlantio").value
        };

        salvarFruteira(fruteira);
        carregarFruteiras();
        form.reset();
    });

    // Função de excluir fruteira
    window.excluirFruteira = function (id) {
        let fruteiras = listarFruteiras();
        fruteiras = fruteiras.filter(fruteira => fruteira.id !== id);
        localStorage.setItem("fruteiras", JSON.stringify(fruteiras));
        carregarFruteiras();
    }

    // Carrega fruteiras ao iniciar
    carregarFruteiras();
});
