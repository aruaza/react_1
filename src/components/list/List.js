import React, {useEffect} from 'react';

const List = ({list}) => {
    return (
        <div>
            {
                list.map((item) =>
                    <h5 key={item.id}>{item.id} {item.task}</h5>
                )
            }
        </div>
    )
}

export default List