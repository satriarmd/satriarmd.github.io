// background color body

document.body.addEventListener('mousemove', function() {

const xPosisi = Math.round((event.clientX / window.innerWidth) * 255);
const yPosisi = Math.round((event.clientY / window.innerHeight) * 255);

document.body.style.backgroundColor = 'rgb('+ xPosisi +','+ yPosisi +',140)'
});



// pilihan komputer random

function getPilihanKomputer() {
	const komp = Math.random();

// const komp = Math.random();

// 	if(komp < 0.34) {
// 		komp = 'Gunting';
// 	} else if(komp >= 0.34 && komp < 0.67) {
// 		komp = 'kertas';
// 	} else {
// 		komp = 'gunting';
// 	}


// disingkat/ diringkas menjadi :

	if(komp < 0.34) return 'batu';
	if(komp >= 0.34 && komp < 0.67) return 'kertas';
	return 'gunting';

}


// rules/ aturannya

function getHasil(komp, player) {

	if(player == komp) return 'DRAW';
	if(player == 'batu') return (komp == 'kertas') ? 'LOSE' : 'WIN'; // ternary
	if(player == 'kertas') return (komp == 'gunting') ? 'LOSE' : 'WIN'; // jika player memilih kertas sedangkan komputer memilih gunting, jika true tampilkan 'LOSE' tapi jika false tampilkan WIN
	if(player == 'gunting') return (komp == 'batu') ? 'LOSE' : 'WIN';

}


// putar gambar komputer
// menggunakan konsep timing

function putar() {
	const imgKomputer = document.querySelector('.img-komputer');
	const gambar = ['batu', 'kertas', 'gunting'];
	let i = 0;
	const waktuMulai = new Date().getTime(); // <-- ambil waktu saat itu / pada saat fungsi putar dijalankan
	
	setInterval(function() {
		if(new Date().getTime() - waktuMulai > 1000) { // lalu 1 detik kemudian akan berhenti
			clearInterval;
			return; // supaya keluar dari function
		}
		imgKomputer.setAttribute('src', 'folder img/' + gambar[i++] + '.png'); // looping isi array
		if(i == gambar.length) i = 0; // jika i sudah mencapai max jumlah 'gambar', maka kembalikan ke 0 lagi
	}, 100);
}



// Pilihan Player

const gPilihan = document.querySelectorAll('li img'); // img yang ada didalam li
	let wins = 1;
	let loses = 1;
gPilihan.forEach( function(gp) { // forEach = untuk setiap image yang ada di dalam nodeList(isi variable gPilihan), jalankan function berikut.   kasih parameter (gp/terserah) untuk mengambil masing2 imagenya
	gp.addEventListener('click', function() {
		const pilihanKomputer = getPilihanKomputer(); // getPilihanKomputer adalah function diatas tadi yang isinya komputer random, lalu dimasukkan ke variable pilihanKomputer
		const pilihanPlayer = gp.className; // gp.className
		const hasil = getHasil(pilihanKomputer, pilihanPlayer);

		putar(); // ketika gambar di clik jalankan funsi putar

		const gambarPlayer = document.querySelector('.img-player');
		gambarPlayer.setAttribute('src', 'folder img/' + pilihanPlayer + '.png');

		setTimeout(function() {
			const imgKomputer = document.querySelector('.img-komputer');
			imgKomputer.setAttribute('src', 'folder img/' + pilihanKomputer + '.png'); // komputer milihnya (batu, kertas, gunting), karena nama img nya kebetulan sama jadi paling belakang tinggal digabungkan (.png/.jpg)

			const info = document.querySelector('.info');
			info.innerHTML = hasil; // menampilkan hasil (DRAW, LOSE !!, WIN !!)
			setTimeout(function () {
				if(hasil == 'WIN') {
					info.style.backgroundColor = '#40f95f';	
				}
				if(hasil == 'LOSE') {
					info.style.backgroundColor = '#fb717b';	
				}
				if(hasil == 'DRAW') {
					info.style.backgroundColor = 'darkgrey';	
				}
			},10);

			const nilaiPlayer = document.getElementById('nilai-player');
			const nilaiKomputer = document.getElementById('nilai-komputer');

			setTimeout(function() {
				if(hasil == 'WIN') { nilaiPlayer.innerHTML = wins++;
				}
				if(hasil == 'LOSE') { nilaiKomputer.innerHTML = loses++;
				}
			}, 300);

		}, 1000);
	});
});














