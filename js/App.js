const countries=document.querySelector('#countries');
const cars=document.querySelector('#cars');
const upDateBtn=document.querySelector('#upDateBtn');

let countryList=[];
let carList=[];
let getCountry=[];
let countryName=[];
let formId={
    name1:document.querySelector('#name'),
    position1:document.querySelector('#position'),
    color1:document.querySelector('#color'),
    price1:document.querySelector('#price'),
    madeBy1:document.querySelector('#madeby'),
};
let {name1 , position1 , color1 , price1 , madeBy1 }=formId;
function clearInputs(){
         name1.value='';
         position1.value='';
         color1.value='';
         price1.value='';
         madeBy1.value='';
}

function GenerateList(id , country ,square ,population){
    this.id=id;
    this.country=country;
    this.square=square;
    this.population=population;
    countryList.push([this.id , this.country ,this.square ,this.population]);
    let tempCountry='';
    countryList.forEach((val , index)=>{
        tempCountry+=`<tr class="text-center">
                        <td>${index+1}</td>
                        <td>${val[0]}</td>
                        <td>${val[1]}</td>
                        <td>${val[2]}</td>
                        <td>${val[3]}</td>
                        <td><input type="checkbox" onclick="getInfoCountry(${val[0]})" value="${val[0]}"></td>
                        </tr>`;
    })
    countries.innerHTML=tempCountry;
}
const country1=new GenerateList(1,'USA' , 9629091 , 275562673);
const country2=new GenerateList(2,'Russia' , 17130000 , 145934462 );
const country3=new GenerateList(3,'Korea' , 100363 , 51000000);
const country4=new GenerateList(4,'Turkey' , 783562 , 84339067);
const country5=new GenerateList(5,'German' , 357386 , 84009319);
let checkInputs=document.querySelectorAll("input[type=checkbox]");
function clearChek(){
    checkInputs.forEach((item)=>{
        item.checked=false;
    })
}
function cancelBtn(){
    clearChek();
    getCountry=[];
    countryName=[];
    clearInputs();
}
function renderCar(){
    let tempCar='';
    for (let i = 0; i < carList.length; i++) {
        tempCar+=`<tr>
                    <td>${i+1}</td>
                    <td>${carList[i].id}</td>
                    <td>${carList[i].name}</td>
                    <td>${carList[i].position}</td>
                    <td>${carList[i].color}</td>
                    <td>${carList[i].price}</td>
                    <td>${carList[i].madeBy}</td>
                    <td><button class="btn btn-warning"  onclick="editCar(${carList[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit"></i></button></td>
                    <td><button class="btn btn-danger" onclick="deleteCar(${carList[i].id})"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`
    }
    cars.innerHTML=tempCar;
    clearInputs();
    clearChek();
}
function getInfoCountry(id){
    getCountry=[];
    countryName=[];
    checkInputs.forEach(function (item){
        if (item.checked){
            countryList.forEach((val)=>{
                if (val[0] === +item.value){
                    getCountry.push(val);
                    countryName.push(val[1]);
                }
            })
        }
    })
}

function listFill(){
    if (getCountry.length !==0){
        document.getElementById('madeby').disabled=true;
        madeBy1.value=countryName;
    } else {
        clearInputs();
        document.getElementById('madeby').disabled=false;
    }
    document.querySelector('#addCar').style.display='flex';
    upDateBtn.style.display='none';
}
function addCar(){
    if (getCountry.length !==0){
        let car={
            id:Date.now(),
            name: name1.value,
            position: position1.value,
            color: color1.value,
            price: price1.value,
            madeBy: countryName,
        };
        carList.push(car);
        renderCar();
    } else {
        let car={
            id:Date.now(),
            name: name1.value,
            position: position1.value,
            color: color1.value,
            price: price1.value,
            madeBy: madeBy1.value,
        };
        carList.push(car);
        renderCar();
    }
    getCountry=[];
    countryName=[];
}
function editCar(idd){
    document.querySelector('#addCar').style.display='none';
    upDateBtn.style.display='flex';
    for (let i = 0; i < carList.length; i++) {
        if(+idd == +carList[i].id){
            name1.value=carList[i].name;
            position1.value=carList[i].position;
            color1.value=carList[i].color;
            price1.value=carList[i].price;
            madeBy1.value=carList[i].madeBy;
        }
    }

    upDateBtn.addEventListener('click', function  upDateCarList(){
        let aaaa={
            id: idd,
            name:name1.value,
            position: position1.value,
            color: color1.value,
            price: price1.value,
            madeBy: madeBy1.value,
        }
        for (let i = 0; i < carList.length; i++) {
            if(aaaa.id == carList[i].id){
                carList.splice(i , 1 , aaaa);
            }
        }
        renderCar();
    }
)
}





function deleteCar(id){
    for (let i = 0; i < carList.length; i++) {
        if (+id === +carList[i].id){
            carList.splice(i ,1);
        }
    }
    renderCar();
}
function clearAllF(){
    if (confirm('Are you sure ?')) {
        carList=[]; renderCar();
    }
}
