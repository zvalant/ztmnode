const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];
const habitalbeCheck = (planet)=>{
    return (planet['koi_disposition']== 'CONFIRMED' && (planet['koi_insol'] >.36 && planet['koi_insol']<1.11) &&planet['koi_prad'] <1.6);



}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data)=>{
        if (habitalbeCheck(data)){
            results.push(data);
        }

    })
    .on('error', (err) =>{
        console.log(err);
    })
    .on('end', ()=>{
        results.map((planet)=>{
            console.log(planet['kepler_name']);
        })
        console.log(results.length)
    })


