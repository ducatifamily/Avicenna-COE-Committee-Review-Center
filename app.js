
(async()=>{
  const res = await fetch('source-index.json');
  const data = await res.json();

  const labels = ["Program Guide","Instructor Guide","Student Guide","Certification Pathway","Competencies","Lesson Plans","Syllabi","Learning Resources","Live Skills","Fully Online Guides"];

  const grid = document.getElementById('programGrid');
  data.programs.forEach(p=>{
    const details=document.createElement('details');
    details.className='program-card';
    const type = p.type ? p.type : 'Program evidence collection';
    const links=Object.entries(p.evidence).map(([label,url])=>{
      const count=p.counts && p.counts[label] ? `<em>${p.counts[label]} items</em>` : '';
      return `<a class="evidence-link" href="${url}" target="_blank" rel="noopener">${label} ↗ ${count}</a>`;
    }).join('');
    details.innerHTML=`<summary><span class="abbr">${p.abbr}</span><span class="program-title"><strong>${p.name}</strong><small>${type}</small></span><span class="chev">+</span></summary><div class="evidence-links">${links}</div>`;
    grid.appendChild(details);
  });

  const catGrid=document.getElementById('categoryGrid');
  data.categories.forEach(c=>{
    const a=document.createElement('a');
    a.className='category-card';a.href=c.url;a.target='_blank';a.rel='noopener';
    a.innerHTML=`<strong>${c.name}</strong><span class="count">${c.count}</span><p>${c.note}</p><span>Open source evidence ↗</span>`;
    catGrid.appendChild(a);
  });

  const inst=document.getElementById('institutionalGrid');
  data.institutional.forEach(i=>{
    const d=document.createElement('article');
    d.className='institutional-card';
    d.innerHTML=`<h3>${i.title}</h3><p>${i.description}</p><a href="${i.url}" target="_blank" rel="noopener">Open source document ↗</a>`;
    inst.appendChild(d);
  });

  // Matrix
  const head=document.querySelector('#matrixTable thead');
  const body=document.querySelector('#matrixTable tbody');
  head.innerHTML='<tr><th>Program</th>'+labels.map(l=>`<th>${l}</th>`).join('')+'</tr>';
  data.programs.forEach(p=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><strong>${p.name}</strong></td>`+labels.map(label=>{
      const u=p.evidence[label];
      return u?`<td><a class="cell-link" href="${u}" target="_blank" rel="noopener" aria-label="${p.name}: ${label}">✓</a></td>`:`<td><span class="cell-empty">—</span></td>`;
    }).join('');
    body.appendChild(tr);
  });

  // Finder index
  const finder=[];
  data.programs.forEach(p=>{
    Object.entries(p.evidence).forEach(([label,url])=>finder.push({program:p.name,type:label,title:`${p.name} — ${label}`,url}));
  });
  data.categories.forEach(c=>finder.push({program:'Cross-program',type:c.name,title:c.name,url:c.url,description:c.note}));
  data.institutional.forEach(i=>finder.push({program:'Institutional',type:'Institutional Reference',title:i.title,url:i.url,description:i.description}));

  const typeFilter=document.getElementById('typeFilter');
  [...new Set(finder.map(x=>x.type))].sort().forEach(t=>{
    const o=document.createElement('option');o.value=t;o.textContent=t;typeFilter.appendChild(o);
  });
  const search=document.getElementById('search');
  const results=document.getElementById('results');

  function renderResults(){
    const q=search.value.trim().toLowerCase();
    const t=typeFilter.value;
    const matches=finder.filter(x=>(!t||x.type===t)&&(!q||`${x.program} ${x.type} ${x.title} ${x.description||''}`.toLowerCase().includes(q))).slice(0,80);
    results.innerHTML=matches.length?matches.map(x=>`<article class="result-card"><small>${x.program} · ${x.type}</small><strong>${x.title}</strong>${x.description?`<p>${x.description}</p>`:''}<a href="${x.url}" target="_blank" rel="noopener">Open evidence ↗</a></article>`).join(''):'<p>No indexed evidence matched that search.</p>';
  }
  search.addEventListener('input',renderResults);typeFilter.addEventListener('change',renderResults);renderResults();

  const menuBtn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
})().catch(err=>{
  const results=document.getElementById('results');
  if(results) results.innerHTML='<p>The evidence index could not be loaded. Please open the source Drive folder from the Overview section.</p>';
  console.error(err);
});
