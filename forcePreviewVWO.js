
function obterIdTeste_VWO(nome_do_teste) {
    if (typeof window._vwo_exp != 'undefined') {
        for (const testId in window._vwo_exp) {
            if (window._vwo_exp[testId].name === nome_do_teste) {
                return testId;
            }
        }
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

function atualizarCookie(nome, novoValor, dias) {
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

var nomeDoTesteVWO = prompt('Nome do teste').trim();
var idTesteVWO = obterIdTeste_VWO(nomeDoTesteVWO);
var variantesVWO = obterVariantes_VWO(idTesteVWO);
var indexVarianteVWO = prompt('Escolha o index que deseja previsualizar:\n\n' + variantesVWO);
atualizarCookie(`_vis_opt_exp_${idTesteVWO}_combi`, indexVarianteVWO, 100); 
if (variantesVWO && indexVarianteVWO) {
    window.location.reload(true);
}
