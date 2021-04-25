const muestraMonedaBase = document.querySelector('#monedaBase');
const lista = document.querySelector('#listaMonedas');
const datePicker = document.querySelector('#datePicker');
const tablaCotizaciones = document.querySelector('#tablaCotizaciones tbody');
const key = '?access_key=55488e5b0780cbb2a9e4c687eb7161c1';

let consultaDefault = 'http://api.exchangeratesapi.io/v1/';

traerMonedas(consultaDefault + '/latest' + key);
traerCotizacion(consultaDefault + '/latest' + key);

datePicker.addEventListener('change', event => {
  limpiarLista();

  let monedaAUsar = muestraMonedaBase.textContent;

  let fecha = event.target.value;
  traerCotizacion(
    'http://api.exchangeratesapi.io/v1/' + fecha + key + '&base=' + monedaAUsar
  );
});

function traerMonedas(consulta) {
  fetch(consulta)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
      Object.entries(respuestaJSON.rates).forEach(([moneda]) => {
        let itemLista = document.createElement('li');
        itemLista.classList.add('list-group-item');
        itemLista.classList.add('list-group-flush');
        lista.appendChild(itemLista);

        let values = document.createTextNode(moneda);

        itemLista.appendChild(values);
      });
    })
    .catch(error => console.error('FALLÓ', error));
}

lista.addEventListener('click', event => {
  limpiarLista();

  let monedaBase = event.target.innerText;

  let fechaBase =
    datePicker.value.length <= 0 ? '/latest' : '/' + datePicker.value;

  traerCotizacion(consultaDefault + fechaBase + '&base=' + monedaBase);
});

function traerCotizacion(consulta) {
  fetch(consulta)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
      monedaBase.textContent = respuestaJSON.base;

      Object.entries(respuestaJSON.rates).forEach(([moneda, valor]) => {
        let tr = document.createElement('tr');
        let tdMoneda = document.createElement('td');
        tablaCotizaciones.appendChild(tr);
        tr.appendChild(tdMoneda);
        let tipoMoneda = document.createTextNode(moneda);
        tdMoneda.appendChild(tipoMoneda);
        let tdValor = document.createElement('td');
        tr.appendChild(tdValor);
        let tipoValor = document.createTextNode(valor);
        tdValor.appendChild(tipoValor);
      });
    })
    .catch(error => console.error('FALLÓ', error));
}

function limpiarLista() {
  if (tablaCotizaciones.childNodes.length > 0) {
    tablaCotizaciones.innerHTML = '';
  }
}
