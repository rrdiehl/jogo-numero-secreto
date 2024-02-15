// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragraf = document.querySelector('p');
// paragraf.innerHTML = 'Escolha um número entre 1 e 10.';

let listaNumSorteados = [];
let numLimite = 10;
let numeroSecreto = gerarNumAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagem() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10.');
}

exibirMensagem();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Parabéns!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('h1', 'Tente novamente :(');
            exibirTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTexto('h1', 'Tente novamente :(');
            exibirTexto('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let quantElementosLista = listaNumSorteados.length;

    if (quantElementosLista == numLimite) {
        listaNumSorteados = [];
    }

    if (listaNumSorteados.includes(numEscolhido)) {
        return gerarNumAleatorio();
    } else {
        listaNumSorteados.push(numEscolhido);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}