'use strict'

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const pesquisarCep = async () => {
    limparFormulario()
    const cep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`

        const dados = await fetch(url)
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!'
        } else {
            preencherFormulario(endereco)
        }
}

const applyCepMask = (cep) => {
    return cep
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
}
const applyMask = (event) => {
    event.target.value = applyCepMask(event.target.value)
}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep)

document.getElementById('cep')
    .addEventListener('keyup', applyMask)