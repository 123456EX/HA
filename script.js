//⭓⭓⭓⭓⭓
var nut = ["H2O", "Fat", "K", "Ca", "Na", "Mg", "Zn", "Cu", "Fe", "VA", "VB", "VC", "VD"];
var nut_compl = ["H2O", "Fat", "&nbsp;&nbsp;K", "&nbsp;Ca", "&nbsp;Na", "&nbsp;Mg", "&nbsp;Zn", "&nbsp;Cu", "&nbsp;Fe", "&nbsp;VA", "&nbsp;VB", "&nbsp;VC", "&nbsp;VD"];
var mol = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//Aqua 水 Fat脂肪 
function Add(p) {
    if (mol[p] == 50) return;
    mol[p]++;
    console.log($(`div.elelist1 .tab ${nut[p]}`));
    // $(`div.elelist .tab .${nut[p]}`).append(`<button class="block"/>`);
    $(`div.elelist .tab .${nut[p]}`).append(`⭓`);
    $(`.elemass${p} `).text(mol[p]);
};
function Del(u, p) {
    if (!mol[p]) return;
    mol[p]--;
    // $(`div.elelist .${nut[p]} .tab .block`).last()[0].remove(`<button class="block"/>`);
    $(`div.elelist .${nut[p]} .tab .block`).last()[0].remove(`⭓`);
    $(`.elemass${p} `).text(mol[p]);
};
$(document).ready(() => {
    x = 0;
    nut.forEach((item, index) => {
        console.log(item);
        $(`div.elelist`).append(`
		<div class="tab">
            <span class="elename">${nut_compl[index]}</span>
            <span class="elemass${index}">${mol[index]}</span>
			<div class="${item} inline">
            </div>
		</div>`);
    });
})
var compounds = ["NaCl", "Na2SO4", "NaNO3", "KCl", "K2SO4", "KNO3", "CaCl2", "CaSO4", "Ca(NO3)2", "ZnCl2", "ZnSO4", "Zn(NO3)2", "MgCl2", "MgSO4", "Mg(NO3)2", "ZnCl2", "ZnSO4", "Zn(NO3)2", "CuCl2", "CuSO4", "Cu(NO3)2", "FeCl2", "FeSO4", "Fe(NO3)2", "FeCl3", "Fe2(SO4)3", "Fe(NO3)3", "HCl", "H2SO4", "HNO3", "NaOH", "KOH", "CaOH"];
var comcation = ["Na", "Na", "Na", "K", "K", "K", "Ca", "Ca", "Ca", "Zn", "Zn", "Zn", "Mg", "Mg", "Mg", "Zn", "Zn", "Zn", "Cu", "Cu", "Cu", "Fe", "Fe", "Fe", "Fe", "Fe", "Fe", "H", "H", "H", "Na", "K", "Ca"];
var cationnum = [4, 4, 4, 2, 2, 2, 3, 3, 3, 6, 6, 6, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 114, 114, 114, 4, 2, 3];
function produc() {
    var medi = parseInt(Math.floor(Math.random() * 34) + 1);
    console.log(medi, compounds[medi], cationnum[medi]);
    Add(cationnum[medi]);
}