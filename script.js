async function buscaEndereco(cep) {
    var msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaCepConvert = await consultaCep.json();
        if (consultaCepConvert.erro) {
            throw Error('Esse cep não existe')
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvert.localidade;
        logradouro.value = consultaCepConvert.logradouro
        estado.value = consultaCepConvert.uf
        bairro.value = consultaCepConvert.bairro

        console.log(consultaCepConvert);
        return consultaCepConvert;
    } catch (erro) {
        msgErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        console.log(erro);
    }
}
/*let ceps = ['73105900', '01001000', ]
let conjuntosCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntosCeps).then(respostas => console.log(respostas))

/* possivel CALLBACK HELL
.then(resposta => resposta.json())
.then(r=> {
    if(r.erro) {
        throw Error('Esse cep não existe')
    } else
    console.log(r)
})
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processamento concluído'));
*/
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
