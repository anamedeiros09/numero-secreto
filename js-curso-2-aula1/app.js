let listaDeNúmerosSorteados = [];
let númeroLimite = 10;
let númeroSecreto = gerarNúmeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == númeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com  ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > númeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        tentativas++; 
        limparCampo();
    }
}

function gerarNúmeroAleatorio() {
    let númeroEscolhido = parseInt(Math.random() * númeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNúmerosSorteados.length;

    if (quantidadeDeElementosNaLista == númeroLimite) {
        listaDeNúmerosSorteados = [];
    }
    if (listaDeNúmerosSorteados.includes(númeroEscolhido)) {
        return gerarNúmeroAleatorio();
    } else {
        listaDeNúmerosSorteados.push(númeroEscolhido);
        console.log(listaDeNúmerosSorteados)
    return númeroEscolhido;
    }
} 

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    númeroSecreto = gerarNúmeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}