 const Id = () => "id" + Math.random().toString(16).slice(2);

function createContent(){
  magazines.forEach(async (topic, ind)=>{
   
        
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + topic);
            const data = await response.json();
            let accordianId = Id();
            let carouselId = Id();
            let carouselInnerId = Id();
            createAccordian(data, accordianId, ind);
            createCarousal(accordianId, carouselId ,carouselInnerId);
            let itemsInCarousel = data.items;
            itemsInCarousel.forEach((item,index)=>{
             createInnerCarouselData(carouselInnerId,item,index)
            }) 

    })
    
}

function getMainAccordian(){
  let mainAccordianItem = document.getElementById('accordionPanelsStayOpenExample')
  return mainAccordianItem;
}

function createInnerCarouselData(cInId,item,index){
  let carouselInner = document.getElementById(cInId);
  let carouselItem = document.createElement('div');
  if(index == 0)
    carouselItem.setAttribute("class",  "carousel-item active");
  else
  carouselItem.setAttribute("class" , "carousel-item");
  carouselItem.innerHTML += 
  `<div class="card">
  <img src="${item.enclosure.link}" class="card-img-top" alt="${index}">
  <div class="card-body">
    <h3 class="card-title">${item.title}</h3>
    <p>${item.author} . ${item.pubDate}</p>
    <p class="card-text">${item.description}</p>
  </div>
</div>`
  carouselInner.appendChild(carouselItem)
}


function createCarousal(Id, carouselId, carouselInnerId ){
  
 let accordianBody = document.getElementById(Id);
 accordianBody.innerHTML += `<div id="carouselExampleFade${carouselId}" class="carousel slide carousel-fade" data-bs-ride="carousel">
 <div class="carousel-inner" id=${carouselInnerId}>
   
 </div>
 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade${carouselId}" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Previous</span>
 </button>
 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade${carouselId}" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="visually-hidden">Next</span>
 </button>
</div>` 


}



function createAccordian(data,Id,index){
    let mainAccordian = getMainAccordian(); 
    let accordianItem = document.createElement('div')
    accordianItem.setAttribute("class" , "accordion-item"); 
      let ariaExpand = index == 0 ? "true" : "false" ;
      let showItem = index == 0 ? "show" : "" ;
    accordianItem.innerHTML += `
    <h2 class="accordion-header acc" id="panelsStayOpen-headingOne">
    
    <button class="accordion-button" style="color: black; padding-left: 0px" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne${Id}" aria-expanded=${ariaExpand}  aria-controls="panelsStayOpen-collapseOne${Id}">
    <i class="fa-solid fa-angle-down"></i>${data.feed.title}
    </button>
    </h2>
    <div id="panelsStayOpen-collapseOne${Id}" class="accordion-collapse collapse ${showItem}" aria-labelledby="panelsStayOpen-headingOne${Id}">
    <div class="accordion-body p-0" id=${Id}>
    </div>
    </div>`

    mainAccordian.appendChild(accordianItem);

}
createContent();
