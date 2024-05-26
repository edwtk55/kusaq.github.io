let loadMoreBtn=document.querySelector('#load-more');
let currentItem=8;

loadMoreBtn.onclick=()=>{
    let boxes =[...document.querySelectorAll('.box-container .box')];
    for(var i=currentItem; i<currentItem+4;i++){
        boxes[i].style.display='inline-block';
    }
    currentItem+=4;
    if(currentItem>=boxes.length){
        loadMoreBtn.style.display='none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        fetch('nombres.txt').then(response => response.text()),
        fetch('precios.txt').then(response => response.text())
    ])
    .then(([nombresData, preciosData]) => {
        const nombres = nombresData.split('\n');
        const precios = preciosData.split('\n');
        const numItems = Math.min(nombres.length, precios.length); // Asegurarse de no exceder el número de elementos disponibles
        const container = document.getElementById('lista-1');

        for (let i = 1; i <= numItems; i++) {
            const box = document.createElement('div');
            box.className = 'box';

            const img = document.createElement('img');
            img.src = `images/pr${i}.png`;
            img.alt = `Producto ${i}`;

            const productoTxt = document.createElement('div');
            productoTxt.className = 'producto-txt';

            const h3 = document.createElement('h3');
            h3.textContent = nombres[i - 1] || `Producto ${i}`; // Fallback in case there's no name

            const p1 = document.createElement('p');
            p1.textContent = 'Calidad premium';

            const p2 = document.createElement('p');
            p2.className = 'precio';
            p2.textContent = `S/. ${precios[i - 1]}` || 'S/. 200'; // Fallback in case there's no price

            const a = document.createElement('a');
            a.href = '#';
            a.className = 'agregar-carrito btn-3';
            a.setAttribute('data-id', i);
            a.textContent = 'Agregar Carrito';

            productoTxt.appendChild(h3);
            productoTxt.appendChild(p1);
            productoTxt.appendChild(p2);
            productoTxt.appendChild(a);

            box.appendChild(img);
            box.appendChild(productoTxt);

            container.appendChild(box);
        }
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });
});