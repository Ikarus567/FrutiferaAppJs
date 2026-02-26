// Aqui é criado uma constante chamada "STORAGE_KEY", onde iremos utilizar para poder ser salvar no localStorage. E como é "const", não dá pra trocar esse valor depois.
const STORAGE_KEY = "fruteiras";

// "function" é utilizado para definir uma função, e está função responsável por salvar uma fruteira nova, ela recebe um objeto "fruteira" como parâmetro.
function salvarFruteira(fruteira) {
    const fruteiras = listarFruteiras();      // Chama a função listarFruteiras() e armazena o retorno na constante fruteiras. Aqui estamos pegando a lista já salva no localStorage.
    fruteiras.push(fruteira);      // Adiciona a nova fruteira no final do array. o metodo push() basicamente diz: "coloca mais um aqui no final".
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fruteiras));  // localStorage.setItem salva um valor no armazenamento do navegador o primeiro argumento: chave (STORAGE_KEY).
    // Segundo argumento: valor convertido para JSON (string). E o JSON.stringify transforma o array em texto para poder ser armazenado.
}

// Função que busca as fruteiras já salvas.
function listarFruteiras() {
    
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];      // Pega do localStorage usando a chave. O JSON.parse transforma o texto de volta em array. caso não tivesse nada salvo ainda, retorna um array vazio.
}

// Essa função calcula a idade da fruteira em meses. Ela vai receber a data de plantio como parâmetro.
function calcularIdadeEmMeses(dataPlantio) {
    const hoje = new Date();    // Cria um objeto Date com a data atual. "new Date()" instancia um novo objeto de data.
    const plantio = new Date(dataPlantio);    // Cria um objeto Date com a data recebida como parâmetro.

    let anos = hoje.getFullYear() - plantio.getFullYear();   // Calcula a diferença de anos entre a data atual e a data de plantio. getFullYear() retorna o ano com 4 dígitos.
    let meses = hoje.getMonth() - plantio.getMonth(); // Calcula a diferença de meses entre as duas datas, por exemplo o getMonth() retorna o mês (0 = janeiro, 11 = dezembro).

    let idadeEmMeses = anos * 12 + meses;     // Converte tudo para meses. Multiplica anos por 12 e soma os meses restantes.

    // O "if" testa uma condição (idadeEmMeses >= 0), ele verifica se a idade em meses é maior ou igual a zero.
    if (idadeEmMeses >= 0) {
        return idadeEmMeses;// Se a condição for verdadeira (true), então retorna o próprio valor calculado.
    } else {  // O "else" executa quando a condição do if for falsa.
        return 0; // e devolve 0 pra não ficar estranho
    } 
}

// Declara a função formatarIdade, que recebe idade em meses.
function formatarIdade(idadeEmMeses) {
    const anos = Math.floor(idadeEmMeses / 12); // Math.floor arredonda para baixo. Divide por 12 para converter meses em anos.
    const meses = idadeEmMeses % 12; // O operador % (módulo) retorna o resto da divisão, o resto é obtido quando os meses restantes após dividir por 12.

    if (anos > 0 && meses > 0) return `${anos} ano(s) e ${meses} mês(es)`; // Estrutura condicional if que se anos for maior que 0 E meses maior que 0, retorna string com ambos. Template string usa crases (`) e ${} para poder inserir os valores de forma dinâmica
    if (anos > 0) return `${anos} ano(s)`; // Se só tiver anos
    return `${meses} mês(es)`;  // Caso contrário, retorna apenas meses.
}

// Formata a data do plantio para dd/mm/aaaa
function formatarData(data) {
    const partes = data.split("-");    // Utilizando o .slpit() divide a string usando o "-" como separador, isso vira um array: [ano, mes, dia].
    return `${partes[2]}/${partes[1]}/${partes[0]}`;    // Retorna uma template string reorganizando para dd/mm/aaaa. (partes[2] = dia, partes[1] = mês, partes[0] = ano)
}


