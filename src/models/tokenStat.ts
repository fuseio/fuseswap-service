export default class TokenStat {
    public readonly date: Date;

    constructor (
        public readonly address: string,
        public readonly price: string,
        public readonly volume: string,
        public readonly timestamp: number
    ) {
      this.date = new Date(timestamp * 1000)
    }
}
