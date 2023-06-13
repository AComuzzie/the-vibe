
//Current Weather API Endpoint
//href = curl --compressed --request GET --url \
//'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7'
const button = document.getElementById('button-id')
button.addEventListener("click",function(){
    fetch('https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7')
    .then(function(response){
        return response.json()
     })
     .then(function(data){
        console.log(data)
     }) 
})
    
function retrieve(){ fetch('https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7')

    if (btn) {
     btn.addEventListener('click', () => {
      console.log('btn clicked');
    });
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//     el.addEventListener('click', swapper, false);
// });