import React from 'react'

export function Loading({children}) {
    function renderFunc(){
        if(children){
            return children;
        }
        else{
            return "Loading...";
        }
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            height: '80vh'
        }}>
            <div>{renderFunc()}</div>     
        </div>
    )
}
