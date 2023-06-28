const modalWrapper = document.querySelector(".modal-wrapper")
const spanTermos = document.querySelector(".termos span")
const buttonClose = document.querySelector("button")
const inputCpf = document.querySelector("#cpf")
const inputFone = document.querySelector("#fone")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")
const eyePassword = document.querySelector("#eyePassword")
const eyeConfirmPassword = document.querySelector("#eyeConfirmPassword")
const alertError = document.querySelector(".alert-error")
const textError = document.querySelector(".alert-error p")
const form = document.querySelector("form")
const main = document.querySelector("main")
const modalSuccess = document.querySelector(".modal-success")
const inputName = document.querySelector("#name")
const successName = document.querySelector(".modal-success span")
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const uf = document.querySelector('#estado')
const cidade = document.querySelector('#cidade')



spanTermos.addEventListener('click', openModal)
buttonClose.addEventListener('click',closeModal)
inputCpf.addEventListener('keypress',completeCpf)
inputFone.addEventListener('keypress', completeFone)
eyePassword.addEventListener('click', clickEyePassword)
eyeConfirmPassword.addEventListener('click', clickEyeConfirmPassword)

uf.addEventListener('change', async function(){
    const urlCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf.value+'/municipios'
    const requestCidade = await fetch(urlCidades)
    const responseCidade = await requestCidade.json()

    let options = ''
    responseCidade.forEach(function(cidades){
        options += '<option>' +cidades.nome+'</option>'
    })
    cidade.innerHTML = options
})

window.addEventListener('load', async ()=>{
    const request = await fetch(urlUF)
    const response = await request.json()

    const options = document.createElement('optgroup')
    options.setAttribute('label', 'UFs')
    response.forEach(function(uf){
        options.innerHTML += '<option>'+uf.sigla+'<option>'
        console.log(options)
    })

    uf.append(options)
})


function openModal(){
    modalWrapper.classList.add("open")
}

function closeModal(){
    modalWrapper.classList.remove("open")
}

function completeCpf(){
    let cpflength = inputCpf.value.length

    if (cpflength === 3 || cpflength === 7){
        inputCpf.value += "."
    }

    if (cpflength === 11){
        inputCpf.value += "-"
    }
}

function completeFone() {
    let fonelength = inputFone.value.length

    if (fonelength === 0){
        inputFone.value += "("
    }

    if (fonelength === 3){
        inputFone.value += ")"
    }

    if (fonelength === 5){
        inputFone.value += "."
    }

    if (fonelength === 10){
        inputFone.value += "-"
    }
}

function clickEyePassword(){
    let inputTypeIsPassword = password.type == "password"

    if(inputTypeIsPassword){
        password.setAttribute("type", "text")
        eyePassword.setAttribute("src","/images/olho.png")
    } else {
        password.setAttribute("type", "password")
        eyePassword.setAttribute("src","/images/invisivel.png")
    }
   
}

function clickEyeConfirmPassword(){
    let inputTypeIsPassword = confirmPassword.type == "password"

    if(inputTypeIsPassword){
        confirmPassword.setAttribute("type", "text")
        eyeConfirmPassword.setAttribute("src","/images/olho.png")
    } else {
        confirmPassword.setAttribute("type", "password")
        eyeConfirmPassword.setAttribute("src","/images/invisivel.png")
    }
   
}

inputCpf.oninput = () => {alertError.classList.remove("open")}
inputFone.oninput = () => {alertError.classList.remove("open")}
password.oninput = () => {alertError.classList.remove("open")}
confirmPassword.oninput = () => {alertError.classList.remove("open")}


form.onsubmit = event =>{

    let cpfError = inputCpf.value.length
    let foneError = inputFone.value.length
    let newName = inputName.value

    if(cpfError < 14){
        event.preventDefault()
        alertError.classList.add("open")
        return;
    } else if (foneError < 15){
        event.preventDefault()
        alertError.classList.add("open")
        let message = "O NÚMERO DO TELEFONE ESTÁ INCOMPLETO"
        textError.innerText = message
        return
    } else if (password.value != confirmPassword.value){
        event.preventDefault()
        alertError.classList.add("open")
        let message = "AS SENHAS DEVEM SER IGUAIS"
        textError.innerText = message
        return
    }

    alertError.classList.remove("open")

    main.classList.remove("open")
    modalSuccess.classList.add("open")
    successName.innerText = newName
    event.preventDefault()

}