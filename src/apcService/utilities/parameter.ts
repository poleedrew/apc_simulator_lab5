export class Parameter{
	public thickness: number;	
	public moisture: number;
    public tFactor: number;
    public mFactor: number;
    public type: string;
	
	constructor(thickness: number, moisture: number,
                tFactor: number, mFactor: number,
                type: string){
		this.thickness = thickness;
        this.moisture = moisture;
        this.tFactor = tFactor;
        this.mFactor = mFactor;
        this.type= type;
	}
}