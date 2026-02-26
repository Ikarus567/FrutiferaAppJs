// document.addEventListener adiciona um "ouvinte" de evento ao documento. Quando o HTML for completamente carregado "DOMContentLoaded" é ativado
document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaFruteiras");      // Busca no HTML o elemento com id="listaFruteiras" e então o getElementById retorna um elemento do DOM.
    const form = document.getElementById("formFruteira");    // Busca o formulário com id="formFruteira"

    // Carrega fruteiras na tela onde essa função será responsável por renderizar as fruteiras na tela.
    function carregarFruteiras() {
         // innerHTML = "" limpa todo o conteúdo HTML interno do elemento com isso evita que haja uma duplicação ao recarregar a lista.
        lista.innerHTML = "";

         // listarFruteiras() retorna um array. que com o forEach ira percorrer cada elemento do array.
        listarFruteiras().forEach(fruteira => {
            // Chama as funções já existentes em outro arquivo
            const dataFormatada = formatarData(fruteira.dataPlantio);
            const idade = calcularIdadeEmMeses(fruteira.dataPlantio);
            const idadeFormatada = formatarIdade(idade);

            
        
            // += adiciona conteúdo ao HTML existente.
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

    // Evento de envio do formulário e o "submit" acontece quando o usuário envia o formulário.
    form.addEventListener("submit", e => {
        e.preventDefault();// preventDefault() impede o comportamento padrão do formulário o comportamento sendo recarregar a página.

        const fruteira = {
            id: Date.now(), // Date.now() gera um número baseado no tempo atual sendo usado para criar um ID único

            // .value vai pegar o valor que foi digitado no input
            nomePopular: document.getElementById("nomePopular").value,
            nomeCientifico: document.getElementById("nomeCientifico").value,
            producao: document.getElementById("producao").value,
            dataPlantio: document.getElementById("dataPlantio").value
        };

        salvarFruteira(fruteira); // Salva o objeto no localStorage.
        carregarFruteiras();// Atualiza a lista na tela.
        form.reset();// reset() limpa os campos do formulário.
    });

    // Define a função excluirFruteira no escopo global (window).
    window.excluirFruteira = function (id) {
        let fruteiras = listarFruteiras();    // Recupera a lista atual.
        fruteiras = fruteiras.filter(fruteira => fruteira.id !== id);    // O .filter() cria um novo array com elementos que atendem à condição onde ele pega todas as fruteiras e mantém só as que têm ID diferente do que deseja apagar.
        localStorage.setItem("fruteiras", JSON.stringify(fruteiras));  // Atualiza o localStorage com a nova lista. 
        carregarFruteiras();// Atualiza a tela.
    }

    // Carrega fruteiras ao iniciar
    carregarFruteiras();
});

