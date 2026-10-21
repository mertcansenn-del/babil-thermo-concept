const data=window.BABIL;const key=document.body.dataset.profile||'magaza';const p=data.profiles[key];const base=document.body.dataset.base||'./';
const icons={phone:'M7 3H3v4c0 8 6 14 14 14h4v-4l-5-2-2 3c-4-2-6-4-8-8l3-2z',chat:'M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z',link:'M9 15l6-6M8 17l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 7l2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0',star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z'};
function action(label,detail,href,icon='link'){if(!href)return;const a=document.createElement('a');a.className='action';a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}a.innerHTML='<svg viewBox="0 0 26 26" aria-hidden="true"><path d="'+icons[icon]+'"/></svg><span><strong></strong><small></small></span><span class="arrow" aria-hidden="true">›</span>';a.querySelector('strong').textContent=label;a.querySelector('small').textContent=detail;document.querySelector('.actions').append(a);}
document.title=(key==='magaza'?'BABİL Thermo Concept':p.name+' | BABİL Thermo Concept');document.querySelector('#name').textContent=key==='magaza'?'BABİL Thermo Concept':p.name;document.querySelector('#subtitle').textContent=p.subtitle;document.querySelector('#role').textContent=p.role;
if(key!=='magaza'){document.body.classList.add('personal-profile');const mark=document.querySelector('.top .wordmark');mark.innerHTML='<img src="'+base+'assets/babil-logo.webp" alt="BABİL Thermo Concept">';const frame=document.createElement('div');frame.className='photo-frame reference-portrait '+key;frame.setAttribute('role','img');frame.setAttribute('aria-label',p.name);document.querySelector('#visual').append(frame);}else{document.querySelector('#visual').innerHTML='<img class="store-logo" src="'+base+'assets/babil-logo.webp" alt="BABİL Thermo Concept">';document.querySelector('#name').classList.add('sr-only');document.querySelector('#subtitle').hidden=true;}
action('Ürün kataloğunu incele','33 ürün ve ürün grubu',base+'katalog/');
action('WhatsApp ile bilgi al','Ürün, fiyat ve stok bilgisi','https://wa.me/'+p.phone,'chat');
action('Telefonla ara',formatPhone(p.phone),'tel:+'+p.phone,'phone');
action('Instagram','@babil.thermoconcept',data.instagram);

if(data.maps)action('Yol tarifi al','Mağazamıza ulaşın',data.maps);
document.querySelector('.address').textContent=data.address;
document.querySelector('.switcher')?.remove();document.querySelector('.card-footer')?.remove();document.querySelector('.partner')?.remove();document.querySelector('#information')?.remove();
function formatPhone(n){const x=n.replace(/^90/,'');return '+90 '+x.slice(0,3)+' '+x.slice(3,6)+' '+x.slice(6,8)+' '+x.slice(8);}
let timer;function toast(t){document.querySelector('.toast').textContent=t;clearTimeout(timer);timer=setTimeout(()=>document.querySelector('.toast').textContent='',4000);}
document.querySelector('#share').onclick=async()=>{try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else{await navigator.clipboard.writeText(location.href);toast('Sayfa bağlantısı kopyalandı.');}}catch(e){if(e.name!=='AbortError')toast('Bağlantıyı tarayıcınızın paylaş menüsünden paylaşabilirsiniz.');}};
