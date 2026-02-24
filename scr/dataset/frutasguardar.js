const STORAGE_KEY = "fruteiras";

function salvarFruteira(fruteira) {
    const fruteiras = listarFruteiras();
    fruteiras.push(fruteira);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fruteiras));
}

function listarFruteiras() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function calcularIdadeEmMeses(dataPlantio) {
    const hoje = new Date();
    const plantio = new Date(dataPlantio);

    let anos = hoje.getFullYear() - plantio.getFullYear();
    let meses = hoje.getMonth() - plantio.getMonth();

    let idadeEmMeses = anos * 12 + meses;

    return idadeEmMeses >= 0 ? idadeEmMeses : 0; // evita idade negativa
}

function formatarIdade(idadeEmMeses) {
    const anos = Math.floor(idadeEmMeses / 12);
    const meses = idadeEmMeses % 12;

    if (anos > 0 && meses > 0) return `${anos} ano(s) e ${meses} mês(es)`;
    if (anos > 0) return `${anos} ano(s)`;
    return `${meses} mês(es)`;
}

// Formata a data do plantio para dd/mm/aaaa
function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
