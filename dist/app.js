const data=window.BABIL;const key=document.body.dataset.profile||'magaza';const p=data.profiles[key];const base=document.body.dataset.base||'./';
const icons={phone:'M7 3H3v4c0 8 6 14 14 14h4v-4l-5-2-2 3c-4-2-6-4-8-8l3-2z',chat:'M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z',pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',link:'M9 15l6-6M8 17l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 7l2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0',save:'M5 3h14v18H5zM8 8h8M8 12h8M8 16h5',star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z'};
function action(label,detail,href,icon='link',primary=false,id=''){let e=document.createElement(href?'a':'button');e.className='action'+(primary?' primary':'');if(href){e.href=href;if(href.startsWith('https:')){e.target='_blank';e.rel='noopener noreferrer';}}else if(!id){e.onclick=()=>showMissing(label);}if(id)e.id=id;e.innerHTML=`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="${icons[icon]}"/></svg><span><strong></strong><small></small></span><span class="arrow" aria-hidden="true">↗</span>`;e.querySelector('strong').textContent=label;e.querySelector('small').textContent=detail;document.querySelector('.actions').append(e);}
document.title=p.name+' · BABİL | MONO LINK';document.querySelector('#name').textContent=p.name;document.querySelector('#subtitle').textContent=p.subtitle;document.querySelector('#role').textContent=p.role;if(p.photo){const img=document.createElement('img');img.src=base+'assets/'+p.photo;img.alt=p.name;img.className='portrait '+key;const frame=document.createElement('div');frame.className='photo-frame';frame.append(img);document.querySelector('#visual').append(frame);}else document.querySelector('#visual').innerHTML='<img class="store-logo" src="'+base+'assets/babil-logo.webp" alt="BABİL Thermo Concept marka amblemi">';
action('WhatsApp ile iletişime geç',p.phone?formatPhone(p.phone):'Kişisel numara bekleniyor',p.phone?'https://wa.me/'+p.phone:null,'chat',true);
action('Telefonla ara',p.phone?formatPhone(p.phone):'Kişisel numara bekleniyor',p.phone?'tel:+'+p.phone:null,'phone');
for(const [label,value,icon] of [['Instagram',data.instagram,'link'],['Facebook',data.facebook,'link'],['Google’da yorum yap',data.review,'star'],['Web sitesi',data.web,'link']]){action(label,value?'Sayfayı aç':'Bağlantı bilgisi bekleniyor',value,icon);}
if(key==='magaza')action('IBAN bilgileri',data.iban?'Hesap bilgisini kopyala':'Hesap bilgisi bekleniyor',null,'save',false,data.iban?'iban':'');
action('Mağazaya yol tarifi',data.maps?'Dalaman · Muğla':'Konum bağlantısı bekleniyor',data.maps,'pin');document.querySelector('.address').textContent=data.address;
for(const [k,label] of [['magaza','Mağaza'],['bilgehan','Bilgehan'],['banu','Banu']]){const a=document.createElement('a');a.href=base+(k==='magaza'?'':k+'/');a.textContent=label;if(k===key){a.className='active';a.setAttribute('aria-current','page');}document.querySelector('.switcher').append(a);}
let timer;function toast(t){document.querySelector('.toast').textContent=t;clearTimeout(timer);timer=setTimeout(()=>document.querySelector('.toast').textContent='',4000);}async function copy(t){try{await navigator.clipboard.writeText(t);toast('Kopyalandı');}catch{toast('Kopyalanamadı. Tarayıcının paylaş menüsünü kullanabilirsiniz.');}}
document.querySelector('#share').onclick=async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(e){if(e.name!=='AbortError')copy(location.href);}}else copy(location.href);};
if(document.querySelector('#iban'))document.querySelector('#iban').onclick=()=>copy(data.iban);

function formatPhone(n){const x=n.replace(/^90/,'');return '+90 '+x.slice(0,3)+' '+x.slice(3,6)+' '+x.slice(6,8)+' '+x.slice(8);}
function showMissing(label){const dialog=document.querySelector('#information');document.querySelector('#information-title').textContent=label;document.querySelector('#information-text').textContent=p.name+' için bu bilgi henüz eklenmedi. Gerçek bağlantı tanımlandığında bu düğme doğrudan ilgili hizmeti açacak.';dialog.showModal();}
document.querySelector('#close-information').onclick=()=>document.querySelector('#information').close();
document.querySelector('#information').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});

if(key!=='magaza'){document.body.classList.add('personal-profile');const mark=document.querySelector('.top .wordmark');mark.textContent='';const logo=document.createElement('img');logo.src=base+'assets/babil-logo.webp';logo.alt='BABİL Thermo Concept';mark.append(logo);const actions=document.querySelector('.actions');const phone=actions.querySelector('a[href^="tel:"]');if(phone)actions.prepend(phone);}
if(key!=='magaza'){
 const frame=document.querySelector('.photo-frame');frame.textContent='';frame.classList.add('reference-portrait',key);frame.setAttribute('role','img');frame.setAttribute('aria-label',p.name);
 const list=document.querySelector('.actions');list.textContent='';
 action(formatPhone(p.phone),'','tel:+'+p.phone,'phone');
 action('WhatsApp','','https://wa.me/'+p.phone,'chat');
 action('Instagram','',data.instagram,'link');
 action('Web Sitesi','',data.web,'link');
 action('Telefon','','tel:+'+p.phone,'phone');
 action('Konum','',data.maps,'pin');
 document.querySelector('.top .share').textContent='☰';document.querySelector('.top .share').setAttribute('aria-label','Profil menüsünü aç');
 document.querySelector('.top .share').onclick=()=>{const nav=document.querySelector('.switcher');nav.scrollIntoView({behavior:'smooth',block:'center'});nav.querySelector('a').focus({preventScroll:true});};
 document.querySelector('.card-footer').innerHTML='<strong class="mono">MONO LINK</strong><span class="powered">Dijital profil ve NFC çözümü</span><span class="tagline">Tek Dokunuş. Sınırsız Bağlantı.</span>';
}
if(key==='magaza'){document.querySelector('#name').remove();document.querySelector('#subtitle').remove();}
