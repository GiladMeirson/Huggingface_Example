// --------------------------- App --------------------------- \\
$(document).ready(()=>{
    ClickMenue('e7');
})

const ClickMenue=(id)=>{
    if (id=='e1') {
        $('#translate').fadeIn(500);
        $('#textvoice').fadeOut(250);
        $('#textimage').fadeOut(250);
        $('#yolo').fadeOut(250);
        $('#Mnist').fadeOut(250);
        $('#Aboutph').fadeOut(250);




    }
    else if (id=='e2') {
        $('#textvoice').fadeIn(500);
        $('#translate').fadeOut(250);
        $('#textimage').fadeOut(250);
        $('#yolo').fadeOut(250);
        $('#Mnist').fadeOut(250);
        $('#Aboutph').fadeOut(250);




    }
    else if (id=='e3') {
        $('#textimage').fadeIn(500);
        $('#translate').fadeOut(250);
        $('#textvoice').fadeOut(250);
        $('#yolo').fadeOut(250);
        $('#Mnist').fadeOut(250);
        $('#Aboutph').fadeOut(250);



    }
    else if (id=='e4') {
        $('#yolo').fadeIn(500);
        $('#translate').fadeOut(250);
        $('#textvoice').fadeOut(250);
        $('#textimage').fadeOut(250);
        $('#Mnist').fadeOut(250);
        $('#Aboutph').fadeOut(250);



        
    }
    else if (id=='e5') {
        $('#Mnist').fadeIn(500);
        $('#translate').fadeOut(250);
        $('#textvoice').fadeOut(250);
        $('#textimage').fadeOut(250);
        $('#yolo').fadeOut(250);
        $('#Aboutph').fadeOut(250);

    }
    else{
        $('#Aboutph').fadeIn(500);
        $('#translate').fadeOut(250);
        $('#textvoice').fadeOut(250);
        $('#textimage').fadeOut(250);
        $('#yolo').fadeOut(250);
        $('#Mnist').fadeOut(250);
    }
}
const errorCB=(err)=>{
    console.log(err)
}

const Activtions=(a)=>{
    ClickMenue(a.id)
    const arr=document.getElementsByClassName('active');
    for (let i = 0; i < arr.length; i++) {
        const a = arr[i];
        a.classList.toggle('active');
        
    }
    a.classList.toggle('active')
}





// --------------------------- Translate --------------------------- \\
const Translate=()=> {
    let lang = $('#LangIN').val();
    const text = $('#textIN').val();
    const api = `https://giladthefixer-translateapp.hf.space/run/predict`;
    lang=`Helsinki-NLP/opus-mt-en-${lang}`;
    const arr=[]
    arr.push(text);
    arr.push(lang);

    $.ajax({
        type: 'POST',
        url: api,
        data: JSON.stringify({
            data: arr,
        }),
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
    return false;
}
const successCB=(data)=>{
    console.log(data)
    let str=`<p style="font-size: 25px;">Output resualt:</p>
    <p style="font-size: 22px;">${data.data[0]}</p>
    <p style="font-size: 12px;">duration : ${data.duration} sec</p>`;
    document.getElementById('phtranslate').style.display='block'
    document.getElementById('phtranslate').innerHTML=str;
}


// --------------------------- Text To Voice --------------------------- \\

const Convert=()=> {
    const text = $("#TextIN2").val();
    const speaker = $('#VoiceIN').val();
    const api = `https://matthijs-speecht5-tts-demo.hf.space/run/predict`;
  
    let objectToSend = {
      data: [text, speaker],
    };
  
    $.ajax({
      type: "POST",
      url: api,
      data: JSON.stringify(objectToSend),
      cache: false,
      contentType: "application/json",
      dataType: "json",
      success: successCB2,
      error: errorCB,
    });
  }
  
const successCB2=(data)=> {
      console.log(data);
      const str =`https://matthijs-speecht5-tts-demo.hf.space/file=${data.data[0].name}`;
      const htmlstr=`<p style="font-size: 19px;">Output resualt:</p>
      <audio controls src="${str}"></audio>
      `;
    document.getElementById('phttv').innerHTML=htmlstr;  
    $('#phttv').fadeIn(500);    
  
}

// --------------------------- Generate --------------------------- \\

const Generate=()=>{
    const text = $('#TextIN3').val();
    const apistable='https://antreyes-stabilityai-stable-diffusion-2.hf.space/run/predict';
        $.ajax({
        type: "POST",
        url: apistable,
        data: JSON.stringify({
          data: [text],
        }),
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB3,
        error: errorCB,
      });
}
const successCB3=(data)=>{
    console.log(data);
    const htmlstr=`<p style="font-size: 19px;">Output resualt:</p>
    <img style="border-radius:25px; border-color:gold;" class="box2" src="${data.data[0]}" alt="">
    <p style="font-size: 13px;">duration : ${data.duration}</p>
`
    document.getElementById('phtextimage').innerHTML=htmlstr;
    $('#phtextimage').fadeIn(500);
}


// --------------------------- yolo --------------------------- \\

const Classify=()=>{
    const image = base64
    const yoloApi = `https://kadirnar-yolov8.hf.space/run/predict`;


        $.ajax({
        type: "POST",
        url: yoloApi,
        data: JSON.stringify({
          data: [image,"kadirnar/yolov8n-v8.0",640,0.25,0.45],
        }),
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB4,
        error: errorCB,
      });
}
const successCB4=(data)=>{
    console.log(data);
    const htmlstr=`<p style="font-size: 19px;">Output resualt:</p>
    <img style="border-radius:25px; border-color:gold;" class="box2" src="${data.data[0]}" alt="">
    <p style="font-size: 13px; margin-bottom:5px">duration : ${data.duration}</p>
`
    document.getElementById('yoloph').innerHTML=htmlstr;
    $('#yoloph').fadeIn(500);
}
const cb64=(data)=>{
    console.log(data);
    const str=`<p style="font-size:18px">Your Input : </p> <br>
    <img class="box2" src="${data}" alt="">`
    document.getElementById('yoloin').innerHTML=str;
    $('#yoloin').fadeIn(500);
    base64=data;
}

// --------------------------- Mnist --------------------------- \\

const Classify2=()=>{
    const image = base64
    const imageVar = 'https://lambdalabs-stable-diffusion-image-variations.hf.space/run/predict'

        $.ajax({
        type: "POST",
        url: imageVar,
        data: JSON.stringify({
          data: [image,3,1,25,0],
        }),
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB5,
        error: errorCB,
      });
}
const successCB5=(data)=>{
    console.log(data);
    const prefix = `https://lambdalabs-stable-diffusion-image-variations.hf.space/file=`;
    const htmlstr=`<p style="font-size: 19px;">Output resualt:</p>
    <img style="border-radius:25px; border-color:gold;" class="box2" src="${prefix+data.data[0][0].name}" alt="">
    <p style="font-size: 13px; margin-bottom:5px">duration : ${data.duration}</p>
`
    document.getElementById('Mnistph').innerHTML=htmlstr;
    $('#Mnistph').fadeIn(500);
}
const cb642=(data)=>{
    console.log(data);
    const str=`<p style="font-size:18px">Your Input : </p> <br>
    <img class="box2" src="${data}" alt="">`
    document.getElementById('Mnistin').innerHTML=str;
    $('#Mnistin').fadeIn(500);
    base64=data;
}