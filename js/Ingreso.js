class Ingreso extends Dato{
    static contador = 0;

    constructor(description,valor){
        super(description,valor);
        this._id = ++Ingreso.contador;
    }

    get id(){
        return this._id;
    }
}