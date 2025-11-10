import{a as m,S as h,i as c}from"./assets/vendor-MjawMu3A.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();m.defaults.baseURL="https://pixabay.com/api/?";const E=({q:a,page:t=1,per_page:l=15})=>{const s=new URLSearchParams({key:"33730392-00e87f60b0c2dabc7d687ed2e",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:l,page:t});return m.get("",{params:s})},L=a=>a.reduce((t,{webformatURL:l,largeImageURL:s,tags:e,likes:r,views:n,comments:g,downloads:y})=>t+`
      <li class="gallery-item">
        <a class="gallery-link" href=${s}>
          <img
            class="gallery-image"
            src=${l}
            alt=${e}
          />
        <ul class="item-details">
            <li class="item-detail">
              <p>Likes</p>
              <span>${r}</span>
            </li>
            <li class="item-detail">
              <p>Views</p>
              <span>${n}</span>
            </li>
            <li class="item-detail">
              <p>Comments</p>
              <span>${g}</span>
            </li>
            <li class="item-detail">
              <p>Downloads</p>
              <span>${y}</span>
            </li>
        </ul>
        </a>
      </li>`,""),o={galleryEl:document.querySelector(".gallery"),inputEl:document.querySelector(".form-input"),formEl:document.querySelector(".form"),loaderEl:document.querySelector(".loader"),loadMoreBtnEl:document.querySelector(".load-more-button")},b=new h(".gallery a",{captionsData:"alt",captionDelay:250,animationSpeed:250,scrollZoom:!1}),d={title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"},i={page:1,q:"",per_page:15},p=()=>o.loaderEl.classList.toggle("is-active"),u=()=>o.loadMoreBtnEl.classList.add("is-hidden"),S=()=>o.loadMoreBtnEl.classList.remove("is-hidden"),f=async(a=!1)=>{p();try{const{data:t}=await E(i),l=Math.ceil(t.totalHits/i.per_page);if(!t.hits.length)throw new Error(d.message);const s=L(t.hits);if(a?o.galleryEl.insertAdjacentHTML("beforeend",s):o.galleryEl.innerHTML=s,b.refresh(),i.page>=l?(u(),c.info({message:"We're sorry, but you've reached the end of search results."})):S(),i.page++,a){const e=document.querySelector(".gallery-item").getBoundingClientRect().width*2;scrollBy({top:e,behavior:"smooth"})}}catch(t){c.error(d),u(),console.error(t)}finally{p()}},M=a=>{if(a.preventDefault(),i.page=1,i.q=o.inputEl.value.trim(),o.inputEl.value="",o.galleryEl.innerHTML="",u(),!i.q){c.error(d);return}f(!1)},q=()=>f(!0);o.formEl.addEventListener("submit",M);o.loadMoreBtnEl.addEventListener("click",q);
//# sourceMappingURL=index.js.map
