import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import './style.css'
import Data from './../../Api/TreeData2.json'
import wardData from './../../Api/wardData.json'
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_AREA, SET_ACTIVE_WARD } from '../../Api/slice';

const treeData = Data
// Now, 'treeData' contains two parent nodes: 'parent 1' and 'parent 2'.

const TreeSelectComponent = () => {
    const [value, setValue] = useState();

    const dispatch = useDispatch();
    function findWard(wardName, wardArray) {
        // Iterate through the array and search for the object with the matching "ward" value
        for (let i = 0; i < wardArray.length; i++) {
            if (wardArray[i].ward === wardName) {
                return wardArray[i];
            }
        }

        // If no matching ward is found, you can return a custom message or value
        return null; // Return null or another custom value to indicate not found
    }

    const onChange = (newValue) => {
        const ward = findWard(newValue, wardData)
        setValue(newValue);

        dispatch(SET_ACTIVE_WARD(ward));
        dispatch(SET_ACTIVE_AREA(newValue));
    };

    const onClear = () => {
        setValue(null); // Set the value to null when cleared
        dispatch(SET_ACTIVE_AREA(null)); // Optionally dispatch an action to reset the active area in your Redux store
    };
    return (
        <div className='tree_container'>
            <TreeSelect
                showSearch
                style={{ width: '100%', height: '40px' }}
                value={value}
                dropdownStyle={{ maxHeight: '500px', overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                onClear={onClear} // Add the onClear handler
                treeData={treeData}
            />
        </div>
    );
};


export default TreeSelectComponent;