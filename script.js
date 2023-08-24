//⭓⭓⭓⭓⭓
var nut = ["H2O", "Fat", "K", "Ca", "Na", "Mg", "Zn", "Cu", "Fe", "VA", "VB", "VC", "VD"];
var nut_compl = ["H2O", "Fat", "&nbsp;&nbsp;K", "&nbsp;Ca", "&nbsp;Na", "&nbsp;Mg", "&nbsp;Zn", "&nbsp;Cu", "&nbsp;Fe", "&nbsp;VA", "&nbsp;VB", "&nbsp;VC", "&nbsp;VD"];
var mol = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var colorset = ["hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(24, 100%, 50%)", "hsl(32, 100%, 50%)", "hsl(41, 100%, 50%)", "hsl(53, 100%, 50%)", "hsl(63, 100%, 50%)", "hsl(71, 100%, 50%)", "hsl(83, 100%, 50%)", "hsl(93, 100%, 50%)", "hsl(93, 100%, 50%)", "hsl(83, 100%, 50%)", "hsl(71, 100%, 50%)", "hsl(63, 100%, 50%)", "hsl(53, 100%, 50%)", "hsl(41, 100%, 50%)", "hsl(32, 100%, 50%)", "hsl(24, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 50%)", "hsl(0, 100%, 48%)", "hsl(0, 100%, 46%)", "hsl(0, 100%, 44%)", "hsl(0, 100%, 42%)", "hsl(0, 100%, 40%)", "hsl(0, 100%, 38%)", "hsl(0, 100%, 36%)", "hsl(0, 100%, 34%)", "hsl(0, 100%, 32%)", "hsl(0, 100%, 30%)", "hsl(0, 100%, 28%)", "hsl(0, 100%, 26%)", "hsl(0, 100%, 24%)", "hsl(0, 100%, 22%)", "hsl(0, 100%, 20%)", "hsl(0, 100%, 18%)", "hsl(0, 100%, 16%)", "hsl(0, 100%, 14%)", "hsl(0, 100%, 12%)", "hsl(0, 100%, 10%)", "hsl(0, 100%, 8%)", "hsl(0, 100%, 6%)", "hsl(0, 100%, 5%)", "hsl(0, 100%, 4%)", "hsl(0, 100%, 3%)", "hsl(0, 100%, 2%)"];
var compounds = ["NaCl", "Na2SO4", "NaNO3", "KCl", "K2SO4", "KNO3", "CaCl2", "CaSO4", "Ca(NO3)2", "MgCl2", "MgSO4", "Mg(NO3)2", "ZnCl2", "ZnSO4", "Zn(NO3)2", "CuCl2", "CuSO4", "Cu(NO3)2", "FeCl2", "FeSO4", "Fe(NO3)2", "FeCl3", "Fe2(SO4)3", "Fe(NO3)3", "HCl", "H2SO4", "HNO3", "NaOH", "KOH", "CaOH"];
var comcation = ["Na", "Na", "Na", "K", "K", "K", "Ca", "Ca", "Ca", "Mg", "Mg", "Mg", "Zn", "Zn", "Zn", "Cu", "Cu", "Cu", "Fe", "Fe", "Fe", "Fe", "Fe", "Fe", "H", "H", "H", "Na", "K", "Ca"];
var cationnum = [4, 4, 4, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 114, 114, 114, 4, 2, 3];
//Aqua 水 Fat脂肪 
function Add(p) {
    if (mol[p] == 50) return;
    mol[p]++;
    console.log($(`div.elelist1 .tab ${nut[p]}`));
    $(`div.elelist .tab .${nut[p]}`).append(
        `<font style='color: ${colorset[mol[p]]}'>⭓</font>`
    );
    $(`.elemass${p} `).text(mol[p]);
};
function Del(p) {
    if (!mol[p]) return;
    mol[p]--;
    $(`div.elelist .${nut[p]} .tab .block`).last()[0].remove(
        `<font style='color: ${colorset[mol[p] + 1]}'>⭓</font>`
    );
    $(`.elemass${p} `).text(mol[p]);
}
$(document).ready(() => {
    x = 0;
    nut.forEach((item, index) => {
        // console.log(item);
        $(`div.elelist`).append(`
		<div class="tab">
            <span class="elename">${nut_compl[index]}</span>
            <span class="elemass${index}">${mol[index]}</span>
			<div class="${item} inline"></div>
        </div>`);
    });
})
function produc() {
    var medi = parseInt(Math.floor(Math.random() * 30));
    console.log(medi, compounds[medi], cationnum[medi]);
    Add(cationnum[medi]);
    $(`.interface`).append(
        `<div class="">${katex.renderToString(`\\ce{${compounds[medi]}}`)}</div>`
    );
}