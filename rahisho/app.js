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
  provinceData.forEach(([name])=>{const button=document.createElement('button');button.type='button';button.className='province-chip'+(state.provinces.includes(name)?' active':'');button.textContent=name;button.addEventListener('click',()=>selectProvince(name));grid.append(button)});
}
function renderCityList(){
  const entry=provinceData.find(p=>p[0]===currentProvince);if(!entry)return;
  $('#city-province-name').textContent=currentProvince;
  const cities=$('#city-list');cities.innerHTML='';
  entry[1].forEach(city=>{const button=document.createElement('button');button.type='button';button.className='city-chip'+((state.cities[currentProvince]||[]).includes(city)?' active':'');button.textContent=city;button.addEventListener('click',()=>{
    const chosen=state.cities[currentProvince]||[];state.cities[currentProvince]=chosen.includes(city)?chosen.filter(c=>c!==city):[...chosen,city];
    if(state.cities[currentProvince].length&&!state.provinces.includes(currentProvince))state.provinces.push(currentProvince);
    if(!state.cities[currentProvince].length)delete state.cities[currentProvince];
    renderCityList();renderProvinceButtons();renderIranMap();save();showToast(state.cities[currentProvince]?.includes(city)?`${city} به سفرهات اضافه شد`:`${city} از انتخاب‌ها برداشته شد`);
  });cities.append(button)});
}
function selectProvince(name){
  currentProvince=name;
  if(!state.provinces.includes(name))state.provinces.push(name);
  else if(!state.cities[name]?.length)state.provinces=state.provinces.filter(p=>p!==name);
  renderProvinceButtons();renderCityList();renderIranMap();save();
}
let iranZoom=1;
const provinceAliases={'کهگیلویه و بویر احمد':'کهگیلویه و بویراحمد'};
function normalizedProvince(name){return provinceAliases[name]||name}
function renderIranMap(){
  const host=$('#iran-map-shape');if(!host)return;
  const shapes=window.RAHISHO_IRAN_PROVINCES||[];const size=window.RAHISHO_IRAN_MAP_VIEWBOX||{width:814,height:748};
  host.innerHTML='';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`0 0 ${size.width} ${size.height}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','نقشه‌ی تعاملی استان‌های ایران');
  const g=document.createElementNS(svg.namespaceURI,'g');g.classList.add('iran-province-layer');
  shapes.forEach(shape=>{
    const name=normalizedProvince(shape.fa);const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',shape.d);path.setAttribute('class','iran-province'+(state.provinces.includes(name)?' visited':''));path.setAttribute('tabindex','0');path.setAttribute('role','button');path.dataset.province=name;path.setAttribute('aria-label',`${name}${state.provinces.includes(name)?'، ثبت‌شده':''}`);
    const title=document.createElementNS(svg.namespaceURI,'title');title.textContent=name;path.append(title);
    const activate=()=>{selectProvince(name);openModal('iran-modal')};path.addEventListener('click',activate);path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}});g.append(path);
  });
  const pin=document.createElementNS(svg.namespaceURI,'g');pin.setAttribute('class','iran-trip-pin');pin.setAttribute('transform','translate(574 660)');pin.setAttribute('role','button');pin.setAttribute('tabindex','0');pin.setAttribute('aria-label','سفر پیش رو: قشم');pin.innerHTML='<circle class="pin-halo" r="18" cy="-10"/><path class="pin-shape" d="M0 0C-2-5-11-13-11-21a11 11 0 1 1 22 0C11-13 2-5 0 0Z"/><circle class="pin-core" cy="-21" r="3.5"/><title>سفر پیش رو: قشم</title>';
  const openQeshm=()=>openTrip('qeshm');pin.addEventListener('click',e=>{e.stopPropagation();openQeshm()});pin.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openQeshm()}});g.append(pin);svg.append(g);host.append(svg);applyIranZoom();
}
function applyIranZoom(){const g=$('#iran-map-shape .iran-province-layer');if(!g)return;const size=window.RAHISHO_IRAN_MAP_VIEWBOX||{width:814,height:748};g.style.transform=`translate(${(size.width*(1-iranZoom))/2}px ${(size.height*(1-iranZoom))/2}px) scale(${iranZoom})`}
function openTrip(id){const trip=upcomingTrips.find(item=>item.id===id);if(!trip)return;$('#trip-title').textContent=trip.title;$('#trip-destination').textContent=trip.destination;$('#trip-dates').textContent=trip.date;$('#trip-summary').textContent=trip.summary;$('#trip-description').textContent=trip.description;openModal('trip-modal')}
$$('[data-trip]').forEach(card=>{const activate=()=>openTrip(card.dataset.trip);card.addEventListener('click',activate);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}})});
$('#iran-zoom-in').addEventListener('click',()=>{iranZoom=Math.min(2.5,iranZoom+.25);applyIranZoom()});$('#iran-zoom-out').addEventListener('click',()=>{iranZoom=Math.max(1,iranZoom-.25);applyIranZoom()});$('#iran-zoom-reset').addEventListener('click',()=>{iranZoom=1;applyIranZoom()});
$('#iran-map-shape').addEventListener('wheel',e=>{e.preventDefault();iranZoom=Math.max(1,Math.min(2.5,iranZoom+(e.deltaY<0?.12:-.12)));applyIranZoom()},{passive:false});
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
$('#mark-isfahan').addEventListener('click',()=>{if(!state.provinces.includes('اصفهان'))state.provinces.push('اصفهان');state.cities['اصفهان']=[...new Set([...(state.cities['اصفهان']||[]),'اصفهان'])];save();showToast('اصفهان به نقشه‌ی سفرهات اضافه شد')});
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
