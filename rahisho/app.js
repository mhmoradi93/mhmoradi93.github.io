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
function renderIranMap(){
  const map=$('#iran-map-shape');map.innerHTML='';
  provinceData.forEach(([name])=>{const button=document.createElement('button');button.type='button';button.className='province-map-chip'+(state.provinces.includes(name)?' active':'');button.textContent=provinceShortNames[name]||name;button.title=name;button.setAttribute('aria-label',name);button.addEventListener('click',()=>{selectProvince(name);openModal('iran-modal')});map.append(button)});
}
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
$('#more-trips').addEventListener('click',()=>showToast('فهرست سفرهای تازه‌ی راهیشو به‌زودی اینجاست'));
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
