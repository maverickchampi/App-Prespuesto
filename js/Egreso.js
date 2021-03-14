class Egreso extends Dato{
    static contador = 0;

    constructor(description,valor){
        super(description,valor);
        this._id = ++Egreso.contador;
    }

    get id(){
        return this._id;
    }
}