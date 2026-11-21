/* Rahisho — Trips & Friends pages (prototype, sample data) */
(function(){
const nf=new Intl.NumberFormat('fa-IR'),F=n=>nf.format(Math.round(n)),T=n=>F(n)+' تومان';
const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
const toast=m=>window.showToast?showToast(m):alert(m);
const KEY='rahisho-pages-v1';
let S={registered:{qeshm:true,yazd:true},lists:{},open:{}};
try{S=Object.assign(S,JSON.parse(localStorage.getItem(KEY))||{})}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};

/* ---------- sample data ---------- */
const AV=['#F7D100','#7fd1c0','#f19f70','#9db4ff','#e59ad0','#b5e07a','#ffb4a2'];
const PEOPLE={me:{n:'تو',full:'تو'},
 f1:{n:'آرین',full:'آرین کاظمی',trips:2,place:'قشم'},f2:{n:'بهار',full:'بهار حسینی',trips:3,place:'یزد'},
 f3:{n:'پویا',full:'پویا رضایی',trips:1,place:'قشم'},f4:{n:'حانیه',full:'حانیه موسوی',trips:2,place:'شیراز'},
 f5:{n:'سامان',full:'سامان احمدی',trips:1,place:'کاشان'},f6:{n:'کیان',full:'کیان مرادی',trips:2,place:'ماسوله'},
 f7:{n:'مهسا',full:'مهسا نوری',trips:3,place:'قشم'}};
const avatar=(id,size='')=>{const k=Object.keys(PEOPLE).indexOf(id);return `<span class="av ${size}" style="background:${k===0?AV[0]:AV[1+(k-1)%(AV.length-1)]}">${PEOPLE[id].n[0]}</span>`};
const EV_ICON={transport:['✈️','#3b2f12'],stay:['🏠','#17332c'],food:['🍽️','#3a1d1d'],tour:['🚩','#1d2547'],fun:['🛶','#15313a']};
const CAT={transport:['حمل‌ونقل','🚗','#3b2f12'],stay:['اقامت','🏠','#17332c'],food:['خوراک و نوشیدنی','🍽️','#3a1d1d'],fun:['سرگرمی','🎉','#2a2340']};
const TRIPS=[
{id:'qeshm',title:'قشم؛ جزیره‌ی نقره‌ای',place:'قشم، هرمزگان',dates:'۱۲ تا ۱۵ آذر ۱۴۰۵',short:'۱۲ – ۱۵ آذر',left:12,emoji:'🏝️',cover:'linear-gradient(160deg,#0f4c5c,#1b2f55 60%,#0b1325)',members:['me','f1','f2','f3','f5','f7'],cap:8,
 groups:[{city:'تهران',ev:[
  {d:'پنجشنبه · ۱۲ آذر',t:'۰۶:۳۰',ty:'transport',title:'پرواز تهران ← قشم',loc:'فرودگاه مهرآباد، ترمینال ۴',go:6,note:'یک ساعت و نیم قبل از پرواز در فرودگاه باشید. بار مجاز هر نفر ۲۰ کیلوگرم است.'}]},
 {city:'قشم',ev:[
  {d:'پنجشنبه · ۱۲ آذر',t:'۱۱:۳۰',ty:'stay',title:'تحویل اقامتگاه بوم‌گردی',loc:'روستای درگهان، قشم',go:6,note:'اتاق‌ها سه‌تخته است؛ تقسیم اتاق‌ها در گروه تلگرام هماهنگ می‌شود.'},
  {d:'پنجشنبه · ۱۲ آذر',t:'۱۴:۰۰',ty:'food',title:'ناهار؛ ماهی تازه‌ی بندر',loc:'بندر درگهان، قشم',go:5,note:'غذای محلی با سالاد و نان تازه؛ هزینه‌ی ناهار جداگانه ثبت می‌شود.'},
  {d:'پنجشنبه · ۱۲ آذر',t:'۱۷:۰۰',ty:'tour',title:'غروب‌گردی در ساحل نقره‌ای',loc:'ساحل نقره‌ای، قشم',go:6,note:'کفش راحت و یک لایه‌ی گرم برای هوای عصر همراه داشته باشید.'},
  {d:'جمعه · ۱۳ آذر',t:'۰۸:۰۰',ty:'fun',title:'قایق‌سواری در جنگل‌های حرا',loc:'روستای گوران، قشم',go:6,note:'زمان قایق‌سواری به جزر و مد بستگی دارد؛ ساعت دقیق شب قبل اعلام می‌شود.'},
  {d:'جمعه · ۱۳ آذر',t:'۱۶:۰۰',ty:'tour',title:'غار نمکدان',loc:'نمکدان، قشم',go:4,note:'طولانی‌ترین غار نمکی جهان؛ کفش ضدلغزش بپوشید.'},
  {d:'جمعه · ۱۳ آذر',t:'۲۱:۰۰',ty:'tour',title:'شب‌گردی در دره‌ی ستارگان',loc:'دره‌ی ستارگان، قشم',go:5,note:'چراغ‌قوه‌ی کوچک و لباس گرم فراموش نشود.'},
  {d:'شنبه · ۱۴ آذر',t:'۰۹:۳۰',ty:'tour',title:'ژئوپارک؛ تنگه‌ی چاهکوه',loc:'تنگه‌ی چاهکوه، قشم',go:6,note:'مسیر کوتاه پیاده‌روی دارد؛ آب کافی همراه داشته باشید.'},
  {d:'یکشنبه · ۱۵ آذر',t:'۱۰:۰۰',ty:'transport',title:'پرواز بازگشت به تهران',loc:'فرودگاه بین‌المللی قشم',go:6,note:'ساعت ۸ صبح اقامتگاه را تحویل می‌دهیم.'}]}],
 costs:[
  {d:'۳۰ آبان',t:'اجاره‌ی خودروی ۴×۴ برای سه روز',cat:'transport',total:5600000,payer:'f1',w:['me','f1','f2','f3']},
  {d:'۲۹ آبان',t:'خرید خوراکی و میوه‌ی مسیر',cat:'food',total:2200000,payer:'me',w:['me','f1','f2','f3']},
  {d:'۲۸ آبان',t:'بلیت ژئوپارک و غار نمکدان',cat:'fun',total:1800000,payer:'f3',w:['me','f1','f2','f3']},
  {d:'۲۵ آبان',t:'رزرو قایق‌سواری جنگل حرا',cat:'fun',total:3600000,payer:'me',w:['me','f1','f2','f3']},
  {d:'۲۳ آبان',t:'پیش‌پرداخت اقامتگاه بوم‌گردی',cat:'stay',total:12000000,payer:'f2',w:['me','f1','f2','f3']},
  {d:'۲۰ آبان',t:'بلیت هواپیمای رفت‌وبرگشت',cat:'transport',total:16000000,payer:'f1',w:['me','f1','f2','f3']}],
 list:[['مدارک و ضروریات',[['کارت ملی و کارت بانکی',1],['بلیت و رزروها (روی گوشی)',1],['پول نقد برای روستاها',0],['شارژر و پاوربانک',0],['داروهای شخصی',0]]],
  ['لباس و وسایل شخصی',[['لباس راحت و کفش پیاده‌روی',0],['کلاه و عینک آفتابی',1],['کرم ضدآفتاب',0],['لباس گرم برای شب',0],['مایو یا لباس مناسب دریا',0]]],
  ['بهداشت و سلامت',[['ماسک و ضدعفونی‌کننده',0],['قرص ضدتهوع برای قایق',0],['حوله و وسایل بهداشتی',0]]]]},
{id:'yazd',title:'یزد؛ شهر بادگیرها و ریگ زرین',place:'یزد',dates:'۲۶ تا ۲۹ آذر ۱۴۰۵',short:'۲۶ – ۲۹ آذر',left:26,emoji:'🕌',cover:'linear-gradient(160deg,#6b3f12,#3a2a4f 60%,#0b1325)',members:['me','f2','f4','f6'],cap:10,
 groups:[{city:'یزد',ev:[
  {d:'پنجشنبه · ۲۶ آذر',t:'۰۷:۰۰',ty:'transport',title:'حرکت با اتوبوس VIP از تهران',loc:'ترمینال جنوب، تهران',go:4,note:'اتوبوس ساعت ۶:۴۵ شروع به سوار کردن می‌کند.'},
  {d:'پنجشنبه · ۲۶ آذر',t:'۱۶:۰۰',ty:'stay',title:'تحویل هتل سنتی',loc:'بافت تاریخی یزد',go:4,note:'هتل در پیاده‌روی نزدیک مسجد جامع است.'},
  {d:'جمعه · ۲۷ آذر',t:'۰۹:۰۰',ty:'tour',title:'پیاده‌روی در بافت تاریخی و بادگیرها',loc:'محله‌ی فهادان',go:4,note:'مسیر با راهنمای محلی انجام می‌شود.'},
  {d:'جمعه · ۲۷ آذر',t:'۲۰:۰۰',ty:'food',title:'شام سنتی؛ قیمه‌نثار و شیرینی یزدی',loc:'رستوران سنتی، یزد',go:3,note:''},
  {d:'شنبه · ۲۸ آذر',t:'۱۶:۰۰',ty:'fun',title:'غروب در ریگ زرین',loc:'ریگ زرین، یزد',go:4,note:'ماسه‌سواری اختیاری است.'}]}],
 costs:[
  {d:'۲۸ آبان',t:'رزرو هتل سنتی',cat:'stay',total:9600000,payer:'f4',w:['me','f2','f4','f6']},
  {d:'۲۵ آبان',t:'بلیت اتوبوس VIP',cat:'transport',total:4800000,payer:'me',w:['me','f2','f4','f6']},
  {d:'۲۴ آبان',t:'راهنمای محلی بافت تاریخی',cat:'fun',total:2000000,payer:'f2',w:['me','f2','f4','f6']}],
 list:[['مدارک و ضروریات',[['کارت ملی',1],['بلیت اتوبوس',0],['شارژر و پاوربانک',0]]],['لباس و وسایل شخصی',[['لباس گرم برای شب‌های کویر',0],['کفش راحت',0],['شال یا کلاه',0]]]]},
{id:'shiraz',title:'شیراز؛ حافظیه تا تخت‌جمشید',place:'شیراز، فارس',dates:'۱۷ تا ۲۰ دی ۱۴۰۵',short:'۱۷ – ۲۰ دی',left:47,emoji:'🌹',cover:'linear-gradient(160deg,#5b1f3d,#2a2a55 60%,#0b1325)',members:['f3','f4','f1'],cap:12,
 groups:[{city:'شیراز',ev:[
  {d:'پنجشنبه · ۱۷ دی',t:'۰۸:۰۰',ty:'transport',title:'پرواز تهران ← شیراز',loc:'فرودگاه مهرآباد',go:3,note:''},
  {d:'پنجشنبه · ۱۷ دی',t:'۱۷:۰۰',ty:'tour',title:'آرامگاه حافظ؛ حافظیه',loc:'حافظیه، شیراز',go:3,note:'فال حافظ هم می‌گیریم.'},
  {d:'جمعه · ۱۸ دی',t:'۰۹:۰۰',ty:'tour',title:'تخت‌جمشید و نقش رستم',loc:'مرودشت، فارس',go:3,note:'حدود سه ساعت زمان لازم است.'},
  {d:'جمعه · ۱۸ دی',t:'۲۰:۰۰',ty:'food',title:'شام؛ کلم‌پلو شیرازی',loc:'میدان شهدا، شیراز',go:3,note:''},
  {d:'شنبه · ۱۹ دی',t:'۱۰:۰۰',ty:'tour',title:'باغ ارم و مسجد نصیرالملک',loc:'شیراز',go:3,note:'ساعت ۸:۳۰ برای نورگیری مسجد بهترین زمان است.'}]}],
 costs:[
  {d:'۲۹ آبان',t:'رزرو اقامتگاه',cat:'stay',total:6000000,payer:'f4',w:['me','f3','f4']},
  {d:'۲۷ آبان',t:'بلیت هواپیما',cat:'transport',total:9000000,payer:'f3',w:['me','f3','f4']}],
 list:[['مدارک و ضروریات',[['کارت ملی',0],['بلیت هواپیما',0],['شارژر و پاوربانک',0]]],['لباس و وسایل شخصی',[['لباس گرم برای زمستان',0],['کفش راحت',0]]]]}];
const TRIP=id=>TRIPS.find(t=>t.id===id);
const isReg=t=>!!S.registered[t.id];

/* ---------- costs ---------- */
function costs(t){const net={};let total=0;
 t.costs.forEach(e=>{total+=e.total;const sh=e.total/e.w.length;e.w.forEach(p=>{if(p===e.payer)return;
  if(e.payer==='me')net[p]=(net[p]||0)+sh;else if(p==='me')net[e.payer]=(net[e.payer]||0)-sh})});
 return {net,total,bal:Object.values(net).reduce((a,b)=>a+b,0)}}
const myShare=e=>e.w.includes('me')?e.total/e.w.length:0;

/* ---------- checklist ---------- */
function lists(t){if(!S.lists[t.id])S.lists[t.id]=t.list.map((l,i)=>({id:'l'+i,name:l[0],open:i===0,items:l[1].map(x=>({t:x[0],done:!!x[1]}))}));return S.lists[t.id]}

/* ---------- state & shell ---------- */
let page='home',detail=null,tab='events',friendFilter='friends',friendQuery='',searchOpen=false;
const root=()=>$('#page-'+(page==='journeys'?'journeys':'community'));
function show(p){
  if(p==='profile'){toast('پروفایل به‌زودی در راهیشو اضافه می‌شود');return}
  page=p;$('#home').hidden=p!=='home';$('#page-journeys').hidden=p!=='journeys';$('#page-community').hidden=p!=='community';
  $$('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===p));
  if(p==='journeys'){detail=null;renderTrips()}if(p==='community')renderFriends();
  window.scrollTo({top:0});
}
const hero=(eyebrow,title,right='')=>`<header class="page-hero"><div class="hero-top"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1></div><div class="hero-actions">${right}</div></div>`;

/* ---------- trips list ---------- */
function renderTrips(){
  const el=$('#page-journeys');
  if(detail)return renderDetail(el);
  const reg=TRIPS.filter(isReg).length;
  el.innerHTML=`<div class="page-inner">${hero('شنبه · ۳۰ آبان','سفرهای من',`<button class="round-btn" data-act="search" aria-label="جست‌وجو">⌕</button><button class="round-btn has-dot" data-act="bell" aria-label="اعلان‌ها">🔔</button>`)}
   <div class="count-tiles">
    <div class="tile"><b>${F(3)}</b><span>سفرهای رفته</span></div><div class="tile"><b>${F(TRIPS.length)}</b><span>پیش رو</span></div>
    <div class="tile"><b>${F(1)}</b><span>دعوت‌ها</span></div><div class="tile"><b>${F(reg)}</b><span>ثبت‌نام‌شده</span></div></div></header>
   <div class="sec-row"><h2>سفرهای پیش رو</h2><span>${F(TRIPS.length)} سفر</span></div>
   <div class="trip-list">${TRIPS.map(t=>`<article class="tcard" data-trip="${t.id}" tabindex="0" role="button" aria-label="${t.title}">
     <div class="tcover" style="background:${t.cover}"><span class="temoji">${t.emoji}</span><span class="tdays">${F(t.left)} روز مانده</span></div>
     <div class="tinfo"><h3>${t.title}</h3><p>📍 ${t.place}</p><p>🗓 ${t.short}</p>
      <div class="tfoot"><span class="stack">${t.members.slice(0,3).map(m=>avatar(m,'sm')).join('')}${t.members.length>3?`<i>+${F(t.members.length-3)}</i>`:''}</span>
      <span class="tbadge ${isReg(t)?'ok':''}">${isReg(t)?'✓ ثبت‌نام‌شده':'ثبت‌نام باز'}</span></div></div></article>`).join('')}</div>
   <button class="fab" id="fab-trip"><span>＋</span> سفر شخصی</button></div>`;
}

/* ---------- trip detail ---------- */
function renderDetail(el){
  const t=TRIP(detail);
  const tabs=[['events','برنامه'],['costs','هزینه‌ها'],['list','چک‌لیست'],['chat','چت']];
  el.innerHTML=`<div class="page-inner detail"><header class="page-hero"><div class="hero-nav"><button class="round-btn" data-act="back" aria-label="بازگشت">→</button><span class="sp"></span><button class="round-btn" data-act="members" aria-label="اعضا">👥</button><button class="round-btn" data-act="settings" aria-label="تنظیمات">⚙</button></div>
   <div class="hero-top"><div><span class="eyebrow">جزئیات سفر</span><h1>${t.title}</h1></div></div>
   <div class="chip-row"><span class="chip">🗓 ${t.dates}</span><span class="chip">${F(t.members.length)} از ${F(t.cap)} نفر</span></div></header>
   <nav class="tabs" role="tablist">${tabs.map(x=>`<button role="tab" class="${tab===x[0]?'active':''}" data-tab="${x[0]}">${x[1]}</button>`).join('')}</nav>
   ${isReg(t)?'':`<div class="reg-banner"><span>هنوز توی این سفر ثبت‌نام نکرده‌ای.</span><button class="btn-y" data-act="register">ثبت‌نام در سفر</button></div>`}
   <section class="panel">${{events:tEvents,costs:tCosts,list:tList,chat:tChat}[tab](t)}</section></div>`;
}
function tEvents(t){return t.groups.map(g=>`<div class="grp"><span>${g.city}</span><i></i><b>${F(g.ev.length)}</b></div>`+g.ev.map((e,i)=>{const k=t.id+g.city+i,ic=EV_ICON[e.ty];
 return `<article class="ev ${S.open[k]?'open':''}" data-ev="${k}" tabindex="0" role="button"><span class="ev-ic" style="background:${ic[1]}">${ic[0]}</span>
  <div class="ev-main"><small>${e.d} · <bdi>${e.t}</bdi></small><h4>${e.title}</h4><p>📍 ${e.loc}</p>${e.note?`<p class="ev-note">${e.note}</p>`:''}</div>
  <span class="going">✓ ${F(e.go)} از ${F(t.members.length)}</span><span class="chev">‹</span></article>`}).join('')).join('')}
function tCosts(t){const c=costs(t),owe=c.bal<0;
 const who=Object.entries(c.net).filter(([,v])=>Math.abs(v)>0).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).map(x=>x[0]);
 const names=who.slice(0,2).map(id=>PEOPLE[id].n).join(' و ');
 const days=[...new Set(t.costs.map(e=>e.d))];
 return `<div class="bal"><span class="lab">تراز تو</span><div class="amt ${owe?'neg':'pos'}">${T(Math.abs(c.bal))}</div><span class="state ${owe?'neg':'pos'}">${owe?'↑ بدهکاری':'↓ طلبکاری'}</span>
  <button class="settle" data-act="breakdown"><span class="stack">${who.slice(0,2).map(id=>avatar(id,'sm')).join('')}${who.length>2?`<i>+${F(who.length-2)}</i>`:''}</span><span class="st-txt"><b>تسویه با ${names}</b><small>دیدن جزئیات کامل</small></span><span class="chev">‹</span></button></div>
  <div class="total-row"><span>مجموع هزینه‌های سفر</span><i></i><b>${T(c.total)}</b><small>${F(t.costs.length)} هزینه</small></div>`+
  days.map(d=>{const L=t.costs.filter(e=>e.d===d);return `<div class="dgrp"><span>${d}</span><b>${F(L.length)}</b></div>`+L.map(e=>{const k=CAT[e.cat];
   return `<article class="exp"><span class="ev-ic" style="background:${k[2]}">${k[1]}</span><div class="ev-main"><small>${k[0]}</small><h4>${e.t}</h4><p>${e.payer==='me'?'تو پرداخت کردی':PEOPLE[e.payer].n+' پرداخت کرد'}</p></div><div class="exp-amt"><b>${T(e.total)}</b><small>سهم تو ${T(myShare(e))}</small></div></article>`}).join('')}).join('')}
function tList(t){const L=lists(t);return L.map(l=>{const done=l.items.filter(i=>i.done).length,pct=l.items.length?done/l.items.length*100:0;
 return `<article class="cl" data-list="${l.id}"><header><button class="cl-t" data-act="toggle-list"><span class="chev ${l.open?'down':''}">‹</span><b>${l.name}</b></button><span class="cl-n">${F(done)}/${F(l.items.length)}</span><button class="mini" data-act="rename-list" aria-label="ویرایش نام">✎</button><button class="mini" data-act="del-list" aria-label="حذف لیست">✕</button></header>
  <div class="bar"><i style="width:${pct}%"></i></div>${l.open?`<ul>${l.items.map((i,n)=>`<li class="${i.done?'done':''}"><label><input type="checkbox" data-item="${n}" ${i.done?'checked':''}><span class="cb"></span><em>${i.t}</em></label><button class="mini" data-act="del-item" data-item="${n}" aria-label="حذف مورد">✕</button></li>`).join('')}
  <li class="add"><span class="cb dashed">＋</span><input type="text" placeholder="افزودن مورد جدید" data-add maxlength="60"></li></ul>`:''}</article>`}).join('')+
 `<button class="new-list" data-act="new-list"><span>＋</span><b>لیست جدید</b></button><p class="note">تغییرات این بخش فقط روی همین دستگاه ذخیره می‌شود.</p>`}
function tChat(t){return `<div class="tg"><span class="tg-ic">✈</span><h3>گروه تلگرام سفر</h3><p>هماهنگی‌های لحظه‌ای، ساعت حرکت و عکس‌های سفر توی گروه تلگرام ${t.place.split('،')[0]} انجام می‌شود. برای ورود، دکمه‌ی زیر را بزن.</p>
 <a class="btn-y big" href="https://t.me/+RahishoSampleLink" target="_blank" rel="noopener">ورود به گروه تلگرام</a><small>این لینک نمونه است و در نسخه‌ی نهایی جایگزین می‌شود.</small></div>`}

/* ---------- friends ---------- */
const MY_CODE='RAH7KP';
function renderFriends(){
  const el=$('#page-community');const ids=Object.keys(PEOPLE).filter(i=>i!=='me');
  const q=friendQuery.trim();let list=friendFilter==='friends'?ids:[];
  if(q)list=list.filter(i=>PEOPLE[i].full.includes(q));
  list.sort((a,b)=>PEOPLE[a].n.localeCompare(PEOPLE[b].n,'fa'));
  const groups={};list.forEach(i=>{const l=PEOPLE[i].n[0]==='آ'?'ا':PEOPLE[i].n[0];(groups[l]=groups[l]||[]).push(i)});
  el.innerHTML=`<div class="page-inner">${hero('حلقه‌ی تو','دوستان',`<button class="round-btn" data-act="fsearch" aria-label="جست‌وجو">⌕</button><button class="round-btn has-dot" data-act="bell" aria-label="اعلان‌ها">🔔</button>`)}
   <div class="count-tiles two"><button class="tile ${friendFilter==='friends'?'on':''}" data-ff="friends"><b>${F(ids.length)}</b><span>دوست</span></button><button class="tile ${friendFilter==='req'?'on':''}" data-ff="req"><b>${F(0)}</b><span>درخواست</span></button></div>
   <p class="filt"><i></i>${friendFilter==='friends'?'نمایش دوستان':'نمایش درخواست‌ها'}</p></header>
   ${searchOpen?`<input class="fsearch" id="fsearch" placeholder="جست‌وجوی دوستان…" value="${q}" autofocus>`:''}
   <div class="grp plain"><span>تو</span><i></i></div>
   <article class="me-card"><span class="av lg" style="background:#F7D100">م</span><div><small>کد دعوت تو</small><b class="code">${MY_CODE}</b></div><button class="round-btn y" data-act="share" aria-label="اشتراک‌گذاری">➤</button><button class="round-btn y" data-act="copy" aria-label="کپی کد">⧉</button></article>
   ${friendFilter==='req'?'<p class="empty">درخواست دوستی تازه‌ای نداری.</p>':Object.keys(groups).length?Object.keys(groups).map(l=>`<div class="grp"><span>${l}</span><i></i><b>${F(groups[l].length)}</b></div>`+groups[l].map(i=>`<article class="fr">${avatar(i,'lg')}<div><h4>${PEOPLE[i].full}</h4><p>${F(PEOPLE[i].trips)} سفر مشترک · ${PEOPLE[i].place}</p></div><button class="mini dots" data-act="fmenu" aria-label="گزینه‌ها">⋮</button></article>`).join('')).join(''):'<p class="empty">دوستی با این نام پیدا نشد.</p>'}
   <button class="fab" id="fab-friend"><span>＋</span> افزودن دوست</button></div>`;
  if(searchOpen){const s=$('#fsearch');s.focus();s.setSelectionRange(s.value.length,s.value.length)}
}

/* ---------- modals (Pro / breakdown / add friend) ---------- */
function ensureModal(id,html){let m=document.getElementById(id);if(!m){m=document.createElement('div');m.className='modal-backdrop';m.id=id;m.setAttribute('aria-hidden','true');document.body.append(m)}m.innerHTML=html;return m}
function closeM(id){const el=document.getElementById(id);el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function openPro(){
  ensureModal('pro-modal',`<section class="modal pro" role="dialog" aria-modal="true" aria-labelledby="pro-title"><button class="modal-close" data-close="pro-modal" aria-label="بستن">×</button>
   <span class="pro-badge">★ اکانت پرو</span><h2 id="pro-title">سفر شخصی خودت رو بساز</h2><p>ساختن سفر شخصی فقط برای کاربران اکانت پرو فعاله. با پرو، سفرهای خودت رو هم مثل سفرهای راهیشو مدیریت کن.</p>
   <ul class="pro-list"><li>ساخت سفر شخصی بدون محدودیت</li><li>دعوت دوستان و هماهنگی گروهی</li><li>تقسیم هزینه‌ها و تسویه‌ی حساب</li><li>چک‌لیست‌های شخصی برای هر سفر</li></ul>
   <div class="plan"><div><b>پرو سالانه</b><small>حدود ${F(41700)} تومان در ماه</small></div><div class="price"><strong>${F(500000)}</strong><span>تومان / سال</span></div></div>
   <button class="btn-y big" id="pro-buy">خرید اکانت پرو</button><button class="btn-ghost" data-close="pro-modal">فعلاً نه</button></section>`);
  openModal('pro-modal');
}
function openBreakdown(t){
  const c=costs(t),rows=Object.entries(c.net).sort((a,b)=>a[1]-b[1]);
  ensureModal('bd-modal',`<section class="modal" role="dialog" aria-modal="true"><button class="modal-close" data-close="bd-modal" aria-label="بستن">×</button><span class="modal-kicker">تسویه‌ی حساب</span><h2>جزئیات کامل</h2>
   <ul class="bd">${rows.map(([id,v])=>`<li>${avatar(id,'sm')}<span>${v<0?`تو به ${PEOPLE[id].n} بدهکاری`:`${PEOPLE[id].n} به تو بدهکاره`}</span><b class="${v<0?'neg':'pos'}">${T(Math.abs(v))}</b></li>`).join('')}</ul>
   <p class="note">جمع تراز تو: <b>${T(Math.abs(c.bal))}</b> ${c.bal<0?'بدهکاری':'طلبکاری'}</p></section>`);
  openModal('bd-modal');
}
function openAddFriend(){
  ensureModal('af-modal',`<section class="modal" role="dialog" aria-modal="true"><button class="modal-close" data-close="af-modal" aria-label="بستن">×</button><span class="modal-kicker">دوست جدید</span><h2>کد دعوت دوستت رو وارد کن</h2><p>کد ۶ حرفی که دوستت توی صفحه‌ی «دوستان» دارد را بنویس.</p>
   <input class="code-in" id="af-code" maxlength="6" placeholder="مثلاً AB12CD" dir="ltr" autocomplete="off"><button class="btn-y big" id="af-send">ارسال درخواست</button></section>`);
  openModal('af-modal');setTimeout(()=>$('#af-code').focus(),50);
}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const t=e.target;
  const closer=t.closest('[data-close]');if(closer&&['pro-modal','bd-modal','af-modal'].includes(closer.dataset.close)){closeM(closer.dataset.close);return}
  if(t.classList&&t.classList.contains('modal-backdrop')&&['pro-modal','bd-modal','af-modal'].includes(t.id)){closeM(t.id);return}
  if(t.closest('#pro-buy')){toast('پرداخت در نسخه‌ی نمایشی فعال نیست؛ در نسخه‌ی نهایی به درگاه پرداخت وصل می‌شود');return}
  if(t.closest('#af-send')){const v=$('#af-code').value.trim();if(v.length<6){toast('کد باید ۶ حرف باشد');return}closeM('af-modal');toast('درخواست دوستی ارسال شد');return}
  if(t.closest('#fab-trip')){openPro();return}
  if(t.closest('#fab-friend')){openAddFriend();return}
  const ff=t.closest('[data-ff]');if(ff){friendFilter=ff.dataset.ff;renderFriends();return}
  const tc=t.closest('.tcard');if(tc){detail=tc.dataset.trip;tab='events';renderTrips();window.scrollTo({top:0});return}
  const tabBtn=t.closest('[data-tab]');if(tabBtn){tab=tabBtn.dataset.tab;renderTrips();return}
  const evEl=t.closest('[data-ev]');if(evEl){const k=evEl.dataset.ev;S.open[k]=!S.open[k];save();evEl.classList.toggle('open',!!S.open[k]);return}
  const a=t.closest('[data-act]');if(!a)return;const act=a.dataset.act,tr=detail&&TRIP(detail);
  if(act==='back'){detail=null;renderTrips();window.scrollTo({top:0})}
  else if(act==='members')toast('اعضا: '+tr.members.map(m=>PEOPLE[m].n).join('، '));
  else if(act==='settings')toast('تنظیمات سفر به‌زودی اضافه می‌شود');
  else if(act==='register'){S.registered[tr.id]=true;save();toast('ثبت‌نام تو در این سفر انجام شد');renderTrips()}
  else if(act==='breakdown')openBreakdown(tr);
  else if(act==='bell')toast('اعلان تازه‌ای نداری');
  else if(act==='search')toast('جست‌وجوی سفرها به‌زودی');
  else if(act==='fsearch'){searchOpen=!searchOpen;if(!searchOpen)friendQuery='';renderFriends()}
  else if(act==='fmenu')toast('گزینه‌های دوست به‌زودی');
  else if(act==='copy'){(navigator.clipboard?navigator.clipboard.writeText(MY_CODE):Promise.reject()).then(()=>toast('کد دعوت کپی شد'),()=>toast('کد دعوت: '+MY_CODE))}
  else if(act==='share'){const d={title:'راهیشو',text:'با کد دعوت من توی راهیشو دوست من شو: '+MY_CODE};if(navigator.share)navigator.share(d).catch(()=>{});else toast('کد دعوت: '+MY_CODE)}
  else if(tr&&tab==='list'){const card=a.closest('.cl'),L=lists(tr),l=card&&L.find(x=>x.id===card.dataset.list);
   if(act==='toggle-list'){l.open=!l.open}
   else if(act==='rename-list'){const n=prompt('نام تازه‌ی لیست:',l.name);if(n&&n.trim())l.name=n.trim().slice(0,40)}
   else if(act==='del-list'){if(confirm('این لیست حذف شود؟'))S.lists[tr.id]=L.filter(x=>x!==l)}
   else if(act==='del-item'){l.items.splice(+a.dataset.item,1)}
   else if(act==='new-list'){const n=prompt('نام لیست جدید:');if(n&&n.trim())L.push({id:'l'+Date.now(),name:n.trim().slice(0,40),open:true,items:[]})}
   save();renderTrips()}
});
document.addEventListener('change',e=>{const c=e.target.closest('input[type=checkbox][data-item]');if(!c||!detail)return;const tr=TRIP(detail),l=lists(tr).find(x=>x.id===c.closest('.cl').dataset.list);l.items[+c.dataset.item].done=c.checked;save();renderTrips()});
document.addEventListener('keydown',e=>{
  if(e.target.matches&&e.target.matches('[data-add]')&&e.key==='Enter'){const v=e.target.value.trim();if(!v)return;const tr=TRIP(detail),l=lists(tr).find(x=>x.id===e.target.closest('.cl').dataset.list);l.items.push({t:v,done:false});save();renderTrips();const box=$(`.cl[data-list="${l.id}"] [data-add]`);box&&box.focus()}
  else if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('.tcard,.ev')){e.preventDefault();e.target.click()}
  else if(e.key==='Escape')['pro-modal','bd-modal','af-modal'].forEach(id=>{const m=document.getElementById(id);m&&m.classList.contains('open')&&closeM(id)});
});
document.addEventListener('input',e=>{if(e.target.id==='fsearch'){friendQuery=e.target.value;const pos=e.target.selectionStart;renderFriends();const s=$('#fsearch');s.focus();s.setSelectionRange(pos,pos)}});
$$('[data-page]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.page)));
window.RahishoPages={show};
})();
