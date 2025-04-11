// import * as weather from "./weather.mjs";
  const itemsPerPage = 1;
  let currentPage = 1;

  const container = document.getElementById("weatherData") ;
  const pagination = document.getElementById("pagination") 

  let originalStyle = pagination.style.display ;

  pagination.style.display = "none";
  
  let myData = [];

  export function setData(data){
      myData = data || [];
  }

  // Display items for the current page
  export function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = myData.slice(start, end);

    container.textContent = "";
    
      paginatedItems.forEach(ele =>{
      const date = ele.date;
      const text = ele.day.condition.text;
      const icon = ele.day.condition.icon;
      
      const textEle = document.createElement("p") 
      textEle.textContent = text;


      const dateEle = document.createElement("p");
      dateEle.textContent = date;

      const img = document.createElement("img") 
      img.setAttribute("src",icon)

      container.appendChild(dateEle);
      container.appendChild(img);
      container.appendChild(textEle);

    })
}

  // Generate pagination buttons
  export function setupPagination() {
    const pageCount = Math.ceil(myData.length / itemsPerPage);
    pagination.style.display = originalStyle;

    pagination.innerHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
      </li>
    `;

    for (let i = 1; i <= pageCount; i++) {
      pagination.innerHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    pagination.innerHTML += `
      <li class="page-item ${currentPage === pageCount ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
      </li>
    `;

    // Add event listeners to each link
    document.querySelectorAll(".page-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = Number(link.getAttribute("data-page"));
        if (page >= 1 && page <= pageCount) {
          currentPage = page;
          displayPage(currentPage);
          setupPagination();
        }
      });
    });
  }
