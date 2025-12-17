
// buildGallery attempts to load sequentially named images or reads products.json
function buildGallery(containerId, category, maxCount=200){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  fetch('/products.json').then(r=>r.json()).then(data=>{
    if(data && Array.isArray(data[category]) && data[category].length>0){
      data[category].forEach(function(item){ var div=document.createElement('div'); div.className='card'; div.innerHTML='<img src="'+item.img+'" alt="'+item.name+'"><p style="margin-top:8px">'+item.name+'<br><small>'+ (item.desc||'') +'</small></p>'; cont.appendChild(div); });
      return;
    }
    // fallback sequential
    var i=1, miss=0;
    function tryLoad(){ var num=String(i).padStart(3,'0'); var src='../images/'+category+'/'+category+'_'+num+'.jpg'; var img=new Image(); img.onload=function(){ miss=0; var div=document.createElement('div'); div.className='card'; div.innerHTML='<img src="'+src+'" alt=""><p style="margin-top:8px">'+category+'_'+num+'</p>'; cont.appendChild(div); i++; if(i<=maxCount) tryLoad(); }; img.onerror=function(){ miss++; i++; if(miss<5 && i<=maxCount) tryLoad(); }; img.src=src; }
    tryLoad();
  }).catch(function(e){ var i=1, miss=0; function tryLoad(){ var num=String(i).padStart(3,'0'); var src='../images/'+category+'/'+category+'_'+num+'.jpg'; var img=new Image(); img.onload=function(){ miss=0; var div=document.createElement('div'); div.className='card'; div.innerHTML='<img src="'+src+'" alt=""><p style="margin-top:8px">'+category+'_'+num+'</p>'; cont.appendChild(div); i++; if(i<=maxCount) tryLoad(); }; img.onerror=function(){ miss++; i++; if(miss<5 && i<=maxCount) tryLoad(); }; img.src=src; } tryLoad(); });
}
