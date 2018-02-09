// Your code goes here

/*var vinElem = document.getElementById('vin');
gm.info.getVehicleConfiguration(function(data) {
  vinElem.innerHTML = gm.info.getVIN();
});
*/
 console.log("Start");

var change_oil_ind = [],
	engine_oil_life = [],
	engine_oil_pressure = [],
	engine_oil_temp = [],
	engine_coolant_temp = [],
	EV_active_cooling = [];
	fuel_water_ind=[];
var signals = ['change_oil_ind' , 'engine_oil_life','engine_oil_pressure' ,'engine_oil_temp','engine_coolant_temp' ,'EV_active_cooling' ,'fuel_water_ind' ];

var getData_1 = gm.info.watchVehicleData(function(data){
	if(data.change_oil_ind != undefined){
		change_oil_ind.push(data.change_oil_ind);
		console.log(change_oil_ind);
	}
}, signals);

var getData_2 = gm.info.watchVehicleData(function(data){
	if(data.engine_oil_life != undefined){
		engine_oil_life.push(data.engine_oil_life);
		console.log(engine_oil_life);
	}
}, signals);

var getData_3 = gm.info.watchVehicleData(function(data){
	if(data.engine_oil_pressure != undefined){
		engine_oil_pressure.push(data.engine_oil_pressure);
		console.log(engine_oil_pressure);
	}
}, signals);

var getData_4 = gm.info.watchVehicleData(function(data){
	if(data.engine_oil_temp != undefined){
		engine_oil_temp.push(data.engine_oil_temp);
		console.log(engine_oil_temp);
	}
}, signals);

var getData_5 = gm.info.watchVehicleData(function(data){
	if(data.engine_coolant_temp != undefined){
		engine_coolant_temp.push(data.engine_coolant_temp);
		console.log(engine_coolant_temp);
	}
}, signals);

var getData_6 = gm.info.watchVehicleData(function(data){
	if(data.EV_active_cooling != undefined){
		EV_active_cooling.push(data.EV_active_cooling);
		console.log(EV_active_cooling);
	}
}, signals);

var getData_7 = gm.info.watchVehicleData(function(data){
	if(data.fuel_water_ind != undefined){
		fuel_water_ind.push(data.fuel_water_ind);
		console.log(fuel_water_ind);
	}
}, signals);


var tableau;
var parsed;
setTimeout(function(){

	$.ajax({
		url: 'http://127.0.0.1:5000/api/pridect',
		type: "POST",
		data: JSON.stringify({change_oil_ind: change_oil_ind, engine_oil_life: engine_oil_life, engine_oil_pressure: engine_oil_pressure, 
		engine_oil_temp: engine_oil_temp, engine_coolant_temp:engine_coolant_temp , EV_active_cooling: EV_active_cooling,fuel_water_ind:fuel_water_ind}),
		contentType: "application/json; charset=utf-8"
		
	}).done(function( msg ){
		parsed=JSON.parse(msg);
		msg = msg.replace("{","");
		msg = msg.replace("}","");
		tableau=msg.split(",");

	});
}, 100000);



var signalsDoor = [
  'driver_door_open', 
  'passenger_door_open',
  'rearleft_door_open',  
  'rearright_door_open'
]
	 var driver_door ;
	 var passenger_door;
	 var rearleft_door;
	 var rearright_door;
	 
	 var speedTest;
	 chekedRadio();
gm.info.watchVehicleData(seat_belt, ['driver_seatbelt_fastened']);
gm.info.watchVehicleData(passenger_seat_belt, ['passenger_seatbelt_fastened']);
gm.info.watchVehicleData(speed,['average_speed']);

gm.info.watchVehicleData(driverdoor,signalsDoor);
/*gm.info.watchVehicleData(driverdoor,['passenger_door_open']);
gm.info.watchVehicleData(driverdoor,['rearleft_door_open']);
gm.info.watchVehicleData(driverdoor,['rearright_door_open']);*/


function chekedRadio(){
	 if(document.getElementById('radio-2').checked) {
	  speedTest=100;
		console.log(100);
	}else if(document.getElementById('radio-3').checked) {
	 speedTest=120;
		console.log(120);
	} else {
		speedTest=60;
		
console.log(60);}
	
}

function driverdoor(data){
	console.log(data.driver_door_open);
	console.log(data.passenger_door_open);
	console.log(data.rearleft_door_open);
	console.log(data.rearright_door_open);
	  
	 var driver = data.driver_door_open;
	 var  passenger = data.passenger_door_open;
	 var rearleft = data.rearleft_door_open;
	  var rearright = data.rearright_door_open;
	 //driver_door
	 if (driver == 0) {
		driver_door =0;
	 }
	 if (driver == 1) {
		driver_door =1;
	 }
	 // passenger_door
	 if (passenger == 0) {
		passenger_door =0;
	 }
	 if (passenger == 1) {
		passenger_door =1;
	 }
	 //rearleft_door
	 if (rearleft == 0) {
		rearleft_door =0;
	 }
	 if (rearleft == 1) {
		rearleft_door =1;
	 }
	 //rearright_door
	 if (rearright == 0) {
		rearright_door =0;
	 }
	 if (rearright == 1) {
		rearright_door =1;
	 }
	 
	 if(driver_door == 0 && passenger_door == 0 && rearleft_door ==0 && rearright_door == 0 )
	 {
		var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/door_car_all_off_1.png" width="80" height="80"  />';
		
 	 }
	 else if (driver_door == 1 && passenger_door == 1 && rearleft_door ==1 && rearright_door == 1 ){
		 // 1 2 3 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/door_car_all_On_1.png" width="80" height="80"  />';
		$.notify("Attention toutes les portes sont ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention tout les portes sont ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 1 && rearleft_door ==1 && rearright_door == 0 ){
		 // 1 2 3
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_passenger_rearLeft_door_car_On_.png" width="80" height="80"  />';
		
		$.notify("Attention il y a trois portes ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention il y a trois portes ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 1 && rearleft_door ==0 && rearright_door == 1 ){
		 // 1 2 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_rearRight_passeger_door_car_all_On_1.png" width="80" height="80"  />';
		$.notify("Attention il y a trois portes ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention il y a trois portes ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 0 && rearleft_door ==1 && rearright_door == 1 ){
		 // 1 3 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_rearrigth_rearLeft_door_car_On_.png" width="80" height="80"  />';
		$.notify("Attention il y a trois portes ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention il y a trois portes ouvert');
	 }
	 else if (driver_door == 0 && passenger_door == 1 && rearleft_door ==1 && rearright_door == 1 ){
		 // 2 3 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/passenger_rearLeft_rearrigth_door_car_On_.png" width="80" height="80"  />';
		$.notify("Attention il y a trois portes ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention il y a trois portes ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 1 && rearleft_door ==0 && rearright_door == 0 ){
		 // 1 2
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_passeger_door_car_all_On_1.png" width="80" height="80"  />';
		$.notify("Attention les portes avant sont ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention les portes avant sont ouvert');
	 
	 }
	 else if (driver_door == 1 && passenger_door == 0 && rearleft_door ==0 && rearright_door == 0 ){
		 // 1
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_door_car_On.png" width="80" height="80"  />';
		$.notify("Attention fermer la porte ","error");
		var id = gm.voice.startTTS(success, 'Attention fermer la porte');
	 } 
	 else if (driver_door == 0 && passenger_door == 1 && rearleft_door ==0 && rearright_door == 0 ){
		 // 2
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/passenger_door_car_On_.png" width="80" height="80"  />';
		$.notify("Attention fermer la porte a coté de vous ","error");
		var id = gm.voice.startTTS(success, 'Attention fermer la porte a coté de vous ');
	 }
	 else if (driver_door == 0 && passenger_door == 0 && rearleft_door ==1 && rearright_door == 1 ){
		 // 3 4 
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/rearLeft_rearRight_door_car_all_On_1.png" width="80" height="80"  />';
		$.notify("Attention les portes arrière sont ouvert","error");
		var id = gm.voice.startTTS(success, 'Attention les portes arrière sont ouvert');
	 }
	 else if (driver_door == 0 && passenger_door == 0 && rearleft_door ==0 && rearright_door == 1 ){
		 // 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/rearRight_door_car_On_.png" width="80" height="80"  />';
		
		$.notify("Attention la porte arrière droite est ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention la porte arrière droite est ouvert');
	 }
	 else if (driver_door == 0 && passenger_door == 0 && rearleft_door ==1 && rearright_door == 0 ){
		 // 3
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/rearLeft_door_car_On_.png" width="80" height="80"  />';
		$.notify("Attention la porte arrière gauche est ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention la porte arrière gauche est ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 0 && rearleft_door ==1 && rearright_door == 0 ){
		 // 1 3 
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_rearLeft_door_car_all_On_1.png" width="80" height="80"  />';
		
		$.notify("Attention votre porte et la porte arrière gauche sont ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention votre porte et la porte arrière gauche sont ouvert');
	 }
	 else if (driver_door == 1 && passenger_door == 0 && rearleft_door ==0 && rearright_door == 1 ){
		 // 1 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/driver_rearRight_door_car_On_1.png" width="80" height="80"  />';
		$.notify("Attention votre porte et la porte arrière droite sont ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention votre porte et la porte arrière droite sont ouvert');
	 }
	 else if (driver_door == 0 && passenger_door == 1 && rearleft_door ==1 && rearright_door == 0 ){
		 // 2 3
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/rearLeft_passenger_door_car_On_.png" width="80" height="80"  />';
		$.notify("Attention la porte a coté de vous et la porte arrière gauche sont ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention la porte a coté de vous et la porte arrière gauche sont ouvert');
	 }
	 else if (driver_door == 0 && passenger_door == 1 && rearleft_door ==0 && rearright_door == 1 ){
		 //2 4
		 var door = document.getElementById('3');
		door.innerHTML = '<img src="../images/rearRight_passeger_door_car_all_On_1.png" width="80" height="80"  />';
		$.notify("Attention la porte a coté de vous et la porte arrière droite sont ouvert ","error");
		var id = gm.voice.startTTS(success, 'Attention la porte a coté de vous et la porte arrière droite sont ouvert');
	 
	 }
	 

}



function passenger_seat_belt(data){
//console.log(data.driver_seatbelt_fastened);
 var seat_belt = data.passenger_seatbelt_fastened;
 if (seat_belt == 0) {
   var SeatBelt1 = document.getElementById('2');
   SeatBelt1.innerHTML = '<img src="../images/passenger_seat_belt_off.png" width="80" height="80"  />';
   //$.notify("bon","success");
  }
  else{
	var SeatBelt1 = document.getElementById('2');
	SeatBelt1.innerHTML = '<img src="../images/passenger_seat_belt_On.png" width="80" height="80"  />';
	 $.notify(" mettre la ceinture de sécurité","error");
	var id = gm.voice.startTTS(success, 'mettre la ceinture de sécurité');
	
	
  }
}
function success() {
	  // let it roll
	}
function seat_belt(data){
//console.log(data.driver_seatbelt_fastened);
 var seat_belt = data.driver_seatbelt_fastened;
 if (seat_belt == 0) {
   var SeatBelt1 = document.getElementById('1');
   SeatBelt1.innerHTML = '<img src="../images/driver_seat_belt_off.png" width="80" height="80"  />';
  }
  else{
	  var SeatBelt1 = document.getElementById('1');
	SeatBelt1.innerHTML = '<img src="../images/driver_seat_belt_on.png" width="80" height="80"  />';
	$.notify(" mettre la ceinture de sécurité","error");
	var id = gm.voice.startTTS(success, 'mettre la ceinture de sécurité');
  }
}

function speed(data){
	if (data.average_speed) {
		
			console.log(speedTest);
			var cos = [{
					color: '#ff0000',
					lo: speedTest,
					hi: 250
				  }, {
					color: '#00ff00',
					lo: 0,
					hi: 219
				  }];
			 console.log(cos);
			if(speedTest == 60 ) 
				averageSpeed.refresh(data.average_speed,cos);
			else if(speedTest == 100 ) 
				averageSpeed.refresh(data.average_speed,cos);
			else if(speedTest == 120 ) 
				averageSpeed.refresh(data.average_speed,cos);
		  
		  if(data.average_speed > speedTest ) {
			  console.log('speed' , speedTest);
			  $.notify("diminuer la vitesse SVP ","error");
				var id = gm.voice.startTTS(success, 'diminuer la vitesse SVP');
		  }
		 
  }
	
}

var averageSpeed = new JustGage({
  id: 'averageSpeed',
  value: 0,
  min: 0,
  max: 250,
  pointer: true,
  title: 'Average Speed',
  label: 'Km/h',

  customSectors: [{
    color: '#ff0000',
    lo: speedTest,
    hi: 250
  }, {
    color: '#00ff00',
    lo: 0,
    hi: 219
  }],
  counter: true
});


gm.info.getCurrentPosition(processPosition, true)
var lati;
var lngi;
function processPosition(position){
   lati = position.coords.latitude;
   lngi = position.coords.longitude;
  console.log(lati,lngi);
}

/*
change_oil_ind 1 0, engine_oil_life %100,engine_oil_pressure 1020.0 psk ,engine_oil_temp 40 - 215 deg C,engine_coolant_temp -40 - 215 deg C,EV_active_cooling 0 1,fuel_water_ind 0 1

*/


      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;
function initMap() {
	console.log(lati,lngi);
        var pyrmont = {lat: 48.8566 , lng: 2.3522};
		if(k==10)
			clearInterval(setplce);
        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });
		 var imga = {
    url: "../images/marker.png", // url
    scaledSize: new google.maps.Size(20, 35), // scaled size
	origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
		};
var marke = new google.maps.Marker({
          position: pyrmont,
          map: map,
		   icon: imga
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['car_repair']
        }, callback);
      }
	var k=0;
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
			 setTimeout(function() {setInterval(function(){
				if(parsed!=undefined){
					if(parsed.predctions[k]!=undefined)
						var a=parsed.predctions[k][0];
					
					if(Number(a)==1){
						$.notify("Attention votre moteur peut être tomber en panne \n vous devez aller réparer votre voiture ","error");
						var id = gm.voice.startTTS(success, 'Attention votre moteur peut être tomber en panne vous devez aller réparer votre voiture ');
						console.log(a);
						for (var i = 0; i < results.length; i++) {
							createMarker(results[i]);
						}
					}
					else{
						if(a!=undefined){
							console.log(a)
							console.log("vous ête protégé");
						}
						else 
							console.log("attendez, S'il vous plaît");
					}
					k++;
				}
				else
					console.log("attendez, S'il vous plaît");
		}, 10000);},10000);
        
        }
      }
	 
		
  function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
		 // icon: place.icon
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
//setTimeout(function(){setplce},100000);
/*var k=0;
var setplce= setTimeout(function() {setInterval(function(){
				if(parsed.predctions[k]!=undefined){
				var a=parsed.predctions[k][0];
				//var a=a.replace("]","");
				if(Number(a)==1){
					console.log(a);
					initMap(); }
				else{
					console.log(a)
				console.log("vous ête protégé");}
				k++;
				}
				else
					console.log('tsana a3ami');
}, 3000);},100000);*/

   

