const seats = document.querySelectorAll('.container .seat')
let selectedseastsCount = 0
let selectedseats = []
let movie = document.getElementById('movie')

function updatetextinfo(){

    document.getElementById('count').innerHTML = selectedseastsCount
    const price = +movie.value          
    document.getElementById('total').innerHTML = price * selectedseastsCount
}

function storedata(){
    localStorage.setItem("selectedseats", JSON.stringify(selectedseats));
    localStorage.setItem(
      "selectedmovieidx",
      movie.selectedIndex
    );
}

window.onload = ()=>{

    if (localStorage.getItem('selectedseats')!=null){
       selectedseats = JSON.parse(localStorage.getItem('selectedseats'))
       selectedseats.forEach((idx)=>{
           seats[idx].className = 'seat selected'
       })
       selectedseastsCount = selectedseats.length
    }

    if (localStorage.getItem('selectedmovieidx')!=null){
        movie.selectedIndex = localStorage.getItem('selectedmovieidx')
        
    }   
    updatetextinfo()
}

function populateseatsinfo() {
    selectedseats = []
    selectedseastsCount = 0
  seats.forEach((seat, idx) => {
    if (seat.className.includes("selected")) {
      selectedseastsCount += 1;
      selectedseats.push(idx);
    }
  });
  updatetextinfo()
  storedata()
}

const container = document.querySelector('.container')

container.addEventListener('click', e=>{
    console.log(typeof( e))
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('selected')){
        e.target.className = 'seat selected'
    }
    else if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && e.target.classList.contains('selected')){
        e.target.className = 'seat'
    }
    populateseatsinfo()
    
})

movie.addEventListener('change',()=>{
    updatetextinfo()
  storedata()
})

const img = document.querySelector('img')
img.addEventListener('click',()=>{
    localStorage.clear()
    window.location.reload()
})
