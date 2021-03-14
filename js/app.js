const ingresos = [
    new Ingreso('Salario', 1000.00),
    new Ingreso('Adicional', 120.00)
];

const egresos = [
    new Egreso('Comida', 400.00),
    new Egreso('Ropa', 200.00)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id) => {
    let indice = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indice,1);
    cargarApp();
};

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

crearEgresoHTML = (egreso) => {
    let porcentaje = egreso.valor / totalEgresos();
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                        onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
};

const eliminarEgreso = (id) => {
    let indice = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indice,1);
    cargarApp();
};

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor =  forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarApp();
            limpiarCampos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarApp();
            limpiarCampos();
        }
    }
};

let limpiarCampos = ()=>{
    let forma = document.forms['forma'];
    let descripcion = forma['descripcion'];
    let valor =  forma['valor'];

    descripcion.value = '';
    valor.value = '';
};