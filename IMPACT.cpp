/*
  养鱼
  md, 写得这么 nb, wc --- 鱼划
  tmd网络怎么写 ()
  tmd不会读 ()
*/
#include <bits/stdc++.h>
using namespace std;

struct Simple_Compounds
{             // 简单的化合物
    bool tag; // 用于判断能否吃
    bool dissolve;
    string name;
    vector<string> cation, anion;
    // 阳离子, 阴离子
} list_sc[200];
struct Special_thing
{
    bool tag;
    string name;
} list_st[200];
map<string, Simple_Compounds> map_sc;
map<string, Special_thing> map_st;
inline bool check_CD_reactions(Simple_Compounds a, Simple_Compounds b)
{ // CD = compound decomposition, check 复分解 ( 咕
    if (a.dissolve || b.dissolve)
        return 0;
}
// player
int Player_cnt;

class Player
{
public:
    int id;
    bool died;
    double HP;
    int water, fat, Na, K, Ca, Zn, Mg, Cu, Fe, va, vb, vc, vd, pr;
    int rest;
    double shield; // 盾
    double vd_time;
    vector<int> cards;
    inline void init(float placeholder, float Placeholder);      // 初始化
    inline void del(float placeholder, float Placeholder);       // 每回合扣除
    inline void out(float placeholder, float Placeholder);       // 调试输出
    inline void get_hurt(float placeholder, float Placeholder);  // 受伤
    inline void give_hurt(float placeholder, float Placeholder); // 攻击
    inline void init()
    {
        HP = 10.0;
        water = fat = Na = K = Ca = Zn = Mg = Cu = Fe = va = vb = vc = vd = pr = 10;
        died = 0;
        shield = 0;
        vd_time = 0;
        rest = 0;
        id = ++Player_cnt;
        cards.clear();
    }
    inline void get_hurt(double val)
    {
        if (Na >= 20)
            val *= 2;
        if (Na <= 3)
            val *= 2;
        if (Ca <= 2)
            val *= 3;
        if (vb <= 1)
            val *= 4;
        if (fat >= 20)
            val *= 2;
        if (fat <= 0)
            val *= 2;
        if (vd <= 0)
            val = val * ceil(sqrt(val));
        if (pr <= 15 && pr >= 10)
            val /= 2;
        if (pr <= 0)
            val *= 2;
        if (shield)
        {
            if (shield > val)
                val = 0, shield -= val;
            else
                shield = 0, val -= shield;
        }
        HP -= val;
        if (HP <= 0)
            HP = 0, died = 1;
    }
    inline double give_hurt(double val)
    {
        if (Cu <= 1)
            val /= 2;
        if (Zn >= 17)
            val /= 2;
        if (va <= 1)
            val /= 4;
        return val;
    }
    inline void del()
    {
        rest -= (rest >= 0);
        water -= (water > 10);
        water--;
        fat -= (fat > 10);
        fat--;
        Na -= (Na > 10);
        Na--;
        K -= (K > 10);
        K--;
        Ca -= (Ca > 10);
        Ca--;
        Zn -= (Zn > 10);
        Zn--;
        Cu -= (Cu > 10);
        Cu--;
        Mg -= (Mg > 10);
        Mg--;
        Fe -= (Fe > 10);
        Fe--;
        va -= (va > 10);
        va--;
        vd -= (vd > 10);
        vd--;
        vc -= (vc > 10) + (vc > 10);
        vc--;
        vb -= (vb > 10) + (vb > 10);
        vb--;
        if (shield)
            shield--;
        if (K >= 40)
        {
        } // 咕
        double total_hurt = 0;
        if (Cu >= 20)
            total_hurt += 1.0;
        if (Zn <= 2)
            total_hurt += 1.0;
        if (Ca >= 20)
            total_hurt += 1.0;
        if (Fe <= 2)
            total_hurt += 1.0;
        if (Mg <= 3)
            total_hurt += 0.5;
        if (va >= 20)
            total_hurt += 8.0;
        if (vc <= 3)
            total_hurt += 4.0;
        if (fat <= 0)
            total_hurt += 1.0;
        if (water >= 35)
            total_hurt += 1.0;
        if (vd >= 20)
            vd_time += 1, total_hurt += min(vd_time, 5.0);
        else
            vd_time = 0;
        get_hurt(total_hurt);
    }
    inline void out()
    {
        cerr << "HP : " << HP << endl;
        cerr << "water : " << water << endl;
        cerr << "fat : " << fat << endl;
        cerr << "Na : " << Na << endl;
        cerr << "K : " << K << endl;
        cerr << "Ca : " << Ca << endl;
        cerr << "Zn : " << Zn << endl;
        cerr << "Mg : " << Mg << endl;
        cerr << "Cu : " << Cu << endl;
        cerr << "Fe : " << Fe << endl;
        cerr << "va : " << va << endl;
        cerr << "vb : " << vb << endl;
        cerr << "vc : " << vc << endl;
        cerr << "vd : " << vd << endl;
    }
};
template <class T>
concept can_eat1 = requires(T a) {
    a.tag;
};
template <can_eat1 T>
inline void eat(Player &player, T medicine)
{ // 嗑药
    // why cannot this use in struct?
    if (typeid(medicine) == typeid(Simple_Compounds))
    {
        if (medicine.name == "HCl")
            player.get_hurt(3.0); // 咕环境加成
        if (medicine.name == "H2SO4")
            player.get_hurt(3.0), player.pr -= 1;
        if (medicine.name == "HNO3")
            player.get_hurt(3.0), player.pr -= 2;

        for (auto tmp : medicine.anion)
        {
            if (tmp == "NO3")
                player.get_hurt(1.0);
            if (tmp == "OH")
                player.get_hurt(2.0), player.pr -= 5;
        }
        for (auto tmp : medicine.cation)
        {
            if (tmp == "Na")
                player.Na += 5;
            if (tmp == "K")
                player.K += 5;
            if (tmp == "Ca")
                player.Ca += 5;
            if (tmp == "Zn")
                player.Zn += 5;
            if (tmp == "Mg")
                player.Mg += 5;
            if (tmp == "Fe")
                player.Fe += 5;
            if (tmp == "Cu")
                player.Cu += 5;
        }
    }
}
template <class T>
concept can_eat2 = requires(T a) {
    a.tag;
};
template <can_eat2 T>
inline bool check_eat(Player &player, T medicine)
{
    return 0;
}

inline void global_init()
{ // 初始化 ( 咕
    Player_cnt = 0;
    // init simple compounds
    list_sc[1] = {1, 1, "NaCl", {"Na"}, {"Cl"}};
    map_sc["NaCl"] = list_sc[1];
    list_sc[2] = {1, 1, "Na2SO4", {"Na"}, {"SO4"}};
    map_sc["Na2SO4"] = list_sc[2];
    list_sc[3] = {1, 1, "NaNO3", {"Na"}, {"NO3"}};
    map_sc["NaNO3"] = list_sc[3];
    list_sc[4] = {1, 1, "KCl", {"K"}, {"Cl"}};
    map_sc["KCl"] = list_sc[4];
    list_sc[5] = {1, 1, "K2SO4", {"K"}, {"SO4"}};
    map_sc["K2SO4"] = list_sc[5];
    list_sc[6] = {1, 1, "KNO3", {"K"}, {"NO3"}};
    map_sc["KNO3"] = list_sc[6];
    list_sc[7] = {1, 1, "CaCl2", {"Ca"}, {"Cl"}};
    map_sc["CaCl2"] = list_sc[7];
    list_sc[8] = {1, 0, "CaSO4", {"Ca"}, {"SO4"}};
    map_sc["CaSO4"] = list_sc[8];
    list_sc[9] = {1, 1, "Ca(NO3)2", {"Ca"}, {"NO3"}};
    map_sc["Ca(NO3)2"] = list_sc[9];
    list_sc[10] = {1, 1, "ZnCl2", {"Zn"}, {"Cl"}};
    map_sc["ZnCl2"] = list_sc[10];
    list_sc[11] = {1, 1, "ZnSO4", {"Zn"}, {"SO4"}};
    map_sc["ZnSO4"] = list_sc[11];
    list_sc[12] = {1, 1, "Zn(NO3)2", {"Zn"}, {"NO3"}};
    map_sc["Zn(NO3)2"] = list_sc[12];
    list_sc[13] = {1, 1, "MgCl2", {"Mg"}, {"Cl"}};
    map_sc["MgCl2"] = list_sc[13];
    list_sc[14] = {1, 1, "MgSO4", {"Mg"}, {"SO4"}};
    map_sc["MgSO4"] = list_sc[14];
    list_sc[15] = {1, 1, "Mg(NO3)2", {"Mg"}, {"NO3"}};
    map_sc["Mg(NO3)2"] = list_sc[15];
    list_sc[16] = {1, 1, "ZnCl2", {"Zn"}, {"Cl"}};
    map_sc["ZnCl2"] = list_sc[16];
    list_sc[17] = {1, 1, "ZnSO4", {"Zn"}, {"SO4"}};
    map_sc["ZnSO4"] = list_sc[17];
    list_sc[18] = {1, 1, "Zn(NO3)2", {"Zn"}, {"NO3"}};
    map_sc["Zn(NO3)2"] = list_sc[18];
    list_sc[19] = {1, 1, "CuCl2", {"Zn"}, {"Cl"}};
    map_sc["CuCl2"] = list_sc[19];
    list_sc[20] = {1, 1, "CuSO4", {"Zn"}, {"SO4"}};
    map_sc["CuSO4"] = list_sc[20];
    list_sc[21] = {1, 1, "Cu(NO3)2", {"Zn"}, {"NO3"}};
    map_sc["Cu(NO3)2"] = list_sc[21];
    list_sc[22] = {1, 1, "FeCl2", {"Zn"}, {"Cl"}};
    map_sc["FeCl2"] = list_sc[22];
    list_sc[23] = {1, 1, "FeSO4", {"Zn"}, {"SO4"}};
    map_sc["FeSO4"] = list_sc[23];
    list_sc[24] = {1, 1, "Fe(NO3)2", {"Zn"}, {"NO3"}};
    map_sc["Fe(NO3)2"] = list_sc[24];
    list_sc[25] = {1, 1, "FeCl3", {"Zn"}, {"Cl"}};
    map_sc["FeCl3"] = list_sc[25];
    list_sc[26] = {1, 1, "Fe2(SO4)3", {"Zn"}, {"SO4"}};
    map_sc["Fe2(SO4)3"] = list_sc[26];
    list_sc[27] = {1, 1, "Fe(NO3)3", {"Zn"}, {"NO3"}};
    map_sc["Fe(NO3)3"] = list_sc[27];
    list_sc[28] = {1, 1, "HCl", {"H"}, {"Cl"}};
    map_sc["HCl"] = list_sc[28];
    list_sc[29] = {1, 1, "H2SO4", {"H"}, {"SO4"}};
    map_sc["H2SO4"] = list_sc[29];
    list_sc[30] = {1, 1, "HNO3", {"H"}, {"NO3"}};
    map_sc["HNO3"] = list_sc[30];
    list_sc[31] = {1, 1, "NaOH", {"Na"}, {"OH"}};
    map_sc["NaOH"] = list_sc[31];
    list_sc[32] = {1, 1, "KOH", {"K"}, {"OH"}};
    map_sc["KOH"] = list_sc[32];
    list_sc[33] = {1, 1, "CaOH", {"Ca"}, {"OH"}};
    map_sc["CaOH"] = list_sc[33];

    // init special thing
}

int main()
{
    pair a(1, 1.0);
    global_init();
    Player sb;
    sb.init();
    sb.out();
    eat(sb, list_sc[3]);
    sb.out();
    sb.del();
    sb.out();
    return 0;
}