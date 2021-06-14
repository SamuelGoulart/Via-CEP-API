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
    document.getElementById('cidade').value = endereco.estado_info.nome
    document.getElementById('estado').value = endereco.estado
}

const pesquisarCep = async () => {
    limparFormulario()
    const cep = document.getElementById('cep').value
    const headers = {'Authorization': 'Token token=06a691247d2badb41de9f87028cb939e'}
    const url = `http://www.cepaberto.com/api/v3/cep?cep=${cep}`
        const dados = await fetch(url, headers)
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
