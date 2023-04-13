let sunucudanDonen;

/* JSONdaki veriyi javascripte aktarma START  */
var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        sunucudanDonen = JSON.parse(baglanti.responseText); /*object formatında alabilmek için parse kullandık*/
        soruGetir(); // Sayfa her çalıştığında soruları getirsin
    }
    return sunucudanDonen;
};
baglanti.open("GET", "db.json", true);
baglanti.send();
/* JSONdaki veriyi javascripte aktarma END  */

/* Tüm id'leri bir değişkene atıyacağım. Çünkü birden fazla kez kullancağımız için her seferinde document... yazmayalım  START*/
const sinav = document.getElementById("sinav");
const sonucAlani = document.getElementsByClassName("soruAlani")[0];
const soru = document.getElementById("soru");
const secenekler = document.getElementsByName("secenek");

const aciklamaA = document.getElementById("aciklamaA");
const aciklamaB = document.getElementById("aciklamaB");
const aciklamaC = document.getElementById("aciklamaC");
const aciklamaD = document.getElementById("aciklamaD");

const gonderButton = document.getElementById("gonder");
/* Tüm id'leri bir değişkene atıyacağım. Çünkü birden fazla kez kullancağımız için her seferinde document... yazmayalım  END*/


// Şimdi soruGetir() fonksiyonunu yazalım START
let puan = 0;
let sira = 0;

function soruGetir(){
    secimiTemizle() // Eğer seçim yapılmışsa seçimi temiizlesin;
    console.log(sunucudanDonen);

    let siradakiSoru = sunucudanDonen.sorular[sira];

    soru.innerHTML = siradakiSoru.soru;
    aciklamaA.innerHTML = siradakiSoru.secenekA;
    aciklamaB.innerHTML = siradakiSoru.secenekB;
    aciklamaC.innerHTML = siradakiSoru.secenekC;
    aciklamaD.innerHTML = siradakiSoru.secenekD;

}
function secimiTemizle(){
    secenekler.forEach(secenek => secenek.checked = false);
}
// Şimdi soruGetir() fonksiyonunu yazalım END
// secimiAl() fonksiyonu ile işaretlenmiş seçeneği alma START
function secimiAl(){
    let secim;
    secenekler.forEach(secenek => {
        if(secenek.checked == true){
            secim = secenek.id;
        }
    })
    //console.log( "secimiAL() : ", secim);
    return secim;
}
// secimiAl() fonksiyonu ile işaretlenmiş seçeneği alma END

// işaretlediğimiz seçeneği gönderButton ile göndermek START
gonderButton.addEventListener("click", () => {
    const secilen = secimiAl();
    console.log("SECIM = ", secilen);

    // şimdi seçilenile cevap aynı mı kontrol edelim
    if (secilen) {
        if (secilen == sunucudanDonen.sorular[sira].cevap) {
            puan++;
        }
    }
    sira++;

    // Son soruya kadar soru getirip en son ekrana yazdıralım
    if (sira < sunucudanDonen.sorular.length) {
        soruGetir();
    }
    else {
        sonucAlani.innerHTML = `
            <h2>Mecvut sorular içerisinden ${puan}/${sunucudanDonen.sorular.length} oranında başarı sağladınız.  </h2>
            `
            gonderButton.setAttribute("onclick", "location.reload()");
            gonderButton.innerHTML = ("Yeniden Başla");
    }
})
// işaretlediğimiz seçeneği gönderButton ile göndermek END

