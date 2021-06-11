'use strict'

const endereco = document.getElementById('endereco')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const estado = document.getElementById('estado')

const mostrarDados = (data) => {
    endereco.value = data.logradouro
    bairro.value = data.bairro
    cidade.value = data.localidade
    estado.value = data.uf
}

const getAPI = () => {
    const cep = document.getElementById('cep').value
    if (cep.length == 9) {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        //resultado.textContent = "Samuel Goulart"

        //Arrow functions forma mais curta de definir function 
        fetch(url).then(response => response.json()).then(data => mostrarDados(data))
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
    .addEventListener('keyup', applyMask)

document.getElementById('cep')
    .addEventListener('keyup', getAPI)

