import{a as y,s as g,I,b as C}from"./ImgWorkspace.e2c55ee0.js";import{_ as z,d as $,r as v,o as l,c as d,w as m,u,a as h,b as c,e as D,f as E,F as B,g as F,n as j}from"./index.f11dbda6.js";const M={class:"img-container"},U=$({__name:"Mobile",setup(A){const w=e=>{const o=["B","KB","MB"];let a=0;for(;e>=1024&&a<3;)e/=1024,a+=1;return e.toFixed(2)+o[a]},n=v(0),r=v([]),f=()=>{const e=document.createElement("input");e.type="file",e.accept=".jpg,.jpeg,.png",e.multiple=!0,e.style.position="absolute",e.style.left="-500px",e.style.top="-500px",document.body.appendChild(e),e.onchange=()=>{const o=e.files;if(!o){alert("\u65E0\u6587\u4EF6");return}for(let a=0;a<o.length;a++)try{const t=new FileReader;t.onload=()=>{r.value.push({filename:o[a].name,base64:t.result,size:w(o[a].size)})},t.onerror=i=>{console.log(`error occurred when reading "${o[a].name}": `,i)},t.readAsDataURL(o[a]),document.body.removeChild(e)}catch(t){console.log(`error occurred when solving "${o[a].name}": `,t)}},e.click()},k=e=>{n.value=e},_=e=>{r.value.splice(e,1),n.value>e?n.value-=1:n.value===e&&(n.value=-1)},x=()=>{r.value=[],n.value=-1},b=(e,o,a,t)=>{const i=document.createElement("canvas");i.width=a,i.height=t;const s=new Image;s.src=o,s.onload=()=>{i.getContext("2d").drawImage(s,0,0,a,t);const p=document.createElement("a");p.href=i.toDataURL("image/png"),p.download=`resized_${a}_${t}_${e}`,p.click()}};return(e,o)=>(l(),d(u(y),{class:"mobile",style:{height:"100%"},layout:"vertical"},{default:m(()=>[h(u(g),{class:"panel-container",size:20,minSize:20},{default:m(()=>[c("div",{class:"panel-title"},[c("div",{class:"btn",onClick:f},"\u5BFC\u5165"),c("div",{class:"btn",onClick:x},"\u6E05\u7A7A")]),c("div",M,[(l(!0),D(B,null,E(r.value,(a,t)=>(l(),d(C,{class:j(["single-img",n.value===t?"active":"default"]),key:t,pic:a,onDirect50:i=>b(a.filename,a.base64,50,50),onDelImg:i=>_(t),onClick:i=>k(t)},null,8,["class","pic","onDirect50","onDelImg","onClick"]))),128))])]),_:1}),h(u(g),{class:"workspace-container",size:80,minSize:70},{default:m(()=>[n.value>=0&&n.value<r.value.length?(l(),d(I,{pic:r.value[n.value],key:n.value,onDownloadImg:b},null,8,["pic"])):F("",!0)]),_:1})]),_:1}))}});var S=z(U,[["__scopeId","data-v-7125e550"]]);export{S as default};
