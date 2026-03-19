import dict from './words.json' with { type: 'json' };

function linkToVlabuk(word) {
    const url = new URL("https://xextan.github.io/vlabuk/")
    if (word) {
        url.search = new URLSearchParams({ q: word })
    }
    return url.toString()
}

const ALLOWED_ROOT_PATTERNS = [
    'b_l', 'b_k', 'b_n', 'b_p', 'b_t',
    'd_l', 'd_k', 'd_n', 'd_p', 'd_t',
    'f_l', 'f_k', 'f_n', 'f_p', 'f_t',
    'g_l', 'g_k', 'g_n', 'g_p', 'g_t',
    'k_l', 'k_k', 'k_n', 'k_p', 'k_t',
    'l_l', 'l_k', 'l_n', 'l_p', 'l_t',
    'n_l', 'n_k', 'n_n', 'n_p', 'n_t',
    'p_l', 'p_k', 'p_n', 'p_p', 'p_t',
    'q_l', 'q_k', 'q_n', 'q_p', 'q_t',
    's_l', 's_k', 's_n', 's_p', 's_t',
    't_l', 't_k', 't_n', 't_p', 't_t',
    'v_l', 'v_k', 'v_n', 'v_p', 'v_t',
    'x_l', 'x_k', 'x_n', 'x_p', 'x_t',
    'z_l', 'z_k', 'z_n', 'z_p', 'z_t',
    'ts_', 'tx_', 'dz_', 'dq_',
    'pl_', 'bl_', 'kl_', 'gl_', 'fl_', 'vl_',
    'sk_', 'sl_', 'sn_', 'sp_', 'st_',
    'xk_', 'xl_', 'xn_', 'xp_', 'xt_',
    'zb_', 'zd_', 'zg_', 'zl_', 'zn_',
    'qb_', 'qd_', 'qg_', 'ql_', 'qn_',
]
const ALLOWED_PARTICLE_PATTERNS = [
    'b_', 'd_', 'f_', 'g_', 'j_',
    'k_', 'l_', 'n_', 'p_', 'q_',
    's_', 't_', 'v_', 'w_', 'x_', 'z_',
    'bi_', 'di_', 'fi_', 'gi_',
    'ki_', 'li_', 'ni_', 'pi_', 'qi_',
    'si_', 'ti_', 'vi_', 'xi_', 'zi_',
    'bu_', 'du_', 'fu_', 'gu_',
    'ku_', 'lu_', 'nu_', 'pu_', 'qu_',
    'su_', 'tu_', 'vu_', 'xu_', 'zu_',
    'b_i', 'd_i', 'f_i', 'g_i', 'j_i',
    'k_i', 'l_i', 'n_i', 'p_i', 'q_i',
    's_i', 't_i', 'v_i', 'w_i', 'x_i', 'z_i',
    'b_u', 'd_u', 'f_u', 'g_u', 'j_u',
    'k_u', 'l_u', 'n_u', 'p_u', 'q_u',
    's_u', 't_u', 'v_u', 'w_u', 'x_u', 'z_u',
]
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const DIPHTHONG_VOWELS = ['a', 'e', 'o'];

for (let i of ALLOWED_ROOT_PATTERNS) {
    const words = VOWELS.map(e => {
        const word = i.replace('_', e);
        return dict.data.find(f => f.word === word) ?? { word, def: null }
    })
    const allAssigned = words.every(e => e.def)
    $("#dictionary").appendChild($.create({
        tag: "tr",
        className: allAssigned ? "all-assigned" : "",
        contents: [
            {
                tag: "th",
                className: "sm-hidden",
                contents: i,
            },
            ...words.map(e => ({
                tag: "td",
                className: e.def ? "assigned" : "unassigned",
                contents: [
                    {
                        tag: "b",
                        lang: "art-x-xextan",
                        contents: [
                            e.def ? {
                                tag: "a",
                                href: linkToVlabuk(e.word),
                                contents: e.word,
                            } : e.word
                        ],
                    },
                    {
                        tag: "br",
                    },
                    {
                        tag: "span",
                        contents: e.def ?? "—",
                    }
                ]
            }))
        ]
    }))
}
$("#hide-existing").addEventListener("change", () => {
    $(".dictionary").classList.toggle("hide-existing")
})