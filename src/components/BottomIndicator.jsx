import React from 'react';

const BottomIndicator = (props) => {
    return(
        <div className="text-center">
            {props.error &&
                <h4 className="text-danger">An Error Occured</h4>
            }

            {props.isLoading &&
                <div style={{color: '#f79400'}}>Loading ...</div>
            }
        </div>
    )
};

export default BottomIndicator;