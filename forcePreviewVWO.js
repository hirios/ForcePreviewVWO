function obterTestes_VWO(nome_do_teste = false) {    
    const listaTestes = [];

    if (typeof window._vwo_exp !== 'undefined') {
        for (const testId in window._vwo_exp) {
            let expName = window._vwo_exp[testId].name;
            expName = expName.replace('\n', '').replace('\n\n', '');

            if (nome_do_teste && expName === nome_do_teste.trim()) {
                return testId;
            } else {
                listaTestes.push(expName);
            }
        }

        return listaTestes;
    }
    return null; 
}


function obterVariantes_VWO(idTesteVWO) {
    idTesteVWO = +idTesteVWO;
    const listaVariante = [];
    let contador = 1;
    for (const index in window._vwo_exp[idTesteVWO].comb_n) {
        const vanriante = window._vwo_exp[idTesteVWO].comb_n[index];
        listaVariante.push(`${vanriante}    |    Index: ${contador}`);
        contador += 1;
    }
    return listaVariante.join("\n\n"); 
}


function obterCookie(cookieNome) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + cookieNome + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


function excluirCookie(nome) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0]);
    
    if (cookies.includes(nome)) {
        document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}


function atualizarCookie(nome, novoValor, dias) {
    excluirCookie(nome.replace('combi', 'exclude'));
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=").map(part => part.trim());
        acc[key] = value;
        return acc;
    }, {});

    cookies[nome] = novoValor;

    let expires = "";
    if (dias) {
        const dataExpiracao = new Date();
        dataExpiracao.setTime(dataExpiracao.getTime() + dias * 24 * 60 * 60 * 1000);
        expires = "; expires=" + dataExpiracao.toUTCString();
    }

    for (const [key, value] of Object.entries(cookies)) {
        document.cookie = `${key}=${value}${expires}; path=/`;
    }
}


var listaTestesVWO = obterTestes_VWO();
var promptCustomizadoVWO = listaTestesVWO.map((i, index)=> i + `   |   Index: ${index + 1}`).join('\n\n');
var nomeDoTesteVWO = listaTestesVWO[+prompt('Selecione o index do teste:\n\n' + promptCustomizadoVWO) - 1];
var idTesteVWO = obterTestes_VWO(nomeDoTesteVWO);
var variantesVWO = obterVariantes_VWO(idTesteVWO);
var indexVarianteVWO = prompt('Escolha o index que deseja previsualizar:\n\n' + variantesVWO);
atualizarCookie(`_vis_opt_exp_${idTesteVWO}_combi`, indexVarianteVWO, 100); 
if (variantesVWO && indexVarianteVWO) {
    window.location.reload(true);
}
