import * as THREE from 'three';

const host=document.getElementById('earth-canvas');
const width=2048,height=1024,longitudeOffset=55;
let features=[],visited=new Set((window.rahishoState?.countries)||[]),dragging=false,dragged=false,lastX=0,lastY=0,hovered=null,spinBoost=0,lastHoverAt=0;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(34,1,.1,80);camera.position.set(0,0,3.45);
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.setSize(400,360,false);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.domElement.setAttribute('aria-label','کره‌ی سه‌بعدی؛ برای انتخاب کشور روی آن بزن');renderer.domElement.tabIndex=0;host.append(renderer.domElement);
const earthGroup=new THREE.Group();scene.add(earthGroup);
const sphereGeometry=new THREE.SphereGeometry(1,96,72);
const textureCanvas=document.createElement('canvas');textureCanvas.width=width;textureCanvas.height=height;
const ctx=textureCanvas.getContext('2d',{alpha:false});
const mapTexture=new THREE.CanvasTexture(textureCanvas);mapTexture.colorSpace=THREE.SRGBColorSpace;mapTexture.anisotropy=renderer.capabilities.getMaxAnisotropy();
const earth=new THREE.Mesh(sphereGeometry,new THREE.MeshBasicMaterial({map:mapTexture}));earth.rotation.y=0;earthGroup.add(earth);

const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.055,72,56),new THREE.ShaderMaterial({
  vertexShader:`varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`,
  fragmentShader:`varying vec3 n;varying vec3 v;void main(){float f=pow(1.0-max(dot(normalize(n),normalize(v)),0.0),3.3);gl_FragColor=vec4(0.30,0.65,1.0,f*0.68);}`,
  transparent:true,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending
}));earthGroup.add(atmosphere);

const glowMaterial=new THREE.SpriteMaterial({map:makeGlow(),color:0x256fbd,transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending});
const glow=new THREE.Sprite(glowMaterial);glow.scale.set(3.1,3.1,1);glow.position.z=-.25;scene.add(glow);

const starsGeometry=new THREE.BufferGeometry();
const starCoords=new Float32Array(820*3);
for(let i=0;i<820;i++){const radius=THREE.MathUtils.randFloat(2.3,6.8),theta=Math.random()*Math.PI*2,phi=Math.acos(THREE.MathUtils.randFloatSpread(2));starCoords[i*3]=radius*Math.sin(phi)*Math.cos(theta);starCoords[i*3+1]=radius*Math.cos(phi);starCoords[i*3+2]=radius*Math.sin(phi)*Math.sin(theta)}
starsGeometry.setAttribute('position',new THREE.BufferAttribute(starCoords,3));
const stars=new THREE.Points(starsGeometry,new THREE.PointsMaterial({color:0x6799d1,size:.012,transparent:true,opacity:.8,sizeAttenuation:true}));scene.add(stars);

const orbitGroup=new THREE.Group();scene.add(orbitGroup);
const orbitLines=[];
for(const [rx,rz,tilt,color] of [[1.29,1.06,.12,0x315988],[1.37,1.14,-.34,0x3a6691],[1.2,1.29,.52,0x4d608a]]){
  const points=[];for(let i=0;i<=220;i++){const a=i/220*Math.PI*2;points.push(new THREE.Vector3(Math.cos(a)*rx,Math.sin(a)*rz,0))}
  const geometry=new THREE.BufferGeometry().setFromPoints(points);const line=new THREE.Line(geometry,new THREE.LineBasicMaterial({color,transparent:true,opacity:.24}));line.rotation.x=tilt;line.rotation.y=.18;orbitGroup.add(line);orbitLines.push(line)
}
const orbitDots=[0xf3c84e,0x78b0ed,0xf19f70].map(color=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(.024,14,14),new THREE.MeshBasicMaterial({color}));scene.add(mesh);return mesh});
const markerGroup=new THREE.Group();earthGroup.add(markerGroup);
const markerLocations={TUR:[35,39],ITA:[12.5,42.5],FRA:[2,47],GEO:[44.8,42],ESP:[-3.7,40],ARE:[54,24],ARM:[45,40],THA:[101,16],DEU:[10,51],GRC:[22,39],AZE:[47.5,40.5],IRQ:[44,33],NLD:[5.3,52],PRT:[-8,39.5],CHE:[8,47],RUS:[37,56],EGY:[30,27],IND:[78,21],JPN:[138,37],USA:[-99,39]};
function geoPosition(lon,lat,r=1.014){const phi=(90-lat)*Math.PI/180,theta=((lon+longitudeOffset+360)%360)*Math.PI/180;return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta))}
function rebuildMarkers(){markerGroup.clear();for(const id of visited){const loc=markerLocations[id];if(!loc)continue;const pin=new THREE.Mesh(new THREE.SphereGeometry(.009,10,10),new THREE.MeshBasicMaterial({color:0xffd75e}));pin.position.copy(geoPosition(loc[0],loc[1],1.012));markerGroup.add(pin)}}

function makeGlow(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const radial=g.createRadialGradient(64,64,8,64,64,63);radial.addColorStop(0,'rgba(38,113,191,.25)');radial.addColorStop(.55,'rgba(30,91,169,.1)');radial.addColorStop(1,'rgba(18,54,110,0)');g.fillStyle=radial;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}
function mapX(lon){return (((lon+longitudeOffset+3600)%360)/360)*width}
function ringPath(target,ring,offset){if(!ring?.length)return;const pts=ring.map(([lon,lat])=>[mapX(lon),((90-lat)/180)*height]);for(let i=1;i<pts.length;i++){const prev=pts[i-1][0],cur=pts[i][0];if(cur-prev>.5*width)for(let j=i;j<pts.length;j++)pts[j][0]-=width;else if(prev-cur>.5*width)for(let j=i;j<pts.length;j++)pts[j][0]+=width}target.moveTo(pts[0][0]+offset,pts[0][1]);for(let i=1;i<pts.length;i++)target.lineTo(pts[i][0]+offset,pts[i][1]);target.closePath()}
function geometryPolygons(geometry){return geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates}
function drawFeature(feature,selected){
  for(const polygon of geometryPolygons(feature.geometry||{}))for(const shift of [-width,0,width]){
    const path=new Path2D();for(const ring of polygon){const temp=new Path2D();ringPath(temp,ring,shift);path.addPath(temp)}
    ctx.fillStyle=selected?'rgba(247,199,76,.78)':'rgba(27,67,89,.74)';ctx.fill(path,'evenodd');
    ctx.save();ctx.lineJoin='round';ctx.lineCap='round';ctx.shadowColor=selected?'#ffe36b':'#f7c64d';ctx.shadowBlur=selected?13:8;ctx.strokeStyle=selected?'rgba(255,226,112,.97)':'rgba(245,196,72,.88)';ctx.lineWidth=selected?2.15:1.15;ctx.stroke(path);ctx.restore();
    ctx.strokeStyle=selected?'rgba(255,244,190,.72)':'rgba(255,224,135,.36)';ctx.lineWidth=.45;ctx.stroke(path);
  }
}
function renderMap(){
  const ocean=ctx.createLinearGradient(0,0,0,height);ocean.addColorStop(0,'#071428');ocean.addColorStop(.49,'#123149');ocean.addColorStop(1,'#061326');ctx.fillStyle=ocean;ctx.fillRect(0,0,width,height);
  const ambient=ctx.createRadialGradient(width*.47,height*.47,60,width*.47,height*.47,width*.8);ambient.addColorStop(0,'rgba(28,89,115,.18)');ambient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=ambient;ctx.fillRect(0,0,width,height);
  for(const feature of features)drawFeature(feature,visited.has(feature.id));
  mapTexture.needsUpdate=true;
}
function pointInRing(point,ring){let inside=false;const [lon,lat]=point;for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  let xi=ring[i][0],xj=ring[j][0];while(xi-lon>180)xi-=360;while(xi-lon< -180)xi+=360;while(xj-lon>180)xj-=360;while(xj-lon< -180)xj+=360;
  const yi=ring[i][1],yj=ring[j][1];const crosses=((yi>lat)!==(yj>lat))&&(lon<(xj-xi)*(lat-yi)/(yj-yi||1e-9)+xi);if(crosses)inside=!inside
}return inside}
function featureContains(feature,lon,lat){return geometryPolygons(feature.geometry||{}).some(poly=>pointInRing([lon,lat],poly[0])&&!poly.slice(1).some(r=>pointInRing([lon,lat],r)))}
function countryAt(event){const rect=renderer.domElement.getBoundingClientRect();mouse.x=((event.clientX-rect.left)/rect.width)*2-1;mouse.y=-((event.clientY-rect.top)/rect.height)*2+1;raycaster.setFromCamera(mouse,camera);const hit=raycaster.intersectObject(earth,false)[0];if(!hit?.uv)return null;const lon=((hit.uv.x*360-longitudeOffset+540)%360)-180,lat=hit.uv.y*180-90;return features.find(f=>featureContains(f,lon,lat))||null}
const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2();
function emitCountry(feature,event){if(!feature)return false;event.stopPropagation();document.dispatchEvent(new CustomEvent('rahisho:country-hit',{detail:{id:feature.id,name:feature.properties?.name||feature.id}}));return true}
renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;dragged=false;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener('pointermove',e=>{if(dragging){const dx=e.clientX-lastX,dy=e.clientY-lastY;if(Math.abs(dx)+Math.abs(dy)>4)dragged=true;earthGroup.rotation.y+=dx*.004;earthGroup.rotation.x=THREE.MathUtils.clamp(earthGroup.rotation.x+dy*.003,-.75,.75);lastX=e.clientX;lastY=e.clientY;return}if(performance.now()-lastHoverAt<70)return;lastHoverAt=performance.now();const feature=countryAt(e);hovered=feature;renderer.domElement.style.cursor=feature?'pointer':'grab'});
renderer.domElement.addEventListener('pointerup',e=>{dragging=false;renderer.domElement.releasePointerCapture(e.pointerId)});
renderer.domElement.addEventListener('click',e=>{if(dragged){dragged=false;return}emitCountry(countryAt(e),e)});
renderer.domElement.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('globe-wrap').click()}});
renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();camera.position.z=THREE.MathUtils.clamp(camera.position.z+e.deltaY*.0014,2.5,4.7)},{passive:false});
document.addEventListener('rahisho:state',event=>{visited=new Set(event.detail?.countries||[]);rebuildMarkers();renderMap()});
document.addEventListener('rahisho:rotate',()=>{spinBoost=.055});
window.addEventListener('resize',resize);
const observer=new ResizeObserver(resize);observer.observe(host);
function resize(){const rect=host.getBoundingClientRect();const w=Math.max(1,rect.width),h=Math.max(1,rect.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
let start=performance.now();function animate(now){requestAnimationFrame(animate);if(!dragging)earthGroup.rotation.y+=.00023+spinBoost;spinBoost*=.94;if(spinBoost<.0001)spinBoost=0;const t=(now-start)*.00009;orbitLines.forEach((line,i)=>{const dot=orbitDots[i];const angle=(t*(i%2?-.8:1)+i*.38)%(Math.PI*2);const rx=[1.29,1.37,1.2][i],rz=[1.06,1.14,1.29][i];const p=new THREE.Vector3(Math.cos(angle)*rx,Math.sin(angle)*rz,0);p.applyEuler(line.rotation);dot.position.copy(p)});renderer.render(scene,camera)}
async function init(){
  try{
    let data;
    const compressed=await fetch('./countries.geojson.gz');
    if(compressed.ok&&'DecompressionStream' in window){const stream=compressed.body.pipeThrough(new DecompressionStream('gzip'));data=await new Response(stream).json()}
    else{const response=await fetch('./countries.geojson');if(!response.ok)throw new Error('country data unavailable');data=await response.json()}
    features=data.features||[];document.dispatchEvent(new CustomEvent('rahisho:world-ready',{detail:features}));renderMap();rebuildMarkers();resize();requestAnimationFrame(animate)
  }
  catch(error){host.innerHTML='<div class="earth-error">کره‌ی سه‌بعدی بارگذاری نشد. صفحه را با یک وب‌سرور محلی باز کن.</div>';console.error(error)}
}
init();
