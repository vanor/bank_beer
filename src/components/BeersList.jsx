import React from 'react';

const BeersList = (props) => {
    return(
        <div>
            {
                props.beers.map((beer) => {
                    return(
                        <h4 key={beer.id} className="card card-body bg-light">
                            {beer.name}
                        </h4>
                    )
                })
            }
        </div>
    )
};

export default BeersList;