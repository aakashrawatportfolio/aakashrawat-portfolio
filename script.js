const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const nav=$('#nav'),bar=$('.progress i'); addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>25);const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h?scrollY/h*100:0)+'%'});
const menu=$('.menu'); menu.onclick=()=>$('#nav nav').classList.toggle('open'); $$('#nav nav a').forEach(a=>a.onclick=()=>$('#nav nav').classList.remove('open'));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}}),{threshold:.12}); $$('.reveal').forEach(e=>obs.observe(e));
if(matchMedia('(pointer:fine)').matches){let mx=0,my=0,gx=0,gy=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;$('.cursor').style.cssText=`left:${mx}px;top:${my}px`});(function loop(){gx+=(mx-gx)*.08;gy+=(my-gy)*.08;$('.cursorGlow').style.cssText=`left:${gx}px;top:${gy}px`;requestAnimationFrame(loop)})()}
$$('.magnetic').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.18}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
const skills=[
['🎨','Figma','design','#f24e1e'],['⚛','React.js','frontend','#00d8ff'],['JS','JavaScript','frontend','#f7df1e'],['5','HTML5','frontend','#ff5b27'],['3','CSS3','frontend','#2f80ff'],['≈','Tailwind CSS','frontend','#38bdf8'],['N','Node.js','backend','#35b558'],['W','WordPress','other','#4aa3d8'],['◆','MongoDB','backend','#16c75b'],['◉','Git & GitHub','tools','#f4f4f4'],['◆','VS Code','tools','#25a8f2'],['Canva','Canva','design','#4c72ff'],['Xd','Adobe XD','design','#ff61f6'],['Ps','Photoshop','design','#31a8ff']
];
$('#skillGrid').innerHTML=skills.map((s,i)=>`<article class="skill" data-cat="${s[2]}" style="--skill-color:${s[3]};--skill-i:${i}"><i>${s[0]}</i><b>${s[1]}</b></article>`).join('');
const filterBtns=$$('#skillFilters button');
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{filterBtns.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.skill').forEach(card=>card.classList.toggle('is-hidden',f!=='all'&&card.dataset.cat!==f));}));
$('.skillExplore')?.addEventListener('click',()=>{$('.skillWorld')?.scrollIntoView({behavior:'smooth',block:'center'});});
const data={skills:'Aakash works with UI/UX design, Figma, HTML5, CSS3, JavaScript, Bootstrap, jQuery, React.js, WordPress and responsive design. He is also learning Golang and PostgreSQL.',projects:'Featured work includes IBCA Digital Experience, KINNOTI, English Press, Prishe Beauty, UI/UX systems and interactive event websites.',experience:'Aakash has 4+ years of experience across software engineering, frontend development and UI/UX. His journey includes IA-Meetings, Ideamotive Infosystem and KINNOTI.',contact:'You can contact Aakash at aakashr722@gmail.com. He is open to UI/UX, frontend, portfolio, landing-page, WordPress and event-web projects.',freelance:'Yes. The portfolio presents Aakash as open to UI/UX design, frontend development, landing pages, portfolios, WordPress websites and interactive event experiences.',about:'Aakash Rawat is a UI/UX designer, frontend developer and creative technologist who turns visual ideas into responsive, functional digital products.'};
const panel=$('#chatPanel'),messages=$('#messages'),input=$('#chatInput'); $$('[data-chat]').forEach(b=>b.onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),300)}); $('#chatClose').onclick=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')};
function answer(q){q=q.toLowerCase();if(q.includes('skill')||q.includes('tech')||q.includes('figma')||q.includes('react'))return data.skills;if(q.includes('project')||q.includes('work'))return data.projects;if(q.includes('experience')||q.includes('journey')||q.includes('company'))return data.experience;if(q.includes('contact')||q.includes('email')||q.includes('reach'))return data.contact;if(q.includes('freelance')||q.includes('hire')||q.includes('available'))return data.freelance;if(q.includes('who')||q.includes('about')||q.includes('aakash'))return data.about;return 'I can answer from Aakash’s portfolio data. Try asking about his skills, projects, experience, freelance work or contact details.'}
function add(text,type){const d=document.createElement('div');d.className='msg '+type;if(type==='ai')d.innerHTML=`<img src="assets/images/aakash-workspace.png" alt=""><p>${text}</p>`;else d.innerHTML=`<p>${text}</p>`;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
$('#chatForm').onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add(q,'user');input.value='';setTimeout(()=>add(answer(q),'ai'),420)}; $$('.chips button').forEach(b=>b.onclick=()=>{add(b.textContent,'user');setTimeout(()=>add(answer(b.textContent),'ai'),350)}); addEventListener('keydown',e=>{if(e.key==='Escape')panel.classList.remove('open')}); $('#year').textContent=new Date().getFullYear();


// v2 sticky projects: vertical scroll drives horizontal project rail
const workSection=document.querySelector('.work'), projectRail=document.querySelector('.projectStage .projects'), projectStage=document.querySelector('.projectStage'), projectMeter=document.querySelector('.projectMeter i');
function driveProjects(){if(!workSection||!projectRail||innerWidth<=1000)return;const r=workSection.getBoundingClientRect(), travel=workSection.offsetHeight-innerHeight, p=Math.max(0,Math.min(1,-r.top/Math.max(1,travel))), max=Math.max(0,projectRail.scrollWidth-projectStage.clientWidth);projectRail.style.transform=`translate3d(${-max*p}px,0,0)`;if(projectMeter)projectMeter.style.width=(p*100)+'%'}
addEventListener('scroll',driveProjects,{passive:true});addEventListener('resize',driveProjects);driveProjects();

// v2 skills: pointer spotlight + subtle 3D tilt + click focus
$$('.skill').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<700)return;const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,rx=((y-r.height/2)/r.height)*-9,ry=((x-r.width/2)/r.width)*11;card.style.setProperty('--sx',x+'px');card.style.setProperty('--sy',y+'px');card.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-7px) scale(1.025)`});card.addEventListener('pointerleave',()=>card.style.transform='');card.addEventListener('click',()=>{const on=card.classList.contains('activeSkill');$$('.skill').forEach(x=>x.classList.remove('activeSkill'));if(!on)card.classList.add('activeSkill')})});

// v3 section choreography: activate each section once as it enters the viewport
const sectionMotion=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('sectionLive');sectionMotion.unobserve(entry.target)}}),{threshold:.16});
$$('.section').forEach(section=>sectionMotion.observe(section));

// v3 index variables power staggered skill and experience reveals
$$('.skill').forEach((card,i)=>{card.style.setProperty('--skill-i',i);const levels=[92,94,91,88,82,90,86,78,93,95,58,55,89,84];card.style.setProperty('--level',(levels[i]||80)+'%');const meta=document.createElement('small');meta.className='skillMeta';meta.textContent=(i===10||i===11)?'LEARNING':'TOOL';card.appendChild(meta);const level=document.createElement('span');level.className='skillLevel';level.innerHTML='<span></span>';card.appendChild(level)});
$$('.timeline article').forEach((item,i)=>item.style.setProperty('--exp-i',i));

// V6 About portrait interactive depth
const aboutPortrait=document.querySelector('.aboutPortrait');
if(aboutPortrait && matchMedia('(pointer:fine)').matches){
  aboutPortrait.addEventListener('pointermove',e=>{const r=aboutPortrait.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;aboutPortrait.style.transform=`perspective(1100px) rotateX(${-y*2.5}deg) rotateY(${x*3.5}deg) translateY(-3px)`});
  aboutPortrait.addEventListener('pointerleave',()=>aboutPortrait.style.transform='');
}

// V9 preloader: animate for exactly 1 second, hold completed state for 1 second.
(()=>{
 const loader=document.getElementById('characterPreloader');
 const percent=document.getElementById('preloaderPercent');
 if(!loader) return;
 const started=performance.now();
 function tick(now){
   const p=Math.min(100,Math.round(((now-started)/1000)*100));
   if(percent) percent.textContent=p+'%';
   if(p<100) requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
 // 0-1s loading, 1-2s deliberate hold, then smooth exit.
 setTimeout(()=>{
   if(percent) percent.textContent='100%';
   loader.classList.add('hide');
   document.body.classList.remove('is-loading');
   setTimeout(()=>loader.remove(),650);
 },2000);
})();
