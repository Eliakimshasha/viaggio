"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

// Comprehensive list of countries with their ISO codes and flag URLs
const countries = [
  { code: "AD", name: "Andorra", flag: "https://flagcdn.com/w40/ad.png" },
  { code: "AE", name: "United Arab Emirates", flag: "https://flagcdn.com/w40/ae.png" },
  { code: "AF", name: "Afghanistan", flag: "https://flagcdn.com/w40/af.png" },
  { code: "AG", name: "Antigua and Barbuda", flag: "https://flagcdn.com/w40/ag.png" },
  { code: "AI", name: "Anguilla", flag: "https://flagcdn.com/w40/ai.png" },
  { code: "AL", name: "Albania", flag: "https://flagcdn.com/w40/al.png" },
  { code: "AM", name: "Armenia", flag: "https://flagcdn.com/w40/am.png" },
  { code: "AO", name: "Angola", flag: "https://flagcdn.com/w40/ao.png" },
  { code: "AQ", name: "Antarctica", flag: "https://flagcdn.com/w40/aq.png" },
  { code: "AR", name: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
  { code: "AS", name: "American Samoa", flag: "https://flagcdn.com/w40/as.png" },
  { code: "AT", name: "Austria", flag: "https://flagcdn.com/w40/at.png" },
  { code: "AU", name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  { code: "AW", name: "Aruba", flag: "https://flagcdn.com/w40/aw.png" },
  { code: "AX", name: "Åland Islands", flag: "https://flagcdn.com/w40/ax.png" },
  { code: "AZ", name: "Azerbaijan", flag: "https://flagcdn.com/w40/az.png" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "https://flagcdn.com/w40/ba.png" },
  { code: "BB", name: "Barbados", flag: "https://flagcdn.com/w40/bb.png" },
  { code: "BD", name: "Bangladesh", flag: "https://flagcdn.com/w40/bd.png" },
  { code: "BE", name: "Belgium", flag: "https://flagcdn.com/w40/be.png" },
  { code: "BF", name: "Burkina Faso", flag: "https://flagcdn.com/w40/bf.png" },
  { code: "BG", name: "Bulgaria", flag: "https://flagcdn.com/w40/bg.png" },
  { code: "BH", name: "Bahrain", flag: "https://flagcdn.com/w40/bh.png" },
  { code: "BI", name: "Burundi", flag: "https://flagcdn.com/w40/bi.png" },
  { code: "BJ", name: "Benin", flag: "https://flagcdn.com/w40/bj.png" },
  { code: "BL", name: "Saint Barthélemy", flag: "https://flagcdn.com/w40/bl.png" },
  { code: "BM", name: "Bermuda", flag: "https://flagcdn.com/w40/bm.png" },
  { code: "BN", name: "Brunei", flag: "https://flagcdn.com/w40/bn.png" },
  { code: "BO", name: "Bolivia", flag: "https://flagcdn.com/w40/bo.png" },
  { code: "BQ", name: "Caribbean Netherlands", flag: "https://flagcdn.com/w40/bq.png" },
  { code: "BR", name: "Brazil", flag: "https://flagcdn.com/w40/br.png" },
  { code: "BS", name: "Bahamas", flag: "https://flagcdn.com/w40/bs.png" },
  { code: "BT", name: "Bhutan", flag: "https://flagcdn.com/w40/bt.png" },
  { code: "BV", name: "Bouvet Island", flag: "https://flagcdn.com/w40/bv.png" },
  { code: "BW", name: "Botswana", flag: "https://flagcdn.com/w40/bw.png" },
  { code: "BY", name: "Belarus", flag: "https://flagcdn.com/w40/by.png" },
  { code: "BZ", name: "Belize", flag: "https://flagcdn.com/w40/bz.png" },
  { code: "CA", name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { code: "CC", name: "Cocos Islands", flag: "https://flagcdn.com/w40/cc.png" },
  { code: "CD", name: "DR Congo", flag: "https://flagcdn.com/w40/cd.png" },
  { code: "CF", name: "Central African Republic", flag: "https://flagcdn.com/w40/cf.png" },
  { code: "CG", name: "Republic of the Congo", flag: "https://flagcdn.com/w40/cg.png" },
  { code: "CH", name: "Switzerland", flag: "https://flagcdn.com/w40/ch.png" },
  { code: "CI", name: "Côte d'Ivoire", flag: "https://flagcdn.com/w40/ci.png" },
  { code: "CK", name: "Cook Islands", flag: "https://flagcdn.com/w40/ck.png" },
  { code: "CL", name: "Chile", flag: "https://flagcdn.com/w40/cl.png" },
  { code: "CM", name: "Cameroon", flag: "https://flagcdn.com/w40/cm.png" },
  { code: "CN", name: "China", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "CO", name: "Colombia", flag: "https://flagcdn.com/w40/co.png" },
  { code: "CR", name: "Costa Rica", flag: "https://flagcdn.com/w40/cr.png" },
  { code: "CU", name: "Cuba", flag: "https://flagcdn.com/w40/cu.png" },
  { code: "CV", name: "Cape Verde", flag: "https://flagcdn.com/w40/cv.png" },
  { code: "CW", name: "Curaçao", flag: "https://flagcdn.com/w40/cw.png" },
  { code: "CX", name: "Christmas Island", flag: "https://flagcdn.com/w40/cx.png" },
  { code: "CY", name: "Cyprus", flag: "https://flagcdn.com/w40/cy.png" },
  { code: "CZ", name: "Czechia", flag: "https://flagcdn.com/w40/cz.png" },
  { code: "DE", name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
  { code: "DJ", name: "Djibouti", flag: "https://flagcdn.com/w40/dj.png" },
  { code: "DK", name: "Denmark", flag: "https://flagcdn.com/w40/dk.png" },
  { code: "DM", name: "Dominica", flag: "https://flagcdn.com/w40/dm.png" },
  { code: "DO", name: "Dominican Republic", flag: "https://flagcdn.com/w40/do.png" },
  { code: "DZ", name: "Algeria", flag: "https://flagcdn.com/w40/dz.png" },
  { code: "EC", name: "Ecuador", flag: "https://flagcdn.com/w40/ec.png" },
  { code: "EE", name: "Estonia", flag: "https://flagcdn.com/w40/ee.png" },
  { code: "EG", name: "Egypt", flag: "https://flagcdn.com/w40/eg.png" },
  { code: "EH", name: "Western Sahara", flag: "https://flagcdn.com/w40/eh.png" },
  { code: "ER", name: "Eritrea", flag: "https://flagcdn.com/w40/er.png" },
  { code: "ES", name: "Spain", flag: "https://flagcdn.com/w40/es.png" },
  { code: "ET", name: "Ethiopia", flag: "https://flagcdn.com/w40/et.png" },
  { code: "FI", name: "Finland", flag: "https://flagcdn.com/w40/fi.png" },
  { code: "FJ", name: "Fiji", flag: "https://flagcdn.com/w40/fj.png" },
  { code: "FK", name: "Falkland Islands", flag: "https://flagcdn.com/w40/fk.png" },
  { code: "FM", name: "Micronesia", flag: "https://flagcdn.com/w40/fm.png" },
  { code: "FO", name: "Faroe Islands", flag: "https://flagcdn.com/w40/fo.png" },
  { code: "FR", name: "France", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "GA", name: "Gabon", flag: "https://flagcdn.com/w40/ga.png" },
  { code: "GB", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "GD", name: "Grenada", flag: "https://flagcdn.com/w40/gd.png" },
  { code: "GE", name: "Georgia", flag: "https://flagcdn.com/w40/ge.png" },
  { code: "GF", name: "French Guiana", flag: "https://flagcdn.com/w40/gf.png" },
  { code: "GG", name: "Guernsey", flag: "https://flagcdn.com/w40/gg.png" },
  { code: "GH", name: "Ghana", flag: "https://flagcdn.com/w40/gh.png" },
  { code: "GI", name: "Gibraltar", flag: "https://flagcdn.com/w40/gi.png" },
  { code: "GL", name: "Greenland", flag: "https://flagcdn.com/w40/gl.png" },
  { code: "GM", name: "Gambia", flag: "https://flagcdn.com/w40/gm.png" },
  { code: "GN", name: "Guinea", flag: "https://flagcdn.com/w40/gn.png" },
  { code: "GP", name: "Guadeloupe", flag: "https://flagcdn.com/w40/gp.png" },
  { code: "GQ", name: "Equatorial Guinea", flag: "https://flagcdn.com/w40/gq.png" },
  { code: "GR", name: "Greece", flag: "https://flagcdn.com/w40/gr.png" },
  { code: "GS", name: "South Georgia", flag: "https://flagcdn.com/w40/gs.png" },
  { code: "GT", name: "Guatemala", flag: "https://flagcdn.com/w40/gt.png" },
  { code: "GU", name: "Guam", flag: "https://flagcdn.com/w40/gu.png" },
  { code: "GW", name: "Guinea-Bissau", flag: "https://flagcdn.com/w40/gw.png" },
  { code: "GY", name: "Guyana", flag: "https://flagcdn.com/w40/gy.png" },
  { code: "HK", name: "Hong Kong", flag: "https://flagcdn.com/w40/hk.png" },
  { code: "HM", name: "Heard Island and McDonald Islands", flag: "https://flagcdn.com/w40/hm.png" },
  { code: "HN", name: "Honduras", flag: "https://flagcdn.com/w40/hn.png" },
  { code: "HR", name: "Croatia", flag: "https://flagcdn.com/w40/hr.png" },
  { code: "HT", name: "Haiti", flag: "https://flagcdn.com/w40/ht.png" },
  { code: "HU", name: "Hungary", flag: "https://flagcdn.com/w40/hu.png" },
  { code: "ID", name: "Indonesia", flag: "https://flagcdn.com/w40/id.png" },
  { code: "IE", name: "Ireland", flag: "https://flagcdn.com/w40/ie.png" },
  { code: "IL", name: "Israel", flag: "https://flagcdn.com/w40/il.png" },
  { code: "IM", name: "Isle of Man", flag: "https://flagcdn.com/w40/im.png" },
  { code: "IN", name: "India", flag: "https://flagcdn.com/w40/in.png" },
  { code: "IO", name: "British Indian Ocean Territory", flag: "https://flagcdn.com/w40/io.png" },
  { code: "IQ", name: "Iraq", flag: "https://flagcdn.com/w40/iq.png" },
  { code: "IR", name: "Iran", flag: "https://flagcdn.com/w40/ir.png" },
  { code: "IS", name: "Iceland", flag: "https://flagcdn.com/w40/is.png" },
  { code: "IT", name: "Italy", flag: "https://flagcdn.com/w40/it.png" },
  { code: "JE", name: "Jersey", flag: "https://flagcdn.com/w40/je.png" },
  { code: "JM", name: "Jamaica", flag: "https://flagcdn.com/w40/jm.png" },
  { code: "JO", name: "Jordan", flag: "https://flagcdn.com/w40/jo.png" },
  { code: "JP", name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "KE", name: "Kenya", flag: "https://flagcdn.com/w40/ke.png" },
  { code: "KG", name: "Kyrgyzstan", flag: "https://flagcdn.com/w40/kg.png" },
  { code: "KH", name: "Cambodia", flag: "https://flagcdn.com/w40/kh.png" },
  { code: "KI", name: "Kiribati", flag: "https://flagcdn.com/w40/ki.png" },
  { code: "KM", name: "Comoros", flag: "https://flagcdn.com/w40/km.png" },
  { code: "KN", name: "Saint Kitts and Nevis", flag: "https://flagcdn.com/w40/kn.png" },
  { code: "KP", name: "North Korea", flag: "https://flagcdn.com/w40/kp.png" },
  { code: "KR", name: "South Korea", flag: "https://flagcdn.com/w40/kr.png" },
  { code: "KW", name: "Kuwait", flag: "https://flagcdn.com/w40/kw.png" },
  { code: "KY", name: "Cayman Islands", flag: "https://flagcdn.com/w40/ky.png" },
  { code: "KZ", name: "Kazakhstan", flag: "https://flagcdn.com/w40/kz.png" },
  { code: "LA", name: "Laos", flag: "https://flagcdn.com/w40/la.png" },
  { code: "LB", name: "Lebanon", flag: "https://flagcdn.com/w40/lb.png" },
  { code: "LC", name: "Saint Lucia", flag: "https://flagcdn.com/w40/lc.png" },
  { code: "LI", name: "Liechtenstein", flag: "https://flagcdn.com/w40/li.png" },
  { code: "LK", name: "Sri Lanka", flag: "https://flagcdn.com/w40/lk.png" },
  { code: "LR", name: "Liberia", flag: "https://flagcdn.com/w40/lr.png" },
  { code: "LS", name: "Lesotho", flag: "https://flagcdn.com/w40/ls.png" },
  { code: "LT", name: "Lithuania", flag: "https://flagcdn.com/w40/lt.png" },
  { code: "LU", name: "Luxembourg", flag: "https://flagcdn.com/w40/lu.png" },
  { code: "LV", name: "Latvia", flag: "https://flagcdn.com/w40/lv.png" },
  { code: "LY", name: "Libya", flag: "https://flagcdn.com/w40/ly.png" },
  { code: "MA", name: "Morocco", flag: "https://flagcdn.com/w40/ma.png" },
  { code: "MC", name: "Monaco", flag: "https://flagcdn.com/w40/mc.png" },
  { code: "MD", name: "Moldova", flag: "https://flagcdn.com/w40/md.png" },
  { code: "ME", name: "Montenegro", flag: "https://flagcdn.com/w40/me.png" },
  { code: "MF", name: "Saint Martin", flag: "https://flagcdn.com/w40/mf.png" },
  { code: "MG", name: "Madagascar", flag: "https://flagcdn.com/w40/mg.png" },
  { code: "MH", name: "Marshall Islands", flag: "https://flagcdn.com/w40/mh.png" },
  { code: "MK", name: "North Macedonia", flag: "https://flagcdn.com/w40/mk.png" },
  { code: "ML", name: "Mali", flag: "https://flagcdn.com/w40/ml.png" },
  { code: "MM", name: "Myanmar", flag: "https://flagcdn.com/w40/mm.png" },
  { code: "MN", name: "Mongolia", flag: "https://flagcdn.com/w40/mn.png" },
  { code: "MO", name: "Macao", flag: "https://flagcdn.com/w40/mo.png" },
  { code: "MP", name: "Northern Mariana Islands", flag: "https://flagcdn.com/w40/mp.png" },
  { code: "MQ", name: "Martinique", flag: "https://flagcdn.com/w40/mq.png" },
  { code: "MR", name: "Mauritania", flag: "https://flagcdn.com/w40/mr.png" },
  { code: "MS", name: "Montserrat", flag: "https://flagcdn.com/w40/ms.png" },
  { code: "MT", name: "Malta", flag: "https://flagcdn.com/w40/mt.png" },
  { code: "MU", name: "Mauritius", flag: "https://flagcdn.com/w40/mu.png" },
  { code: "MV", name: "Maldives", flag: "https://flagcdn.com/w40/mv.png" },
  { code: "MW", name: "Malawi", flag: "https://flagcdn.com/w40/mw.png" },
  { code: "MX", name: "Mexico", flag: "https://flagcdn.com/w40/mx.png" },
  { code: "MY", name: "Malaysia", flag: "https://flagcdn.com/w40/my.png" },
  { code: "MZ", name: "Mozambique", flag: "https://flagcdn.com/w40/mz.png" },
  { code: "NA", name: "Namibia", flag: "https://flagcdn.com/w40/na.png" },
  { code: "NC", name: "New Caledonia", flag: "https://flagcdn.com/w40/nc.png" },
  { code: "NE", name: "Niger", flag: "https://flagcdn.com/w40/ne.png" },
  { code: "NF", name: "Norfolk Island", flag: "https://flagcdn.com/w40/nf.png" },
  { code: "NG", name: "Nigeria", flag: "https://flagcdn.com/w40/ng.png" },
  { code: "NI", name: "Nicaragua", flag: "https://flagcdn.com/w40/ni.png" },
  { code: "NL", name: "Netherlands", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "NO", name: "Norway", flag: "https://flagcdn.com/w40/no.png" },
  { code: "NP", name: "Nepal", flag: "https://flagcdn.com/w40/np.png" },
  { code: "NR", name: "Nauru", flag: "https://flagcdn.com/w40/nr.png" },
  { code: "NU", name: "Niue", flag: "https://flagcdn.com/w40/nu.png" },
  { code: "NZ", name: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
  { code: "OM", name: "Oman", flag: "https://flagcdn.com/w40/om.png" },
  { code: "PA", name: "Panama", flag: "https://flagcdn.com/w40/pa.png" },
  { code: "PE", name: "Peru", flag: "https://flagcdn.com/w40/pe.png" },
  { code: "PF", name: "French Polynesia", flag: "https://flagcdn.com/w40/pf.png" },
  { code: "PG", name: "Papua New Guinea", flag: "https://flagcdn.com/w40/pg.png" },
  { code: "PH", name: "Philippines", flag: "https://flagcdn.com/w40/ph.png" },
  { code: "PK", name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png" },
  { code: "PL", name: "Poland", flag: "https://flagcdn.com/w40/pl.png" },
  { code: "PM", name: "Saint Pierre and Miquelon", flag: "https://flagcdn.com/w40/pm.png" },
  { code: "PN", name: "Pitcairn Islands", flag: "https://flagcdn.com/w40/pn.png" },
  { code: "PR", name: "Puerto Rico", flag: "https://flagcdn.com/w40/pr.png" },
  { code: "PS", name: "Palestine", flag: "https://flagcdn.com/w40/ps.png" },
  { code: "PT", name: "Portugal", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "PW", name: "Palau", flag: "https://flagcdn.com/w40/pw.png" },
  { code: "PY", name: "Paraguay", flag: "https://flagcdn.com/w40/py.png" },
  { code: "QA", name: "Qatar", flag: "https://flagcdn.com/w40/qa.png" },
  { code: "RE", name: "Réunion", flag: "https://flagcdn.com/w40/re.png" },
  { code: "RO", name: "Romania", flag: "https://flagcdn.com/w40/ro.png" },
  { code: "RS", name: "Serbia", flag: "https://flagcdn.com/w40/rs.png" },
  { code: "RU", name: "Russia", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "RW", name: "Rwanda", flag: "https://flagcdn.com/w40/rw.png" },
  { code: "SA", name: "Saudi Arabia", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "SB", name: "Solomon Islands", flag: "https://flagcdn.com/w40/sb.png" },
  { code: "SC", name: "Seychelles", flag: "https://flagcdn.com/w40/sc.png" },
  { code: "SD", name: "Sudan", flag: "https://flagcdn.com/w40/sd.png" },
  { code: "SE", name: "Sweden", flag: "https://flagcdn.com/w40/se.png" },
  { code: "SG", name: "Singapore", flag: "https://flagcdn.com/w40/sg.png" },
  { code: "SH", name: "Saint Helena", flag: "https://flagcdn.com/w40/sh.png" },
  { code: "SI", name: "Slovenia", flag: "https://flagcdn.com/w40/si.png" },
  { code: "SJ", name: "Svalbard and Jan Mayen", flag: "https://flagcdn.com/w40/sj.png" },
  { code: "SK", name: "Slovakia", flag: "https://flagcdn.com/w40/sk.png" },
  { code: "SL", name: "Sierra Leone", flag: "https://flagcdn.com/w40/sl.png" },
  { code: "SM", name: "San Marino", flag: "https://flagcdn.com/w40/sm.png" },
  { code: "SN", name: "Senegal", flag: "https://flagcdn.com/w40/sn.png" },
  { code: "SO", name: "Somalia", flag: "https://flagcdn.com/w40/so.png" },
  { code: "SR", name: "Suriname", flag: "https://flagcdn.com/w40/sr.png" },
  { code: "SS", name: "South Sudan", flag: "https://flagcdn.com/w40/ss.png" },
  { code: "ST", name: "São Tomé and Príncipe", flag: "https://flagcdn.com/w40/st.png" },
  { code: "SV", name: "El Salvador", flag: "https://flagcdn.com/w40/sv.png" },
  { code: "SX", name: "Sint Maarten", flag: "https://flagcdn.com/w40/sx.png" },
  { code: "SY", name: "Syria", flag: "https://flagcdn.com/w40/sy.png" },
  { code: "SZ", name: "Eswatini", flag: "https://flagcdn.com/w40/sz.png" },
  { code: "TC", name: "Turks and Caicos Islands", flag: "https://flagcdn.com/w40/tc.png" },
  { code: "TD", name: "Chad", flag: "https://flagcdn.com/w40/td.png" },
  { code: "TF", name: "French Southern Territories", flag: "https://flagcdn.com/w40/tf.png" },
  { code: "TG", name: "Togo", flag: "https://flagcdn.com/w40/tg.png" },
  { code: "TH", name: "Thailand", flag: "https://flagcdn.com/w40/th.png" },
  { code: "TJ", name: "Tajikistan", flag: "https://flagcdn.com/w40/tj.png" },
  { code: "TK", name: "Tokelau", flag: "https://flagcdn.com/w40/tk.png" },
  { code: "TL", name: "Timor-Leste", flag: "https://flagcdn.com/w40/tl.png" },
  { code: "TM", name: "Turkmenistan", flag: "https://flagcdn.com/w40/tm.png" },
  { code: "TN", name: "Tunisia", flag: "https://flagcdn.com/w40/tn.png" },
  { code: "TO", name: "Tonga", flag: "https://flagcdn.com/w40/to.png" },
  { code: "TR", name: "Turkey", flag: "https://flagcdn.com/w40/tr.png" },
  { code: "TT", name: "Trinidad and Tobago", flag: "https://flagcdn.com/w40/tt.png" },
  { code: "TV", name: "Tuvalu", flag: "https://flagcdn.com/w40/tv.png" },
  { code: "TW", name: "Taiwan", flag: "https://flagcdn.com/w40/tw.png" },
  { code: "TZ", name: "Tanzania", flag: "https://flagcdn.com/w40/tz.png" },
  { code: "UA", name: "Ukraine", flag: "https://flagcdn.com/w40/ua.png" },
  { code: "UG", name: "Uganda", flag: "https://flagcdn.com/w40/ug.png" },
  { code: "UM", name: "United States Minor Outlying Islands", flag: "https://flagcdn.com/w40/um.png" },
  { code: "US", name: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { code: "UY", name: "Uruguay", flag: "https://flagcdn.com/w40/uy.png" },
  { code: "UZ", name: "Uzbekistan", flag: "https://flagcdn.com/w40/uz.png" },
  { code: "VA", name: "Vatican City", flag: "https://flagcdn.com/w40/va.png" },
  { code: "VC", name: "Saint Vincent and the Grenadines", flag: "https://flagcdn.com/w40/vc.png" },
  { code: "VE", name: "Venezuela", flag: "https://flagcdn.com/w40/ve.png" },
  { code: "VG", name: "British Virgin Islands", flag: "https://flagcdn.com/w40/vg.png" },
  { code: "VI", name: "United States Virgin Islands", flag: "https://flagcdn.com/w40/vi.png" },
  { code: "VN", name: "Vietnam", flag: "https://flagcdn.com/w40/vn.png" },
  { code: "VU", name: "Vanuatu", flag: "https://flagcdn.com/w40/vu.png" },
  { code: "WF", name: "Wallis and Futuna", flag: "https://flagcdn.com/w40/wf.png" },
  { code: "WS", name: "Samoa", flag: "https://flagcdn.com/w40/ws.png" },
  { code: "XK", name: "Kosovo", flag: "https://flagcdn.com/w40/xk.png" },
  { code: "YE", name: "Yemen", flag: "https://flagcdn.com/w40/ye.png" },
  { code: "YT", name: "Mayotte", flag: "https://flagcdn.com/w40/yt.png" },
  { code: "ZA", name: "South Africa", flag: "https://flagcdn.com/w40/za.png" },
  { code: "ZM", name: "Zambia", flag: "https://flagcdn.com/w40/zm.png" },
  { code: "ZW", name: "Zimbabwe", flag: "https://flagcdn.com/w40/zw.png" },
]

interface CountrySelectProps {
  onChange: (value: string) => void
  value: string
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectedCountry = countries.find((country) => country.name === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (country: (typeof countries)[0]) => {
    onChange(country.name)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <img
                src={selectedCountry.flag || "/placeholder.svg"}
                alt={selectedCountry.name}
                className="w-5 h-4 rounded-sm object-cover"
                crossOrigin="anonymous"
              />
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-gray-400">Select a country</span>
          )}
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <img
                    src={country.flag || "/placeholder.svg"}
                    alt={country.name}
                    className="w-5 h-4 rounded-sm object-cover"
                    crossOrigin="anonymous"
                  />
                  <span>{country.name}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySelect
