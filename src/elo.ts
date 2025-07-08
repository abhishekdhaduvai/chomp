export class Elo {
    private ratings: any;
    private places: string[];
    private K: number = 32;

    constructor(places: string[]) {
        this.ratings = {};
        this.places = places;

        places.map(place => this.ratings[place] = 1000);
    }

    expectedScore(a: number, b: number) {
        return 1 / (1 + Math.pow(10, (b - a) / 400));
    }

    updateRatings(winner: string, loser: string) {
        const ratingWinner: number = this.ratings[winner];
        const ratingLoser: number = this.ratings[loser];

        const expectedWin = this.expectedScore(ratingWinner, ratingLoser);
        const expectedLose = 1 - expectedWin;

        this.ratings[winner] += this.K * (1 - expectedWin);
        this.ratings[loser] += this.K * (0 - expectedLose);
    }

    getRankings() {
        const rankedPlaces: any = Object.entries(this.ratings).sort((a: any, b: any) => b[1] - a[1]);

        return rankedPlaces;
    }

    generatePairs() {
        const pairs = [];
        for (let i = 0; i < this.places.length; i++) {
            for (let j = i + 1; j < this.places.length; j++) {
                pairs.push([this.places[i], this.places[j]]);
            }
        }

        return pairs;
    };

    selectRandom() {
        const ratings: any = Object.entries(this.ratings);

        const totalWeight = ratings.reduce((acc: number, [, weight]: [any, number]) => acc + weight, 0);

        const random = Math.random() * totalWeight;

        let runningTotal = 0;
        for (const [place, weight] of ratings) {
            runningTotal += weight;
            if (random < runningTotal) {
                return place;
            }
        }
    }
}
