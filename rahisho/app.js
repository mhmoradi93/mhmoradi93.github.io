const countries = [
  {id:'TUR',name:'ترکیه',flag:'🇹🇷'}, {id:'ITA',name:'ایتالیا',flag:'🇮🇹'}, {id:'FRA',name:'فرانسه',flag:'🇫🇷'}, {id:'GEO',name:'گرجستان',flag:'🇬🇪'},
  {id:'ESP',name:'اسپانیا',flag:'🇪🇸'}, {id:'ARE',name:'امارات',flag:'🇦🇪'}, {id:'ARM',name:'ارمنستان',flag:'🇦🇲'}, {id:'THA',name:'تایلند',flag:'🇹🇭'},
  {id:'DEU',name:'آلمان',flag:'🇩🇪'}, {id:'GRC',name:'یونان',flag:'🇬🇷'}, {id:'AZE',name:'آذربایجان',flag:'🇦🇿'}, {id:'IRQ',name:'عراق',flag:'🇮🇶'},
  {id:'NLD',name:'هلند',flag:'🇳🇱'}, {id:'PRT',name:'پرتغال',flag:'🇵🇹'}, {id:'CHE',name:'سوئیس',flag:'🇨🇭'}, {id:'RUS',name:'روسیه',flag:'🇷🇺'},
  {id:'EGY',name:'مصر',flag:'🇪🇬'}, {id:'IND',name:'هند',flag:'🇮🇳'}, {id:'JPN',name:'ژاپن',flag:'🇯🇵'}, {id:'USA',name:'آمریکا',flag:'🇺🇸'}
];
const iso2to3={tr:'TUR',it:'ITA',fr:'FRA',ge:'GEO',es:'ESP',ae:'ARE',am:'ARM',th:'THA',de:'DEU',gr:'GRC',az:'AZE',iq:'IRQ',nl:'NLD',pt:'PRT',ch:'CHE',ru:'RUS',eg:'EGY',in:'IND',jp:'JPN',us:'USA'};
let worldCountryFeatures=[];
const provinceData = [
  ['آذربایجان غربی',['ارومیه','خوی','ماکو']], ['آذربایجان شرقی',['تبریز','جلفا','کندوان']], ['اردبیل',['اردبیل','سرعین','مشگین‌شهر']], ['گیلان',['رشت','ماسوله','بندر انزلی']], ['مازندران',['ساری','رامسر','کلاردشت']],
  ['گلستان',['گرگان','گنبد کاووس','علی‌آباد']], ['کردستان',['سنندج','مریوان','اورامان']], ['زنجان',['زنجان','سلطانیه']], ['قزوین',['قزوین','الموت']], ['تهران',['تهران','دماوند','شمیرانات']],
  ['البرز',['کرج','طالقان']], ['همدان',['همدان','ملایر','کبودرآهنگ']], ['کرمانشاه',['کرمانشاه','پاوه','سرپل‌ذهاب']], ['لرستان',['خرم‌آباد','بروجرد','الیگودرز']], ['مرکزی',['اراک','محلات']],
  ['قم',['قم','دستجرد']], ['اصفهان',['اصفهان','کاشان','نائین']], ['یزد',['یزد','میبد','بافق']], ['چهارمحال و بختیاری',['شهرکرد','کوهرنگ']], ['خوزستان',['اهواز','شوش','آبادان']],
  ['ایلام',['ایلام','دهلران']], ['کهگیلویه و بویراحمد',['یاسوج','سی‌سخت']], ['فارس',['شیراز','کازرون','لار']], ['بوشهر',['بوشهر','گناوه','عسلویه']], ['کرمان',['کرمان','بم','ماهان']],
  ['سیستان و بلوچستان',['زاهدان','چابهار','ایرانشهر']], ['خراسان شمالی',['بجنورد','آشخانه']], ['خراسان رضوی',['مشهد','نیشابور','تربت‌حیدریه']], ['خراسان جنوبی',['بیرجند','طبس']], ['هرمزگان',['بندرعباس','قشم','کیش']], ['سمنان',['سمنان','شاهرود','دامغان']]
];
const initial = {countries:['TUR','ITA','FRA'], provinces:['تهران','اصفهان','فارس','خراسان رضوی'], cities:{'تهران':['تهران'],'اصفهان':['اصفهان'],'فارس':['شیراز'],'خراسان رضوی':['مشهد']}};
const provinceShortNames={'آذربایجان غربی':'آذ. غربی','آذربایجان شرقی':'آذ. شرقی','چهارمحال و بختیاری':'چهارمحال','کهگیلویه و بویراحمد':'کهگیلویه','سیستان و بلوچستان':'سیستان','خراسان شمالی':'خ. شمالی','خراسان رضوی':'خ. رضوی','خراسان جنوبی':'خ. جنوبی'};
const upcomingTrips=[
  {id:'qeshm',title:'قشم؛ جزیره‌ی نقره‌ای',destination:'قشم، ایران',date:'۱۲ آذر · ۴ روزه',summary:'یک سفر طبیعت‌گردی در جنوب ایران',description:'چهار روز برای دیدن دره‌ی ستارگان، جنگل‌های حرا، ساحل‌های آرام و تجربه‌ی حال‌وهوای جزیره. این برنامه در نسخه‌ی دموست و جزئیات اجرایی بعداً تکمیل می‌شود.',coordinates:[56.27,26.95]},
  {id:'japan',title:'ژاپن؛ مسیر شکوفه‌ها',destination:'توکیو، ژاپن',date:'۲۴ فروردین · ۸ روزه',summary:'قدم‌زدن در توکیو و تماشای شکوفه‌های بهاری',description:'یک برنامه‌ی هشت‌روزه برای گشت‌وگذار در محله‌های توکیو، باغ‌ها و مسیرهای شکوفه‌ی گیلاس. نشان قرمز روی کره، مقصد سفر آینده را مشخص می‌کند.',coordinates:[139.69,35.68]}
];
window.RAHISHO_UPCOMING_TRIPS=upcomingTrips;
let state;
try { state = JSON.parse(localStorage.getItem('rahisho-map-state')) || initial; } catch { state = structuredClone(initial); }
state.countries=(state.countries||[]).map(id=>iso2to3[id]||id);
let pickedCountry = null;
let currentProvince = 'تهران';
let toastTimer;
const $ = (q,root=document)=>root.querySelector(q);
const $$ = (q,root=document)=>[...root.querySelectorAll(q)];
const fa = n => new Intl.NumberFormat('fa-IR').format(n);
function save(){ localStorage.setItem('rahisho-map-state',JSON.stringify(state)); updateStats(); }
function updateStats(){
  const world = state.countries.length/195*100;
  $('#country-count').textContent=fa(state.countries.length);
  $('#world-percent').textContent=fa(world.toFixed(1))+'٪';
  $('#world-ring').textContent=fa(world.toFixed(1));
  $('#province-count').textContent=fa(state.provinces.length);
  $('#iran-count-modal').textContent=fa(state.provinces.length);
  $('#iran-percent').textContent=fa(Math.round(state.provinces.length/31*100))+'٪';
  $('#iran-progress-bar').style.width=`${state.provinces.length/31*100}%`;
  window.rahishoState=state;
  document.dispatchEvent(new CustomEvent('rahisho-state',{detail:state}));
}
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500)}
function openModal(id, preselected=null){const el=document.getElementById(id);el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(id==='country-modal'){pickedCountry=preselected;$('#country-search').value='';renderCountries();$('#country-search').focus({preventScroll:true});}}
function closeModal(id){const el=document.getElementById(id);el.classList.remove('open');el.setAttribute('aria-hidden','true');if(!$('.modal-backdrop.open'))document.body.style.overflow=''}
function renderCountries(filter=''){
  const list=$('#country-list');list.innerHTML='';
  const normalized=filter.trim().toLocaleLowerCase();
  const available=countries.filter(c=>!normalized||`${c.name} ${c.id}`.toLocaleLowerCase('fa').includes(normalized));
  available.forEach(c=>{const button=document.createElement('button');button.className='country-option'+(pickedCountry===c.id?' selected':'')+(state.countries.includes(c.id)?' visited':'');button.type='button';button.innerHTML=`<span class="flag">${c.flag}</span><span>${c.name}</span><span class="check">✓</span>`;button.disabled=state.countries.includes(c.id);button.addEventListener('click',()=>{pickedCountry=c.id;renderCountries($('#country-search').value);$('#selected-note').textContent=`${c.flag} ${c.name} انتخاب شد`;$('#confirm-country').disabled=false});list.append(button)});
  if(!available.length)list.innerHTML='<span class="empty-list">کشوری پیدا نشد؛ می‌توانی از فهرست انتخاب کنی.</span>';
  $('#confirm-country').disabled=!pickedCountry;
  if(!pickedCountry)$('#selected-note').textContent='هنوز کشوری انتخاب نشده';
}
function renderProvinceButtons(){
  const grid=$('#province-grid');grid.innerHTML='';
  provinceData.forEach(([name])=>{const button=document.createElement('button');button.type='button';button.className='province-chip'+(state.provinces.includes(name)?' active':'');button.textContent=name;button.addEventListener('click',()=>{selectProvince(name);focusIranProvince(name)});grid.append(button)});
}
function currentCounties(){return (IRAN_DATA.counties&&IRAN_DATA.counties[currentProvince])||[]}
function renderCityList(){
  $('#city-province-name').textContent=currentProvince;
  const list=$('#city-list');list.innerHTML='';
  const counties=currentCounties();
  if(!counties.length){list.innerHTML=`<span class="city-empty">${IRAN_DATA.failed?'داده‌ی شهرستان‌ها بارگذاری نشد':'در حال بارگذاری شهرستان‌ها…'}</span>`;return}
  counties.forEach(county=>{const button=document.createElement('button');button.type='button';button.className='city-chip'+((state.cities[currentProvince]||[]).includes(county.fa)?' active':'');button.textContent=county.fa;button.addEventListener('click',()=>toggleCounty(currentProvince,county.fa));list.append(button)});
}
function toggleCounty(province,county){
  const chosen=state.cities[province]||[];
  state.cities[province]=chosen.includes(county)?chosen.filter(c=>c!==county):[...chosen,county];
  if(state.cities[province].length&&!state.provinces.includes(province))state.provinces.push(province);
  if(!state.cities[province].length)delete state.cities[province];
  currentProvince=province;
  renderCityList();renderProvinceButtons();renderIranMap();save();
  showToast(state.cities[province]?.includes(county)?`${county} به سفرهات اضافه شد`:`${county} از انتخاب‌ها برداشته شد`);
}
function selectProvince(name){
  currentProvince=name;
  if(!state.provinces.includes(name))state.provinces.push(name);
  else if(!state.cities[name]?.length)state.provinces=state.provinces.filter(p=>p!==name);
  renderProvinceButtons();renderCityList();renderIranMap();save();
}
/* ===== Iran map: provinces + shahrestans (real GeoJSON, OpenStreetMap boundaries clipped to the Natural Earth coastline) ===== */
const SVGNS='http://www.w3.org/2000/svg';
const IRAN_DATA={provinces:null,counties:null,loading:null,failed:false};
const IRAN_BOUNDS={minLon:43.9,maxLon:63.5,minLat:25.0,maxLat:39.9};
const IRAN_SCALE=47,IRAN_COS=Math.cos(32.5*Math.PI/180);
const projX=lon=>(lon-IRAN_BOUNDS.minLon)*IRAN_COS*IRAN_SCALE;
const projY=lat=>(IRAN_BOUNDS.maxLat-lat)*IRAN_SCALE;
const IRAN_W=projX(IRAN_BOUNDS.maxLon),IRAN_H=projY(IRAN_BOUNDS.minLat);
const provinceAliases={'کهگیلویه و بویر احمد':'کهگیلویه و بویراحمد'};
function normalizedProvince(name){return provinceAliases[name]||name}
function geomToPath(geom,dec){
  const polys=geom.type==='Polygon'?[geom.coordinates]:geom.coordinates;let d='';
  polys.forEach(poly=>poly.forEach(ring=>{ring.forEach((p,i)=>{d+=(i?'L':'M')+projX(p[0]).toFixed(dec)+' '+projY(p[1]).toFixed(dec)});d+='Z'}));
  return d;
}
function countyPath(c){return c.d||(c.d=geomToPath(c.geometry,3))}
function loadIranData(){
  if(IRAN_DATA.loading)return IRAN_DATA.loading;
  const get=url=>fetch(url).then(r=>{if(!r.ok)throw new Error(url);return r.json()});
  IRAN_DATA.loading=Promise.all([get('./iran-provinces.geojson?v=20261121a'),get('./iran-counties.geojson?v=20261121a')]).then(([prov,cnt])=>{
    IRAN_DATA.provinces=prov.features.map(f=>({id:f.properties.id,fa:f.properties.name_fa,en:f.properties.name_en,bbox:f.properties.bbox,d:geomToPath(f.geometry,2)}));
    const by={};
    cnt.features.forEach(f=>{const p=f.properties;(by[p.province_fa]=by[p.province_fa]||[]).push({id:p.id,fa:p.name_fa,en:p.name_en,bbox:p.bbox,geometry:f.geometry,d:null})});
    Object.values(by).forEach(list=>list.sort((a,b)=>a.fa.localeCompare(b.fa,'fa')));
    IRAN_DATA.counties=by;sanitizeIranState();
  }).catch(err=>{IRAN_DATA.failed=true;console.warn('Iran map data failed to load',err)});
  return IRAN_DATA.loading;
}
function sanitizeIranState(){
  let changed=false;
  Object.keys(state.cities||{}).forEach(p=>{
    const valid=new Set(((IRAN_DATA.counties||{})[normalizedProvince(p)]||[]).map(c=>c.fa));
    const kept=state.cities[p].filter(n=>valid.has(n));
    if(kept.length!==state.cities[p].length){changed=true;if(kept.length)state.cities[p]=kept;else delete state.cities[p]}
  });
  if(changed)save();
}
const iranView={k:1,x:0,y:0};let focusedProvince=null,pendingFocus=null,iranDrag={moved:false};
function iranEls(){const host=$('#iran-map-shape');return{host,svg:host&&host.querySelector('svg'),vp:host&&host.querySelector('.iran-viewport')}}
function mk(tag,attrs={},parent){const el=document.createElementNS(SVGNS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(parent)parent.append(el);return el}
function renderIranMap(){
  const host=$('#iran-map-shape');if(!host)return;
  if(!IRAN_DATA.provinces){
    if(IRAN_DATA.failed){host.innerHTML='<div class="iran-map-loading">نقشه بارگذاری نشد. فایل‌های iran-provinces.geojson و iran-counties.geojson باید از طریق یک سرور محلی/وب باز شوند.</div>';return}
    host.innerHTML='<div class="iran-map-loading">در حال بارگذاری نقشه…</div>';loadIranData().then(renderIranMap);return;
  }
  if(!host.querySelector('svg'))buildIranSvg(host);
  refreshIranStyles();
  if(pendingFocus){const n=pendingFocus;pendingFocus=null;focusIranProvince(n)}
}
function buildIranSvg(host){
  host.innerHTML='';
  const svg=mk('svg',{viewBox:`0 0 ${IRAN_W.toFixed(1)} ${IRAN_H.toFixed(1)}`,role:'img','aria-label':'نقشه‌ی تعاملی استان‌ها و شهرستان‌های ایران'},host);
  const vp=mk('g',{class:'iran-viewport'},svg);
  const provLayer=mk('g',{class:'iran-province-layer'},vp);
  IRAN_DATA.provinces.forEach(p=>{
    const name=normalizedProvince(p.fa);
    const path=mk('path',{d:p.d,class:'iran-province',tabindex:'0',role:'button','data-province':name,'aria-label':name},provLayer);
    const title=mk('title',{},path);title.textContent=name;
    const activate=()=>{if(iranDrag.moved)return;focusIranProvince(name)};
    path.addEventListener('click',activate);
    path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focusIranProvince(name)}});
  });
  mk('g',{class:'iran-visited-layer','pointer-events':'none'},vp);
  mk('g',{class:'iran-county-layer'},vp);
  const trip=(window.RAHISHO_UPCOMING_TRIPS||[]).find(t=>t.id==='qeshm');
  if(trip){
    const [lon,lat]=trip.coordinates;
    const pin=mk('g',{class:'iran-trip-pin',role:'button',tabindex:'0','aria-label':'سفر پیش رو: قشم','data-x':projX(lon).toFixed(2),'data-y':projY(lat).toFixed(2)},vp);
    pin.innerHTML='<circle class="pin-halo" r="18" cy="-10"/><path class="pin-shape" d="M0 0C-2-5-11-13-11-21a11 11 0 1 1 22 0C11-13 2-5 0 0Z"/><circle class="pin-core" cy="-21" r="3.5"/><title>سفر پیش رو: قشم</title>';
    pin.addEventListener('click',e=>{e.stopPropagation();openTrip('qeshm')});
    pin.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openTrip('qeshm')}});
  }
  // focus bar (province name, back, list)
  const view=host.parentElement;
  if(!view.querySelector('.iran-focus-bar')){
    const bar=document.createElement('div');bar.className='iran-focus-bar';bar.hidden=true;
    bar.innerHTML='<button type="button" class="iran-back">‹ همه‌ی ایران</button><span class="iran-focus-name"><b></b><i></i></span><button type="button" class="iran-list-btn">فهرست</button>';
    view.append(bar);
    bar.querySelector('.iran-back').addEventListener('click',resetIranView);
    bar.querySelector('.iran-list-btn').addEventListener('click',()=>{renderCityList();renderProvinceButtons();openModal('iran-modal')});
  }
  attachIranGestures(svg);
  applyIranView(false);
}
function refreshIranStyles(){
  const {svg}=iranEls();if(!svg)return;
  const hasCounties=p=>(state.cities[p]||[]).length>0;
  $$('.iran-province',svg).forEach(path=>{
    const name=path.dataset.province;
    path.classList.toggle('visited',state.provinces.includes(name)&&!hasCounties(name));
    path.classList.toggle('touched',hasCounties(name));
    path.classList.toggle('focused',name===focusedProvince);
    path.setAttribute('aria-label',`${name}${state.provinces.includes(name)?'، ثبت‌شده':''}`);
  });
  svg.classList.toggle('has-focus',!!focusedProvince);iranEls().host.parentElement.classList.toggle('is-focused',!!focusedProvince);
  // lit shahrestans overlay: only chosen shahrestans light up, everywhere
  const overlay=$('.iran-visited-layer',svg);overlay.innerHTML='';
  Object.entries(state.cities).forEach(([prov,names])=>{
    const list=(IRAN_DATA.counties||{})[normalizedProvince(prov)]||[];
    names.forEach(n=>{const c=list.find(x=>x.fa===n);if(c)mk('path',{d:countyPath(c),class:'iran-county-lit'},overlay)});
  });
  // county layer for focused province
  const layer=$('.iran-county-layer',svg);layer.innerHTML='';
  if(focusedProvince){
    const chosen=state.cities[focusedProvince]||[];
    (IRAN_DATA.counties[focusedProvince]||[]).forEach(c=>{
      const on=chosen.includes(c.fa);
      const path=mk('path',{d:countyPath(c),class:'iran-county'+(on?' visited':''),tabindex:'0',role:'button','aria-label':`شهرستان ${c.fa}${on?'، ثبت‌شده':''}`},layer);
      const title=mk('title',{},path);title.textContent=c.fa;
      const label=txt=>{const i=$('.iran-focus-bar .iran-focus-name i');if(i)i.textContent=txt};
      path.addEventListener('pointerenter',()=>label(c.fa));path.addEventListener('pointerleave',()=>label($('.iran-focus-bar').dataset.count));path.addEventListener('focus',()=>label(c.fa));path.addEventListener('blur',()=>label($('.iran-focus-bar').dataset.count));
      path.addEventListener('click',()=>{if(iranDrag.moved)return;toggleCounty(focusedProvince,c.fa)});
      path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleCounty(focusedProvince,c.fa)}});
    });
  }
  const bar=$('.iran-focus-bar',iranEls().host.parentElement);
  if(bar){bar.hidden=!focusedProvince;if(focusedProvince){const n=(IRAN_DATA.counties[focusedProvince]||[]).length;bar.dataset.count=`${fa(n)} شهرستان`;bar.querySelector('.iran-focus-name b').textContent=focusedProvince;bar.querySelector('.iran-focus-name i').textContent=bar.dataset.count}}
}
function applyIranView(animate=true){
  const {svg,vp}=iranEls();if(!vp)return;
  vp.classList.toggle('no-anim',!animate);
  vp.style.transform=`translate(${iranView.x}px,${iranView.y}px) scale(${iranView.k})`;
  svg.classList.toggle('zoomed',iranView.k>1.02);
  $$('.iran-trip-pin',svg).forEach(pin=>{pin.setAttribute('transform',`translate(${pin.dataset.x} ${pin.dataset.y}) scale(${(1/iranView.k).toFixed(4)})`)});
}
function focusIranProvince(name){
  name=normalizedProvince(name);
  if(!IRAN_DATA.provinces){pendingFocus=name;return}
  const p=IRAN_DATA.provinces.find(x=>normalizedProvince(x.fa)===name);if(!p)return;
  focusedProvince=name;currentProvince=name;
  const [minLon,minLat,maxLon,maxLat]=p.bbox;
  const x0=projX(minLon),x1=projX(maxLon),y0=projY(maxLat),y1=projY(minLat);
  const bw=Math.max(x1-x0,1),bh=Math.max(y1-y0,1);
  const k=Math.max(1,Math.min(IRAN_W/(bw*1.3),IRAN_H/(bh*1.3),40));
  iranView.k=k;iranView.x=IRAN_W/2-((x0+x1)/2)*k;iranView.y=IRAN_H/2-((y0+y1)/2)*k;
  refreshIranStyles();applyIranView(true);renderCityList();
}
function resetIranView(){focusedProvince=null;iranView.k=1;iranView.x=0;iranView.y=0;refreshIranStyles();applyIranView(true)}
function zoomIranBy(f,cx=IRAN_W/2,cy=IRAN_H/2){
  const k2=Math.max(1,Math.min(60,iranView.k*f));if(k2===iranView.k)return;
  iranView.x=cx-(cx-iranView.x)*(k2/iranView.k);iranView.y=cy-(cy-iranView.y)*(k2/iranView.k);iranView.k=k2;
  clampIranView();
  if(iranView.k<=1.02&&focusedProvince){focusedProvince=null;refreshIranStyles()}
  applyIranView(false);
}
function clampIranView(){
  const m=.25,k=iranView.k;
  iranView.x=Math.min(IRAN_W*m,Math.max(IRAN_W*(1-k)-IRAN_W*m,iranView.x));
  iranView.y=Math.min(IRAN_H*m,Math.max(IRAN_H*(1-k)-IRAN_H*m,iranView.y));
}
function attachIranGestures(svg){
  const toVB=(clientX,clientY)=>{const pt=svg.createSVGPoint();pt.x=clientX;pt.y=clientY;const m=svg.getScreenCTM();return m?pt.matrixTransform(m.inverse()):{x:IRAN_W/2,y:IRAN_H/2}};
  svg.addEventListener('wheel',e=>{e.preventDefault();const p=toVB(e.clientX,e.clientY);zoomIranBy(e.deltaY<0?1.2:1/1.2,p.x,p.y)},{passive:false});
  let start=null;
  svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;start={x:e.clientX,y:e.clientY,vx:iranView.x,vy:iranView.y};iranDrag.moved=false});
  window.addEventListener('pointermove',e=>{
    if(!start)return;
    const dx=e.clientX-start.x,dy=e.clientY-start.y;
    if(!iranDrag.moved&&Math.hypot(dx,dy)<5)return;
    if(iranView.k<=1.02)return;
    iranDrag.moved=true;
    const a=toVB(0,0),b=toVB(1,1),sx=b.x-a.x,sy=b.y-a.y;
    iranView.x=start.vx+dx*sx;iranView.y=start.vy+dy*sy;clampIranView();applyIranView(false);
  });
  window.addEventListener('pointerup',()=>{start=null;setTimeout(()=>{iranDrag.moved=false},0)});
}
function openTrip(id){const trip=upcomingTrips.find(item=>item.id===id);if(!trip)return;$('#trip-title').textContent=trip.title;$('#trip-destination').textContent=trip.destination;$('#trip-dates').textContent=trip.date;$('#trip-summary').textContent=trip.summary;$('#trip-description').textContent=trip.description;openModal('trip-modal')}
$$('[data-trip]').forEach(card=>{const activate=()=>openTrip(card.dataset.trip);card.addEventListener('click',activate);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}})});
$('#iran-zoom-in').addEventListener('click',()=>zoomIranBy(1.5));$('#iran-zoom-out').addEventListener('click',()=>zoomIranBy(1/1.5));$('#iran-zoom-reset').addEventListener('click',resetIranView);
function setMapView(view){
  $$('.map-tab').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  $('#map-stage').classList.toggle('iran-view',view==='iran');
  if(view==='iran'){renderProvinceButtons();renderCityList();renderIranMap()}
}
$('#globe-wrap').addEventListener('click',()=>openModal('country-modal'));
$('#globe-wrap').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal('country-modal')}});
$('#add-country').addEventListener('click',()=>openModal('country-modal'));
$('#confirm-country').addEventListener('click',()=>{if(!pickedCountry)return;const selected=pickedCountry,c=countries.find(item=>item.id===selected);state.countries.push(selected);save();document.dispatchEvent(new CustomEvent('rahisho:country-confirmed',{detail:{id:selected}}));closeModal('country-modal');showToast(`${c?.flag||'🌍'} ${c?.name||selected} به نقشه‌ات اضافه شد`);pickedCountry=null});
$('#country-search').addEventListener('input',e=>renderCountries(e.target.value));
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeModal(button.dataset.close)));
$$('.modal-backdrop').forEach(backdrop=>backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal(backdrop.id)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-backdrop.open').forEach(el=>closeModal(el.id))});
$('#zoom-iran').addEventListener('click',()=>{setMapView('iran');renderProvinceButtons();renderCityList()});
$$('.map-tab').forEach(button=>button.addEventListener('click',()=>setMapView(button.dataset.view)));
$('#rotate-globe').addEventListener('click',()=>document.dispatchEvent(new Event('rahisho:rotate')));
$('#mark-isfahan').addEventListener('click',()=>{if(!state.provinces.includes('اصفهان'))state.provinces.push('اصفهان');state.cities['اصفهان']=[...new Set([...(state.cities['اصفهان']||[]),'اصفهان'])];save();renderIranMap();showToast('اصفهان به نقشه‌ی سفرهات اضافه شد')});
$('#more-trips').addEventListener('click',()=>openTrip('qeshm'));
$$('[data-page]').forEach(button=>button.addEventListener('click',()=>{const page=button.dataset.page;$$('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));if(page==='home')return;const names={journeys:'سفرها',community:'آدم‌های هم‌مسیر',profile:'پروفایل'};showToast(`${names[page]}؛ به‌زودی با راهیشو`)}));
renderIranMap();updateStats();
document.addEventListener('rahisho:world-ready',event=>{
  worldCountryFeatures=event.detail;
  const known=new Set(countries.map(c=>c.id));
  worldCountryFeatures.forEach(feature=>{if(!feature.id||known.has(feature.id))return;countries.push({id:feature.id,name:feature.properties?.name||feature.id,flag:'🌐'});known.add(feature.id)});
  renderCountries($('#country-search')?.value||'');
});
document.addEventListener('rahisho:country-hit',event=>{
  const {id,name}=event.detail||{};if(!id)return;
  if(state.countries.includes(id)){showToast(`${countries.find(c=>c.id===id)?.name||name} قبلاً ثبت شده`);return}
  if(!countries.some(c=>c.id===id))countries.push({id,name:name||id,flag:'🌐'});
  openModal('country-modal',id);
  $('#selected-note').textContent=`🌐 ${countries.find(c=>c.id===id)?.name||name} انتخاب شد`;
});
